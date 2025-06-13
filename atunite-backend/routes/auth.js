// routes/auth.js
const express = require('express');
const bcrypt = require('bcryptjs');
console.log('Importing User model...');
const User = require('../models/User');

const router = express.Router();

// Signup route
router.post('/signup', async (req, res) => {
  const { name, usn, dob, password } = req.body;

  if (!/^[0-9]{8}$/.test(password)) {
    return res.status(400).json({ msg: 'Password must be 8 digits (numbers only)' });
  }

  try {
    const existingUser = await User.findOne({ usn });
    if (existingUser) {
      return res.status(400).json({ msg: 'User already exists with this USN' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, usn, dob, password: hashedPassword });
    await user.save();

    res.status(201).json({ msg: 'Signup successful' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err });
  }
});

// Login route
router.post('/login', async (req, res) => {
  const { usn, password } = req.body;

  try {
    const user = await User.findOne({ usn });
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ msg: 'Invalid password' });
    }

    res.json({ msg: 'Login successful', user });
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err });
  }
});

module.exports = router;