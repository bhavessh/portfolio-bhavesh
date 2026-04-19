import { useEffect, useRef, useContext, useState } from 'react';
import { gsap } from 'gsap/dist/gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { motion } from 'framer-motion';
import { ThemeContext } from '../context/ThemeContext';

type Theme = 'dark' | 'light';

// Hook that works after hydration
function useThemeClient() {
  const ctx = useContext(ThemeContext);
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted || !ctx) {
    return { theme: 'dark' as Theme, toggleTheme: () => {}, setTheme: () => {} };
  }
  
  return ctx;
}

// Client-only particles to prevent hydration mismatch
function ClientOnlyParticles({ isDark }: { isDark: boolean }) {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) return null;
  
  return (
    <div className="absolute inset-0 pointer-events-none">
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full transition-colors duration-500"
          style={{
            width: Math.random() * 4 + 2,
            height: Math.random() * 4 + 2,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            backgroundColor: isDark ? '#ccff00' : '#3b82f6',
            boxShadow: isDark ? '0 0 10px #ccff00' : '0 0 10px #3b82f6',
          }}
          animate={{
            y: [0, -60, 0],
            opacity: [0.1, 0.4, 0.1],
          }}
          transition={{
            duration: Math.random() * 6 + 4,
            delay: Math.random() * 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// 3D Text Animation Component
function Text3D({ text, className = '' }: { text: string; className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    const chars = containerRef.current.querySelectorAll('.char');
    
    gsap.fromTo(chars,
      { 
        opacity: 0, 
        y: 100,
        rotateX: -90,
        rotateY: 45
      },
      { 
        opacity: 1, 
        y: 0,
        rotateX: 0,
        rotateY: 0,
        duration: 1.2,
        stagger: 0.05,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }, []);

  return (
    <div ref={containerRef} className={`text-3d ${className}`} style={{ perspective: '1000px' }}>
      {text.split('').map((char, i) => (
        <span 
          key={i} 
          className="char inline-block"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </div>
  );
}

export default function HeroLight() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { theme } = useThemeClient();
  const isDark = theme === 'dark';

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      gsap.to('.hero-content-light', {
        y: -100,
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
      className="relative min-h-screen flex items-center overflow-hidden transition-colors duration-500"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Primary Glowing Orb - Animated */}
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full blur-[120px] pointer-events-none"
          style={{
            background: isDark 
              ? 'radial-gradient(circle, rgba(204,255,0,0.15) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)',
            left: '10%',
            top: '20%',
          }}
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Secondary Orb */}
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full blur-[100px] pointer-events-none"
          style={{
            background: isDark 
              ? 'radial-gradient(circle, rgba(120,119,198,0.12) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)',
            right: '5%',
            bottom: '10%',
          }}
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />

        {/* Accent Orb */}
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full blur-[80px] pointer-events-none"
          style={{
            background: isDark 
              ? 'radial-gradient(circle, rgba(204,255,0,0.08) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(236,72,153,0.08) 0%, transparent 70%)',
            left: '50%',
            top: '50%',
          }}
          animate={{
            x: [0, 50, -50, 0],
            y: [0, -30, 30, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4,
          }}
        />
      </div>
      
      {/* Theme-specific Floating Particles - Client Only */}
      <ClientOnlyParticles isDark={isDark} />
      
      {/* Theme-specific Grid Background */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div 
          className="absolute inset-0 transition-all duration-500"
          style={{
            backgroundImage: `
              linear-gradient(${isDark ? '#ccff00' : '#3b82f6'} 1px, transparent 1px),
              linear-gradient(90deg, ${isDark ? '#ccff00' : '#3b82f6'} 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px'
          }}
        />
      </div>
      
      {/* Theme-specific Texture Overlay */}
      <div className={`absolute inset-0 pointer-events-none ${isDark ? 'hero-texture-dark' : 'hero-texture-light'}`} />

      {/* Main Content - Two Column Layout */}
      <div className="hero-content-light container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen py-20">
          
          {/* Left Column - Text Content */}
          <div className="text-left">
            {/* Small Tagline */}
            <motion.p
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="text-sm md:text-base font-semibold tracking-[0.2em] uppercase mb-2 transition-colors duration-500"
              style={{ color: 'var(--accent)' }}
            >
              Hi, I'm
            </motion.p>

            {/* Main Title */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="mb-6"
            >
              {/* Full Stack */}
              <h1 
                className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tight leading-none transition-colors duration-500"
                style={{ fontFamily: 'Inter, system-ui, sans-serif', color: 'var(--text-primary)' }}
              >
                Full Stack
              </h1>
              
              {/* Developer - Accent Color */}
              <h2 
                className="text-5xl md:text-7xl lg:text-8xl font-light italic mt-2 transition-colors duration-500"
                style={{ fontFamily: 'Playfair Display, Georgia, serif', color: 'var(--accent)' }}
              >
                Developer
              </h2>
              
              {/* & SaaS Builder */}
              <div className="flex items-center gap-4 mt-4">
                <span 
                  className="text-4xl md:text-5xl font-light transition-colors duration-500"
                  style={{ color: isDark ? 'rgba(255,255,255,0.3)' : 'rgba(15,23,42,0.3)' }}
                >
                  &
                </span>
                <span 
                  className="text-3xl md:text-4xl font-bold tracking-wider uppercase transition-colors duration-500"
                  style={{ fontFamily: 'Space Grotesk, monospace', color: isDark ? 'rgba(255,255,255,0.8)' : 'rgba(15,23,42,0.8)' }}
                >
                  SaaS Builder
                </span>
              </div>
            </motion.div>

            {/* Description Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="backdrop-blur-sm rounded-2xl p-6 max-w-lg mb-8 transition-all duration-500"
              style={{ 
                backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.8)',
                border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(59,130,246,0.2)'}`
              }}
            >
              <div className="flex items-start gap-4">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-500"
                  style={{ backgroundColor: 'var(--accent)' }}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: isDark ? '#000000' : '#ffffff' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <div>
                  <p className="text-lg leading-relaxed transition-colors duration-500" style={{ color: isDark ? 'rgba(255,255,255,0.6)' : 'rgba(15,23,42,0.7)' }}>
                    I craft <span className="font-semibold" style={{ color: 'var(--accent)' }}>scalable web applications</span> and 
                    <span className="font-semibold" style={{ color: 'var(--accent)' }}> SaaS products</span> that solve real problems. 
                  </p>
                  <div className="flex gap-2 mt-3">
                    {['React', 'Node.js', 'TypeScript'].map((tech) => (
                      <span 
                        key={tech}
                        className="px-2 py-1 text-xs rounded-md font-medium border transition-all duration-500"
                        style={{ 
                          backgroundColor: isDark ? 'rgba(204,255,0,0.1)' : 'rgba(59,130,246,0.1)',
                          color: isDark ? '#ccff00' : '#3b82f6',
                          borderColor: isDark ? 'rgba(204,255,0,0.2)' : 'rgba(59,130,246,0.2)'
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <motion.a
                href="#works"
                className="px-8 py-4 font-semibold rounded-full text-lg transition-all duration-300"
                style={{ 
                  backgroundColor: 'var(--accent)',
                  color: isDark ? '#000000' : '#ffffff',
                  boxShadow: isDark ? '0 0 30px rgba(204,255,0,0.3)' : '0 4px 20px rgba(59,130,246,0.3)'
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View My Work
              </motion.a>
              <motion.a
                href="#contact"
                className="px-8 py-4 border-2 font-semibold rounded-full text-lg transition-all duration-300"
                style={{ 
                  borderColor: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(59,130,246,0.3)',
                  color: isDark ? '#ffffff' : '#0f172a'
                }}
                whileHover={{ 
                  scale: 1.05,
                  borderColor: 'var(--accent)',
                  color: 'var(--accent)'
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
            {/* Subtle Ring Background */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="w-[350px] h-[350px] md:w-[450px] md:h-[450px] rounded-full border border-gray-200"
                animate={{ rotate: -360 }}
                transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
              />
              <motion.div
                className="absolute w-[320px] h-[320px] md:w-[420px] md:h-[420px] rounded-full border border-gray-100"
                animate={{ rotate: 360 }}
                transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
              />
            </div>

            {/* Profile Image Container */}
            <motion.div
              className="relative w-72 h-72 md:w-96 md:h-96 rounded-full overflow-hidden shadow-2xl"
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
              style={{
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)'
              }}
            >
              {/* Border */}
              <div 
                className="absolute -inset-0.5 rounded-full bg-gradient-to-br from-gray-200 to-gray-300"
                style={{ zIndex: -1 }}
              />
              
              {/* Image with bottom-to-top reveal animation */}
              <motion.div
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ 
                  duration: 0.8, 
                  delay: 0.5, 
                  ease: [0.25, 0.46, 0.45, 0.94] 
                }}
                className="absolute inset-0 z-10"
              >
                <img
                  src="/image.png"
                  alt="Bhavesh"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </motion.div>

            {/* Floating Badges */}
            <motion.div
              className="absolute -top-4 right-10 px-4 py-2 rounded-full transition-all duration-500"
              style={{ 
                backgroundColor: 'var(--accent)',
                boxShadow: isDark ? '0 0 20px rgba(204,255,0,0.3)' : '0 4px 15px rgba(59,130,246,0.3)'
              }}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <span className="font-semibold text-sm" style={{ color: isDark ? '#000000' : '#ffffff' }}>React Expert</span>
            </motion.div>
            
            <motion.div
              className="absolute bottom-10 -left-4 px-4 py-2 backdrop-blur-sm rounded-full border transition-all duration-500"
              style={{ 
                backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.8)',
                borderColor: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(59,130,246,0.3)'
              }}
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
            >
              <span className="font-semibold text-sm" style={{ color: isDark ? '#ffffff' : '#0f172a' }}>SaaS Builder</span>
            </motion.div>

            <motion.div
              className="absolute top-1/2 -right-8 px-4 py-2 rounded-full transition-all duration-500"
              style={{ 
                backgroundColor: 'var(--accent)',
                boxShadow: isDark ? '0 0 20px rgba(204,255,0,0.3)' : '0 4px 15px rgba(59,130,246,0.3)'
              }}
              animate={{ x: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            >
              <span className="font-semibold text-sm" style={{ color: isDark ? '#000000' : '#ffffff' }}>6+ Years</span>
            </motion.div>
          </motion.div>
        </div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-12 pb-8 border-t transition-colors duration-500"
          style={{ borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(59,130,246,0.2)' }}
        >
          {[
            { num: '6+', label: 'Years', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
            { num: '15+', label: 'Projects', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' },
            { num: '5+', label: 'SaaS', icon: 'M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z' },
            { num: '10+', label: 'Clients', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' }
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              className="rounded-2xl p-6 border transition-all cursor-pointer group"
              style={{ 
                backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.8)',
                borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(59,130,246,0.2)'
              }}
              whileHover={{ scale: 1.03, y: -5, borderColor: 'var(--accent)' }}
              transition={{ type: 'spring' }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-500"
                  style={{ backgroundColor: isDark ? 'rgba(204,255,0,0.1)' : 'rgba(59,130,246,0.1)' }}
                >
                  <svg className="w-5 h-5 transition-colors duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'var(--accent)' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={stat.icon} />
                  </svg>
                </div>
                <span className="text-3xl font-bold" style={{ color: 'var(--accent)' }}>{stat.num}</span>
              </div>
              <span className="text-sm font-medium uppercase tracking-wider transition-colors duration-500" style={{ color: isDark ? 'rgba(255,255,255,0.4)' : 'rgba(15,23,42,0.5)' }}>
                {stat.label}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="flex flex-col items-center py-8"
        >
          <p className="text-sm mb-4 transition-colors duration-500" style={{ color: isDark ? 'rgba(255,255,255,0.3)' : 'rgba(15,23,42,0.4)' }}>Scroll to learn more about me</p>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-12 h-12 rounded-full border flex items-center justify-center transition-colors duration-500"
            style={{ 
              backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(59,130,246,0.1)',
              borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(59,130,246,0.2)'
            }}
          >
            <svg className="w-6 h-6 transition-colors duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'var(--accent)' }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
