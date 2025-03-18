import React from 'react';
import { Moon, Sun, Sparkles, Leaf, Heart } from 'lucide-react';

const Rituals = () => {
  return (
    <section id="rituals" className="py-12 md:py-20 bg-gradient-to-b from-muted/50 to-background overflow-hidden">
      <div className="section-container relative">
        {/* Decorative Circles */}
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-spirit-400/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-nature-400/10 rounded-full blur-3xl"></div>
        
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="chip bg-spirit-500/10 text-spirit-700 inline-flex items-center gap-1 mb-4">
            <Sparkles className="h-3 w-3" />
            <span>Nossos rituais</span>
          </span>
          
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
            Cerimônias sagradas de 
            <span className="gradient-heading ml-2">ayahuasca</span>
          </h2>
          
          <p className="text-foreground/80 text-lg">
            Conduzimos rituais tradicionais que respeitam a medicina sagrada e proporcionam experiências 
            profundas de cura, introspecção e conexão espiritual.
          </p>
        </div>
        
        {/* Valores/Princípios Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
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
          ].map((value, index) => (
            <div 
              key={index} 
              className="p-6 bg-white rounded-xl border border-muted shadow-sm h-full flex flex-col items-center text-center"
            >
              <div className="mb-4 p-2 rounded-full">{value.icon}</div>
              <h3 className="text-xl font-display font-semibold mb-3">{value.title}</h3>
              <p className="text-foreground/70">{value.description}</p>
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {[
            {
              icon: <Moon className="h-8 w-8 text-spirit-600" />,
              title: "Cerimônias",
              description: "Trabalhos tradicionais guiados por cantos sagrados (icaros) e conduzidos em ambiente seguro e acolhedor para uma jornada introspectiva profunda.",
              details: ["Duração: 8 horas", "Inclui: Preparação, cerimônia e integração", "Periodicidade: Lua Cheia e Lua Nova"],
              image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=1974"
            },
            {
              icon: <Sun className="h-8 w-8 text-earth-600" />,
              title: "Feitio",
              description: "Momento sagrado de preparação da bebida onde os participantes vivenciam todo o processo tradicional de confecção da medicina. Experiência mais intensa que pode durar vários dias.",
              details: ["Duração: 2-5 dias", "Inclui: Colheita, preparo e cerimônias", "Periodicidade: Trimestral"],
              image: "/lovable-uploads/5a67ceeb-384e-4503-a075-6ca5bd4f428b.png"
            },
          ].map((ritual, index) => (
            <div 
              key={index}
              className="group bg-white/40 backdrop-blur-sm rounded-xl overflow-hidden border border-muted shadow-sm transition-all duration-500 hover:shadow-md hover:bg-white/60"
            >
              <div className="h-52 overflow-hidden">
                <img 
                  src={ritual.image}
                  alt={ritual.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
              </div>
              
              <div className="p-6 md:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-background/80 rounded-full">{ritual.icon}</div>
                  <h3 className="text-xl font-display font-semibold">{ritual.title}</h3>
                </div>
                
                <p className="text-foreground/80 mb-6">{ritual.description}</p>
                
                <div className="space-y-2 mb-6">
                  {ritual.details.map((detail, idx) => (
                    <div key={idx} className="flex items-center text-sm text-foreground/70">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary/70 mr-2"></span>
                      {detail}
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-between items-center">
                  <a 
                    href="#contact"
                    className="text-sm font-medium text-primary link-underline"
                  >
                    Saiba mais sobre este ritual
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-foreground/70 mb-6 max-w-2xl mx-auto">
            Todos os rituais são conduzidos por facilitadores experientes, em ambiente apropriado 
            e com toda a preparação necessária para uma experiência segura e transformadora.
          </p>
          
          <a 
            href="#contact"
            className="px-6 py-3 bg-foreground/5 border border-foreground/10 text-foreground rounded-full font-medium hover:bg-foreground/10 transition-colors inline-flex items-center gap-2"
          >
            Agende uma conversa preparatória
          </a>
        </div>
      </div>
    </section>
  );
};

export default Rituals;
