import { motion } from 'framer-motion';
import { Sparkles, ArrowDown, Code2, Palette, Zap } from 'lucide-react';

const highlights = [
  { icon: Code2, label: 'Designed for', value: 'Fast moving teams @ Startups' },
  { icon: Zap, label: 'Winner', value: '5+ hackathons & competitions' },
  { icon: Palette, label: 'Built', value: '15+ projects shipped' },
];

const floatingShapes = [
  { color: 'bg-indigo-500/20', size: 'w-64 h-64', position: 'top-20 -left-20', delay: 0 },
  { color: 'bg-purple-500/20', size: 'w-48 h-48', position: 'bottom-20 right-10', delay: 0.5 },
  { color: 'bg-pink-500/20', size: 'w-32 h-32', position: 'top-40 right-40', delay: 1 },
];

export default function Hero() {
  return (
    <section className="min-h-screen pt-32 pb-20 flex items-center relative overflow-hidden">
      {/* Floating Background Shapes */}
      {floatingShapes.map((shape, index) => (
        <motion.div
          key={index}
          className={`absolute ${shape.size} ${shape.color} rounded-full blur-3xl`}
          style={{ 
            left: shape.position.includes('left') ? '-10%' : undefined,
            right: shape.position.includes('right') ? '10%' : undefined,
            top: shape.position.includes('top') ? '20%' : undefined,
            bottom: shape.position.includes('bottom') ? '20%' : undefined,
          }}
          animate={{
            y: [0, -30, 0],
            scale: [1, 1.1, 1],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            delay: shape.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Text Content */}
          <div className="order-2 lg:order-1">
            {/* Name Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 mb-6"
            >
              <span className="px-4 py-2 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 rounded-full text-sm font-semibold tracking-wide">
                <span className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Available for Work
                </span>
              </span>
            </motion.div>

            {/* Name - Original Bold Style */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-sm text-gray-500 mb-2 font-medium tracking-wide uppercase"
            >
              BHAVESH
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.1, type: "spring", stiffness: 100 }}
              className="mb-6"
            >
              <span className="block text-5xl md:text-7xl font-bold text-gray-900 leading-tight hover:text-indigo-600 transition-colors duration-500">
                Full Stack
              </span>
              <motion.span 
                className="block text-5xl md:text-7xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight mt-1"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3, type: "spring" }}
                whileHover={{ scale: 1.02, letterSpacing: "0.02em" }}
              >
                Developer
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-xl text-gray-600 mb-8 max-w-lg leading-relaxed"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Building scalable web applications with{' '}
              <span className="text-indigo-600 font-semibold">MERN stack</span> &{' '}
              <span className="text-purple-600 font-semibold">Astro</span>. 
              Focused on performance, clean code, and exceptional user experience.
            </motion.p>

            {/* Highlights with Icons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="space-y-4 mb-8"
            >
              {highlights.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                  whileHover={{ x: 10, scale: 1.02 }}
                  className="flex items-center gap-4 group cursor-pointer"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl flex items-center justify-center group-hover:from-indigo-500 group-hover:to-purple-500 transition-all duration-300">
                    <item.icon className="w-5 h-5 text-indigo-600 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider font-medium">{item.label}</p>
                    <p className="text-sm font-semibold text-gray-900">{item.value}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="flex flex-wrap gap-4"
            >
              <motion.a
                href="#works"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full font-semibold shadow-lg shadow-indigo-500/30 hover:shadow-xl transition-all"
              >
                View My Work
              </motion.a>
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-gray-800 border-2 border-gray-200 rounded-full font-semibold hover:border-indigo-500 hover:text-indigo-600 transition-all"
              >
                Get In Touch
              </motion.a>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden lg:block"
            >
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="flex flex-col items-center gap-2 text-gray-400"
              >
                <span className="text-xs uppercase tracking-widest">Scroll</span>
                <ArrowDown className="w-4 h-4" />
              </motion.div>
            </motion.div>
          </div>

          {/* Right - Photo with Animations */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.3, type: "spring" }}
            className="order-1 lg:order-2 flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Animated Background Ring */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl blur-xl opacity-50"
                animate={{
                  scale: [1, 1.05, 1],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              
              <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-3xl overflow-hidden bg-gray-100 border-4 border-white shadow-2xl">
                {/* Image with bottom-to-top reveal animation */}
                <motion.div
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ 
                    duration: 0.8, 
                    delay: 0.5, 
                    ease: [0.25, 0.46, 0.45, 0.94] 
                  }}
                  className="absolute inset-0"
                >
                  <img
                    src="/image.png"
                    alt="Bhavesh"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </div>

              {/* Floating Badge */}
              <motion.div
                className="absolute -bottom-4 -left-4 bg-white rounded-2xl p-4 shadow-xl border border-gray-100"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, type: "spring" }}
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">3+</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">Years Exp.</p>
                    <p className="text-xs text-gray-500">Full Stack Dev</p>
                  </div>
                </div>
              </motion.div>

              {/* Tech Stack Floating Tags */}
              <motion.div
                className="absolute -top-4 -right-4 bg-white rounded-full px-4 py-2 shadow-lg border border-gray-100"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <span className="text-sm font-semibold text-indigo-600">React ⚛️</span>
              </motion.div>

              <motion.div
                className="absolute top-1/2 -right-8 bg-white rounded-full px-4 py-2 shadow-lg border border-gray-100"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
              >
                <span className="text-sm font-semibold text-purple-600">Node 🟢</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
