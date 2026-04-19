import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap/dist/gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { motion } from 'framer-motion';

const API_URL = import.meta.env.PUBLIC_API_URL || 'http://localhost:5001/api';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Floating Background Text Component
function FloatingBackgroundText({ text, className = '' }: { text: string; className?: string }) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute whitespace-nowrap text-[8rem] md:text-[12rem] font-bold text-white/[0.03] uppercase tracking-wider"
          style={{ 
            top: `${i * 15}%`,
            left: '-10%'
          }}
          animate={{
            x: [0, -100, 0],
            opacity: [0.02, 0.05, 0.02]
          }}
          transition={{
            duration: 20 + i * 5,
            repeat: Infinity,
            ease: 'linear'
          }}
        >
          {text} • {text} • {text} •
        </motion.div>
      ))}
    </div>
  );
}

// Animated 3D Text
function Animated3DText({ text, className = '' }: { text: string; className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const chars = containerRef.current.querySelectorAll('.char3d');
    
    gsap.fromTo(chars,
      { 
        opacity: 0, 
        y: 100,
        rotateX: -90,
        rotateY: 45,
        scale: 0.5
      },
      { 
        opacity: 1, 
        y: 0,
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        duration: 1,
        stagger: 0.03,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }, []);

  return (
    <div 
      ref={containerRef} 
      className={`${className}`} 
      style={{ perspective: '1000px' }}
    >
      {text.split('').map((char, i) => (
        <span 
          key={i} 
          className="char3d inline-block"
          style={{ 
            transformStyle: 'preserve-3d',
            textShadow: '0 0 40px rgba(139, 92, 246, 0.3)'
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </div>
  );
}

export default function HeroTharunStyle() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [stats, setStats] = useState({
    years: '6+',
    yearsLabel: 'Years Experience',
    projects: '15+',
    projectsLabel: 'Projects Delivered',
    saas: '5+',
    saasLabel: 'SaaS Products',
    clients: '10+',
    clientsLabel: 'Happy Clients'
  });

  // Fetch stats from API
  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch(`${API_URL}/siteconfig`);
        if (res.ok) {
          const data = await res.json();
          setStats({
            years: data.statsYears || '6+',
            yearsLabel: data.statsYearsLabel || 'Years Experience',
            projects: data.statsProjects || '15+',
            projectsLabel: data.statsProjectsLabel || 'Projects Delivered',
            saas: data.statsSaas || '5+',
            saasLabel: data.statsSaasLabel || 'SaaS Products',
            clients: data.statsClients || '10+',
            clientsLabel: data.statsClientsLabel || 'Happy Clients'
          });
        }
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      }
    }
    fetchStats();

    // Poll for updates every 5 seconds
    const interval = setInterval(() => {
      if (!document.hidden) {
        fetchStats();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      // Parallax scroll effect
      gsap.to('.hero-content-tharun', {
        y: -150,
        opacity: 0,
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: '50% top',
          scrub: 1
        }
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={heroRef} 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: '#0a0a0a' }}
    >
      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-20">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(139, 92, 246, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      {/* Floating Background Text */}
      <FloatingBackgroundText text="FULL STACK" />

      {/* Glowing Orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600/20 rounded-full blur-[100px]" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-600/15 rounded-full blur-[120px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[150px]" />

      {/* Main Content - Two Column Layout */}
      <div className="hero-content-tharun container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen py-20">
          
          {/* Left Column - Text Content */}
          <div className="text-left">
            {/* Small Tagline */}
            <motion.p
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="text-purple-400 text-sm md:text-base font-medium tracking-[0.3em] uppercase mb-6"
            >
              Bhavesh Presents
            </motion.p>

            {/* Main Title - 3D Animated */}
            <Animated3DText 
              text="Full Stack" 
              className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-2 block"
            />

            {/* Gradient Subtitle */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="mb-4"
            >
              <span 
                className="text-3xl md:text-5xl lg:text-6xl font-bold"
                style={{
                  background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 50%, #8b5cf6 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  filter: 'drop-shadow(0 0 30px rgba(168, 85, 247, 0.5))'
                }}
              >
                Developer
              </span>
            </motion.div>

            {/* SaaS Builder Tag */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-xl md:text-2xl font-semibold text-gray-400 mb-6"
            >
              & <span className="text-white">SaaS Builder</span>
            </motion.p>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="text-lg text-gray-500 max-w-lg mb-8 leading-relaxed"
            >
              Building scalable web applications and SaaS products that solve real problems. 
              From concept to deployment, I craft digital experiences that matter.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <motion.a
                href="#works"
                className="px-8 py-4 bg-white text-black font-bold rounded-full text-lg"
                whileHover={{ 
                  scale: 1.05, 
                  boxShadow: '0 0 40px rgba(255,255,255,0.3)'
                }}
                whileTap={{ scale: 0.95 }}
              >
                View My Work
              </motion.a>
              <motion.a
                href="#contact"
                className="px-8 py-4 border-2 border-purple-500 text-purple-400 font-bold rounded-full text-lg bg-transparent"
                whileHover={{ 
                  scale: 1.05, 
                  backgroundColor: 'rgba(139, 92, 246, 0.1)',
                  boxShadow: '0 0 30px rgba(139, 92, 246, 0.4)'
                }}
                whileTap={{ scale: 0.95 }}
              >
                Get In Touch
              </motion.a>
            </motion.div>
          </div>

          {/* Right Column - Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ delay: 0.5, duration: 1, type: 'spring' }}
            className="relative flex justify-center lg:justify-end"
            style={{ perspective: '1000px' }}
          >
            {/* Hexagon Pattern Background */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="w-[400px] h-[400px] md:w-[500px] md:h-[500px]"
                style={{
                  background: `
                    radial-gradient(circle at 30% 30%, rgba(139, 92, 246, 0.3) 0%, transparent 50%),
                    radial-gradient(circle at 70% 70%, rgba(236, 72, 153, 0.3) 0%, transparent 50%)
                  `,
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
              />
            </div>

            {/* Glowing Circle Ring */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="w-[350px] h-[350px] md:w-[450px] md:h-[450px] rounded-full border-2 border-purple-500/30"
                animate={{ rotate: -360 }}
                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
              />
              <motion.div
                className="absolute w-[320px] h-[320px] md:w-[420px] md:h-[420px] rounded-full border border-pink-500/20"
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
              />
            </div>

            {/* Profile Image Container */}
            <motion.div
              className="relative w-72 h-72 md:w-96 md:h-96 rounded-full overflow-hidden"
              whileHover={{ scale: 1.05, rotateY: 10 }}
              transition={{ type: 'spring', stiffness: 300 }}
              style={{
                boxShadow: `
                  0 0 60px rgba(139, 92, 246, 0.4),
                  0 0 120px rgba(139, 92, 246, 0.2),
                  inset 0 0 60px rgba(139, 92, 246, 0.1)
                `
              }}
            >
              {/* Gradient Border */}
              <div 
                className="absolute -inset-1 rounded-full"
                style={{
                  background: 'linear-gradient(135deg, #8b5cf6, #ec4899, #3b82f6, #8b5cf6)',
                  backgroundSize: '400% 400%',
                  animation: 'gradient-rotate 3s ease infinite',
                  zIndex: -1
                }}
              />
              
              <img
                src="/images/profile.jpg"
                alt="Bhavesh"
                className="w-full h-full object-cover relative z-10"
                onError={(e) => {
                  // Use initials avatar instead of random person
                  (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,' + btoa(`
                    <svg width="400" height="400" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" style="stop-color:#8b5cf6;stop-opacity:1" />
                          <stop offset="100%" style="stop-color:#ec4899;stop-opacity:1" />
                        </linearGradient>
                      </defs>
                      <rect width="400" height="400" fill="url(#grad)"/>
                      <text x="50%" y="55%" font-family="Arial, sans-serif" font-size="120" font-weight="bold" fill="white" text-anchor="middle" dominant-baseline="middle">B</text>
                    </svg>
                  `);
                }}
              />
              
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/20 via-transparent to-pink-600/20 z-20 pointer-events-none" />
            </motion.div>

            {/* Floating Badges */}
            <motion.div
              className="absolute -top-4 right-10 px-4 py-2 bg-purple-500/20 backdrop-blur-sm rounded-full border border-purple-500/30"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <span className="text-purple-300 font-semibold text-sm">React Expert</span>
            </motion.div>
            
            <motion.div
              className="absolute bottom-10 -left-4 px-4 py-2 bg-pink-500/20 backdrop-blur-sm rounded-full border border-pink-500/30"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
            >
              <span className="text-pink-300 font-semibold text-sm">SaaS Builder</span>
            </motion.div>

            <motion.div
              className="absolute top-1/2 -right-8 px-4 py-2 bg-blue-500/20 backdrop-blur-sm rounded-full border border-blue-500/30"
              animate={{ x: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            >
              <span className="text-blue-300 font-semibold text-sm">{stats.years} {stats.yearsLabel.split(' ')[0]}</span>
            </motion.div>
          </motion.div>
        </div>

        {/* Stats Row - Bottom */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-8 md:gap-16 pt-12 pb-8 border-t border-white/10"
        >
          {[
            { num: stats.years, label: stats.yearsLabel },
            { num: stats.projects, label: stats.projectsLabel },
            { num: stats.saas, label: stats.saasLabel },
            { num: stats.clients, label: stats.clientsLabel }
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              className="text-center"
              whileHover={{ scale: 1.1, y: -5 }}
              transition={{ type: 'spring' }}
            >
              <span
                className="block text-3xl md:text-4xl font-bold mb-1"
                style={{
                  background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                {stat.num}
              </span>
              <span className="text-sm text-gray-500 uppercase tracking-wider">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Bottom Floating Text */}
      <div className="absolute bottom-0 left-0 right-0 h-32 overflow-hidden">
        <motion.div
          className="whitespace-nowrap text-[6rem] md:text-[8rem] font-bold text-white/[0.03] uppercase"
          animate={{ x: [0, -500, 0] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        >
          SAAS BUILDER • SAAS BUILDER • SAAS BUILDER • SAAS BUILDER •
        </motion.div>
      </div>
    </section>
  );
}
