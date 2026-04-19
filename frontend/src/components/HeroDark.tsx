import { useEffect, useRef } from 'react';
import { gsap } from 'gsap/dist/gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { motion } from 'framer-motion';

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

// Floating Repeating Text (like tharunspeaks.in)
function FloatingText({ text, count = 3, direction = 'left' }: { text: string; count?: number; direction?: 'left' | 'right' }) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current || typeof window === 'undefined') return;
    
    const items = containerRef.current.querySelectorAll('.float-item');
    
    gsap.to(items, {
      y: direction === 'left' ? -100 : 100,
      opacity: 0.3,
      stagger: {
        each: 0.2,
        from: 'start'
      },
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1
      }
    });
  }, [direction]);

  return (
    <div ref={containerRef} className="relative h-32 overflow-hidden">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          className="float-item absolute w-full text-center"
          style={{ top: `${i * 40}px` }}
          initial={{ opacity: 0.1 * (i + 1), y: 50 }}
          animate={{ opacity: 0.1 * (count - i), y: -50 * (i + 1) }}
          transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse', delay: i * 0.3 }}
        >
          <span className="text-6xl md:text-8xl font-bold text-white/5">
            {text}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

export default function HeroDark() {
  const heroRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      // Parallax effect on scroll
      gsap.to('.hero-content', {
        y: -100,
        opacity: 0,
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: '50% top',
          scrub: 1
        }
      });

      // Image scale on scroll
      gsap.to(imageRef.current, {
        scale: 1.2,
        rotateY: 15,
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
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
      style={{ background: 'linear-gradient(180deg, #0a0a0a 0%, #111111 50%, #1a1a2e 100%)' }}
    >
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-20">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              background: `radial-gradient(circle, rgba(139, 92, 246, 0.8) 0%, transparent 70%)`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.8, 0.3]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="hero-content container mx-auto px-6 relative z-10 text-center">
        {/* Repeating Background Text */}
        <FloatingText text="FULL STACK" count={4} />

        {/* Main Title */}
        <div className="relative mt-8">
          <p className="text-sm text-purple-400 mb-4 font-medium tracking-[0.3em] uppercase">
            Bhavesh Presents
          </p>
          
          <Text3D 
            text="Full Stack" 
            className="text-6xl md:text-8xl lg:text-9xl font-bold text-white mb-2"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="relative inline-block"
          >
            <span 
              className="text-5xl md:text-7xl lg:text-8xl font-bold"
              style={{
                background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 50%, #3b82f6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 0 30px rgba(139, 92, 246, 0.5)'
              }}
            >
              Developer
            </span>
            <span 
              className="text-3xl md:text-4xl lg:text-5xl font-bold block mt-2"
              style={{
                background: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              & SaaS Builder
            </span>
          </motion.div>
        </div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-xl text-gray-400 mt-8 max-w-2xl mx-auto leading-relaxed"
        >
          Building digital experiences that matter. 
          Crafting performant, clean, and accessible 
          web applications with modern technologies.
        </motion.p>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="flex justify-center gap-12 mt-12"
        >
          {[
            { value: '6+', label: 'Years Experience' },
            { value: '15+', label: 'Projects Built' },
            { value: '5+', label: 'SaaS Products' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center"
              whileHover={{ scale: 1.1, y: -5 }}
              transition={{ type: 'spring' }}
            >
              <span 
                className="block text-4xl md:text-5xl font-bold"
                style={{
                  background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                {stat.value}
              </span>
              <span className="text-sm text-gray-500 uppercase tracking-wider">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-4 mt-12"
        >
          <motion.a
            href="#works"
            className="px-8 py-4 bg-white text-black font-semibold rounded-full text-lg"
            whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(255,255,255,0.3)' }}
            whileTap={{ scale: 0.95 }}
          >
            View My Work
          </motion.a>
          <motion.a
            href="#contact"
            className="px-8 py-4 border-2 border-purple-500 text-purple-400 font-semibold rounded-full text-lg"
            whileHover={{ 
              scale: 1.05, 
              backgroundColor: 'rgba(139, 92, 246, 0.1)',
              boxShadow: '0 0 30px rgba(139, 92, 246, 0.3)'
            }}
            whileTap={{ scale: 0.95 }}
          >
            Get In Touch
          </motion.a>
        </motion.div>
      </div>

      {/* Second Floating Text */}
      <div className="absolute bottom-20 left-0 right-0">
        <FloatingText text="SAAS BUILDER" count={3} direction="right" />
      </div>

      {/* Gradient Orbs */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-pink-600/20 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-3xl" />
    </section>
  );
}
