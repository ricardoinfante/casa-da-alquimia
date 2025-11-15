
import { useIntersectionObserver } from '@/utils/animations';
import { Share2 } from 'lucide-react';
import InstagramSection from './social/InstagramSection';
import YouTubeSection from './social/YouTubeSection';

const SocialMedia = () => {
  const [ref, isVisible] = useIntersectionObserver();
  
  return (
    <section 
      ref={ref} 
      id="social-media" 
      className="py-20 md:py-32 bg-gradient-to-b from-background via-muted/20 to-background relative overflow-hidden"
    >
      {/* Background decorativo moderno */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-primary/30 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-secondary/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />
      </div>
      
      <div className="section-container relative z-10">
        {/* Header modernizado */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/80 backdrop-blur-xl border border-white/20 shadow-lg mb-6">
              <Share2 className="h-4 w-4 text-primary animate-pulse" />
              <span className="text-sm font-semibold text-foreground">Conecte-se Conosco</span>
            </span>
            
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              <span className="bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
                Acompanhe Nossa Jornada
              </span>
            </h2>
            
            <p className="text-lg md:text-xl text-foreground/70 leading-relaxed">
              Fique por dentro das nossas atividades, cerimônias e compartilhe sua jornada conosco através das nossas redes sociais
            </p>
          </div>
        </div>
        
        {/* Seções com animação escalonada */}
        <div className="space-y-20">
          <div className={`transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <InstagramSection isVisible={isVisible} />
          </div>
          
          <div className={`transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <YouTubeSection isVisible={isVisible} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialMedia;
