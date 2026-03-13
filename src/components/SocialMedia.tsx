
import { useIntersectionObserver } from '@/utils/animations';
import { Share2 } from 'lucide-react';
import InstagramSection from './social/InstagramSection';

const SocialMedia = () => {
  const [ref, isVisible] = useIntersectionObserver();

  return (
    <section
      ref={ref}
      id="social-media"
      className="py-12 md:py-16 bg-bg-light relative overflow-hidden"
    >
<div className="section-container relative z-10">
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-secondary/10 border border-terra-1/20 mb-6">
              <Share2 className="h-4 w-4 text-primary" />
              <span className="text-sm font-semibold text-foreground">Conecte-se Conosco</span>
            </span>

            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-dark">
              Acompanhe Nossa <span className="text-secondary">Jornada</span>
            </h2>

            <p className="text-lg md:text-xl text-foreground/70 leading-relaxed">
              Fique por dentro das nossas atividades, cerimônias e compartilhe sua jornada conosco através das nossas redes sociais
            </p>
          </div>
        </div>

        {/* Feed do Instagram */}
        <div className={`transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <InstagramSection isVisible={isVisible} />
        </div>
      </div>
    </section>
  );
};

export default SocialMedia;
