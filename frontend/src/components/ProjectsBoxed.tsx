import { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { ExternalLink, Lightbulb, Github, Sparkles, ArrowUpRight } from 'lucide-react';
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
    description: 'Full-stack e-commerce solution with payment integration, admin dashboard, and real-time inventory management.',
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

export default function ProjectsBoxed() {
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
      if (data.length === 0) {
        setProjects(staticProjects);
      } else {
        setProjects(data.map((p: Project, i: number) => ({ ...staticProjects[i], ...p })));
      }
    } catch (err) {
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
      <section id="works" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="h-4 bg-gray-200 rounded w-20 mb-16"></div>
          <div className="grid md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-gray-50 rounded-2xl p-8 h-64 animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section id="works" className="py-24 relative overflow-hidden theme-bg">
        {/* Subtle Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute -top-20 -right-20 w-96 h-96 bg-[var(--accent)]/5 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: "spring" }}
            className="mb-16 text-center"
          >
            <motion.span 
              className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent)] uppercase tracking-wider mb-4 px-4 py-2 bg-[var(--accent)]/10 rounded-full border border-[var(--accent)]/20"
              whileHover={{ scale: 1.05 }}
            >
              <Sparkles className="w-4 h-4" />
              Selected Works
              <Sparkles className="w-4 h-4" />
            </motion.span>
            <motion.h2 
              className="text-4xl md:text-6xl font-bold theme-text"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Featured Projects
            </motion.h2>
            <motion.p
              className="mt-4 theme-text-secondary max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              A collection of my best work, from full-stack applications to AI-powered tools.
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <ProjectCard 
                key={project._id} 
                project={project} 
                index={index}
                onOpenDetail={() => openProjectDetail(project)}
              />
            ))}
          </div>
        </div>
      </section>

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

// Animated Project Card Component with 3D Tilt
function ProjectCard({ project, index, onOpenDetail }: { 
  project: Project; 
  index: number; 
  onOpenDetail: () => void;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);
  
  const springRotateX = useSpring(rotateX, { stiffness: 300, damping: 30 });
  const springRotateY = useSpring(rotateY, { stiffness: 300, damping: 30 });

  function onMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(event.clientX - centerX);
    y.set(event.clientY - centerY);
  }

  function onMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateX: -15 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        delay: index * 0.15, 
        duration: 0.8, 
        type: "spring",
        stiffness: 100
      }}
      style={{
        rotateX: springRotateX,
        rotateY: springRotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      whileHover={{ 
        scale: 1.02,
        z: 50,
        transition: { duration: 0.3 }
      }}
      className="group relative theme-bg-card rounded-3xl p-8 border theme-border hover:border-[var(--accent)]/30 shadow-lg hover:shadow-2xl hover:shadow-[var(--accent)]/10 transition-all cursor-pointer"
    >
      {/* Glow Effect on Hover */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[var(--accent)]/0 via-[var(--accent)]/0 to-[var(--accent)]/0 group-hover:from-[var(--accent)]/10 group-hover:via-[var(--accent)]/5 group-hover:to-[var(--accent)]/10 transition-all duration-500" />
      
      {/* Animated Border Gradient */}
      <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[var(--accent)] via-[var(--accent)]/50 to-[var(--accent)] p-[1px]">
          <div className="w-full h-full theme-bg rounded-3xl" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10" style={{ transform: "translateZ(20px)" }}>
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <motion.span 
              className="inline-block text-xs font-bold text-[var(--accent)] uppercase tracking-wider px-3 py-1 bg-[var(--accent)]/10 rounded-full mb-3 border border-[var(--accent)]/20"
              whileHover={{ scale: 1.1, backgroundColor: "var(--accent-glow)" }}
            >
              {project.category}
            </motion.span>
            <motion.h3 
              className="text-xl md:text-2xl font-bold theme-text group-hover:text-[var(--accent)] transition-colors duration-300"
              whileHover={{ x: 5 }}
            >
              {project.title}
            </motion.h3>
          </div>
          {project.githubLink && (
            <motion.a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 theme-bg-card theme-text-secondary rounded-full hover:bg-[var(--accent)] hover:text-[var(--bg-primary)] transition-all duration-300"
              onClick={(e) => e.stopPropagation()}
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <Github className="w-5 h-5" />
            </motion.a>
          )}
        </div>

        {/* Description with fade animation */}
        <motion.p 
          className="theme-text-secondary mb-6 leading-relaxed"
          initial={{ opacity: 0.8 }}
          whileHover={{ opacity: 1 }}
        >
          {project.description}
        </motion.p>

        {/* Animated Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags?.slice(0, 4).map((tag, tagIndex) => (
            <motion.span
              key={tag}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: tagIndex * 0.1 }}
              whileHover={{ 
                scale: 1.1, 
                backgroundColor: "var(--accent-glow)",
                color: "var(--accent)"
              }}
              className="px-3 py-1.5 text-xs font-semibold theme-bg-card theme-text-muted rounded-full cursor-default border theme-border"
            >
              {tag}
            </motion.span>
          ))}
        </div>

        {/* Action Buttons with Enhanced Animations */}
        <div className="flex flex-wrap gap-3" style={{ transform: "translateZ(30px)" }}>
          {project.link && project.link !== '#' && (
            <motion.a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-[var(--accent)] text-[var(--bg-primary)] text-sm font-semibold rounded-full overflow-hidden relative group/btn"
              onClick={(e) => e.stopPropagation()}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">View Project</span>
              <ExternalLink className="w-4 h-4 relative z-10" />
            </motion.a>
          )}

          <motion.button
            onClick={onOpenDetail}
            className="flex items-center gap-2 px-6 py-3 border-2 border-[var(--border)] theme-text-muted text-sm font-semibold rounded-full hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all duration-300 group/btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Lightbulb className="w-4 h-4 group-hover/btn:text-[var(--accent)] transition-colors" />
            <span>Why I Made This</span>
            <ArrowUpRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover/btn:opacity-100 group-hover/btn:translate-x-0 transition-all" />
          </motion.button>
        </div>
      </div>

      {/* Floating Index Number */}
      <motion.div
        className="absolute -top-4 -right-4 w-12 h-12 bg-[var(--accent)] rounded-full flex items-center justify-center text-[var(--bg-primary)] font-bold text-lg shadow-lg"
        initial={{ scale: 0, rotate: -180 }}
        whileInView={{ scale: 1, rotate: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.15 + 0.3, type: "spring" }}
        whileHover={{ scale: 1.2, rotate: 10 }}
      >
        0{index + 1}
      </motion.div>
    </motion.div>
  );
}
