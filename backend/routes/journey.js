const express = require('express');
const router = express.Router();
const Journey = require('../models/Journey');

// GET all journey milestones
router.get('/', async (req, res) => {
  try {
    const milestones = await Journey.find().sort({ order: 1, year: 1 });
    res.json(milestones);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST new milestone
router.post('/', async (req, res) => {
  const milestone = new Journey({
    year: req.body.year,
    title: req.body.title,
    subtitle: req.body.subtitle,
    description: req.body.description,
    icon: req.body.icon || '💻',
    category: req.body.category,
    order: req.body.order || 0
  });

  try {
    const newMilestone = await milestone.save();
    res.status(201).json(newMilestone);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT update milestone
router.put('/:id', async (req, res) => {
  try {
    const milestone = await Journey.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!milestone) {
      return res.status(404).json({ message: 'Milestone not found' });
    }
    res.json(milestone);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE milestone
router.delete('/:id', async (req, res) => {
  try {
    const milestone = await Journey.findByIdAndDelete(req.params.id);
    if (!milestone) {
      return res.status(404).json({ message: 'Milestone not found' });
    }
    res.json({ message: 'Milestone deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
