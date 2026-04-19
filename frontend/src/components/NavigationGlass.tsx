import { useEffect, useState, useRef, useContext } from 'react';
import { gsap } from 'gsap';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Youtube, Github, Linkedin, Twitter, Sun, Moon, Bot } from 'lucide-react';
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
    return { theme: 'dark' as Theme, toggleTheme: () => {}, setTheme: () => {}, mounted: false };
  }
  
  return { ...ctx, mounted: true };
}

const navItems = [
  { label: 'Works', href: '#works' },
  { label: 'Resume', href: '#experience' },
  { label: 'Certificates', href: '#certificates' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

const iconMap: Record<string, React.ElementType> = {
  youtube: Youtube,
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter
};

export default function NavigationGlass() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [socialLinks, setSocialLinks] = useState<{name: string, url: string, icon: string}[]>([
    { name: 'YouTube', url: 'https://youtube.com/@bhavessh', icon: 'youtube' },
    { name: 'GitHub', url: 'https://github.com/bhavessh', icon: 'github' },
    { name: 'LinkedIn', url: 'https://linkedin.com/in/bhavessh', icon: 'linkedin' },
    { name: 'Twitter', url: 'https://twitter.com/bhavessh', icon: 'twitter' }
  ]);
  const { theme, toggleTheme, mounted } = useThemeClient();
  const isDark = theme === 'dark';

  // Fetch site config for social links
  useEffect(() => {
    async function fetchSiteConfig() {
      try {
        const res = await fetch(`${import.meta.env.PUBLIC_API_URL || 'http://localhost:5001/api'}/siteconfig`);
        if (res.ok) {
          const data = await res.json();
          if (data.socialLinks && data.socialLinks.length > 0) {
            setSocialLinks(data.socialLinks);
          }
        }
      } catch (error) {
        console.error('Failed to fetch site config:', error);
      }
    }
    fetchSiteConfig();
    
    // Auto-refresh every 5 seconds
    const interval = setInterval(() => {
      if (!document.hidden) {
        fetchSiteConfig();
      }
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  const openAskMeAnything = () => {
    const event = new CustomEvent('openAskMeAnything');
    window.dispatchEvent(event);
    setIsOpen(false);
  };

  return (
    <>
      {/* Navbar - Always visible with hover effects */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`fixed top-3 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl rounded-full border transition-all duration-500 ${
          scrolled 
            ? isDark 
              ? 'bg-[#0a0a0f]/90 backdrop-blur-2xl border-white/10 shadow-2xl shadow-black/30' 
              : 'bg-white/90 backdrop-blur-2xl border-gray-200/50 shadow-xl shadow-gray-200/50'
            : isDark
              ? 'bg-[#0a0a0f]/70 backdrop-blur-xl border-white/5 hover:bg-[#0a0a0f]/80 hover:border-white/10'
              : 'bg-white/70 backdrop-blur-xl border-gray-200/30 hover:bg-white/80 hover:border-gray-300/50'
        }`}
      >
        <div className="px-6 py-3">
          <div className="flex items-center justify-between relative">
            
            {/* LEFT - Social Icons */}
            <div className="flex items-center gap-2 w-[140px]">
              {socialLinks.map((social, index) => {
                const IconComponent = iconMap[social.icon] || Youtube;
                return (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-2.5 rounded-full transition-all duration-300 group relative overflow-hidden"
                  style={{ 
                    color: isDark ? 'rgba(255,255,255,0.6)' : 'rgba(55,53,47,0.6)',
                    backgroundColor: 'transparent'
                  }}
                  whileHover={{ 
                    scale: 1.15,
                    backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                    color: isDark ? '#ccff00' : '#37352f'
                  }}
                  whileTap={{ scale: 0.9 }}
                  title={social.name}
                >
                  <IconComponent className="w-4 h-4 relative z-10" />
                  {/* Glow effect on hover */}
                  <motion.span
                    className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: isDark 
                        ? 'radial-gradient(circle, rgba(204,255,0,0.3) 0%, transparent 70%)'
                        : 'radial-gradient(circle, rgba(55,53,47,0.1) 0%, transparent 70%)'
                    }}
                  />
                </motion.a>
                );
              })}
            </div>

            {/* CENTER - Navigation Items */}
            <div className="hidden md:flex items-center justify-center flex-1 absolute left-1/2 -translate-x-1/2">
              <NavPill 
                navItems={navItems} 
                onNavigate={scrollToSection} 
                isDark={isDark} 
              />
            </div>

            {/* RIGHT - Theme Toggle + Bot Button */}
            <div className="flex items-center gap-3 w-[140px] justify-end">
              {/* Theme Toggle */}
              <motion.button
                onClick={toggleTheme}
                className="p-2.5 rounded-full transition-all duration-300"
                style={{ 
                  color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(55,53,47,0.7)',
                  backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)'
                }}
                whileHover={{ 
                  scale: 1.1, 
                  rotate: 15,
                  backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'
                }}
                whileTap={{ scale: 0.9 }}
                title={isDark ? 'Switch to Light' : 'Switch to Dark'}
              >
                <AnimatePresence mode="wait">
                  {isDark ? (
                    <motion.div
                      key="moon"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Moon className="w-4 h-4" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="sun"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Sun className="w-4 h-4" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>

              {/* Ask My Bot Button */}
              <motion.button
                onClick={openAskMeAnything}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-full font-medium text-sm transition-all duration-300 group"
                style={{ 
                  backgroundColor: isDark ? '#ccff00' : '#2d2d2d',
                  color: isDark ? '#000000' : '#ffffff',
                  boxShadow: isDark 
                    ? '0 0 20px rgba(204,255,0,0.3)' 
                    : '0 4px 15px rgba(0,0,0,0.15)'
                }}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: isDark 
                    ? '0 0 30px rgba(204,255,0,0.5)' 
                    : '0 6px 25px rgba(0,0,0,0.25)'
                }}
                whileTap={{ scale: 0.95 }}
              >
                <Bot className="w-4 h-4" />
                <span>Ask My Bot</span>
              </motion.button>

              {/* Mobile Menu Button */}
              <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden p-2.5 rounded-full transition-all duration-300"
                style={{ 
                  color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(55,53,47,0.7)',
                  backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)'
                }}
                whileHover={{ 
                  scale: 1.1,
                  backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'
                }}
                whileTap={{ scale: 0.9 }}
              >
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Nav Drawer */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden"
              style={{ 
                backgroundColor: isDark ? 'rgba(10,10,15,0.98)' : 'rgba(255,255,255,0.98)',
                borderTop: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`
              }}
            >
              <div className="px-6 py-4 space-y-2">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.label}
                    onClick={() => scrollToSection(item.href)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="block w-full text-left px-4 py-3 text-sm font-medium rounded-xl transition-all duration-300"
                    style={{ 
                      color: isDark ? 'rgba(255,255,255,0.8)' : 'rgba(55,53,47,0.8)'
                    }}
                    whileHover={{ 
                      x: 8,
                      backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
                      color: isDark ? '#ccff00' : '#2d2d2d'
                    }}
                  >
                    {item.label}
                  </motion.button>
                ))}
                
                {/* Mobile Social Links */}
                <div className="flex items-center gap-3 pt-4 px-4 border-t mt-2" 
                  style={{ borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }}
                >
                  {socialLinks.map((social) => {
                    const MobileIcon = iconMap[social.icon] || Youtube;
                    return (
                      <a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg transition-colors duration-300"
                        style={{ color: isDark ? 'rgba(255,255,255,0.6)' : 'rgba(55,53,47,0.6)' }}
                      >
                        <MobileIcon className="w-5 h-5" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Minimal spacer for floating navbar */}
      <div className="h-20" />
    </>
  );
}

// Center Pill Navigation with Hover Effects
function NavPill({ 
  navItems, 
  onNavigate,
  isDark
}: { 
  navItems: { label: string; href: string }[];
  onNavigate: (href: string) => void;
  isDark: boolean;
}) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleClick = (index: number, href: string) => {
    setActiveIndex(index);
    onNavigate(href);
  };

  return (
    <div 
      className="relative flex items-center gap-1 px-2 py-2 rounded-full"
      style={{
        backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
        border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'}`,
      }}
    >
      {navItems.map((item, index) => (
        <motion.button
          key={item.label}
          onClick={() => handleClick(index, item.href)}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
          className="relative px-4 py-2 text-sm font-medium rounded-full transition-colors duration-300 z-10"
          style={{ 
            color: activeIndex === index 
              ? (isDark ? '#ffffff' : '#2d2d2d')
              : (isDark ? 'rgba(255,255,255,0.6)' : 'rgba(55,53,47,0.6)')
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Background hover effect */}
          {(hoveredIndex === index || activeIndex === index) && (
            <motion.span
              layoutId="navBg"
              className="absolute inset-0 rounded-full -z-10"
              initial={false}
              animate={{
                backgroundColor: activeIndex === index 
                  ? (isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.08)')
                  : (isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.04)')
              }}
              transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
            />
          )}
          {item.label}
        </motion.button>
      ))}
    </div>
  );
}
