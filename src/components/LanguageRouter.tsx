import { useLanguageRoute } from '@/hooks/useLanguageRoute';

interface LanguageRouterProps {
  children: React.ReactNode;
}

const LanguageRouter = ({ children }: LanguageRouterProps) => {
  useLanguageRoute();
  return <>{children}</>;
};

export default LanguageRouter;
