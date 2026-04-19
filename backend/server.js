const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'Portfolio CMS API',
    status: 'running',
    endpoints: {
      health: '/api/health',
      projects: '/api/projects',
      experience: '/api/experience',
      contact: '/api/contact',
      settings: '/api/settings/theme'
    }
  });
});

// Routes
app.use('/api/projects', require('./routes/projects'));
app.use('/api/experience', require('./routes/experience'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/skills', require('./routes/skills'));
app.use('/api/journey', require('./routes/journey'));
app.use('/api/about', require('./routes/about'));
app.use('/api/siteconfig', require('./routes/siteconfig'));

// Settings route for theme
app.post('/api/settings/theme', async (req, res) => {
  try {
    const { theme } = req.body;
    // Store in memory for now (can be expanded to database)
    global.themeSetting = theme;
    res.json({ success: true, theme });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/settings/theme', (req, res) => {
  res.json({ theme: global.themeSetting || 'system' });
});

// Admin password change endpoint
app.post('/api/admin/change-password', async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    
    // Verify current password (stored in .env as ADMIN_PASSWORD)
    if (currentPassword !== process.env.ADMIN_PASSWORD) {
      return res.status(401).json({ error: 'Current password is incorrect' });
    }
    
    // Validate new password
    if (!newPassword || newPassword.length < 6) {
      return res.status(400).json({ error: 'New password must be at least 6 characters' });
    }
    
    // Update password in .env file (in production, use proper auth)
    const fs = require('fs');
    const path = require('path');
    const envPath = path.join(__dirname, '.env');
    
    let envContent = fs.readFileSync(envPath, 'utf8');
    envContent = envContent.replace(
      /ADMIN_PASSWORD=.*/,
      `ADMIN_PASSWORD=${newPassword}`
    );
    fs.writeFileSync(envPath, envContent);
    
    // Update runtime variable
    process.env.ADMIN_PASSWORD = newPassword;
    
    res.json({ success: true, message: 'Password updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// MongoDB connection
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio';

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    // Start server even without DB for development
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT} (without DB)`);
    });
  });
