const mongoose = require('mongoose');
const Project = require('./models/Project');
const Experience = require('./models/Experience');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio';

const seedData = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Project.deleteMany({});
    await Experience.deleteMany({});
    console.log('Cleared existing data');

    // Seed Projects
    const projects = [
      {
        title: 'E-Commerce Platform',
        description: 'Full-stack e-commerce solution with payment integration, admin dashboard, and real-time inventory management.',
        category: 'FULL STACK',
        tags: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Redis'],
        link: 'https://example.com/ecommerce',
        githubLink: 'https://github.com/example/ecommerce',
        featured: true,
        order: 1,
      },
      {
        title: 'Task Management SaaS',
        description: 'Collaborative project management tool with real-time updates, team workspaces, and analytics dashboard.',
        category: 'SAAS',
        tags: ['Next.js', 'TypeScript', 'Prisma', 'Socket.io', 'PostgreSQL'],
        link: 'https://example.com/tasks',
        githubLink: 'https://github.com/example/tasks',
        featured: true,
        order: 2,
      },
      {
        title: 'AI Content Generator',
        description: 'AI-powered content creation platform with GPT integration, templates, and export functionality.',
        category: 'AI/ML',
        tags: ['React', 'OpenAI', 'FastAPI', 'Python', 'PostgreSQL'],
        link: 'https://example.com/ai-content',
        githubLink: 'https://github.com/example/ai-content',
        featured: false,
        order: 3,
      },
      {
        title: 'Portfolio CMS',
        description: 'Dynamic portfolio management system with markdown support and custom themes.',
        category: 'CMS',
        tags: ['Astro', 'React', 'MongoDB', 'Express', 'Tailwind'],
        link: 'https://example.com/cms',
        githubLink: 'https://github.com/example/portfolio-cms',
        featured: true,
        order: 4,
      },
    ];

    await Project.insertMany(projects);
    console.log('✓ Projects seeded');

    // Seed Experience
    const experiences = [
      {
        title: 'Senior Full Stack Developer',
        company: 'TechCorp Solutions',
        location: 'San Francisco, CA',
        period: '2023 - Present',
        description: 'Leading development of enterprise SaaS applications. Architecting scalable systems and mentoring junior developers.',
        achievements: ['Reduced API response time by 40%', 'Led team of 5 developers', 'Implemented CI/CD pipeline', 'Migrated legacy system to microservices'],
        current: true,
        order: 1,
      },
      {
        title: 'Full Stack Developer',
        company: 'StartupXYZ',
        location: 'New York, NY',
        period: '2021 - 2023',
        description: 'Built core product features from scratch. Worked across the entire stack from database design to frontend implementation.',
        achievements: ['Shipped MVP in 3 months', 'Grew user base to 10K+', 'Implemented real-time features', 'Raised Series A funding'],
        current: false,
        order: 2,
      },
      {
        title: 'Frontend Developer',
        company: 'Digital Agency Pro',
        location: 'Los Angeles, CA',
        period: '2020 - 2021',
        description: 'Developed responsive web applications for various clients. Specialized in React and modern CSS frameworks.',
        achievements: ['Delivered 15+ client projects', '99% client satisfaction', 'Introduced component library', 'Improved performance by 60%'],
        current: false,
        order: 3,
      },
    ];

    await Experience.insertMany(experiences);
    console.log('✓ Experience seeded');

    console.log('\n✅ Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed error:', error);
    process.exit(1);
  }
};

seedData();
