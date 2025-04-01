
import React from 'react';
import { useIntersectionObserver } from '@/utils/animations';
import InstagramSection from './social/InstagramSection';
import YouTubeSection from './social/YouTubeSection';

const SocialMedia = () => {
  const [ref, isVisible] = useIntersectionObserver();
  
  console.log('SocialMedia component rendering, isVisible:', isVisible);
  
  return (
    <section ref={ref} id="social-media" className="py-16 md:py-24 bg-lightbg/20 relative overflow-hidden">
      <div className="absolute inset-0 bg-noise opacity-5"></div>
      <div className="section-container relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="chip inline-flex items-center gap-1 mb-4">
            <span>Redes Sociais</span>
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
            Acompanhe nossas 
            <span className="gradient-heading ml-2">publicações</span>
          </h2>
          <p className="text-foreground/80 text-lg">
            Fique por dentro das nossas atividades, cerimônias e compartilhe sua jornada conosco
            através das nossas redes sociais.
          </p>
        </div>
        
        <div className="space-y-16">
          {/* Instagram Section */}
          <InstagramSection isVisible={isVisible} />
          
          {/* YouTube Section with Social Buttons */}
          <YouTubeSection isVisible={isVisible} />
        </div>
      </div>
    </section>
  );
};

export default SocialMedia;
