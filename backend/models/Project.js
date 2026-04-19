const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['FULL STACK', 'SAAS', 'AI/ML', 'CMS', 'MOBILE', 'OTHER']
  },
  tags: [{
    type: String,
    trim: true
  }],
  link: {
    type: String,
    default: '#'
  },
  githubLink: {
    type: String,
    default: ''
  },
  whyMade: {
    type: String,
    default: ''
  },
  idea: {
    type: String,
    default: ''
  },
  images: [{
    type: String,
    default: []
  }],
  videoUrl: {
    type: String,
    default: ''
  },
  featured: {
    type: Boolean,
    default: false
  },
  order: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

projectSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Project', projectSchema);
