const express = require('express');
const router = express.Router();
const SiteConfig = require('../models/SiteConfig');
const auth = require('../middleware/auth');

// GET site config (public)
router.get('/', async (req, res) => {
  try {
    let config = await SiteConfig.findOne();
    if (!config) {
      // Create default config
      config = new SiteConfig({
        socialLinks: [
          { name: 'YouTube', url: 'https://youtube.com/@bhavessh', icon: 'youtube', order: 0 },
          { name: 'GitHub', url: 'https://github.com/bhavessh', icon: 'github', order: 1 },
          { name: 'LinkedIn', url: 'https://linkedin.com/in/bhavessh', icon: 'linkedin', order: 2 },
          { name: 'Twitter', url: 'https://twitter.com/bhavessh', icon: 'twitter', order: 3 }
        ],
        resumeUrl: '',
        resumeDriveLink: 'YOUR_DRIVE_LINK_HERE',
        contactEmail: 'hello@example.com',
        contactPhone: '',
        contactLocation: 'Remote / Global',
        siteTitle: 'Portfolio',
        siteDescription: 'Full Stack Developer Portfolio'
      });
      await config.save();
    }
    res.json(config);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT update site config (protected)
router.put('/', auth, async (req, res) => {
  try {
    let config = await SiteConfig.findOne();
    if (!config) {
      config = new SiteConfig(req.body);
      await config.save();
      return res.json(config);
    }
    
    // Update fields
    if (req.body.socialLinks !== undefined) config.socialLinks = req.body.socialLinks;
    if (req.body.resumeUrl !== undefined) config.resumeUrl = req.body.resumeUrl;
    if (req.body.resumeDriveLink !== undefined) config.resumeDriveLink = req.body.resumeDriveLink;
    if (req.body.contactEmail !== undefined) config.contactEmail = req.body.contactEmail;
    if (req.body.contactPhone !== undefined) config.contactPhone = req.body.contactPhone;
    if (req.body.contactLocation !== undefined) config.contactLocation = req.body.contactLocation;
    if (req.body.siteTitle !== undefined) config.siteTitle = req.body.siteTitle;
    if (req.body.siteDescription !== undefined) config.siteDescription = req.body.siteDescription;
    
    await config.save();
    res.json(config);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
