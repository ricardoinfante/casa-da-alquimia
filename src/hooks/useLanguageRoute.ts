import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const LANG_KEY = 'lang';

export const useLanguageRoute = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { i18n } = useTranslation();

  useEffect(() => {
    const isEnPath = location.pathname.startsWith('/en');
    const lang = isEnPath ? 'en' : 'pt';

    // URL is always the source of truth — sync i18n and save preference
    i18n.changeLanguage(lang);
    localStorage.setItem(LANG_KEY, lang);

    // First-visit auto-detection: only redirect when on root '/' with no saved preference
    if (
      location.pathname === '/' &&
      !localStorage.getItem(LANG_KEY + '_visited')
    ) {
      localStorage.setItem(LANG_KEY + '_visited', '1');
      const browserLang = navigator.language || '';
      if (!browserLang.toLowerCase().startsWith('pt')) {
        navigate('/en', { replace: true });
      }
    }
  }, [location.pathname, i18n, navigate]);
};
