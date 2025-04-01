
import React from 'react';
import { Heart, Leaf, Sparkles } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="py-12 md:py-20 bg-gradient-to-b from-background to-muted/50">
      <div className="section-container">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
          <div className="lg:w-1/2 space-y-6">
            <span className="chip inline-flex items-center gap-1 bg-[#708C5A] text-[#100B0D] px-3 py-1 rounded-full text-xs font-medium">
              <Leaf className="h-3 w-3" />
              <span>Nossa história</span>
            </span>
            
            <h2 className="text-3xl md:text-4xl font-display font-bold">
              A Casa da Alquimia: um santuário de 
              <span className="gradient-heading ml-2 text-[#DAC751]">transformação espiritual</span>
            </h2>
            
            <p className="text-foreground/80 text-lg leading-relaxed">
              Nascemos do profundo desejo de criar um espaço sagrado onde as antigas tradições 
              xamânicas pudessem ser honradas e vivenciadas no mundo contemporâneo.
            </p>
            
            <p className="text-foreground/80 text-lg leading-relaxed">
              Fundada por buscadores espirituais com décadas de experiência em trabalhos com plantas 
              de poder, nossa comunidade dedica-se a oferecer rituais seguros, respeitosos e transformadores 
              com ayahuasca, guiados pela sabedoria ancestral das tradições amazônicas.
            </p>
          </div>
          
          <div className="lg:w-1/2 relative">
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-xl">
              <img 
                src="/lovable-uploads/ac57f24e-68d6-46c2-aafc-a7107053254a.png" 
                alt="Arte representando a alquimia espiritual" 
                className="w-full h-auto object-contain"
                loading="lazy"
              />
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -z-10 -top-6 -left-6 right-6 bottom-6 rounded-2xl border border-primary/20 bg-primary/5"></div>
            <div className="absolute -right-5 -bottom-5 w-24 h-24 rounded-full bg-nature-500/20 blur-xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
