import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ExternalLink, Lightbulb } from 'lucide-react';
import ProjectDetail from './ProjectDetail';

interface Project {
  _id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  link: string;
  githubLink?: string;
  whyMade?: string;
  idea?: string;
  images?: string[];
  videoUrl?: string;
}

const staticProjects: Project[] = [
  {
    _id: '1',
    title: 'E-Commerce Platform',
    description: 'Full-stack e-commerce solution with payment integration, admin dashboard, and real-time inventory.',
    category: 'FULL STACK',
    tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    link: 'https://example.com/ecommerce',
    githubLink: 'https://github.com/example/ecommerce',
    idea: 'I noticed small businesses struggling with expensive e-commerce solutions.',
    whyMade: 'Built this to help local businesses sell online without high platform fees.\n\nThe challenge was creating a scalable inventory system that updates in real-time across multiple vendors.',
    images: ['/images/project1-1.jpg', '/images/project1-2.jpg'],
  },
  {
    _id: '2',
    title: 'Task Management SaaS',
    description: 'Collaborative project management tool with real-time updates, team workspaces, and analytics.',
    category: 'SAAS',
    tags: ['Next.js', 'TypeScript', 'Prisma', 'Socket.io'],
    link: 'https://example.com/tasks',
    githubLink: 'https://github.com/example/tasks',
    idea: 'Remote teams need better async collaboration tools.',
    whyMade: 'After working with distributed teams, I realized most tools were either too complex or too simple.\n\nThis balances power with simplicity.',
    images: ['/images/project2-1.jpg'],
  },
  {
    _id: '3',
    title: 'AI Content Generator',
    description: 'AI-powered content creation platform with GPT integration, templates, and export functionality.',
    category: 'AI/ML',
    tags: ['React', 'OpenAI', 'FastAPI', 'PostgreSQL'],
    link: '#',
    githubLink: 'https://github.com/example/ai-content',
    idea: 'Content creators spend hours on repetitive writing tasks.',
    whyMade: 'I wanted to help bloggers and marketers create quality content faster while maintaining their unique voice.\n\nThe AI fine-tunes itself based on user feedback.',
    images: ['/images/project3-1.jpg', '/images/project3-2.jpg', '/images/project3-3.jpg'],
    videoUrl: 'https://www.youtube.com/watch?v=example',
  },
  {
    _id: '4',
    title: 'Portfolio CMS',
    description: 'Dynamic portfolio management system with markdown support and custom themes.',
    category: 'CMS',
    tags: ['Astro', 'React', 'MongoDB', 'Express'],
    link: '#',
    githubLink: 'https://github.com/example/portfolio-cms',
    idea: 'Developers need better ways to showcase their work than static templates.',
    whyMade: 'I built this very portfolio system! It evolved from my frustration with existing solutions.\n\nFeatures include dynamic content management, dark mode, and beautiful animations.',
    images: ['/images/project4-1.jpg'],
  },
];

export default function ProjectsEnhanced() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch(`${import.meta.env.PUBLIC_API_URL || 'http://localhost:5001/api'}/projects`);
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      // Merge API data with static data for demo (in production, API has all fields)
      if (data.length === 0) {
        setProjects(staticProjects);
      } else {
        setProjects(data.map((p: Project, i: number) => ({ ...staticProjects[i], ...p })));
      }
    } catch (err) {
      console.error('API error, using static data:', err);
      setProjects(staticProjects);
    } finally {
      setLoading(false);
    }
  };

  const openProjectDetail = (project: Project) => {
    setSelectedProject(project);
    setIsDetailOpen(true);
  };

  if (loading) {
    return (
      <section id="works" className="py-24">
        <div className="container mx-auto px-6">
          <div className="h-4 bg-gray-200 rounded w-20 mb-16"></div>
          <div className="space-y-0">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="border-t border-gray-200 py-8 animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-1/3 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section id="works" className="py-24">
        <div className="container mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-16"
          >
            works
          </motion.h2>

          <div className="space-y-6">
            {projects.map((project, index) => (
              <motion.div
                key={project._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group border-t border-gray-200 py-8 hover:bg-gray-50 transition-colors -mx-6 px-6 rounded-lg"
              >
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                  {/* Left - Project Info */}
                  <div className="flex-1">
                    <div className="flex items-baseline gap-3 mb-3">
                      <h3 className="text-xl md:text-2xl font-medium group-hover:text-gray-700 transition-colors">
                        {project.title}
                      </h3>
                      <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                        {project.category}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed max-w-2xl mb-4">
                      {project.description}
                    </p>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags?.slice(0, 4).map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right - Action Buttons */}
                  <div className="flex flex-wrap items-center gap-3">
                    {/* Live Button */}
                    {project.link && project.link !== '#' && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-5 py-2.5 bg-black text-white text-sm font-medium rounded-full hover:bg-gray-800 transition-all hover:scale-105 hover:shadow-lg"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Live
                      </a>
                    )}

                    {/* Why I Made This Button */}
                    <button
                      onClick={() => openProjectDetail(project)}
                      className="flex items-center gap-2 px-5 py-2.5 border-2 border-black text-black text-sm font-medium rounded-full hover:bg-black hover:text-white transition-all hover:scale-105"
                    >
                      <Lightbulb className="w-4 h-4" />
                      Why I Made This
                    </button>

                    {/* Arrow */}
                    <button
                      onClick={() => openProjectDetail(project)}
                      className="p-2 text-gray-300 hover:text-black transition-colors"
                    >
                      <ArrowUpRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Detail Modal */}
      <ProjectDetail
        project={selectedProject}
        isOpen={isDetailOpen}
        onClose={() => {
          setIsDetailOpen(false);
          setTimeout(() => setSelectedProject(null), 300);
        }}
      />
    </>
  );
}
