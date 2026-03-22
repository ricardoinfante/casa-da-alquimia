
import { Heart, Leaf, Target, Users } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

const About = () => {
  const { t } = useTranslation();

  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => observer.disconnect();
  }, []);
  
  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="py-12 md:py-16 bg-bg-agua relative overflow-hidden"
    >
      <div className="section-container relative z-10">
        {/* Layout assimétrico moderno */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          {/* Imagem grande e destacada - 5 colunas */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative group">
              {/* Card com imagem limpa */}
              <div 
                className={`relative overflow-hidden rounded-sm transition-all duration-1000 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              >
                <img 
                  src="/lovable-uploads/ac57f24e-68d6-46c2-aafc-a7107053254a.png" 
                  alt={t('about.imgAlt')}
                  className="w-full h-auto object-cover transform"
                  loading="eager"
                  onError={(e) => {
                    console.error('Erro ao carregar imagem About');
                    e.currentTarget.src = '/recursos/placeholder-about.jpg';
                  }}
                />
                
              </div>
              
              
              {/* Badge flutuante */}
              <div className="absolute top-6 left-6 bg-white border border-terra-1/20 px-4 py-2 rounded-full">
                <span className="text-sm font-semibold text-primary flex items-center gap-2">
                  <Leaf className="h-4 w-4" />
                  {t('about.sacredSpace')}
                </span>
              </div>
            </div>
          </div>
          
          {/* Conteúdo - 7 colunas */}
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-8">
            <div 
              className={`transition-all duration-1000 delay-200 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
              }`}
            >
              {/* Badge moderno */}
              <span className="inline-flex items-center px-3 py-1 rounded-sm text-[11px] font-bold uppercase tracking-[0.2em] bg-secondary/10 text-terra-1 mb-6">
                {t('about.badge')}
              </span>
              
              {/* Título limpo e legível */}
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6 leading-tight text-primary-dark">
                {t('about.titleLine1')}{' '}
                <span className="text-primary">
                  {t('about.titleHighlight')}
                </span>
              </h2>
              
              {/* Descrição destacada */}
              <p className="text-xl md:text-2xl text-foreground/80 dark:text-gray-300 font-medium leading-relaxed mb-8">
                {t('about.lead')}
              </p>
              
              {/* Texto principal */}
              <p className="text-lg text-foreground/80 dark:text-gray-300 leading-relaxed mb-12">
                {t('about.body')}
              </p>
              
              {/* Features em cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { icon: Target, label: t('about.pillar1'), color: 'primary' },
                  { icon: Heart,  label: t('about.pillar2'), color: 'accent' },
                  { icon: Users,  label: t('about.pillar3'), color: 'secondary' }
                ].map((item, index) => (
                  <div 
                    key={index}
                    className="group p-4 rounded-2xl bg-white border border-terra-1/20 transition-colors duration-200 hover:border-terra-1/40"
                  >
                    <item.icon className={`h-6 w-6 text-${item.color} mb-2`} />
                    <p className="text-sm font-semibold text-foreground">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
