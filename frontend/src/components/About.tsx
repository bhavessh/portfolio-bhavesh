import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Code, Database, Layout, Server, Sparkles, Zap } from 'lucide-react';

// Fallback skills if API fails
const fallbackSkills = [
  { 
    category: 'Frontend', 
    icon: Layout, 
    items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Astro'],
    color: '#3b82f6', // Blue
    bgColor: 'rgba(59, 130, 246, 0.1)',
    borderColor: 'rgba(59, 130, 246, 0.2)'
  },
  { 
    category: 'Backend', 
    icon: Server, 
    items: ['Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'GraphQL'],
    color: '#10b981', // Green
    bgColor: 'rgba(16, 185, 129, 0.1)',
    borderColor: 'rgba(16, 185, 129, 0.2)'
  },
  { 
    category: 'Tools', 
    icon: Code, 
    items: ['Git', 'Docker', 'AWS', 'Vercel', 'Figma'],
    color: '#f59e0b', // Orange/Amber
    bgColor: 'rgba(245, 158, 11, 0.1)',
    borderColor: 'rgba(245, 158, 11, 0.2)'
  },
];

const highlights = [
  { icon: Zap, label: 'Performance First', description: 'Optimizing for speed and efficiency' },
  { icon: Sparkles, label: 'Clean Code', description: 'Maintainable and well-documented' },
  { icon: Database, label: 'Data Driven', description: 'Making informed decisions' },
];

// Default about data
const defaultAbout = {
  name: 'Full Stack Developer',
  tagline: 'Building Modern Web Experiences',
  description: "I'm a passionate full-stack developer with expertise in building modern web applications. My journey started with curiosity about how things work on the internet, which led me to master both frontend and backend technologies.",
  journeyTitle: 'My Journey',
  journeyText: "I'm a passionate full-stack developer with expertise in building modern web applications. My journey started with curiosity about how things work on the internet, which led me to master both frontend and backend technologies.",
  approachTitle: 'My Approach',
  approachText: "I specialize in the MERN stack combined with modern tools like Astro for optimal performance. I believe in writing clean, maintainable code that scales with your business needs.",
  beyondTitle: 'Beyond Coding',
  beyondText: "When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects, or sharing knowledge with the developer community.",
  email: 'hello@example.com',
  location: 'Remote / Global',
  availability: 'Open to opportunities'
};

export default function About() {
  const [about, setAbout] = useState(defaultAbout);
  const [skills, setSkills] = useState(fallbackSkills);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch about data and skills from API
  useEffect(() => {
    async function fetchData() {
      try {
        const [aboutRes, skillsRes] = await Promise.all([
          fetch(`${import.meta.env.PUBLIC_API_URL || 'http://localhost:5001/api'}/about`),
          fetch(`${import.meta.env.PUBLIC_API_URL || 'http://localhost:5001/api'}/skills`)
        ]);
        
        if (aboutRes.ok) {
          const aboutData = await aboutRes.json();
          if (aboutData) {
            setAbout({ ...defaultAbout, ...aboutData });
          }
        }
        
        if (skillsRes.ok) {
          const skillsData = await skillsRes.json();
          if (skillsData && skillsData.length > 0) {
            // Group skills by category
            const groupedSkills: Record<string, string[]> = {};
            skillsData.forEach((skill: any) => {
              const category = skill.category.charAt(0).toUpperCase() + skill.category.slice(1);
              if (!groupedSkills[category]) {
                groupedSkills[category] = [];
              }
              groupedSkills[category].push(skill.name);
            });
            
            const iconMap: Record<string, any> = { Frontend: Layout, Backend: Server, Database: Database, Tools: Code, Devops: Server };
            const colorMap: Record<string, string> = { 
              Frontend: '#3b82f6', Backend: '#10b981', Database: '#8b5cf6', Tools: '#f59e0b', Devops: '#ef4444'
            };
            
            const mappedSkills = Object.entries(groupedSkills).map(([category, items]) => ({
              category,
              icon: iconMap[category] || Code,
              items,
              color: colorMap[category] || '#3b82f6',
              bgColor: `${colorMap[category]}1a` || 'rgba(59, 130, 246, 0.1)',
              borderColor: `${colorMap[category]}33` || 'rgba(59, 130, 246, 0.2)'
            }));
            
            if (mappedSkills.length > 0) {
              setSkills(mappedSkills);
            }
          }
        }
      } catch (error) {
        console.error('Failed to fetch about data:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
    
    // Auto-refresh every 5 seconds when tab is visible
    const interval = setInterval(() => {
      if (!document.hidden) {
        fetchData();
      }
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  return (
    <section id="about" className="py-20 theme-bg-secondary relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[var(--accent)]/5 blur-[100px] pointer-events-none" />
      
      {/* Section Header */}
      <div className="container mx-auto px-6 mb-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="text-[var(--accent)] text-sm font-semibold tracking-wider uppercase mb-2 block">
            More About Me
          </span>
          <h2 className="text-4xl md:text-5xl font-bold theme-text">
            {about.tagline}
          </h2>
        </motion.div>
      </div>

      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left Column - Bio */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="theme-bg-card rounded-2xl p-6 border theme-border backdrop-blur-sm"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-[var(--accent)]/10 flex items-center justify-center flex-shrink-0">
                  <Zap className="w-5 h-5 text-[var(--accent)]" />
                </div>
                <div>
                  <h3 className="font-semibold theme-text mb-2">{about.journeyTitle}</h3>
                  <p className="theme-text-secondary leading-relaxed">
                    {about.journeyText}
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="theme-bg-card rounded-2xl p-6 border theme-border backdrop-blur-sm"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-[var(--accent)]/10 flex items-center justify-center flex-shrink-0">
                  <Code className="w-5 h-5 text-[var(--accent)]" />
                </div>
                <div>
                  <h3 className="font-semibold theme-text mb-2">{about.approachTitle}</h3>
                  <p className="theme-text-secondary leading-relaxed">
                    {about.approachText}
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="theme-bg-card rounded-2xl p-6 border theme-border backdrop-blur-sm"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-[var(--accent)]/10 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-5 h-5 text-[var(--accent)]" />
                </div>
                <div>
                  <h3 className="font-semibold theme-text mb-2">{about.beyondTitle}</h3>
                  <p className="theme-text-secondary leading-relaxed">
                    {about.beyondText}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Highlights Row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-3 gap-4"
            >
              {highlights.map((item) => (
                <div key={item.label} className="theme-bg-card rounded-xl p-4 border theme-border text-center backdrop-blur-sm">
                  <item.icon className="w-6 h-6 mx-auto mb-2 text-[var(--accent)]" />
                  <p className="text-sm font-semibold theme-text">{item.label}</p>
                  <p className="text-xs theme-text-muted mt-1">{item.description}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Column - Skills */}
          <div className="space-y-6">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl font-bold theme-text mb-6"
            >
              Skills & Technologies
            </motion.h3>

            {skills.map((skillGroup: any, index: number) => (
              <motion.div
                key={skillGroup.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="rounded-2xl p-6 border backdrop-blur-sm transition-all duration-300 hover:scale-[1.02]"
                style={{
                  backgroundColor: skillGroup.bgColor,
                  borderColor: skillGroup.borderColor
                }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div 
                    className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300"
                    style={{ 
                      backgroundColor: skillGroup.color + '20',
                      boxShadow: `0 0 15px ${skillGroup.color}30`
                    }}
                  >
                    <skillGroup.icon 
                      className="w-5 h-5 transition-colors duration-300" 
                      style={{ color: skillGroup.color }}
                    />
                  </div>
                  <h4 className="font-semibold theme-text">{skillGroup.category}</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((skill: string) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 text-sm rounded-md transition-all duration-300 cursor-default hover:scale-105"
                      style={{
                        backgroundColor: skillGroup.color + '15',
                        color: skillGroup.color,
                        border: `1px solid ${skillGroup.color}30`
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
