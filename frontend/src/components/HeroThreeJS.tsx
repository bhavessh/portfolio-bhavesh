import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap/dist/gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { motion } from 'framer-motion';
import { Sparkles, Code2, Palette, Zap } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HeroThreeJS() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const particlesRef = useRef<Array<{ x: number; y: number; z: number; vx: number; vy: number; vz: number; size: number; color: string }>>([]);
  const animationFrameRef = useRef<number>(0);

  // Initialize 3D particle system
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Initialize particles
    const particleCount = 50;
    const colors = ['#6366f1', '#8b5cf6', '#ec4899', '#3b82f6', '#10b981'];
    
    particlesRef.current = Array.from({ length: particleCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      z: Math.random() * 1000 - 500,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      vz: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 4 + 2,
      color: colors[Math.floor(Math.random() * colors.length)]
    }));

    // Animation loop
    let time = 0;
    const animate = () => {
      time += 0.01;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particlesRef.current.forEach((particle, i) => {
        // 3D rotation effect
        const rotateX = mousePosition.y * 0.001;
        const rotateY = mousePosition.x * 0.001;

        // Apply rotation
        const y = particle.y * Math.cos(rotateX) - particle.z * Math.sin(rotateX);
        const z = particle.y * Math.sin(rotateX) + particle.z * Math.cos(rotateX);
        const x = particle.x * Math.cos(rotateY) - z * Math.sin(rotateY);

        // Update positions
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.z += particle.vz;

        // Boundary check with wrap-around
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Calculate 3D projection
        const scale = 1000 / (1000 + particle.z);
        const x2d = x;
        const y2d = y;
        const size = particle.size * scale;
        const alpha = Math.max(0.2, Math.min(1, scale));

        // Draw particle with glow
        const gradient = ctx.createRadialGradient(x2d, y2d, 0, x2d, y2d, size * 2);
        gradient.addColorStop(0, particle.color + '80');
        gradient.addColorStop(0.5, particle.color + '40');
        gradient.addColorStop(1, 'transparent');

        ctx.beginPath();
        ctx.arc(x2d, y2d, size * 2, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Draw core
        ctx.beginPath();
        ctx.arc(x2d, y2d, size * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = particle.color + 'FF';
        ctx.fill();

        // Connect nearby particles
        particlesRef.current.slice(i + 1).forEach((other) => {
          const dx = particle.x - other.x;
          const dy = particle.y - other.y;
          const dz = particle.z - other.z;
          const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (distance < 150) {
            const alpha = (1 - distance / 150) * 0.3;
            ctx.beginPath();
            ctx.moveTo(x2d, y2d);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(99, 102, 241, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, [mousePosition]);

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // GSAP scroll animations - client side only
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const ctx = gsap.context(() => {
      // Scroll-triggered text reveal
      gsap.fromTo('.hero-title',
        { opacity: 0, y: 50, rotateX: 45 },
        { 
          opacity: 1, 
          y: 0, 
          rotateX: 0, 
          duration: 1, 
          ease: 'power3.out',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Image subtle parallax on scroll (no flip)
      gsap.to(imageRef.current, {
        y: 30,
        scale: 1.05,
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1
        }
      });

      // Parallax effect for highlights
      gsap.to('.highlight-card', {
        y: -50,
        stagger: 0.1,
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
    <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden">
      {/* 3D Particle Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(135deg, #fafafa 0%, #f0f0f0 50%, #e8e8e8 100%)' }}
      />

      {/* Floating Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-20 w-96 h-96 bg-indigo-300/30 rounded-full blur-3xl"
          animate={{
            x: mousePosition.x * 30,
            y: mousePosition.y * 30,
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-80 h-80 bg-purple-300/30 rounded-full blur-3xl"
          animate={{
            x: -mousePosition.x * 20,
            y: -mousePosition.y * 20,
            scale: [1.2, 1, 1.2],
          }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-64 h-64 bg-pink-300/20 rounded-full blur-3xl"
          animate={{
            x: mousePosition.x * 40 - 128,
            y: mousePosition.y * 40 - 128,
          }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="order-2 lg:order-1">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 mb-6"
            >
              <span className="px-4 py-2 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 rounded-full text-sm font-semibold tracking-wide">
                <span className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Available for Work
                </span>
              </span>
            </motion.div>

            {/* Name */}
            <div className="hero-title" style={{ perspective: '1000px' }}>
              <p className="text-sm text-gray-500 mb-2 font-medium tracking-wide uppercase">
                BHAVESH
              </p>
              <h1 className="mb-6">
                <span className="block text-5xl md:text-7xl font-bold text-gray-900 leading-tight">
                  Full Stack
                </span>
                <span className="block text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight mt-1">
                  Developer & SaaS Builder
                </span>
              </h1>
            </div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-xl text-gray-600 mb-8 max-w-lg leading-relaxed"
            >
              Building digital experiences that matter. Crafting performant, clean, and accessible web applications with modern technologies.
            </motion.p>

            {/* Highlights */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {[
                { icon: Code2, label: 'Designed for', value: 'Fast moving teams' },
                { icon: Zap, label: 'Winner', value: '5+ hackathons' },
                { icon: Palette, label: 'Built', value: '15+ projects' },
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }}
                  className="highlight-card text-center p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-white/50 shadow-sm"
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  <item.icon className="w-6 h-6 mx-auto mb-2 text-indigo-600" />
                  <p className="text-xs text-gray-500 mb-1">{item.label}</p>
                  <p className="text-sm font-semibold text-gray-900">{item.value}</p>
                </motion.div>
              ))}
            </div>

          </div>

          {/* Right Content - Simple Image */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <div
              ref={imageRef}
              className="relative w-72 h-72 md:w-96 md:h-96"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Glowing ring */}
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-30 blur-xl"
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
              />

              {/* Image container */}
              <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white shadow-2xl">
                <img
                  src="/images/profile.jpg"
                  alt="Bhavesh"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600/20 via-transparent to-purple-600/20" />
              </div>

              {/* Floating tech badges */}
              <motion.div
                className="absolute -top-4 -right-4 px-3 py-1.5 bg-white rounded-full shadow-lg text-xs font-semibold text-indigo-600"
                animate={{ y: [0, -5, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                React
              </motion.div>
              <motion.div
                className="absolute -bottom-2 -left-2 px-3 py-1.5 bg-white rounded-full shadow-lg text-xs font-semibold text-purple-600"
                animate={{ y: [0, 5, 0], rotate: [0, -5, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
              >
                Node.js
              </motion.div>
              <motion.div
                className="absolute top-1/2 -right-8 px-3 py-1.5 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full shadow-lg text-xs font-semibold text-white"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              >
                3+ Years
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
