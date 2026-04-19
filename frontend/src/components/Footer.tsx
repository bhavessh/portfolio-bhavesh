import { Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 border-t theme-border theme-bg">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm theme-text-muted">
            © {currentYear} Portfolio. All rights reserved.
          </p>
          
          <p className="text-sm theme-text-muted flex items-center gap-1">
            Built with <Heart className="w-4 h-4 text-[var(--accent)] fill-current" /> using Astro & React
          </p>
        </div>
      </div>
    </footer>
  );
}
