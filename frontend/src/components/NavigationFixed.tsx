import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Menu, X } from 'lucide-react';

const navItems = [
  { label: 'Works', href: '#works' },
  { label: 'Resume', href: '#experience' },
  { label: 'About', href: '#about' },
  { label: 'FUN', href: '#contact' },
];

export default function NavigationFixed() {
  const navRef = useRef<HTMLElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (scrolled) {
      gsap.to(navRef.current, {
        backgroundColor: 'rgba(255, 255, 255, 0.98)',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.08)',
        duration: 0.3,
        ease: 'power2.out'
      });
    } else {
      gsap.to(navRef.current, {
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        boxShadow: 'none',
        duration: 0.3,
        ease: 'power2.out'
      });
    }
  }, [scrolled]);

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
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-gray-100/50 transition-all duration-300"
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="text-xl font-bold tracking-tight hover:opacity-70 transition-opacity z-10">
            BHAVESH
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center">
            <div className="flex items-center gap-8 bg-white/50 px-8 py-3 rounded-full border border-gray-200/50">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => scrollToSection(item.href)}
                  className="text-sm font-medium text-gray-600 hover:text-black transition-colors duration-200 relative group"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full" />
                </button>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <button
            onClick={openAskMeAnything}
            className="hidden md:block px-6 py-2.5 bg-black text-white text-sm font-medium rounded-full hover:bg-gray-800 transition-all duration-300 hover:scale-105 hover:shadow-lg z-10"
          >
            Ask Me Anything
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors z-10"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-100 shadow-xl">
            <div className="py-6 px-6 space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => scrollToSection(item.href)}
                  className="block w-full text-left text-lg font-medium text-gray-700 hover:text-black transition-colors py-2"
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={openAskMeAnything}
                className="w-full text-center px-5 py-3 bg-black text-white font-medium rounded-full mt-4"
              >
                Ask Me Anything
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
