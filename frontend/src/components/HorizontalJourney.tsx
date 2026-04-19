import { useRef } from 'react';
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
  Rocket,
  Target,
  ArrowRight,
  Sparkles,
  Zap,
  TrendingUp
} from 'lucide-react';

interface JourneyEvent {
  id: string;
  year: string;
  title: string;
  subtitle: string;
  description: string;
  icon: any;
  color: string;
  bgGradient: string;
  skills: string[];
  highlight?: boolean;
}

const journeyEvents: JourneyEvent[] = [
  {
    id: '1',
    year: '2018',
    title: 'College Journey',
    subtitle: 'Education Begins',
    description: 'Started academic journey while exploring creative fields and digital content',
    icon: GraduationCap,
    color: 'from-cyan-400 to-blue-600',
    bgGradient: 'from-cyan-50 to-blue-50',
    skills: ['Learning', 'Exploration', 'Creativity']
  },
  {
    id: '2',
    year: '2019',
    title: 'YouTube Strategist',
    subtitle: 'Content Creator',
    description: 'Mastered audience growth, SEO, and content analytics for creators',
    icon: Youtube,
    color: 'from-red-400 to-pink-600',
    bgGradient: 'from-red-50 to-pink-50',
    skills: ['SEO', 'Analytics', 'Growth Hacking']
  },
  {
    id: '3',
    year: '2020',
    title: 'Scriptwriter',
    subtitle: 'Storyteller',
    description: 'Crafted compelling narratives and scripts for digital brands',
    icon: PenTool,
    color: 'from-violet-400 to-purple-600',
    bgGradient: 'from-violet-50 to-purple-50',
    skills: ['Storytelling', 'Copywriting', 'Scripts']
  },
  {
    id: '4',
    year: '2021',
    title: 'Filmmaker',
    subtitle: 'Video Producer',
    description: 'Created visual stories through cinematography and video production',
    icon: Video,
    color: 'from-amber-400 to-orange-600',
    bgGradient: 'from-amber-50 to-orange-50',
    skills: ['Video Editing', 'Cinematography', 'Visual Design']
  },
  {
    id: '5',
    year: '2021',
    title: 'First Dev Client',
    subtitle: '🎯 Turning Point',
    description: 'Landed first development client while in college - The game changer!',
    icon: Code2,
    color: 'from-emerald-400 to-teal-600',
    bgGradient: 'from-emerald-50 to-teal-50',
    skills: ['React', 'Node.js', 'Client Management'],
    highlight: true
  },
  {
    id: '6',
    year: '2022',
    title: 'Full Stack Dev',
    subtitle: 'Professional Dev',
    description: 'Building scalable SaaS products and web applications full-time',
    icon: Briefcase,
    color: 'from-green-400 to-emerald-600',
    bgGradient: 'from-green-50 to-emerald-50',
    skills: ['MERN Stack', 'TypeScript', 'AWS']
  },
  {
    id: '7',
    year: '2023',
    title: 'SaaS Architect',
    subtitle: 'Tech Lead',
    description: 'Architecting scalable platforms and leading development teams',
    icon: Rocket,
    color: 'from-indigo-400 to-purple-600',
    bgGradient: 'from-indigo-50 to-purple-50',
    skills: ['System Design', 'Leadership', 'DevOps'],
    highlight: true
  },
  {
    id: '8',
    year: '2024',
    title: '6+ Years Expert',
    subtitle: 'Mastery Achieved',
    description: 'Combined creative content + technical development expertise',
    icon: Target,
    color: 'from-rose-400 to-pink-600',
    bgGradient: 'from-rose-50 to-pink-50',
    skills: ['Full Stack', 'Product Design', 'Strategy'],
    highlight: true
  }
];

// Background Patch Component
function GradientPatch({ 
  color, 
  position, 
  size 
}: { 
  color: string; 
  position: string; 
  size: string;
}) {
  return (
    <div 
      className={`absolute rounded-full blur-3xl opacity-30 pointer-events-none ${position} ${size}`}
      style={{
        background: `linear-gradient(135deg, ${color})`
      }}
    />
  );
}

// Journey Card Component
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
  
  const cardX = useTransform(
    progress,
    [index / journeyEvents.length - 0.2, index / journeyEvents.length, index / journeyEvents.length + 0.2],
    [100, 0, -100]
  );
  
  const cardRotate = useTransform(
    progress,
    [index / journeyEvents.length - 0.2, index / journeyEvents.length, index / journeyEvents.length + 0.2],
    [15, 0, -15]
  );
  
  const cardScale = useTransform(
    progress,
    [index / journeyEvents.length - 0.2, index / journeyEvents.length, index / journeyEvents.length + 0.2],
    [0.8, 1, 0.8]
  );
  
  const cardOpacity = useTransform(
    progress,
    [index / journeyEvents.length - 0.15, index / journeyEvents.length, index / journeyEvents.length + 0.15],
    [0.3, 1, 0.3]
  );

  return (
    <motion.div
      style={{ 
        x: cardX, 
        rotateY: cardRotate,
        scale: cardScale,
        opacity: cardOpacity
      }}
      className="flex-shrink-0 w-[400px] h-[500px] mx-4 perspective-1000"
    >
      <motion.div
        whileHover={{ y: -10, scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 300 }}
        className={`relative h-full rounded-3xl bg-gradient-to-br ${event.bgGradient} p-8 shadow-2xl border-2 ${
          event.highlight ? 'border-amber-400' : 'border-white/50'
        } overflow-hidden`}
      >
        {/* Background Gradient Blob */}
        <div className={`absolute -top-20 -right-20 w-40 h-40 rounded-full bg-gradient-to-br ${event.color} opacity-20 blur-2xl`} />
        <div className={`absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-gradient-to-br ${event.color} opacity-20 blur-2xl`} />
        
        {/* Year Badge */}
        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${event.color} text-white font-bold text-lg mb-6 shadow-lg`}>
          <Icon className="w-5 h-5" />
          {event.year}
        </div>
        
        {/* Content */}
        <div className="relative z-10">
          <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-1">
            {event.subtitle}
          </p>
          <h3 className={`text-3xl font-black mb-4 ${event.highlight ? 'text-amber-600' : 'text-gray-900'}`}>
            {event.title}
          </h3>
          <p className="text-gray-600 leading-relaxed mb-6">
            {event.description}
          </p>
          
          {/* Skills */}
          <div className="flex flex-wrap gap-2">
            {event.skills.map((skill) => (
              <span
                key={skill}
                className={`px-3 py-1.5 text-sm font-medium rounded-full bg-gradient-to-r ${event.color} bg-opacity-10 text-gray-700 border border-gray-200`}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
        
        {/* Bottom Arrow */}
        <div className="absolute bottom-8 right-8">
          <motion.div
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className={`w-12 h-12 rounded-full bg-gradient-to-r ${event.color} flex items-center justify-center shadow-lg`}
          >
            <ArrowRight className="w-6 h-6 text-white" />
          </motion.div>
        </div>
        
        {/* Highlight Effect */}
        {event.highlight && (
          <motion.div
            className="absolute inset-0 rounded-3xl border-2 border-amber-400"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
      </motion.div>
    </motion.div>
  );
}

export default function HorizontalJourney() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  
  // Horizontal scroll transform
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);
  
  // Background gradient animation
  const bgX = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <section 
      ref={containerRef}
      id="experience"
      className="relative h-[400vh]"
    >
      {/* Animated Gradient Background */}
      <motion.div 
        style={{ x: bgX }}
        className="fixed inset-0 -z-10"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30" />
        
        {/* Gradient Patches */}
        <GradientPatch color="#60a5fa, #a78bfa" position="top-20 left-20" size="w-96 h-96" />
        <GradientPatch color="#34d399, #60a5fa" position="top-40 right-20" size="w-80 h-80" />
        <GradientPatch color="#fbbf24, #f87171" position="bottom-20 left-1/3" size="w-72 h-72" />
        <GradientPatch color="#a78bfa, #e879f9" position="bottom-40 right-1/3" size="w-96 h-96" />
        <GradientPatch color="#2dd4bf, #60a5fa" position="top-1/2 left-10" size="w-64 h-64" />
        
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(#1e293b 1px, transparent 1px),
              linear-gradient(90deg, #1e293b 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px'
          }}
        />
        
        {/* Noise Texture */}
        <div 
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
          }}
        />
      </motion.div>

      {/* Sticky Container */}
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">
        {/* Header */}
        <motion.div 
          style={{ opacity: useTransform(scrollYProgress, [0, 0.1], [1, 0]) }}
          className="absolute top-8 left-8 z-20"
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-xl">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900">
                My <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Journey</span>
              </h2>
              <p className="text-gray-500 mt-1">Scroll to explore my path</p>
            </div>
          </div>
        </motion.div>
        
        {/* Progress Bar */}
        <div className="absolute top-8 right-8 z-20 flex items-center gap-3">
          <span className="text-sm font-medium text-gray-500">Progress</span>
          <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-600"
              style={{ width: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]) }}
            />
          </div>
        </div>

        {/* Horizontal Scrolling Cards */}
        <motion.div 
          style={{ x }}
          className="flex items-center pl-[10vw]"
        >
          {/* Intro Card */}
          <motion.div 
            className="flex-shrink-0 w-[500px] h-[400px] mr-16 flex flex-col justify-center"
          >
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/50">
              <div className="flex items-center gap-3 mb-4">
                <Sparkles className="w-6 h-6 text-amber-500" />
                <span className="text-sm font-semibold text-amber-600 uppercase tracking-wider">Experience</span>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                From Content Creator<br />to Developer
              </h3>
              <p className="text-gray-600 leading-relaxed">
                My unique journey combining creative content strategy with technical expertise. 
                6+ years of growth across multiple domains.
              </p>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mt-6">
                {[
                  { num: '6+', label: 'Years' },
                  { num: '15+', label: 'Projects' },
                  { num: '4', label: 'Domains' }
                ].map((stat) => (
                  <div key={stat.label} className="text-center p-3 bg-gray-50 rounded-xl">
                    <span className="block text-2xl font-bold text-gray-900">{stat.num}</span>
                    <span className="text-xs text-gray-500">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Journey Cards */}
          {journeyEvents.map((event, index) => (
            <JourneyCard
              key={event.id}
              event={event}
              index={index}
              progress={scrollYProgress}
            />
          ))}

          {/* End Card - Skills & Certs */}
          <motion.div 
            className="flex-shrink-0 w-[600px] h-[500px] ml-16"
          >
            <div className="h-full grid grid-cols-2 gap-4">
              {/* Certifications */}
              <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl p-6 text-white shadow-2xl">
                <div className="flex items-center gap-2 mb-4">
                  <Award className="w-6 h-6" />
                  <h3 className="text-xl font-bold">Certifications</h3>
                </div>
                <div className="space-y-3">
                  {['AWS Solutions Architect', 'Meta Frontend Developer', 'Google Cloud Professional', 'MongoDB Certified'].map((cert) => (
                    <div key={cert} className="flex items-center gap-2 p-2 bg-white/10 rounded-lg">
                      <div className="w-2 h-2 rounded-full bg-amber-400" />
                      <span className="text-sm font-medium">{cert}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Skills */}
              <div className="bg-white rounded-3xl p-6 shadow-2xl border border-gray-100">
                <div className="flex items-center gap-2 mb-4">
                  <Zap className="w-6 h-6 text-amber-500" />
                  <h3 className="text-xl font-bold text-gray-900">Skills</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['React', 'Node.js', 'TypeScript', 'AWS', 'Python', 'MongoDB', 'Next.js', 'GraphQL', 'Docker', 'SEO', 'Video Editing', 'Content Strategy'].map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 text-sm font-medium rounded-lg bg-gray-100 text-gray-700 hover:bg-indigo-100 hover:text-indigo-700 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Spacer for smooth exit */}
          <div className="flex-shrink-0 w-[20vw]" />
        </motion.div>
      </div>
    </section>
  );
}
