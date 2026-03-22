import { Globe, Check, ChevronDown } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';

const KNOWN_PATHS = ['/', '/politica_de_privacidade'];

const LanguageDropdown = () => {
  const { i18n, t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const currentLang = i18n.language === 'en' ? 'en' : 'pt';

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const getLocalizedTarget = (lang: 'pt' | 'en'): string => {
    // Strip any existing /en prefix to get the base path
    const basePath = location.pathname.startsWith('/en')
      ? location.pathname.slice(3) || '/'
      : location.pathname;

    // If the base path is a known route, preserve it; otherwise fall back to root
    const safePath = KNOWN_PATHS.includes(basePath) ? basePath : '/';

    return lang === 'en' ? `/en${safePath === '/' ? '' : safePath}` : safePath;
  };

  const handleSelect = (lang: 'pt' | 'en') => {
    setOpen(false);
    if (lang === currentLang) return;
    navigate(getLocalizedTarget(lang));
  };

  const label = currentLang === 'pt' ? t('nav.portuguese') : t('nav.english');

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 px-3 py-2 rounded-full border border-[#7A4900]/25 text-[#7A4900] text-xs font-bold hover:bg-[#7A4900]/5 transition-colors"
        aria-label={t('nav.language')}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <Globe className="h-3.5 w-3.5" />
        <span>{label}</span>
        <ChevronDown className={cn('h-3 w-3 transition-transform duration-200', open && 'rotate-180')} />
      </button>

      {open && (
        <div
          role="listbox"
          className="absolute right-0 top-[calc(100%+6px)] bg-white border border-[#7A4900]/15 rounded-lg shadow-lg w-40 overflow-hidden z-50"
        >
          {(['pt', 'en'] as const).map((lang) => (
            <button
              key={lang}
              role="option"
              aria-selected={lang === currentLang}
              onClick={() => handleSelect(lang)}
              className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-[#7A4900] hover:bg-[#7A4900]/6 transition-colors"
            >
              <span className="text-base">{lang === 'pt' ? '🇧🇷' : '🇺🇸'}</span>
              <span className="flex-1 text-left font-medium">
                {lang === 'pt' ? t('nav.portuguese') : t('nav.english')}
              </span>
              {lang === currentLang && <Check className="h-3.5 w-3.5" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageDropdown;
