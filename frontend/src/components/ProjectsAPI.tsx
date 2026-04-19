import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

interface Project {
  _id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  link: string;
}

export default function ProjectsAPI() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch(`${import.meta.env.PUBLIC_API_URL || 'http://localhost:5001/api'}/projects`);
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      // Fallback to static data if API returns empty
      if (data.length === 0) {
        setProjects(getStaticProjects());
      } else {
        setProjects(data);
      }
    } catch (err) {
      console.error('API error, using static data:', err);
      setProjects(getStaticProjects());
    } finally {
      setLoading(false);
    }
  };

  const getStaticProjects = (): Project[] => [
    {
      _id: '1',
      title: 'E-Commerce Platform',
      description: 'Full-stack e-commerce solution with payment integration, admin dashboard, and real-time inventory.',
      category: 'FULL STACK',
      tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      link: '#',
    },
    {
      _id: '2',
      title: 'Task Management SaaS',
      description: 'Collaborative project management tool with real-time updates, team workspaces, and analytics.',
      category: 'SAAS',
      tags: ['Next.js', 'TypeScript', 'Prisma', 'Socket.io'],
      link: '#',
    },
    {
      _id: '3',
      title: 'AI Content Generator',
      description: 'AI-powered content creation platform with GPT integration, templates, and export functionality.',
      category: 'AI/ML',
      tags: ['React', 'OpenAI', 'FastAPI', 'PostgreSQL'],
      link: '#',
    },
    {
      _id: '4',
      title: 'Portfolio CMS',
      description: 'Dynamic portfolio management system with markdown support and custom themes.',
      category: 'CMS',
      tags: ['Astro', 'React', 'MongoDB', 'Express'],
      link: '#',
    },
  ];

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

        <div className="space-y-0">
          {projects.map((project, index) => (
            <motion.a
              key={project._id}
              href={project.link}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group block border-t border-gray-200 py-8 hover:bg-gray-50 transition-colors -mx-6 px-6"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-baseline gap-3 mb-2">
                    <h3 className="text-xl md:text-2xl font-medium group-hover:text-gray-700 transition-colors">
                      {project.title}
                    </h3>
                    <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                      {project.category}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed max-w-2xl">
                    {project.description}
                  </p>
                </div>
                <ArrowUpRight className="w-5 h-5 text-gray-300 group-hover:text-black transition-colors flex-shrink-0 mt-1" />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
