import { useTranslation } from 'react-i18next';

export const useLocalizedPath = () => {
  const { i18n } = useTranslation();
  return (path: string): string =>
    i18n.language === 'en' ? `/en${path}` : path;
};
