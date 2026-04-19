'use client';

import { useState, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { ThemeContext } from '../context/ThemeContext';

type Theme = 'dark' | 'light';

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const context = useContext(ThemeContext);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  // Default to dark if context not available
  const theme: Theme = context?.theme ?? 'dark';
  const toggleTheme = context?.toggleTheme ?? (() => {
    // Fallback: toggle manually via document
    const current = document.documentElement.getAttribute('data-theme') as Theme || 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });
  const isDark = theme === 'dark';

  // Show placeholder during SSR or if context not ready
  if (!mounted) {
    return (
      <div 
        className="fixed bottom-6 left-6 w-14 h-14 rounded-full flex items-center justify-center pointer-events-none"
        style={{ 
          zIndex: 99999,
          backgroundColor: '#0a0a0f',
          border: '4px solid #ccff00',
          boxShadow: '0 0 40px rgba(204, 255, 0, 0.8)'
        }}
      >
        <Moon className="w-7 h-7" style={{ color: '#ccff00' }} />
      </div>
    );
  }

  return (
    <motion.button
      onClick={toggleTheme}
      className="fixed bottom-6 left-6 w-14 h-14 rounded-full flex items-center justify-center"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      style={{
        zIndex: 99999,
        backgroundColor: isDark ? '#0a0a0f' : '#ffffff',
        border: isDark ? '4px solid #ccff00' : '4px solid #37352f',
        boxShadow: isDark 
          ? '0 0 40px rgba(204, 255, 0, 0.8), 0 4px 20px rgba(0,0,0,0.5)' 
          : '0 4px 20px rgba(0,0,0,0.15), 0 0 40px rgba(0,0,0,0.1)'
      }}
      whileHover={{ scale: 1.15, boxShadow: isDark 
        ? '0 0 60px rgba(204, 255, 0, 1)' 
        : '0 6px 30px rgba(0,0,0,0.2)'
      }}
      whileTap={{ scale: 0.9 }}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.div
            key="moon"
            initial={{ opacity: 0, rotate: -90 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 90 }}
            transition={{ duration: 0.2 }}
          >
            <Moon className="w-7 h-7" style={{ color: '#ccff00' }} />
          </motion.div>
        ) : (
          <motion.div
            key="sun"
            initial={{ opacity: 0, rotate: 90 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: -90 }}
            transition={{ duration: 0.2 }}
          >
            <Sun className="w-7 h-7" style={{ color: '#f59e0b' }} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
