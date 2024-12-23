// Datos iniciales
const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
];

// Obtener todos los usuarios
const getAllUsers = () => users;

// Obtener un usuario por ID
const getUserById = (id) => users.find((user) => user.id === id);

// Crear un nuevo usuario
const createUser = (user) => {
    const newUser = { id: users.length + 1, ...user };
    users.push(newUser);
    return newUser;
};

// Actualizar un usuario
const updateUser = (id, updatedData) => {
    const userIndex = users.findIndex((user) => user.id === id);
    if (userIndex === -1) return null;
    users[userIndex] = { ...users[userIndex], ...updatedData };
    return users[userIndex];
};

// Eliminar un usuario
const deleteUser = (id) => {
    const userIndex = users.findIndex((user) => user.id === id);
    if (userIndex === -1) return false;
    users.splice(userIndex, 1);
    return true;
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
};
  