import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  GraduationCap, 
  Youtube, 
  PenTool, 
  Video, 
  Code2, 
  Briefcase, 
  Award,
  Star,
  TrendingUp,
  Zap
} from 'lucide-react';

interface JourneyEvent {
  id: string;
  year: string;
  title: string;
  description: string;
  icon: any;
  category: 'education' | 'youtube' | 'creative' | 'dev' | 'milestone';
  skills?: string[];
  highlight?: boolean;
}

const journeyEvents: JourneyEvent[] = [
  {
    id: '1',
    year: '2018',
    title: 'Started College Journey',
    description: 'Began my academic journey while exploring digital content creation',
    icon: GraduationCap,
    category: 'education',
    skills: ['Learning', 'Exploration']
  },
  {
    id: '2',
    year: '2019',
    title: 'YouTube Strategist',
    description: 'Started as a YouTube content strategist, learning audience growth & analytics',
    icon: Youtube,
    category: 'youtube',
    skills: ['SEO', 'Analytics', 'Content Strategy']
  },
  {
    id: '3',
    year: '2020',
    title: 'Scriptwriter & Storyteller',
    description: 'Crafting compelling narratives and scripts for digital content',
    icon: PenTool,
    category: 'creative',
    skills: ['Storytelling', 'Copywriting', 'Creative Writing']
  },
  {
    id: '4',
    year: '2021',
    title: 'Filmmaker & Video Editor',
    description: 'Created visual stories through filmmaking and video production',
    icon: Video,
    category: 'creative',
    skills: ['Video Editing', 'Cinematography', 'Visual Design']
  },
  {
    id: '5',
    year: '2021',
    title: 'First Dev Client 🎯',
    description: 'Landed my first development client while still in college!',
    icon: Code2,
    category: 'dev',
    highlight: true,
    skills: ['React', 'Node.js', 'Client Management']
  },
  {
    id: '6',
    year: '2022',
    title: 'Full Stack Developer',
    description: 'Transitioned to full-time development, building SaaS products',
    icon: Briefcase,
    category: 'dev',
    skills: ['MERN Stack', 'TypeScript', 'AWS']
  },
  {
    id: '7',
    year: '2023',
    title: 'SaaS Builder & Architect',
    description: 'Building scalable SaaS platforms and leading development teams',
    icon: TrendingUp,
    category: 'dev',
    highlight: true,
    skills: ['System Design', 'Team Leadership', 'Product Architecture']
  },
  {
    id: '8',
    year: '2024',
    title: 'Continuous Growth',
    description: '6+ years of combined creative and technical expertise',
    icon: Star,
    category: 'milestone',
    highlight: true,
    skills: ['Full Stack', 'Content Strategy', 'Product Design']
  }
];

const certifications = [
  { name: 'AWS Solutions Architect', issuer: 'Amazon', year: '2023' },
  { name: 'Meta Frontend Developer', issuer: 'Meta', year: '2022' },
  { name: 'Google Cloud Professional', issuer: 'Google', year: '2023' },
  { name: 'MongoDB Certified', issuer: 'MongoDB', year: '2022' }
];

const allSkills = [
  'React', 'Next.js', 'TypeScript', 'Node.js', 'MongoDB', 
  'AWS', 'Docker', 'GraphQL', 'Python', 'PostgreSQL',
  'Content Strategy', 'SEO', 'Video Editing', 'UI/UX Design'
];

// 3D Canvas Background Component
function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    ctx.scale(dpr, dpr);
    
    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
    }> = [];
    
    // Create particles
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.2
      });
    }
    
    let animationId: number;
    const canvasEl = canvas;
    const ctxRef = ctx;
    
    function animate() {
      if (!ctxRef || !canvasEl) return;
      
      ctxRef.clearRect(0, 0, canvasEl.width, canvasEl.height);
      
      particles.forEach((particle, i) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Wrap around
        if (particle.x > canvasEl.width) particle.x = 0;
        if (particle.x < 0) particle.x = canvasEl.width;
        if (particle.y > canvasEl.height) particle.y = 0;
        if (particle.y < 0) particle.y = canvasEl.height;
        
        // Draw particle
        ctxRef.beginPath();
        ctxRef.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctxRef.fillStyle = `rgba(59, 130, 246, ${particle.opacity})`;
        ctxRef.fill();
        
        // Draw connections
        particles.forEach((other, j) => {
          if (i === j) return;
          const dx = particle.x - other.x;
          const dy = particle.y - other.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            ctxRef.beginPath();
            ctxRef.moveTo(particle.x, particle.y);
            ctxRef.lineTo(other.x, other.y);
            ctxRef.strokeStyle = `rgba(59, 130, 246, ${0.1 * (1 - distance / 100)})`;
            ctxRef.stroke();
          }
        });
      });
      
      animationId = requestAnimationFrame(animate);
    }
    
    animate();
    
    const handleResize = () => {
      if (!canvasEl) return;
      canvasEl.width = window.innerWidth;
      canvasEl.height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
}

// Journey Node Component
function JourneyNode({ 
  event, 
  index, 
  isLeft 
}: { 
  event: JourneyEvent; 
  index: number; 
  isLeft: boolean;
}) {
  const Icon = event.icon;
  
  const categoryColors = {
    education: 'from-blue-500 to-blue-600',
    youtube: 'from-red-500 to-red-600',
    creative: 'from-purple-500 to-purple-600',
    dev: 'from-green-500 to-green-600',
    milestone: 'from-amber-500 to-amber-600'
  };
  
  const categoryBgColors = {
    education: 'bg-blue-50 border-blue-200',
    youtube: 'bg-red-50 border-red-200',
    creative: 'bg-purple-50 border-purple-200',
    dev: 'bg-green-50 border-green-200',
    milestone: 'bg-amber-50 border-amber-200'
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`relative flex ${isLeft ? 'flex-row' : 'flex-row-reverse'} items-center gap-8 mb-16`}
    >
      {/* Card */}
      <div className={`flex-1 ${isLeft ? 'text-right' : 'text-left'}`}>
        <motion.div
          whileHover={{ scale: 1.02, y: -5 }}
          className={`inline-block p-6 rounded-2xl bg-white/90 backdrop-blur-sm border-2 ${
            event.highlight ? 'border-amber-400 shadow-xl shadow-amber-100' : 'border-gray-200 shadow-lg'
          } max-w-md`}
        >
          {/* Year Badge */}
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r ${categoryColors[event.category]} text-white text-sm font-bold mb-3`}>
            <Icon className="w-4 h-4" />
            {event.year}
          </div>
          
          {/* Title */}
          <h3 className={`text-xl font-bold mb-2 ${event.highlight ? 'text-amber-600' : 'text-gray-900'}`}>
            {event.title}
          </h3>
          
          {/* Description */}
          <p className="text-gray-600 mb-4 leading-relaxed">
            {event.description}
          </p>
          
          {/* Skills */}
          {event.skills && (
            <div className={`flex flex-wrap gap-2 ${isLeft ? 'justify-end' : 'justify-start'}`}>
              {event.skills.map((skill) => (
                <span
                  key={skill}
                  className={`px-2 py-1 text-xs font-medium rounded-md ${categoryBgColors[event.category]}`}
                >
                  {skill}
                </span>
              ))}
            </div>
          )}
        </motion.div>
      </div>
      
      {/* Center Node */}
      <div className="relative z-10">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 + 0.2, type: 'spring' }}
          className={`w-16 h-16 rounded-full bg-gradient-to-br ${categoryColors[event.category]} flex items-center justify-center shadow-lg`}
        >
          <Icon className="w-8 h-8 text-white" />
          
          {/* Pulse Effect for highlights */}
          {event.highlight && (
            <motion.div
              className="absolute inset-0 rounded-full bg-amber-400"
              animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          )}
        </motion.div>
      </div>
      
      {/* Spacer for alternating layout */}
      <div className="flex-1" />
    </motion.div>
  );
}

export default function LifeJourneyTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  
  return (
    <section 
      id="experience" 
      ref={containerRef}
      className="relative py-24 overflow-hidden"
      style={{
        background: `
          linear-gradient(135deg, #f8fafc 0%, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%, #f8fafc 100%)
        `
      }}
    >
      {/* Animated Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(#1e293b 1px, transparent 1px),
            linear-gradient(90deg, #1e293b 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />
      
      {/* Noise Texture */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
        }}
      />
      
      {/* 3D Particle Background */}
      <ParticleBackground />
      
      {/* Main Container */}
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-6"
          >
            <TrendingUp className="w-4 h-4" />
            My Journey
          </motion.div>
          
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Life in <span className="text-blue-600">Progress</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From college student to content strategist, filmmaker, and full-stack developer. 
            Every step shaped who I am today.
          </p>
        </motion.div>
        
        {/* Timeline Container */}
        <div className="relative max-w-5xl mx-auto">
          {/* Central Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-1 bg-gray-200 rounded-full">
            <motion.div 
              className="w-full bg-gradient-to-b from-blue-500 via-purple-500 to-amber-500 rounded-full"
              style={{ height: lineHeight }}
            />
          </div>
          
          {/* Journey Events */}
          <div className="relative py-8">
            {journeyEvents.map((event, index) => (
              <JourneyNode
                key={event.id}
                event={event}
                index={index}
                isLeft={index % 2 === 0}
              />
            ))}
          </div>
        </div>
        
        {/* Skills & Certifications Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 grid md:grid-cols-2 gap-8"
        >
          {/* Certifications */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center">
                <Award className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Certifications</h3>
            </div>
            <div className="space-y-4">
              {certifications.map((cert, index) => (
                <motion.div
                  key={cert.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-blue-50 transition-colors group"
                >
                  <div>
                    <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {cert.name}
                    </h4>
                    <p className="text-sm text-gray-500">{cert.issuer}</p>
                  </div>
                  <span className="px-3 py-1 bg-white text-gray-600 text-sm font-medium rounded-full border border-gray-200">
                    {cert.year}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Skills Cloud */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                <Zap className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Skills Universe</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {allSkills.map((skill, index) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="px-4 py-2 bg-gradient-to-r from-gray-100 to-gray-50 text-gray-700 font-medium rounded-xl border border-gray-200 hover:border-blue-300 hover:text-blue-600 transition-all cursor-default shadow-sm"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
