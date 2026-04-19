const mongoose = require('mongoose');

const journeySchema = new mongoose.Schema({
  year: { type: String, required: true },
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String, default: '💻' },
  category: { 
    type: String, 
    required: true,
    enum: ['education', 'creative', 'milestone', 'career', 'other']
  },
  order: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Journey', journeySchema);
