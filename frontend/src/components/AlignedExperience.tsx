import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  Building2, 
  Briefcase, 
  Calendar, 
  MapPin,
  Star,
  Code2,
  ChevronRight,
  FileText
} from 'lucide-react';

// Fallback experiences if API fails
const fallbackExperiences = [
  {
    id: 1,
    company: 'TechCorp Solutions',
    role: 'Senior Full Stack Developer',
    period: '2024 - Present',
    location: 'Mumbai, India',
    description: 'Leading the development of enterprise SaaS applications serving 100K+ users. Architecting scalable microservices and mentoring junior developers.',
    highlights: ['Led team of 5 developers', 'Reduced load time by 60%', 'Implemented CI/CD pipelines'],
    tech: ['React', 'Node.js', 'AWS', 'Docker', 'PostgreSQL'],
    color: '#ccff00'
  },
  {
    id: 2,
    company: 'StartupXYZ',
    role: 'Full Stack Developer',
    period: '2023 - 2024',
    location: 'Remote',
    description: 'Core developer for Series A funded startup. Built real-time collaboration features and payment processing systems.',
    highlights: ['Built from 0 to 10K users', 'Payment integration', 'Real-time features'],
    tech: ['Next.js', 'TypeScript', 'MongoDB', 'Redis', 'Stripe'],
    color: '#8b5cf6'
  },
  {
    id: 3,
    company: 'Freelance & Consulting',
    role: 'Independent Developer',
    period: '2022 - 2023',
    location: 'Remote / Global Clients',
    description: 'Delivered 15+ projects for clients worldwide. From landing pages to full-stack applications and e-commerce solutions.',
    highlights: ['15+ Projects Delivered', '100% Client Satisfaction', 'Global Client Base'],
    tech: ['React', 'Node.js', 'Express', 'MySQL', 'AWS'],
    color: '#3b82f6'
  }
];

const journeyMilestones = [
  {
    year: '2022',
    title: 'Started College',
    subtitle: 'Computer Science',
    description: 'Began my formal education in computer science while exploring creative fields on the side.',
    icon: '🎓',
    category: 'education'
  },
  {
    year: '2022',
    title: 'First Code',
    subtitle: 'Hello World',
    description: 'Wrote my first lines of code and fell in love with programming.',
    icon: '💻',
    category: 'milestone'
  },
  {
    year: '2023',
    title: 'YouTube Strategy',
    subtitle: 'Content Creation',
    description: 'Started as a content strategist, learning SEO and audience growth.',
    icon: '📺',
    category: 'creative'
  },
  {
    year: '2023',
    title: 'Scriptwriting',
    subtitle: 'Storytelling',
    description: 'Crafted scripts and stories for digital creators and brands.',
    icon: '✍️',
    category: 'creative'
  },
  {
    year: '2023',
    title: 'First Dev Client',
    subtitle: 'Freelancing Begins',
    description: 'Landed my first development client - a turning point in my career.',
    icon: '🎯',
    category: 'career'
  },
  {
    year: '2024',
    title: 'Joined TechCorp',
    subtitle: 'Professional Dev',
    description: 'Started my first full-time role as a developer at TechCorp Solutions.',
    icon: '🚀',
    category: 'career'
  },
  {
    year: '2024',
    title: 'Senior Role',
    subtitle: 'Leadership',
    description: 'Promoted to Senior Developer, leading projects and mentoring juniors.',
    icon: '⭐',
    category: 'milestone'
  }
];

export default function AlignedExperience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [experiences, setExperiences] = useState(fallbackExperiences);
  const [journeys, setJourneys] = useState(journeyMilestones);
  const [resumeLink, setResumeLink] = useState('YOUR_DRIVE_LINK_HERE');
  const [isLoading, setIsLoading] = useState(true);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-66%"]);

  // Fetch experiences and journeys from API
  useEffect(() => {
    async function fetchData() {
      try {
        const [expRes, journeyRes] = await Promise.all([
          fetch(`${import.meta.env.PUBLIC_API_URL || 'http://localhost:5001/api'}/experience`),
          fetch(`${import.meta.env.PUBLIC_API_URL || 'http://localhost:5001/api'}/journey`)
        ]);
        
        if (expRes.ok) {
          const data = await expRes.json();
          if (data && data.length > 0) {
            const mappedData = data.map((exp: any, index: number) => ({
              id: exp._id || index + 1,
              company: exp.company,
              role: exp.title,
              period: exp.period,
              location: exp.location || 'Remote',
              description: exp.description,
              highlights: exp.achievements || [],
              tech: exp.tech || [],
              color: exp.color || ['#ccff00', '#8b5cf6', '#3b82f6'][index % 3]
            }));
            setExperiences(mappedData);
          }
        }
        
        if (journeyRes.ok) {
          const data = await journeyRes.json();
          if (data && data.length > 0) {
            setJourneys(data);
          }
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
    
    // Fetch site config for resume link
    async function fetchSiteConfig() {
      try {
        const res = await fetch(`${import.meta.env.PUBLIC_API_URL || 'http://localhost:5001/api'}/siteconfig`);
        if (res.ok) {
          const data = await res.json();
          if (data.resumeDriveLink) {
            setResumeLink(data.resumeDriveLink);
          }
        }
      } catch (error) {
        console.error('Failed to fetch site config:', error);
      }
    }
    fetchSiteConfig();

    // Auto-refresh every 5 seconds when tab is visible
    const interval = setInterval(() => {
      if (!document.hidden) {
        fetchData();
        fetchSiteConfig();
      }
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <>
    <section id="experience" ref={containerRef} className="relative h-[300vh]">
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center bg-[#0a0a0f]">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: `linear-gradient(#ccff00 1px, transparent 1px), linear-gradient(90deg, #ccff00 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }} />
          {/* Gradient orb */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#ccff00]/5 blur-[120px]" />
        </div>
        
        {/* Header */}
        <div className="absolute top-8 left-8 right-8 z-20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm uppercase tracking-widest text-white/50 mb-2">Where I've Worked</p>
              <h2 className="text-4xl md:text-5xl font-bold text-white">
                Professional <span className="text-[#ccff00]">Experience</span>
              </h2>
            </div>
            <div className="flex items-center gap-4">
              {/* See Resume Button */}
              <a 
                href={resumeLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-[#ccff00] text-black rounded-full font-medium hover:bg-[#b3e600] transition-colors text-sm"
              >
                <FileText className="w-4 h-4" />
                See Resume
              </a>
              <div className="flex items-center gap-2 text-white/40">
                <span className="text-sm">Scroll to explore</span>
                <ChevronRight className="w-5 h-5 animate-pulse" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Horizontal Scrolling Cards */}
        <motion.div 
          style={{ x }}
          className="flex items-center gap-8 pl-[10vw] pt-24"
        >
          {/* Intro Card */}
          <div className="flex-shrink-0 w-[350px] h-[400px] flex items-center">
            <div>
              <Building2 className="w-16 h-16 text-[#ccff00]/30 mb-6" />
              <h3 className="text-3xl font-bold text-white mb-4">Experience</h3>
              <p className="text-white/50 leading-relaxed">
                My journey through various roles and companies, building scalable solutions.
              </p>
              <div className="flex items-center gap-4 mt-8">
                <div className="text-center">
                  <span className="block text-3xl font-bold text-[#ccff00]">3+</span>
                  <span className="text-sm text-white/50">Companies</span>
                </div>
                <div className="w-px h-12 bg-white/10" />
                <div className="text-center">
                  <span className="block text-3xl font-bold text-[#ccff00]">15+</span>
                  <span className="text-sm text-white/50">Projects</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Experience Cards */}
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              className="flex-shrink-0 w-[450px] group"
              onViewportEnter={() => setActiveIndex(index)}
              viewport={{ once: false, amount: 0.5 }}
            >
              <div className="relative bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 overflow-hidden h-full hover:border-[#ccff00]/30 transition-all duration-500">
                {/* Background glow */}
                <div 
                  className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2"
                  style={{ background: exp.color }}
                />
                
                {/* Header */}
                <div className="relative z-10 mb-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg"
                      style={{ background: `${exp.color}20`, color: exp.color }}
                    >
                      {exp.company.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{exp.company}</h3>
                      <p className="text-white/50 text-sm flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {exp.location}
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Role & Period */}
                <div className="relative z-10 mb-4">
                  <div 
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium mb-2"
                    style={{ background: `${exp.color}20`, color: exp.color }}
                  >
                    <Briefcase className="w-4 h-4" />
                    {exp.role}
                  </div>
                  <p className="text-white/40 text-sm flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {exp.period}
                  </p>
                </div>
                
                {/* Description */}
                <p className="relative z-10 text-white/60 leading-relaxed mb-4 text-sm">
                  {exp.description}
                </p>
                
                {/* Highlights */}
                <div className="relative z-10 mb-4">
                  <div className="space-y-1">
                    {exp.highlights.map((highlight, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm">
                        <Star className="w-3 h-3 text-[#ccff00]" />
                        <span className="text-white/70">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Tech Stack */}
                <div className="relative z-10">
                  <div className="flex flex-wrap gap-2">
                    {exp.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-xs font-medium rounded-lg border border-white/10 text-white/60"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
          
          {/* End Spacer */}
          <div className="flex-shrink-0 w-[30vw]" />
        </motion.div>
        
        {/* Progress Bar */}
        <div className="absolute bottom-12 left-8 right-8">
          <div className="h-1 bg-white/10 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-[#ccff00] to-[#ccff00]/50"
              style={{ width: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]) }}
            />
          </div>
          <div className="flex justify-between mt-2 text-xs text-white/40">
            {experiences.map((exp, i) => (
              <span key={exp.id} className={activeIndex === i ? 'text-[#ccff00]' : ''}>
                {exp.company}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
    
    {/* JOURNEY SECTION - Separate from sticky experience */}
    <JourneySection journeys={journeys} />
    </>
  );
}

// Journey Section Component
function JourneySection({ journeys }: { journeys: any[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const journeyRef = useRef<HTMLDivElement>(null);
  
  const categoryColors: Record<string, string> = {
    education: '#ccff00',
    creative: '#8b5cf6',
    milestone: '#f59e0b',
    career: '#3b82f6'
  };

  return (
    <div ref={journeyRef} className="relative bg-[#0a0a0f] py-32">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-[500px] h-[500px] rounded-full bg-[#ccff00]/10 blur-3xl" />
        <div className="absolute bottom-20 right-20 w-[400px] h-[400px] rounded-full bg-purple-500/10 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-amber-500/5 blur-3xl" />
      </div>
      
      <div className="container mx-auto px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <p className="text-sm uppercase tracking-widest text-white/50 mb-4">The Journey</p>
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            How I Got <span className="text-[#ccff00]">Here</span>
          </h2>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            From college student to this - every step shaped who I am today.
          </p>
        </motion.div>
        
        {/* Journey Timeline */}
        <div className="max-w-4xl mx-auto">
          <div className="space-y-12">
            {journeys.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onViewportEnter={() => setActiveIndex(index)}
                className={`flex ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} items-center gap-8`}
              >
                {/* Icon Circle */}
                <motion.div
                  className="relative z-10 flex-shrink-0"
                  animate={activeIndex === index ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ duration: 0.5 }}
                >
                  <div 
                    className="w-20 h-20 rounded-full flex items-center justify-center text-3xl shadow-xl border-2"
                    style={{ 
                      background: activeIndex === index ? `${categoryColors[milestone.category]}20` : 'rgba(255,255,255,0.05)',
                      borderColor: activeIndex === index ? categoryColors[milestone.category] : 'rgba(255,255,255,0.1)',
                      boxShadow: activeIndex === index ? `0 0 30px ${categoryColors[milestone.category]}40` : 'none'
                    }}
                  >
                    {milestone.icon}
                  </div>
                  
                  {/* Pulse Effect */}
                  {activeIndex === index && (
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      style={{ background: categoryColors[milestone.category] }}
                      animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                </motion.div>
                
                {/* Content Card */}
                <div 
                  className={`flex-1 p-6 rounded-2xl border transition-all duration-500 ${
                    activeIndex === index 
                      ? 'bg-white/10 border-[#ccff00]/30 shadow-lg shadow-[#ccff00]/10' 
                      : 'bg-white/5 border-white/10'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span 
                      className="text-sm font-bold px-3 py-1 rounded-full"
                      style={{ 
                        background: `${categoryColors[milestone.category]}20`,
                        color: categoryColors[milestone.category]
                      }}
                    >
                      {milestone.year}
                    </span>
                    <span className="text-sm text-white/40 uppercase tracking-wider">{milestone.category}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1">{milestone.title}</h3>
                  <p className="text-sm font-medium mb-2" style={{ color: categoryColors[milestone.category] }}>
                    {milestone.subtitle}
                  </p>
                  <p className="text-white/60 text-sm leading-relaxed">{milestone.description}</p>
                </div>
                
                {/* Spacer for alternating layout */}
                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
          
          {/* Connecting Line - Desktop only */}
          <div className="absolute left-1/2 top-48 bottom-32 w-0.5 bg-gradient-to-b from-[#ccff00] via-purple-500 to-amber-500 hidden lg:block -translate-x-1/2" />
        </div>
        
        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 grid grid-cols-4 gap-8 max-w-4xl mx-auto"
        >
          {[
            { num: '6+', label: 'Years Learning', icon: '⚡' },
            { num: '3', label: 'Career Phases', icon: '💼' },
            { num: '15+', label: 'Projects', icon: '💻' },
            { num: '∞', label: 'Possibilities', icon: '🚀' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center p-6 bg-white/5 rounded-2xl border border-white/10 hover:border-[#ccff00]/30 transition-all"
            >
              <span className="text-2xl mb-2 block">{stat.icon}</span>
              <span className="block text-3xl font-bold text-[#ccff00]">{stat.num}</span>
              <span className="text-sm text-white/50">{stat.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
