
import { cn } from '@/lib/utils';
import { Menu, Sparkles, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Detectar seção ativa
      const sections = ['hero', 'about', 'rituals', 'testimonials', 'instagram', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { name: 'Início', href: '#hero', id: 'hero' },
    { name: 'Sobre', href: '#about', id: 'about' },
    { name: 'Rituais', href: '#rituals', id: 'rituals' },
    { name: 'Depoimentos', href: '#testimonials', id: 'testimonials' },
    { name: 'Galeria', href: '#instagram', id: 'instagram' },
    { name: 'Contato', href: '#contact', id: 'contact' },
  ];

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled 
          ? "py-3 bg-white/80 backdrop-blur-2xl shadow-lg border-b border-white/20" 
          : "py-5 bg-white/60 backdrop-blur-xl"
      )}
    >
      <div className="container mx-auto px-6 md:px-8 flex items-center justify-between">
        {/* Logo com animação */}
        <Link 
          to="/" 
          className="flex items-center gap-3 font-display text-lg md:text-xl group relative"
        >
          <div className="relative">
            <img 
              src="/favicon.png" 
              alt="A Casa da Alquimia Logo" 
              className={cn(
                "w-auto transition-all duration-500",
                isScrolled ? "h-10" : "h-12"
              )}
            />
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full opacity-0 group-hover:opacity-100 blur transition-opacity duration-300" />
          </div>
          <span className="text-balance font-semibold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
            A Casa da Alquimia
          </span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-2">
          {menuItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={cn(
                "relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-300",
                activeSection === item.id
                  ? "text-primary bg-primary/10"
                  : "text-foreground/70 hover:text-primary hover:bg-primary/5"
              )}
            >
              {item.name}
              {activeSection === item.id && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full" />
              )}
            </a>
          ))}
          
          {/* CTA Button */}
          <a
            href="#contact"
            className="ml-4 px-5 py-2.5 bg-primary text-primary-foreground rounded-full font-semibold text-sm shadow-lg hover:shadow-xl hover:shadow-primary/50 transition-all duration-300 hover:scale-105 inline-flex items-center gap-2"
          >
            <Sparkles className="h-4 w-4" />
            <span>Agendar</span>
          </a>
        </nav>
        
        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden p-2 hover:bg-primary/10 rounded-full transition-colors"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6 text-foreground" />
          ) : (
            <Menu className="h-6 w-6 text-foreground" />
          )}
        </button>
      </div>
      
      {/* Mobile Menu - Fullscreen overlay */}
      <div
        className={cn(
          "fixed inset-0 z-40 lg:hidden transition-all duration-500",
          isMobileMenuOpen 
            ? "opacity-100 pointer-events-auto" 
            : "opacity-0 pointer-events-none"
        )}
      >
        {/* Backdrop com blur */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-background/95 via-primary/10 to-secondary/10 backdrop-blur-2xl"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        
        {/* Menu Content */}
        <div className={cn(
          "relative h-full flex flex-col p-8 transition-transform duration-500",
          isMobileMenuOpen ? "translate-y-0" : "-translate-y-full"
        )}>
          {/* Close Button */}
          <div className="flex items-center justify-between mb-12">
            <Link 
              to="/" 
              className="flex items-center gap-2 font-display text-xl"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <img 
                src="/favicon.png" 
                alt="A Casa da Alquimia Logo" 
                className="h-10 w-auto"
              />
            </Link>
            
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 hover:bg-primary/10 rounded-full transition-colors"
              aria-label="Close menu"
            >
              <X className="h-7 w-7 text-foreground" />
            </button>
          </div>
          
          {/* Navigation Links */}
          <nav className="flex flex-col space-y-2 flex-1">
            {menuItems.map((item, index) => (
              <a
                key={item.name}
                href={item.href}
                className={cn(
                  "group p-4 rounded-2xl text-left transition-all duration-300 hover:bg-white/60 hover:shadow-lg",
                  isMobileMenuOpen ? `opacity-100 translate-x-0` : `opacity-0 translate-x-10`
                )}
                style={{ 
                  transitionDelay: isMobileMenuOpen ? `${index * 50}ms` : '0ms' 
                }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className={cn(
                  "text-2xl font-semibold transition-colors",
                  activeSection === item.id ? "text-primary" : "text-foreground/80 group-hover:text-primary"
                )}>
                  {item.name}
                </span>
              </a>
            ))}
          </nav>
          
          {/* CTA no mobile */}
          <div className="pt-6 border-t border-foreground/10">
            <a
              href="#contact"
              className="flex items-center justify-center gap-2 w-full px-6 py-4 bg-primary text-primary-foreground rounded-2xl font-semibold shadow-lg hover:shadow-xl hover:shadow-primary/50 transition-all duration-300"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Sparkles className="h-5 w-5" />
              <span>Agendar Conversa</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
