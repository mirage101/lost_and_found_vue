const express = require('express');
const router = express.Router();
const User = require('../models/User');

// GET all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET a single user by ID
router.get('/:id', getUser, (req, res) => {
  res.json(res.user);
});

// POST (create) a new user
router.post('/', async (req, res) => {
  const { username, email, first_name, last_name, password, admin, refresh_token } = req.body;

  if (!username || !email || !first_name || !last_name || !password) {
    return res.status(422).json({ message: 'Invalid fields' });
  }

  const user = new User({
    username,
    email,
    first_name,
    last_name,
    password,
    admin,
    refresh_token,
  });

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// UPDATE an existing user
router.patch('/:id', getUser, async (req, res) => {
  const { username, email, first_name, last_name, password, admin, refresh_token } = req.body;

  if (username != null) {
    res.user.username = username;
  }
  if (email != null) {
    res.user.email = email;
  }
  // Continue with other fields...

  try {
    const updatedUser = await res.user.save();
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE a user
router.delete('/:id', getUser, async (req, res) => {
  try {
    await res.user.deleteOne();
    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Middleware function to get a user by ID
async function getUser(req, res, next) {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.user = user;
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

module.exports = router;
