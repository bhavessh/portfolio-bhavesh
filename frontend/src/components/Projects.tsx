import { motion } from 'framer-motion';
import { ArrowUpRight, ExternalLink } from 'lucide-react';

const projects = [
  {
    title: 'E-Commerce Platform',
    description: 'Full-stack e-commerce solution with payment integration, admin dashboard, and real-time inventory.',
    tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    link: '#',
    category: 'FULL STACK',
  },
  {
    title: 'Task Management SaaS',
    description: 'Collaborative project management tool with real-time updates, team workspaces, and analytics.',
    tags: ['Next.js', 'TypeScript', 'Prisma', 'Socket.io'],
    link: '#',
    category: 'SAAS',
  },
  {
    title: 'AI Content Generator',
    description: 'AI-powered content creation platform with GPT integration, templates, and export functionality.',
    tags: ['React', 'OpenAI', 'FastAPI', 'PostgreSQL'],
    link: '#',
    category: 'AI/ML',
  },
  {
    title: 'Portfolio CMS',
    description: 'Dynamic portfolio management system with markdown support and custom themes.',
    tags: ['Astro', 'React', 'MongoDB', 'Express'],
    link: '#',
    category: 'CMS',
  },
];

export default function Projects() {
  return (
    <section id="works" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold mb-16"
        >
          Works
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.a
              key={project.title}
              href={project.link}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              className="group block bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <span className="text-xs font-medium text-gray-400 tracking-wider">
                  {project.category}
                </span>
                <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-black transition-colors" />
              </div>

              <h3 className="text-2xl font-semibold mb-3 group-hover:text-gray-700 transition-colors">
                {project.title}
              </h3>

              <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
