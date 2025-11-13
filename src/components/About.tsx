
import React from 'react';
import { Leaf } from 'lucide-react';

const About = () => {
  return <section id="about" className="py-12 md:py-20 bg-gradient-to-b from-background to-muted/50">
      <div className="section-container">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
          <div className="lg:w-2/3 space-y-6">
            <span className="chip inline-flex items-center gap-1 bg-verde-3 text-[#100B0D] px-3 py-1 rounded-full text-xs font-medium">
              <Leaf className="h-3 w-3" />
              <span>A Casa da Alquimia</span>
            </span>
            
            <h2 className="text-3xl md:text-4xl font-display font-bold">
              UM LUGAR PARA QUEM QUER MEDITAR
            </h2>
            
            <p className="text-foreground/80 text-lg leading-relaxed font-normal">Nascemos do profundo desejo de criar um espaço de silêncio e interiorização para que o autoconhecimento se faça possível como prática de vida.</p>
            
            <p className="text-foreground/80 text-lg leading-relaxed font-normal">Fundada por buscadores espirituais com décadas de experiência em trabalhos com plantas de poder, nossa comunidade dedica-se a proporcionar um espaço seguro para as transformações individuais acontecerem em toda a sua potencialidade. Fazemos isso por meio de ferramentas, como meditação, terapias de introspecção e de contato com a natureza e, também, por meio de rituais com ayahuasca.</p>
          </div>
          
          <div className="lg:w-1/3 relative">
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-xl">
              <img src="/lovable-uploads/ac57f24e-68d6-46c2-aafc-a7107053254a.png" alt="Arte representando a alquimia espiritual" className="w-full h-auto object-contain max-w-xs mx-auto" loading="lazy" />
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -z-10 -top-6 -left-6 right-6 bottom-6 rounded-2xl border border-primary/20 bg-primary/5"></div>
            <div className="absolute -right-5 -bottom-5 w-24 h-24 rounded-full bg-nature-500/20 blur-xl"></div>
          </div>
        </div>
      </div>
    </section>;
};

export default About;
