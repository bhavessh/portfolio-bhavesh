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
  Zap,
  ChevronRight,
  Sparkles,
  Rocket,
  Target
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
  color: string;
}

const journeyEvents: JourneyEvent[] = [
  {
    id: '1',
    year: '2018',
    title: 'College Journey Begins',
    description: 'Started my academic journey while exploring digital content creation and creative fields',
    icon: GraduationCap,
    category: 'education',
    color: 'from-blue-500 to-cyan-500',
    skills: ['Learning', 'Exploration', 'Creativity']
  },
  {
    id: '2',
    year: '2019',
    title: 'YouTube Content Strategist',
    description: 'Started as a YouTube strategist, mastering audience growth, SEO, and content analytics',
    icon: Youtube,
    category: 'youtube',
    color: 'from-red-500 to-pink-500',
    skills: ['SEO', 'Analytics', 'Content Strategy', 'Growth Hacking']
  },
  {
    id: '3',
    year: '2020',
    title: 'Scriptwriter & Storyteller',
    description: 'Crafting compelling narratives and scripts for digital content creators and brands',
    icon: PenTool,
    category: 'creative',
    color: 'from-purple-500 to-violet-500',
    skills: ['Storytelling', 'Copywriting', 'Creative Writing', 'Scripting']
  },
  {
    id: '4',
    year: '2021',
    title: 'Filmmaker & Video Editor',
    description: 'Created visual stories through filmmaking, cinematography, and professional video production',
    icon: Video,
    category: 'creative',
    color: 'from-amber-500 to-orange-500',
    skills: ['Video Editing', 'Cinematography', 'Visual Design', 'Premiere Pro']
  },
  {
    id: '5',
    year: '2021',
    title: '🎯 First Dev Client!',
    description: 'Landed my first development client while still in college - The turning point!',
    icon: Code2,
    category: 'dev',
    highlight: true,
    color: 'from-emerald-500 to-teal-500',
    skills: ['React', 'Node.js', 'Client Management', 'Freelancing']
  },
  {
    id: '6',
    year: '2022',
    title: 'Full Stack Developer',
    description: 'Transitioned to full-time development, building scalable SaaS products and web apps',
    icon: Briefcase,
    category: 'dev',
    color: 'from-green-500 to-emerald-500',
    skills: ['MERN Stack', 'TypeScript', 'AWS', 'System Design']
  },
  {
    id: '7',
    year: '2023',
    title: 'SaaS Architect & Builder',
    description: 'Building scalable SaaS platforms, leading dev teams, architecting products',
    icon: Rocket,
    category: 'dev',
    highlight: true,
    color: 'from-indigo-500 to-purple-500',
    skills: ['SaaS Architecture', 'Team Leadership', 'Product Design', 'DevOps']
  },
  {
    id: '8',
    year: '2024',
    title: '6+ Years of Mastery',
    description: 'Combined expertise in creative content + technical development',
    icon: Target,
    category: 'milestone',
    highlight: true,
    color: 'from-rose-500 to-pink-500',
    skills: ['Full Stack', 'Content Strategy', 'Product Development', 'Leadership']
  }
];

// Floating Particles Background
function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const dpr = window.devicePixelRatio || 1;
    const canvasEl = canvas;
    const ctxRef = ctx;
    
    canvasEl.width = window.innerWidth * dpr;
    canvasEl.height = window.innerHeight * dpr;
    canvasEl.style.width = `${window.innerWidth}px`;
    canvasEl.style.height = `${window.innerHeight}px`;
    ctxRef.scale(dpr, dpr);
    
    const particles: Array<{ x: number; y: number; size: number; speedY: number; opacity: number }> = [];
    
    for (let i = 0; i < 30; i++) {
      particles.push({
        x: Math.random() * canvas.width / dpr,
        y: Math.random() * canvas.height / dpr,
        size: Math.random() * 3 + 1,
        speedY: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.3 + 0.1
      });
    }
    
    let animationId: number;
    
    function animate() {
      if (!canvasEl) return;
      
      ctxRef.clearRect(0, 0, canvasEl.width, canvasEl.height);
      
      particles.forEach((particle) => {
        particle.y += particle.speedY;
        
        if (particle.y > canvasEl.height / dpr) particle.y = 0;
        if (particle.y < 0) particle.y = canvasEl.height / dpr;
        
        ctxRef.beginPath();
        ctxRef.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctxRef.fillStyle = `rgba(99, 102, 241, ${particle.opacity})`;
        ctxRef.fill();
      });
      
      animationId = requestAnimationFrame(animate);
    }
    
    animate();
    
    return () => cancelAnimationFrame(animationId);
  }, []);
  
  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />;
}

// Vertical Journey Card
function JourneyCard({ 
  event, 
  index, 
  progress 
}: { 
  event: JourneyEvent; 
  index: number;
  progress: any;
}) {
  const Icon = event.icon;
  const yOffset = useTransform(progress, [0, 1], [100, -100]);
  const opacity = useTransform(
    progress, 
    [index / journeyEvents.length - 0.1, index / journeyEvents.length, index / journeyEvents.length + 0.1],
    [0.3, 1, 0.3]
  );
  const scale = useTransform(
    progress,
    [index / journeyEvents.length - 0.1, index / journeyEvents.length, index / journeyEvents.length + 0.1],
    [0.9, 1.05, 0.9]
  );
  
  return (
    <motion.div
      style={{ opacity, scale, y: yOffset }}
      className="relative flex items-center gap-8 py-12"
    >
      {/* Year Badge - Left Side */}
      <div className="flex-shrink-0 w-32 text-right">
        <motion.div
          whileHover={{ scale: 1.1 }}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${event.color} text-white font-bold shadow-lg`}
        >
          <Icon className="w-4 h-4" />
          {event.year}
        </motion.div>
      </div>
      
      {/* Connection Line */}
      <div className="relative flex-shrink-0">
        <div className="w-4 h-4 rounded-full bg-gray-300" />
        <motion.div
          className={`absolute inset-0 rounded-full bg-gradient-to-r ${event.color}`}
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
        />
        {event.highlight && (
          <motion.div
            className="absolute inset-0 rounded-full bg-amber-400"
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
      </div>
      
      {/* Content Card */}
      <motion.div 
        whileHover={{ x: 10 }}
        className={`flex-1 p-6 rounded-2xl bg-white/90 backdrop-blur-sm border-2 ${
          event.highlight ? 'border-amber-400 shadow-xl' : 'border-gray-200 shadow-lg'
        }`}
      >
        <div className="flex items-start justify-between">
          <div>
            <h3 className={`text-xl font-bold mb-2 ${event.highlight ? 'text-amber-600' : 'text-gray-900'}`}>
              {event.title}
            </h3>
            <p className="text-gray-600 mb-4">{event.description}</p>
            
            {/* Skills Tags */}
            <div className="flex flex-wrap gap-2">
              {event.skills?.map((skill) => (
                <span
                  key={skill}
                  className={`px-3 py-1 text-xs font-medium rounded-full bg-gradient-to-r ${event.color} bg-opacity-10 text-gray-700 border border-gray-200`}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
          
          {/* Arrow Indicator */}
          <ChevronRight className="w-6 h-6 text-gray-400" />
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function VerticalJourney() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  // Horizontal scroll transforms
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  
  return (
    <section 
      ref={containerRef}
      id="experience"
      className="relative min-h-[300vh] overflow-hidden"
      style={{
        background: `
          linear-gradient(180deg, #f8fafc 0%, #e2e8f0 20%, #f1f5f9 40%, #e2e8f0 60%, #f8fafc 80%, #ffffff 100%)
        `
      }}
    >
      {/* Animated Grid Pattern */}
      <div 
        className="fixed inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(#475569 1px, transparent 1px),
            linear-gradient(90deg, #475569 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}
      />
      
      {/* Noise Texture */}
      <div 
        className="fixed inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
        }}
      />
      
      {/* Particle Background */}
      <div className="fixed inset-0 pointer-events-none">
        <ParticleBackground />
      </div>
      
      {/* Sticky Container */}
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        {/* Section Header */}
        <motion.div 
          style={{ x }}
          className="absolute left-0 top-20 z-20 px-8"
        >
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4"
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-xl">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-5xl md:text-6xl font-black text-gray-900">
                My <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Journey</span>
              </h2>
              <p className="text-gray-500 mt-2 text-lg">Scroll to explore my path</p>
            </div>
          </motion.div>
        </motion.div>
        
        {/* Horizontal Scrolling Content */}
        <motion.div 
          style={{ x }}
          className="flex items-center gap-16 px-[20vw] py-20"
        >
          {/* Stats Overview Cards */}
          <div className="flex-shrink-0 w-80 space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-6 shadow-xl border border-gray-200"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-amber-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">6+ Years</h3>
              </div>
              <p className="text-gray-600">Combined creative & technical experience</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-xl border border-gray-200"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">15+ Projects</h3>
              </div>
              <p className="text-gray-600">Successful deliveries across industries</p>
            </motion.div>
          </div>
          
          {/* Journey Timeline - Vertical Cards */}
          <div className="relative">
            {/* Central Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-1 bg-gray-200 rounded-full">
              <motion.div 
                className="w-full bg-gradient-to-b from-blue-500 via-purple-500 to-amber-500 rounded-full"
                style={{ height: lineHeight }}
              />
            </div>
            
            {/* Journey Cards */}
            <div className="relative z-10 space-y-8 py-20">
              {journeyEvents.map((event, index) => (
                <JourneyCard
                  key={event.id}
                  event={event}
                  index={index}
                  progress={scrollYProgress}
                />
              ))}
            </div>
          </div>
          
          {/* Skills & Certifications Panel */}
          <div className="flex-shrink-0 w-96 space-y-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl p-8 text-white shadow-2xl"
            >
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Award className="w-6 h-6" />
                Certifications
              </h3>
              <div className="space-y-3">
                {['AWS Solutions Architect', 'Meta Frontend Dev', 'Google Cloud Pro', 'MongoDB Certified'].map((cert, i) => (
                  <motion.div
                    key={cert}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-3 p-3 bg-white/10 rounded-xl backdrop-blur-sm"
                  >
                    <div className="w-2 h-2 rounded-full bg-amber-400" />
                    <span className="font-medium">{cert}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-3xl p-8 shadow-xl border border-gray-200"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Skills Universe</h3>
              <div className="flex flex-wrap gap-2">
                {['React', 'Node.js', 'TypeScript', 'AWS', 'Python', 'MongoDB', 'Next.js', 'GraphQL', 'Docker', 'SEO', 'Content Strategy', 'Video Editing'].map((skill, i) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05 }}
                    whileHover={{ scale: 1.1 }}
                    className="px-3 py-1.5 text-sm font-medium rounded-lg bg-gray-100 text-gray-700 hover:bg-indigo-100 hover:text-indigo-700 transition-colors"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
