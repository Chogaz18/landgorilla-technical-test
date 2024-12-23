const express = require('express');
const jwt = require('jsonwebtoken');
const Joi = require('joi');

const router = express.Router();

///Usuarios autorizados
const users = [{ id: 1, email: 'admin@landgorilla.com', password: 'admin123' }];

//Se utiliza la librería Joi tanto para validar los tipos que se usan, como para indicar si un campo es requerido

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const refreshTokenSchema = Joi.object({
  token: Joi.string().required(),
});

///Al hacer el login, validamos si es que los datos obtenidos son los correctos, y si están autorizados

router.post('/login', (req, res) => {
  const { error } = loginSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) return res.status(400).json({ error: 'Invalid credentials' });

  const accessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '15m' });
  const refreshToken = jwt.sign({ id: user.id }, process.env.REFRESH_SECRET);
  res.json({ accessToken, refreshToken });
});

///Se usa para refrescar el token

router.post('/refresh', (req, res) => {
  const { error } = refreshTokenSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const { token } = req.body;
  try {
    const user = jwt.verify(token, process.env.REFRESH_SECRET);
    const newAccessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '15m' });
    res.json({ accessToken: newAccessToken });
  } catch (err) {
    res.status(403).json({ error: 'Invalid refresh token' });
  }
});

module.exports = router;
