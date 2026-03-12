
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
      const sections = ['hero', 'about', 'rituals', 'memorias', 'testimonials', 'instagram', 'contact'];
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
    { name: 'Memórias', href: '#memorias', id: 'memorias' },
    { name: 'Depoimentos', href: '#testimonials', id: 'testimonials' },
    { name: 'Galeria', href: '#instagram', id: 'instagram' },
    { name: 'Contato', href: '#contact', id: 'contact' },
  ];

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-bg-light border-b border-terra-1/20",
        isScrolled
          ? "py-3"
          : "py-5"
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
  
          </div>
          <span className="text-balance font-semibold text-primary-dark">
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
          
          {/* Apoiar Button */}
          <a
            href="#donate"
            className="ml-2 bg-primary-dark text-white rounded-sm px-5 py-2.5 transition-colors duration-200 hover:bg-primary font-semibold text-sm inline-flex items-center gap-2"
          >
            <span>Apoiar</span>
          </a>

          {/* CTA Button */}
          <a
            href="https://wa.me/5562996538902?text=Ol%C3%A1!%20Gostaria%20de%20conhecer%20e%20saber%20mais%20informa%C3%A7%C3%B5es%20sobre%20os%20trabalhos%20da%20Casa%20da%20Alquimia."
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 border border-terra-1 text-terra-1 rounded-sm px-5 py-2.5 transition-colors duration-200 hover:bg-terra-1 hover:text-white font-semibold text-sm inline-flex items-center gap-2"
          >
            <Sparkles className="h-4 w-4" />
            <span>Mais informações</span>
          </a>
        </nav>
        
        {/* Mobile Menu Button - Melhorado */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={cn(
            "lg:hidden p-3 rounded-xl transition-all duration-300",
            "hover:bg-primary/10 active:scale-90",
            "shadow-md hover:shadow-lg",
            isMobileMenuOpen 
              ? "bg-primary text-primary-foreground rotate-90" 
              : "bg-white/80 text-foreground"
          )}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </div>
      
      {/* Mobile Menu - Fullscreen overlay melhorado */}
      <div className={cn(
        "fixed inset-0 lg:hidden transition-all duration-500 ease-in-out",
        isMobileMenuOpen ? "z-[60] opacity-100 pointer-events-auto" : "-z-10 opacity-0 pointer-events-none"
      )}>
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-bg-light transition-opacity duration-300"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        
        {/* Menu Content - Slide from right */}
        <div className={cn(
          "absolute right-0 top-0 bottom-0 h-full flex flex-col",
          "bg-bg-light border-l border-terra-1/20",
          "w-[85vw] sm:w-80 z-10",
          "transition-transform duration-500 ease-out",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}>
          {/* Header do menu */}
          <div className="flex items-center justify-between p-6 border-b border-foreground/10 bg-white/50 dark:bg-gray-800/50">
            <Link 
              to="/" 
              className="flex items-center gap-2 font-display text-lg"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <img 
                src="/favicon.png" 
                alt="A Casa da Alquimia Logo" 
                className="h-8 w-auto"
              />
              <span className="font-semibold text-foreground dark:text-white">Menu</span>
            </Link>
            
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 hover:bg-primary/10 rounded-full transition-all duration-300 hover:rotate-90"
              aria-label="Close menu"
            >
              <X className="h-6 w-6 text-foreground dark:text-white" />
            </button>
          </div>
          
          {/* Navigation Links - Scrollable */}
          <nav className="flex flex-col space-y-1 flex-1 overflow-y-auto p-4">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={cn(
                  "group relative p-4 rounded-xl text-left transition-all duration-300",
                  "hover:bg-white/70 dark:hover:bg-gray-700/70 hover:shadow-md active:scale-95",
                  activeSection === item.id && "bg-primary/10 border border-primary/20",
                  isMobileMenuOpen ? `opacity-100 translate-x-0` : `opacity-0 translate-x-8`
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <div className="flex items-center justify-between">
                  <span className={cn(
                    "text-xl font-semibold transition-colors",
                    activeSection === item.id 
                      ? "text-primary dark:text-primary" 
                      : "text-foreground/80 dark:text-gray-200 group-hover:text-primary"
                  )}>
                    {item.name}
                  </span>
                  
                  {/* Indicador de seção ativa */}
                  {activeSection === item.id && (
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                  )}
                </div>
                
              </a>
            ))}

            {/* Apoiar Button */}
            <a
              href="#donate"
              className={cn(
                "group relative p-4 rounded-xl text-left transition-all duration-300",
                "bg-[#1A3A6B] text-white hover:bg-[#1A3A6B]/90 hover:shadow-md active:scale-95",
                isMobileMenuOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
              )}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span className="text-xl font-semibold">Apoiar</span>
            </a>
          </nav>

          {/* CTA no mobile - Sticky bottom */}
          <div className="p-4 border-t border-foreground/10 bg-white/50 dark:bg-gray-800/50">
            <a
              href="https://wa.me/5562996538902?text=Ol%C3%A1!%20Gostaria%20de%20conhecer%20e%20saber%20mais%20informa%C3%A7%C3%B5es%20sobre%20os%20trabalhos%20da%20Casa%20da%20Alquimia."
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "flex items-center justify-center gap-2 w-full px-6 py-4",
                "bg-primary text-white rounded-sm transition-colors duration-200 hover:bg-primary-dark",
                "font-semibold active:scale-95",
                isMobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              )}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Sparkles className="h-5 w-5" />
              <span>Quero saber mais</span>
            </a>
            
            {/* Informação adicional */}
            <p className="text-center text-xs text-foreground/60 dark:text-gray-300 mt-3">
              Estamos aqui para te ajudar ✨
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
