import { cn } from '@/lib/utils';
import { Leaf, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
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
          <Leaf className="h-5 w-5 text-spirit-600" />
          <span className="text-balance">A Casa da Alquimia</span>
        </Link>
        
  <nav className="hidden md:flex items-center space-x-8">
          {[
            { name: 'Início', href: '#hero', isRoute: false },
            { name: 'Sobre', href: '#about', isRoute: false },
            { name: 'Rituais', href: '#rituals', isRoute: false },
            { name: 'Eventos', href: '/eventos', isRoute: true },
            { name: 'Depoimentos', href: '#testimonials', isRoute: false },
            { name: 'Contato', href: '#contact', isRoute: false },
          ].map((item) => (
            item.isRoute ? (
              <button
                key={item.name}
                className="text-foreground/90 hover:text-primary transition-colors link-underline text-sm font-medium bg-transparent border-none outline-none cursor-pointer"
                onClick={() => {
                  if (location.pathname === item.href) {
                    navigate(0); // força reload da rota
                  } else {
                    navigate(item.href);
                  }
                }}
                type="button"
              >
                {item.name}
              </button>
            ) : (
              <button
                key={item.name}
                className="text-foreground/90 hover:text-primary transition-colors link-underline text-sm font-medium bg-transparent border-none outline-none cursor-pointer"
                onClick={() => {
                  if (location.pathname !== '/') {
                    navigate('/');
                    setTimeout(() => {
                      const el = document.querySelector(item.href);
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  } else {
                    const el = document.querySelector(item.href);
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                type="button"
              >
                {item.name}
              </button>
            )
          ))}
        </nav>
      </div>

      {/* Mobile Menu */}
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
            { name: 'Início', href: '#hero', isRoute: false },
            { name: 'Sobre', href: '#about', isRoute: false },
            { name: 'Rituais', href: '#rituals', isRoute: false },
            { name: 'Eventos', href: '/eventos', isRoute: true },
            { name: 'Depoimentos', href: '#testimonials', isRoute: false },
            { name: 'Contato', href: '#contact', isRoute: false },
          ].map((item) => (
            item.isRoute ? (
              <button
                key={item.name}
                className="text-foreground/90 hover:text-primary transition-colors text-lg font-medium bg-transparent border-none outline-none cursor-pointer"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  if (location.pathname === item.href) {
                    navigate(0);
                  } else {
                    navigate(item.href);
                  }
                }}
                type="button"
              >
                {item.name}
              </button>
            ) : (
              <a
                key={item.name}
                href={item.href}
                className="text-foreground/90 hover:text-primary transition-colors text-lg font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </a>
            )
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
