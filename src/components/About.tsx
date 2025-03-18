
import React from 'react';
import { Heart, Leaf, Sparkles } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="py-20 md:py-32 bg-gradient-to-b from-background to-muted/50">
      <div className="section-container">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
          <div className="lg:w-1/2 space-y-6">
            <span className="chip bg-nature-500/10 text-nature-700 inline-flex items-center gap-1">
              <Leaf className="h-3 w-3" />
              <span>Nossa história</span>
            </span>
            
            <h2 className="text-3xl md:text-4xl font-display font-bold">
              A Casa da Alquimia: um santuário de 
              <span className="gradient-heading ml-2">transformação espiritual</span>
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
            
            <div className="pt-4 grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: <Leaf className="h-8 w-8 text-nature-600" />,
                  title: "Tradição",
                  description: "Rituais baseados em tradições xamânicas ancestrais"
                },
                {
                  icon: <Heart className="h-8 w-8 text-spirit-600" />,
                  title: "Acolhimento",
                  description: "Ambiente seguro e acolhedor para cada participante"
                },
                {
                  icon: <Sparkles className="h-8 w-8 text-earth-600" />,
                  title: "Transformação",
                  description: "Experiências profundas de autoconhecimento e cura"
                }
              ].map((item, index) => (
                <div 
                  key={index} 
                  className="p-6 bg-white/50 backdrop-blur-sm rounded-xl border border-muted shadow-sm"
                >
                  <div className="mb-3">{item.icon}</div>
                  <h3 className="text-lg font-display font-semibold mb-2">{item.title}</h3>
                  <p className="text-foreground/70 text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="lg:w-1/2 relative">
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1519834054693-5e0e537f410c?q=80&w=1973" 
                alt="Ritual de ayahuasca na Casa da Alquimia" 
                className="w-full aspect-[4/3] object-cover"
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
