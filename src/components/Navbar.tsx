import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled 
          ? "py-3 glass shadow-sm" 
          : "py-5 bg-transparent"
      )}
    >
      <div className="container mx-auto px-6 md:px-8 flex items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center gap-2 font-display text-lg md:text-xl"
        >
          <img 
            src="/lovable-uploads/ddb33374-a35f-48fc-8626-649408abcc43.png" 
            alt="A Casa da Alquimia Logo" 
            className="h-6 w-auto"
          />
          <span className="text-balance">A Casa da Alquimia</span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-8">
          {[
            { name: 'Início', href: '#hero' },
            { name: 'Sobre', href: '#about' },
            { name: 'Rituais', href: '#rituals' },
            { name: 'Depoimentos', href: '#testimonials' },
            { name: 'Contato', href: '#contact' },
          ].map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-foreground/90 hover:text-primary transition-colors link-underline text-sm font-medium"
            >
              {item.name}
            </a>
          ))}
          
          <a
            href="#donate"
            className="px-5 py-2 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:bg-primary/90 transition-colors shadow-sm"
          >
            Doar
          </a>
        </nav>
        
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-foreground"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>
      
      <div
        className={cn(
          "fixed inset-0 z-40 bg-background/95 backdrop-blur transition-all duration-300 flex flex-col p-6",
          isMobileMenuOpen 
            ? "opacity-100 translate-x-0" 
            : "opacity-0 -translate-x-full pointer-events-none"
        )}
      >
        <div className="flex items-center justify-end mb-8">
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-foreground"
            aria-label="Close menu"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <nav className="flex flex-col space-y-6 items-center justify-center flex-1">
          {[
            { name: 'Início', href: '#hero' },
            { name: 'Sobre', href: '#about' },
            { name: 'Rituais', href: '#rituals' },
            { name: 'Depoimentos', href: '#testimonials' },
            { name: 'Contato', href: '#contact' },
          ].map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-foreground/90 hover:text-primary transition-colors text-lg font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.name}
            </a>
          ))}
          
          <a
            href="#donate"
            className="mt-4 px-8 py-3 bg-primary text-primary-foreground rounded-full text-base font-medium hover:bg-primary/90 transition-colors shadow-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Doar
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
