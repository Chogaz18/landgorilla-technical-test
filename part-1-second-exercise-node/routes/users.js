const express = require('express');
const { getAllUsers, getUserById, createUser, updateUser, deleteUser } = require('../models/users');
const authMiddleware = require('../middlewares/authMiddleware');
const Joi = require('joi');

const router = express.Router();

// Validación de usuario
const userSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  id: Joi.number().optional()
});

// Obtener todos los usuarios
router.get('/', authMiddleware, (req, res) => {
  res.json(getAllUsers());
});

// Obtener un usuario por ID
router.get('/:id', authMiddleware, (req, res) => {
  const user = getUserById(parseInt(req.params.id, 10));
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
});

// Crear un nuevo usuario
router.post('/', authMiddleware, (req, res) => {
  const { error } = userSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const newUser = createUser(req.body);
  res.status(201).json(newUser);
});

// Actualizar un usuario
router.put('/:id', authMiddleware, (req, res) => {
  const { error } = userSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const updatedUser = updateUser(parseInt(req.params.id, 10), req.body);
  if (!updatedUser) return res.status(404).json({ error: 'User not found' });
  res.json(updatedUser);
});

// Eliminar un usuario
router.delete('/:id', authMiddleware, (req, res) => {
  const deleted = deleteUser(parseInt(req.params.id, 10));
  if (!deleted) return res.status(404).json({ error: 'User not found' });
  res.status(204).send();
});

module.exports = router;
