import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { 
  Building2, 
  Briefcase, 
  Calendar, 
  MapPin, 
  ChevronRight,
  ArrowRight,
  Star,
  Code2,
  Zap
} from 'lucide-react';

// ========== PART 1: COMPANIES SECTION ==========
const companies = [
  {
    id: 1,
    name: 'TechCorp Solutions',
    role: 'Senior Full Stack Developer',
    period: '2024 - Present',
    location: 'Mumbai, India',
    description: 'Leading the development of enterprise SaaS applications serving 100K+ users. Architecting scalable microservices and mentoring junior developers.',
    highlights: ['Led team of 5 developers', 'Reduced load time by 60%', 'Implemented CI/CD pipelines'],
    tech: ['React', 'Node.js', 'AWS', 'Docker', 'PostgreSQL'],
    color: '#3b82f6',
    logo: 'TC'
  },
  {
    id: 2,
    name: 'StartupXYZ',
    role: 'Full Stack Developer',
    period: '2023 - 2024',
    location: 'Remote',
    description: 'Core developer for Series A funded startup. Built real-time collaboration features and payment processing systems.',
    highlights: ['Built from 0 to 10K users', 'Payment integration', 'Real-time features'],
    tech: ['Next.js', 'TypeScript', 'MongoDB', 'Redis', 'Stripe'],
    color: '#8b5cf6',
    logo: 'SX'
  },
  {
    id: 3,
    name: 'Freelance & Consulting',
    role: 'Independent Developer',
    period: '2022 - 2023',
    location: 'Remote / Global Clients',
    description: 'Delivered 15+ projects for clients worldwide. From landing pages to full-stack applications and e-commerce solutions.',
    highlights: ['15+ Projects Delivered', '100% Client Satisfaction', 'Global Client Base'],
    tech: ['React', 'Node.js', 'Express', 'MySQL', 'AWS'],
    color: '#10b981',
    logo: 'FL'
  }
];

// ========== PART 2: JOURNEY TIMELINE ==========
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
    category: 'milestone'
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

// Company Card Component
function CompanyCard({ company, index }: { company: typeof companies[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: index * 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="flex-shrink-0 w-[500px] group"
    >
      <div className="relative bg-white rounded-3xl p-8 shadow-xl border border-gray-100 overflow-hidden h-full">
        {/* Background Gradient */}
        <div 
          className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2"
          style={{ background: company.color }}
        />
        
        {/* Header */}
        <div className="relative z-10 flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <div 
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg"
              style={{ background: company.color }}
            >
              {company.logo}
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">{company.name}</h3>
              <p className="text-gray-500 flex items-center gap-1 mt-1">
                <MapPin className="w-4 h-4" />
                {company.location}
              </p>
            </div>
          </div>
        </div>
        
        {/* Role & Period */}
        <div className="relative z-10 mb-6">
          <div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-white text-sm font-medium mb-3"
            style={{ background: company.color }}
          >
            <Briefcase className="w-4 h-4" />
            {company.role}
          </div>
          <p className="text-gray-500 flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            {company.period}
          </p>
        </div>
        
        {/* Description */}
        <p className="relative z-10 text-gray-600 leading-relaxed mb-6">
          {company.description}
        </p>
        
        {/* Highlights */}
        <div className="relative z-10 mb-6">
          <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Key Achievements</h4>
          <div className="space-y-2">
            {company.highlights.map((highlight, i) => (
              <div key={i} className="flex items-center gap-2">
                <Star className="w-4 h-4 text-amber-500" />
                <span className="text-gray-700">{highlight}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Tech Stack */}
        <div className="relative z-10">
          <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Tech Stack</h4>
          <div className="flex flex-wrap gap-2">
            {company.tech.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 text-sm font-medium rounded-lg border"
                style={{ 
                  borderColor: `${company.color}30`,
                  color: company.color,
                  background: `${company.color}10`
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
        
        {/* Hover Effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
        />
      </div>
    </motion.div>
  );
}

// Journey Node Component
function JourneyNode({ 
  milestone, 
  index, 
  isActive 
}: { 
  milestone: typeof journeyMilestones[0]; 
  index: number;
  isActive: boolean;
}) {
  const categoryColors: Record<string, string> = {
    education: '#3b82f6',
    creative: '#8b5cf6',
    milestone: '#f59e0b',
    career: '#10b981'
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`relative flex items-center gap-8 transition-all duration-500 ${isActive ? 'scale-105' : 'opacity-60'}`}
    >
      {/* Icon Circle */}
      <motion.div
        animate={isActive ? { scale: [1, 1.2, 1] } : {}}
        transition={{ duration: 0.5 }}
        className="relative z-10 flex-shrink-0"
      >
        <div 
          className="w-20 h-20 rounded-full flex items-center justify-center text-3xl shadow-xl"
          style={{ 
            background: isActive ? categoryColors[milestone.category] : '#e5e7eb',
            boxShadow: isActive ? `0 0 30px ${categoryColors[milestone.category]}50` : 'none'
          }}
        >
          {milestone.icon}
        </div>
        
        {/* Pulse Effect */}
        {isActive && (
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ background: categoryColors[milestone.category] }}
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
      </motion.div>
      
      {/* Content */}
      <div className={`flex-1 p-6 rounded-2xl transition-all duration-500 ${isActive ? 'bg-white shadow-xl' : 'bg-gray-50'}`}>
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
          <span className="text-sm text-gray-400 uppercase tracking-wider">{milestone.category}</span>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-1">{milestone.title}</h3>
        <p className="text-sm font-medium mb-2" style={{ color: categoryColors[milestone.category] }}>
          {milestone.subtitle}
        </p>
        <p className="text-gray-600 text-sm leading-relaxed">{milestone.description}</p>
      </div>
    </motion.div>
  );
}

export default function AppleStyleExperience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const journeyRef = useRef<HTMLDivElement>(null);
  const [activeJourneyIndex, setActiveJourneyIndex] = useState(0);
  
  // Companies horizontal scroll
  const { scrollYProgress: companiesProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const companiesX = useTransform(companiesProgress, [0, 0.5], ["0%", "-30%"]);
  const companiesOpacity = useTransform(companiesProgress, [0.3, 0.5], [1, 0]);
  
  // Journey vertical reveal
  const { scrollYProgress: journeyProgress } = useScroll({
    target: journeyRef,
    offset: ["start end", "end start"]
  });
  
  const journeyY = useTransform(journeyProgress, [0, 1], [100, -100]);
  
  // Update active journey index based on scroll
  useEffect(() => {
    const unsubscribe = journeyProgress.on('change', (value) => {
      const index = Math.floor(value * journeyMilestones.length);
      setActiveJourneyIndex(Math.min(index, journeyMilestones.length - 1));
    });
    return () => unsubscribe();
  }, [journeyProgress]);

  return (
    <section id="experience" className="relative">
      {/* ========== PART 1: COMPANIES ========== */}
      <div ref={containerRef} className="h-[200vh] relative">
        <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white">
            <div className="absolute inset-0 opacity-[0.03]" style={{
              backgroundImage: `linear-gradient(#1e293b 1px, transparent 1px), linear-gradient(90deg, #1e293b 1px, transparent 1px)`,
              backgroundSize: '60px 60px'
            }} />
          </div>
          
          {/* Header */}
          <motion.div 
            style={{ opacity: companiesOpacity }}
            className="absolute top-12 left-8 right-8 z-20"
          >
            <div className="flex items-center justify-between">
              <div>
                <motion.p
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  className="text-sm uppercase tracking-widest text-gray-500 mb-2"
                >
                  Where I've Worked
                </motion.p>
                <h2 className="text-5xl md:text-6xl font-bold text-gray-900">
                  Professional <span className="text-blue-600">Experience</span>
                </h2>
              </div>
              
              <div className="flex items-center gap-2 text-gray-400">
                <span className="text-sm">Scroll to explore</span>
                <ChevronRight className="w-5 h-5 animate-pulse" />
              </div>
            </div>
          </motion.div>
          
          {/* Horizontal Scrolling Companies */}
          <motion.div 
            style={{ x: companiesX }}
            className="flex items-center gap-8 pl-[10vw] pt-24"
          >
            {/* Intro Card */}
            <div className="flex-shrink-0 w-[400px] h-[400px] flex items-center">
              <div>
                <Building2 className="w-16 h-16 text-gray-300 mb-6" />
                <h3 className="text-3xl font-bold text-gray-900 mb-4">Companies</h3>
                <p className="text-gray-500 leading-relaxed">
                  I've had the privilege of working with amazing companies and clients throughout my career journey.
                </p>
                <div className="flex items-center gap-4 mt-8">
                  <div className="text-center">
                    <span className="block text-3xl font-bold text-gray-900">3+</span>
                    <span className="text-sm text-gray-500">Companies</span>
                  </div>
                  <div className="w-px h-12 bg-gray-200" />
                  <div className="text-center">
                    <span className="block text-3xl font-bold text-gray-900">15+</span>
                    <span className="text-sm text-gray-500">Projects</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Company Cards */}
            {companies.map((company, index) => (
              <CompanyCard key={company.id} company={company} index={index} />
            ))}
            
            {/* End Spacer */}
            <div className="flex-shrink-0 w-[30vw]" />
          </motion.div>
          
          {/* Progress Bar */}
          <div className="absolute bottom-12 left-8 right-8">
            <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-blue-500 to-purple-600"
                style={{ width: useTransform(companiesProgress, [0, 0.5], ["0%", "100%"]) }}
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Transition */}
      <div className="h-32 bg-gradient-to-b from-white to-gray-50" />
      
      {/* ========== PART 2: JOURNEY MAP ========== */}
      <div ref={journeyRef} className="relative bg-gray-50 py-32">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-[500px] h-[500px] rounded-full bg-blue-200/20 blur-3xl" />
          <div className="absolute bottom-20 right-20 w-[400px] h-[400px] rounded-full bg-purple-200/20 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-amber-200/10 blur-3xl" />
        </div>
        
        <div className="container mx-auto px-8 relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <p className="text-sm uppercase tracking-widest text-gray-500 mb-4">The Journey</p>
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              How I Got <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Here</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From college student to senior developer - every step shaped who I am today.
            </p>
          </motion.div>
          
          {/* Journey Timeline */}
          <div className="max-w-4xl mx-auto">
            {/* Connecting Line */}
            <div className="absolute left-[calc(50%-2px)] top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-amber-500 hidden md:block" />
            
            <motion.div style={{ y: journeyY }} className="space-y-12 relative">
              {journeyMilestones.map((milestone, index) => (
                <div 
                  key={index}
                  className={`flex ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} items-center gap-8`}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                    <JourneyNode 
                      milestone={milestone} 
                      index={index} 
                      isActive={index === activeJourneyIndex}
                    />
                  </div>
                  <div className="w-4" /> {/* Spacer for line */}
                  <div className="flex-1" />
                </div>
              ))}
            </motion.div>
          </div>
          
          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-24 grid grid-cols-4 gap-8 max-w-4xl mx-auto"
          >
            {[
              { num: '6+', label: 'Years Learning', icon: Zap },
              { num: '3', label: 'Career Phases', icon: Briefcase },
              { num: '15+', label: 'Projects', icon: Code2 },
              { num: '∞', label: 'Possibilities', icon: Star }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 bg-white rounded-2xl shadow-lg"
              >
                <stat.icon className="w-8 h-8 mx-auto mb-3 text-blue-600" />
                <span className="block text-3xl font-bold text-gray-900">{stat.num}</span>
                <span className="text-sm text-gray-500">{stat.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
