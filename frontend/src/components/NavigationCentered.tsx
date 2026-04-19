import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Menu, X } from 'lucide-react';

const navItems = [
  { label: 'Works', href: '#works' },
  { label: 'Resume', href: '#experience' },
  { label: 'About', href: '#about' },
  { label: 'FUN', href: '#contact' },
];

export default function NavigationCentered() {
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        logoRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.2 }
      );

      gsap.fromTo(
        linksRef.current?.children || [],
        { opacity: 0, y: -10 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.6, 
          stagger: 0.1, 
          ease: 'power3.out',
          delay: 0.4 
        }
      );
    }, navRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
        
        gsap.to(navRef.current, {
          backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.95)' : 'transparent',
          boxShadow: isScrolled ? '0 4px 30px rgba(0, 0, 0, 0.05)' : 'none',
          duration: 0.3,
          ease: 'power2.out'
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  const handleLinkHover = (e: React.MouseEvent<HTMLAnchorElement>) => {
    gsap.to(e.currentTarget, {
      scale: 1.05,
      duration: 0.2,
      ease: 'power2.out'
    });
  };

  const handleLinkLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    gsap.to(e.currentTarget, {
      scale: 1,
      duration: 0.2,
      ease: 'power2.out'
    });
  };

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    >
      <div className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-center">
          {/* Desktop Nav - Centered */}
          <div 
            ref={linksRef} 
            className="hidden md:flex items-center gap-12 bg-white/90 backdrop-blur-md px-10 py-4 rounded-full border border-gray-100 shadow-sm"
          >
            {/* Logo on left of center */}
            <a
              ref={logoRef}
              href="#"
              className="text-lg font-bold tracking-tight hover:opacity-70 transition-opacity absolute left-8"
            >
              BHAVESH
            </a>

            {/* Center Navigation */}
            <div className="flex items-center gap-10">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onMouseEnter={handleLinkHover}
                  onMouseLeave={handleLinkLeave}
                  className="text-sm font-medium text-gray-500 hover:text-black transition-colors duration-200 relative group"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </div>

            {/* CTA on right */}
            <a
              href="#ask-me"
              className="absolute right-8 px-6 py-2.5 bg-black text-white text-sm font-medium rounded-full hover:bg-gray-800 transition-all duration-300 hover:scale-105"
            >
              Ask Me Anything
            </a>
          </div>

          {/* Mobile Layout */}
          <div className="md:hidden flex items-center justify-between w-full">
            <a href="#" className="text-lg font-bold tracking-tight">
              BHAVESH
            </a>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {isOpen && (
          <div className="md:hidden absolute top-full left-4 right-4 bg-white rounded-2xl border border-gray-100 shadow-xl mt-2">
            <div className="py-6 px-6 space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="block text-lg font-medium text-gray-700 hover:text-black transition-colors py-2"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#ask-me"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center px-5 py-3 bg-black text-white font-medium rounded-full mt-4"
              >
                Ask Me Anything
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
