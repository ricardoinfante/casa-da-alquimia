import { ArrowRight, Brain, Flame, FlaskConical, Leaf, Moon, Sparkles, Sprout } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const RITUAL_META = [
  { icon: <Moon className="h-8 w-8 text-primary" />,           image: '/img/rituais_card.jpg',     imagePosition: 'center 70%' as string | undefined },
  { icon: <FlaskConical className="h-8 w-8 text-secondary" />, image: '/img/feitio-card2.jpg',     imagePosition: undefined },
  { icon: <Brain className="h-8 w-8 text-primary" />,          image: '/img/meditacao-guiada.jpg', imagePosition: 'center 70%' as string | undefined },
  { icon: <Leaf className="h-8 w-8 text-secondary" />,         image: '/img/casuloflores.jpg',     imagePosition: undefined },
  { icon: <Flame className="h-8 w-8 text-primary" />,          image: '/img/temazcal.png',         imagePosition: undefined },
  { icon: <Sprout className="h-8 w-8 text-secondary" />,       image: '/img/bio-construcao.jpg',   imagePosition: 'center 20%' as string | undefined },
];

const Rituals = () => {
  const { t } = useTranslation();
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  interface RitualItem {
    title: string;
    description: string;
    details: string[];
  }

  const ritualItems = t('rituals.items', { returnObjects: true }) as RitualItem[];

  return <section id="rituals" className="py-12 md:py-16 bg-bg-light overflow-hidden relative">
      
      <div className="section-container relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-sm bg-secondary/10 border border-terra-1/20 mb-6">
            <Sparkles className="h-4 w-4 text-primary animate-pulse" />
            <span className="text-sm font-semibold text-foreground">{t('rituals.badge')}</span>
          </span>
          
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            <span className="bg-gradient-to-r from-dark via-terra-2 to-secondary bg-clip-text text-transparent">
              {t('rituals.title')}
            </span>
          </h2>
          
          <p className="text-lg text-foreground/70">
            {t('rituals.subtitle')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {ritualItems.map((ritual, index) => {
          const meta = RITUAL_META[index];
          return (
            <div 
              key={index} 
              className="group relative h-full"
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Card com efeito 3D e glassmorphism */}
              <div className={`relative h-full bg-white border border-terra-1/20 rounded-3xl overflow-hidden shadow-lg transition-all duration-500 flex flex-col ${
                hoveredCard === index ? '' : ''
              }`}>
                {/* Imagem com overlay gradiente */}
                {meta.image && (
                  <div className="relative h-64 overflow-hidden">
                    <div className="absolute inset-0 bg-terra-3/10 z-10" />
                    <img
                      src={meta.image}
                      alt={ritual.title}
                      className="w-full h-full object-cover transition-transform duration-700 scale-100"
                      style={meta.imagePosition ? { objectPosition: meta.imagePosition } : undefined}
                      loading="lazy"
                    />

                  </div>
                )}
                
                {/* Conteúdo do card */}
                <div className="p-6 md:p-8 flex-1 flex flex-col">
                  <h3 className="text-xl md:text-2xl font-display font-bold mb-3 text-primary-dark group-hover:text-terra-2 transition-colors">
                    {ritual.title}
                  </h3>
                  
                  <p className="text-foreground/70 mb-6 flex-1 leading-relaxed">
                    {ritual.description}
                  </p>
                  
                  {/* Detalhes com ícones */}
                  {ritual.details.length > 0 && (
                    <div className="space-y-3 mb-6 p-4 bg-muted/30 rounded-2xl">
                      {ritual.details.map((detail, idx) => (
                        <div key={idx} className="flex items-start gap-3 text-sm text-foreground/80">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                          <span>{detail}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  
                </div>
                
              </div>
              
            </div>
          ); })}
        </div>
        
        {/* CTA final modernizado */}
        <div className="mt-20 text-center">
          <div className="max-w-3xl mx-auto bg-white border border-terra-1/20 rounded-sm p-8 md:p-12">
            <p className="text-lg md:text-xl text-foreground/80 mb-8 leading-relaxed">
              {t('rituals.ctaBody')}
            </p>

            <a
              href="#contact"
              className="inline-flex items-center gap-3 px-6 py-3 bg-primary text-white rounded-sm transition-colors duration-200 hover:bg-primary-dark group"
            >
              <span>{t('rituals.ctaButton')}</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </section>;
};
export default Rituals;
