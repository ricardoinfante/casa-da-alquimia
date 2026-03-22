
import { useIntersectionObserver } from '@/utils/animations';
import { Instagram } from 'lucide-react';
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
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-terra-1/10 border border-terra-1/25 mb-6">
              <Instagram className="h-4 w-4 text-terra-1" />
              <span className="text-sm font-bold uppercase tracking-[0.15em] text-terra-1 font-body">Instagram</span>
            </span>

            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 text-dark">
              Acompanhe Nossa <span className="text-secondary">Jornada</span>
            </h2>

            <a
              href="https://www.instagram.com/casadaalquimia/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-terra-1 font-body font-bold text-lg hover:text-terra-3 transition-colors mb-6 group"
            >
              <Instagram className="h-5 w-5" />
              <span className="tracking-wide">@casadaalquimia</span>
            </a>

            <p className="text-lg md:text-xl text-foreground/70 leading-relaxed">
              Siga-nos no Instagram e fique por dentro das nossas cerimônias, retiros e momentos do caminho
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
