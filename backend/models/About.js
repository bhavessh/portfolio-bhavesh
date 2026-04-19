const mongoose = require('mongoose');

const aboutSchema = new mongoose.Schema({
  // Hero section
  name: { type: String, default: 'Bhavesh' },
  tagline: { type: String, default: 'Full Stack Developer' },
  description: { type: String, default: 'I build scalable web applications with modern technologies.' },
  
  // About cards
  journeyTitle: { type: String, default: 'My Journey' },
  journeyText: { type: String, default: "I'm a passionate full-stack developer with expertise in building modern web applications." },
  
  approachTitle: { type: String, default: 'My Approach' },
  approachText: { type: String, default: 'I specialize in the MERN stack combined with modern tools like Astro for optimal performance.' },
  
  beyondTitle: { type: String, default: 'Beyond Coding' },
  beyondText: { type: String, default: "When I'm not coding, you'll find me exploring new technologies and contributing to open source." },
  
  // Meta
  email: { type: String, default: 'contact@example.com' },
  location: { type: String, default: 'Mumbai, India' },
  availability: { type: String, default: 'Open to opportunities' }
}, { timestamps: true });

module.exports = mongoose.model('About', aboutSchema);
