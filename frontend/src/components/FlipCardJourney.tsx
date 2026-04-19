import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronRight, Building2, Briefcase, Code2, Calendar } from 'lucide-react';

interface ExperienceItem {
  id: string;
  period: string;
  year: string;
  company: string;
  role: string;
  type: 'education' | 'freelance' | 'company';
  description: string;
  techStack: string[];
  highlights: string[];
  color: string;
}

const experiences: ExperienceItem[] = [
  {
    id: '1',
    period: '2022 - 2026',
    year: '2022',
    company: 'University Education',
    role: 'Computer Science Student',
    type: 'education',
    description: 'Started my journey in computer science, learning fundamentals of programming and software development while exploring creative fields.',
    techStack: ['C', 'Python', 'JavaScript', 'Data Structures'],
    highlights: ['Dean\'s List', 'Programming Club Lead', 'Hackathon Winner'],
    color: '#3b82f6'
  },
  {
    id: '2',
    period: '2022 - 2023',
    year: '2022',
    company: 'Freelance - Content Strategy',
    role: 'YouTube Strategist',
    type: 'freelance',
    description: 'Started as a freelance content strategist, helping creators grow their audience through SEO and analytics.',
    techStack: ['SEO', 'Analytics', 'Content Planning', 'Growth Hacking'],
    highlights: ['10+ Creators Helped', '1M+ Views Generated', 'Algorithm Expert'],
    color: '#ef4444'
  },
  {
    id: '3',
    period: '2023 - 2024',
    year: '2023',
    company: 'Freelance - Creative',
    role: 'Scriptwriter & Video Editor',
    type: 'freelance',
    description: 'Crafted compelling narratives and produced high-quality video content for brands and creators.',
    techStack: ['Premiere Pro', 'After Effects', 'Storytelling', 'Visual Design'],
    highlights: ['50+ Scripts Written', 'Brand Campaigns', 'Viral Content'],
    color: '#8b5cf6'
  },
  {
    id: '4',
    period: '2023 - 2024',
    year: '2023',
    company: 'Freelance - Development',
    role: 'Full Stack Developer',
    type: 'freelance',
    description: 'Transitioned into development, building web applications and landing my first dev client.',
    techStack: ['React', 'Node.js', 'MongoDB', 'Express'],
    highlights: ['First Dev Client', '5+ Projects', '5-Star Reviews'],
    color: '#10b981'
  },
  {
    id: '5',
    period: '2024 - Present',
    year: '2024',
    company: 'TechCorp Solutions',
    role: 'Junior Full Stack Developer',
    type: 'company',
    description: 'Joined as a full-time developer, working on enterprise SaaS applications and scaling systems.',
    techStack: ['React', 'TypeScript', 'AWS', 'PostgreSQL', 'Docker'],
    highlights: ['Promoted to Mid-Level', 'Led 2 Projects', 'System Architecture'],
    color: '#f59e0b'
  },
  {
    id: '6',
    period: '2024 - Present',
    year: '2024',
    company: 'StartupXYZ',
    role: 'Senior Full Stack Developer',
    type: 'company',
    description: 'Leading development of core product features, mentoring juniors, and architecting scalable solutions.',
    techStack: ['Next.js', 'GraphQL', 'Kubernetes', 'Redis', 'Go'],
    highlights: ['Tech Lead', 'Team of 5', 'Series A Funding'],
    color: '#06b6d4'
  }
];

// Flip Card Component
function FlipCard({ 
  experience, 
  index,
  isFlipped,
  onFlip
}: { 
  experience: ExperienceItem; 
  index: number;
  isFlipped: boolean;
  onFlip: () => void;
}) {
  const typeColors = {
    education: '#3b82f6',
    freelance: '#10b981',
    company: '#8b5cf6'
  };

  const typeLabels = {
    education: 'Education',
    freelance: 'Freelance',
    company: 'Company'
  };

  return (
    <div 
      className="relative w-[400px] h-[500px] flex-shrink-0 mx-8 cursor-pointer"
      style={{ perspective: '1000px' }}
      onClick={onFlip}
    >
      <motion.div
        className="relative w-full h-full"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 260, damping: 20 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* FRONT SIDE */}
        <div 
          className="absolute inset-0 w-full h-full rounded-2xl p-8 flex flex-col justify-between"
          style={{ 
            backfaceVisibility: 'hidden',
            background: `linear-gradient(135deg, ${experience.color}15, ${experience.color}05)`,
            border: `2px solid ${experience.color}40`,
            boxShadow: `0 20px 40px ${experience.color}20`
          }}
        >
          {/* Top Section */}
          <div>
            {/* Year Badge */}
            <div 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
              style={{ background: experience.color, color: 'white' }}
            >
              <Calendar className="w-4 h-4" />
              <span className="font-bold">{experience.year}</span>
            </div>

            {/* Type Label */}
            <div 
              className="inline-block px-3 py-1 rounded-full text-xs font-medium mb-4"
              style={{ 
                background: `${experience.color}20`, 
                color: experience.color,
                border: `1px solid ${experience.color}40`
              }}
            >
              {typeLabels[experience.type]}
            </div>

            {/* Company */}
            <h3 
              className="text-2xl font-bold mb-2"
              style={{ 
                fontFamily: '"Times New Roman", Georgia, serif',
                color: '#1a1a1a'
              }}
            >
              {experience.company}
            </h3>

            {/* Role - Italic */}
            <p 
              className="text-lg italic"
              style={{ 
                fontFamily: '"Times New Roman", Georgia, serif',
                color: experience.color
              }}
            >
              {experience.role}
            </p>
          </div>

          {/* Bottom Section */}
          <div>
            <p className="text-sm text-gray-500 mb-4">Click to flip →</p>
            
            {/* Period */}
            <div className="flex items-center gap-2 text-gray-600">
              <Briefcase className="w-4 h-4" />
              <span style={{ fontFamily: '"Times New Roman", Georgia, serif' }}>
                {experience.period}
              </span>
            </div>
          </div>

          {/* Decorative Corner */}
          <div 
            className="absolute bottom-0 right-0 w-24 h-24 rounded-tl-full opacity-20"
            style={{ background: experience.color }}
          />
        </div>

        {/* BACK SIDE */}
        <div 
          className="absolute inset-0 w-full h-full rounded-2xl p-8 flex flex-col"
          style={{ 
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            background: 'white',
            border: `2px solid ${experience.color}40`,
            boxShadow: `0 20px 40px ${experience.color}20`
          }}
        >
          {/* Header */}
          <div className="mb-6">
            <h4 
              className="text-xl font-bold mb-2"
              style={{ 
                fontFamily: '"Times New Roman", Georgia, serif',
                color: '#1a1a1a'
              }}
            >
              Details
            </h4>
            <div className="w-12 h-1 rounded-full" style={{ background: experience.color }} />
          </div>

          {/* Description */}
          <p 
            className="text-gray-700 mb-6 leading-relaxed italic"
            style={{ fontFamily: '"Times New Roman", Georgia, serif' }}
          >
            "{experience.description}"
          </p>

          {/* Tech Stack */}
          <div className="mb-6">
            <h5 
              className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3"
              style={{ fontFamily: '"Times New Roman", Georgia, serif' }}
            >
              Tech Stack
            </h5>
            <div className="flex flex-wrap gap-2">
              {experience.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 text-sm rounded-full border"
                  style={{ 
                    borderColor: `${experience.color}40`,
                    color: experience.color,
                    background: `${experience.color}10`,
                    fontFamily: '"Times New Roman", Georgia, serif'
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Highlights */}
          <div className="flex-1">
            <h5 
              className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3"
              style={{ fontFamily: '"Times New Roman", Georgia, serif' }}
            >
              Highlights
            </h5>
            <ul className="space-y-2">
              {experience.highlights.map((highlight, i) => (
                <li 
                  key={i}
                  className="flex items-center gap-2 text-gray-700"
                  style={{ fontFamily: '"Times New Roman", Georgia, serif' }}
                >
                  <span style={{ color: experience.color }}>•</span>
                  {highlight}
                </li>
              ))}
            </ul>
          </div>

          {/* Click hint */}
          <p className="text-sm text-gray-400 mt-4">← Click to flip back</p>
        </div>
      </motion.div>
    </div>
  );
}

export default function FlipCardJourney() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [flippedCards, setFlippedCards] = useState<Set<string>>(new Set());
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  
  // Horizontal movement
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]);

  const toggleFlip = (id: string) => {
    setFlippedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <section 
      ref={containerRef}
      id="experience"
      className="relative h-[300vh]"
    >
      {/* Background with Gradient Patches */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-slate-50 via-white to-gray-50">
        {/* Gradient Patches */}
        <div className="absolute top-20 left-20 w-96 h-96 rounded-full bg-gradient-to-br from-blue-200/40 to-purple-200/40 blur-3xl pointer-events-none" />
        <div className="absolute top-40 right-20 w-80 h-80 rounded-full bg-gradient-to-br from-amber-200/30 to-orange-200/30 blur-3xl pointer-events-none" />
        <div className="absolute bottom-20 left-1/3 w-72 h-72 rounded-full bg-gradient-to-br from-emerald-200/30 to-teal-200/30 blur-3xl pointer-events-none" />
        <div className="absolute bottom-40 right-1/3 w-96 h-96 rounded-full bg-gradient-to-br from-rose-200/30 to-pink-200/30 blur-3xl pointer-events-none" />
        
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(#1e293b 1px, transparent 1px),
              linear-gradient(90deg, #1e293b 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
        />
        
        {/* Noise */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
          }}
        />
      </div>

      {/* Sticky Container */}
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center">
        {/* Header with Times New Roman */}
        <div className="absolute top-8 left-8 right-8 z-20 flex items-center justify-between">
          <div>
            <motion.p
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-sm uppercase tracking-widest text-gray-500 mb-2"
              style={{ fontFamily: '"Times New Roman", Georgia, serif' }}
            >
              Professional Experience
            </motion.p>
            <h2 
              className="text-4xl md:text-5xl font-bold"
              style={{ fontFamily: '"Times New Roman", Georgia, serif' }}
            >
              My <span className="italic text-blue-600">Journey</span>
            </h2>
          </div>
          
          {/* Progress Indicator */}
          <div className="flex items-center gap-3">
            <span 
              className="text-sm text-gray-500"
              style={{ fontFamily: '"Times New Roman", Georgia, serif' }}
            >
              Progress
            </span>
            <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-blue-500 to-purple-600"
                style={{ width: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]) }}
              />
            </div>
          </div>
        </div>

        {/* Instruction */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="absolute top-28 left-8 z-20"
        >
          <p 
            className="text-sm text-gray-400 italic"
            style={{ fontFamily: '"Times New Roman", Georgia, serif' }}
          >
            * Click cards to flip and view details
          </p>
        </motion.div>

        {/* Horizontal Scrolling Cards */}
        <motion.div 
          style={{ x }}
          className="flex items-center pl-[15vw]"
        >
          {/* Intro Card */}
          <div className="flex-shrink-0 w-[350px] h-[400px] mr-12 flex items-center justify-center">
            <div className="text-center">
              <Building2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 
                className="text-2xl font-bold text-gray-800 mb-2"
                style={{ fontFamily: '"Times New Roman", Georgia, serif' }}
              >
                Career <span className="italic">Timeline</span>
              </h3>
              <p 
                className="text-gray-500"
                style={{ fontFamily: '"Times New Roman", Georgia, serif' }}
              >
                Scroll to explore my professional journey
              </p>
              <ChevronRight className="w-8 h-8 text-gray-300 mx-auto mt-4" />
            </div>
          </div>

          {/* Experience Flip Cards */}
          {experiences.map((exp, index) => (
            <FlipCard
              key={exp.id}
              experience={exp}
              index={index}
              isFlipped={flippedCards.has(exp.id)}
              onFlip={() => toggleFlip(exp.id)}
            />
          ))}

          {/* End Card */}
          <div className="flex-shrink-0 w-[350px] h-[400px] ml-12 flex items-center justify-center">
            <div className="text-center">
              <Code2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 
                className="text-2xl font-bold text-gray-800 mb-2"
                style={{ fontFamily: '"Times New Roman", Georgia, serif' }}
              >
                Continuing...
              </h3>
              <p 
                className="text-gray-500 italic"
                style={{ fontFamily: '"Times New Roman", Georgia, serif' }}
              >
                The journey never ends
              </p>
            </div>
          </div>

          {/* Spacer */}
          <div className="flex-shrink-0 w-[20vw]" />
        </motion.div>

        {/* Timeline Line at Bottom */}
        <div className="absolute bottom-12 left-0 right-0 h-1 bg-gray-200 mx-8">
          <motion.div 
            className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-amber-500"
            style={{ width: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]) }}
          />
        </div>

        {/* Timeline Dots */}
        <div className="absolute bottom-8 left-8 right-8 flex justify-between px-[15vw]">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              className="w-3 h-3 rounded-full"
              style={{ background: exp.color }}
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
