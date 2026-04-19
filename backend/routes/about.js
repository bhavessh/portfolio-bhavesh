const express = require('express');
const router = express.Router();
const About = require('../models/About');

// GET about data (single record)
router.get('/', async (req, res) => {
  try {
    let about = await About.findOne();
    if (!about) {
      // Create default if none exists
      about = new About();
      await about.save();
    }
    res.json(about);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT update about
router.put('/:id', async (req, res) => {
  try {
    const about = await About.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!about) {
      return res.status(404).json({ message: 'About not found' });
    }
    res.json(about);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
