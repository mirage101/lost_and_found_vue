const express = require('express');
const router = express.Router();
const userController = require('../../controllers/userController');

// POST (create) a new user
router.post('/', userController.createUser);

// GET all users
router.get('/', userController.fetchUsers);

// GET a single user by ID
router.get('/:id', userController.getUserById);

// PATCH (update) an existing user
router.patch('/:id', userController.updateUser);

// DELETE a user
router.delete('/:id', userController.deleteUser);

module.exports = router;
