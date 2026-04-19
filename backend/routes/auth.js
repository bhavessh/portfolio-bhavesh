const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Simple in-memory admin auth (replace with proper user model in production)
const ADMIN_PASSWORD_HASH = bcrypt.hashSync('admin123', 10);

// POST login
router.post('/login', async (req, res) => {
  const { password } = req.body;

  try {
    const isValid = bcrypt.compareSync(password, ADMIN_PASSWORD_HASH);
    
    if (!isValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { role: 'admin' },
      process.env.JWT_SECRET || 'fallback-secret',
      { expiresIn: '24h' }
    );

    res.json({ 
      message: 'Login successful',
      token 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST verify token
router.post('/verify', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret');
    res.json({ valid: true, user: decoded });
  } catch (error) {
    res.status(401).json({ valid: false, message: 'Invalid token' });
  }
});

module.exports = router;
