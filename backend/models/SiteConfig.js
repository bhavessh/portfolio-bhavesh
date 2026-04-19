const mongoose = require('mongoose');

const socialLinkSchema = new mongoose.Schema({
  name: { type: String, required: true },
  url: { type: String, required: true },
  icon: { type: String, default: 'link' },
  order: { type: Number, default: 0 }
});

const siteConfigSchema = new mongoose.Schema({
  // Social Links
  socialLinks: [socialLinkSchema],
  
  // Resume
  resumeUrl: { type: String, default: '' },
  resumeDriveLink: { type: String, default: '' },
  
  // Contact Info
  contactEmail: { type: String, default: 'hello@example.com' },
  contactPhone: { type: String, default: '' },
  contactLocation: { type: String, default: 'Remote / Global' },
  
  // Meta
  siteTitle: { type: String, default: 'Portfolio' },
  siteDescription: { type: String, default: 'Full Stack Developer Portfolio' },

  // Stats (editable via admin)
  statsYears: { type: String, default: '6+' },
  statsYearsLabel: { type: String, default: 'Years' },
  statsProjects: { type: String, default: '15+' },
  statsProjectsLabel: { type: String, default: 'Projects' },
  statsSaas: { type: String, default: '5+' },
  statsSaasLabel: { type: String, default: 'SaaS' },
  statsClients: { type: String, default: '10+' },
  statsClientsLabel: { type: String, default: 'Clients' }
}, {
  timestamps: true
});

module.exports = mongoose.model('SiteConfig', siteConfigSchema);
