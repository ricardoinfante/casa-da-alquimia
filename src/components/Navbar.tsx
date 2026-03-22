
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageDropdown from './LanguageDropdown';
import { useLocalizedPath } from '@/hooks/useLocalizedPath';

const Navbar = () => {
  const { t } = useTranslation();
  const lp = useLocalizedPath();
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
    { name: t('nav.home'),         href: '#hero',         id: 'hero' },
    { name: t('nav.about'),        href: '#about',        id: 'about' },
    { name: t('nav.rituals'),      href: '#rituals',      id: 'rituals' },
    { name: t('nav.memories'),     href: '#memorias',     id: 'memorias' },
    { name: t('nav.testimonials'), href: '#testimonials', id: 'testimonials' },
    { name: t('nav.connect'),      href: '#instagram',    id: 'instagram' },
    { name: t('nav.contact'),      href: '#contact',      id: 'contact' },
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
          to={lp('/')}
          className="flex items-center gap-3 font-display text-lg md:text-xl group relative"
        >
          <div className="relative">
            <img
              src="/favicon.png"
              alt="A Casa da Alquimia Logo"
              className={cn(
                "w-auto transition-all duration-500 mix-blend-multiply",
                isScrolled ? "h-10" : "h-12"
              )}
            />

          </div>
          <span className="text-balance font-semibold text-terra-2">
            A Casa da Alquimia
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {menuItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={cn(
                "relative px-2 py-2 text-sm font-medium rounded-full transition-all duration-300 whitespace-nowrap",
                activeSection === item.id
                  ? "text-[#7A4900]/50 bg-[#7A4900]/5"
                  : "text-[#7A4900] hover:text-[#7A4900]/50 hover:bg-[#7A4900]/5"
              )}
            >
              {item.name}
              {activeSection === item.id && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#7A4900]/50 rounded-full" />
              )}
            </a>
          ))}

          <LanguageDropdown />

          {/* Apoiar Button */}
          <a
            href="#donate"
            className="ml-1 bg-primary-dark text-white rounded-sm px-4 py-2.5 transition-colors duration-200 hover:bg-primary font-semibold text-sm inline-flex items-center gap-2 whitespace-nowrap"
          >
            <span>{t('nav.support')}</span>
          </a>

          {/* CTA Button */}
          <a
            href="https://wa.me/5562996538902?text=Ol%C3%A1!%20Gostaria%20de%20conhecer%20e%20saber%20mais%20informa%C3%A7%C3%B5es%20sobre%20os%20trabalhos%20da%20Casa%20da%20Alquimia."
            target="_blank"
            rel="noopener noreferrer"
            className="ml-1 border border-terra-1 text-terra-1 rounded-sm px-4 py-2.5 transition-colors duration-200 hover:bg-terra-1 hover:text-white font-semibold text-sm inline-flex items-center gap-2 whitespace-nowrap"
          >
            <WhatsAppIcon className="h-4 w-4" />
            <span>{t('nav.moreInfo')}</span>
          </a>
        </nav>

        {/* Mobile Menu Button - Melhorado */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={cn(
            "lg:hidden p-3 rounded-xl transition-all duration-300",
            "hover:bg-primary/10 active:scale-90",
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
          <div className="flex items-center justify-between p-6 border-b border-foreground/10 bg-bg-light">
            <Link
              to={lp('/')}
              className="flex items-center gap-2 font-display text-lg"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <img
                src="/favicon.png"
                alt="A Casa da Alquimia Logo"
                className="h-8 w-auto"
              />
              <span className="font-semibold text-foreground dark:text-white">{t('nav.menu')}</span>
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
            <div className="p-4 pb-2">
              <LanguageDropdown />
            </div>

            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={cn(
                  "group relative p-4 rounded-sm text-left transition-all duration-300",
                  "hover:bg-white/70 dark:hover:bg-gray-700/70 active:scale-95",
                  activeSection === item.id && "bg-[#7A4900]/5 border border-[#7A4900]/20",
                  isMobileMenuOpen ? `opacity-100 translate-x-0` : `opacity-0 translate-x-8`
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <div className="flex items-center justify-between">
                  <span className={cn(
                    "text-xl font-semibold transition-colors",
                    activeSection === item.id
                      ? "text-[#7A4900]/50"
                      : "text-[#7A4900] group-hover:text-[#7A4900]/50"
                  )}>
                    {item.name}
                  </span>

                  {/* Indicador de seção ativa */}
                  {activeSection === item.id && (
                    <div className="w-2 h-2 bg-[#7A4900]/50 rounded-full" />
                  )}
                </div>

              </a>
            ))}

            {/* Apoiar Button */}
            <a
              href="#donate"
              className={cn(
                "group relative p-4 rounded-sm text-left transition-all duration-300",
                "bg-[#1A3A6B] text-white hover:bg-[#1A3A6B]/90 active:scale-95",
                isMobileMenuOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
              )}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span className="text-xl font-semibold">{t('nav.support')}</span>
            </a>
          </nav>

          {/* CTA no mobile - Sticky bottom */}
          <div className="p-4 border-t border-foreground/10 bg-bg-light">
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
              <WhatsAppIcon className="h-5 w-5" />
              <span>{t('nav.moreInfoMobile')}</span>
            </a>

            {/* Informação adicional */}
            <p className="text-center text-xs text-foreground/60 dark:text-gray-300 mt-3">
              {t('nav.helpText')} ✨
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
