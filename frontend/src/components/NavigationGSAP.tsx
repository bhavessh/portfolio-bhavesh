import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Menu, X } from 'lucide-react';

const navItems = [
  { label: 'Works', href: '#works' },
  { label: 'Resume', href: '#experience' },
  { label: 'About', href: '#about' },
  { label: 'FUN', href: '#contact' },
];

export default function NavigationGSAP() {
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const menuBtnRef = useRef<HTMLButtonElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial animation
      gsap.fromTo(
        logoRef.current,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out', delay: 0.2 }
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
          backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.8)',
          boxShadow: isScrolled ? '0 4px 30px rgba(0, 0, 0, 0.1)' : 'none',
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

  const handleMobileMenuToggle = () => {
    setIsOpen(!isOpen);
    
    if (!isOpen) {
      gsap.fromTo(
        '.mobile-menu-item',
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.4, stagger: 0.1, ease: 'power3.out' }
      );
    }
  };

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-gray-100 transition-all duration-300"
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            ref={logoRef}
            href="#"
            className="text-xl font-bold tracking-tight hover:opacity-70 transition-opacity"
          >
            BHAVESH
          </a>

          {/* Desktop Nav */}
          <div ref={linksRef} className="hidden md:flex items-center gap-10">
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

          {/* Ask Me Anything Button */}
          <a
            href="#ask-me"
            className="hidden md:flex items-center gap-2 px-5 py-2.5 bg-black text-white text-sm font-medium rounded-full hover:bg-gray-800 transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            Ask Me Anything
          </a>

          {/* Mobile Menu Button */}
          <button
            ref={menuBtnRef}
            onClick={handleMobileMenuToggle}
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-100 shadow-lg">
            <div className="py-6 px-6 space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="mobile-menu-item block text-lg font-medium text-gray-700 hover:text-black transition-colors py-2"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#ask-me"
                onClick={() => setIsOpen(false)}
                className="mobile-menu-item block w-full text-center px-5 py-3 bg-black text-white font-medium rounded-full mt-4"
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
