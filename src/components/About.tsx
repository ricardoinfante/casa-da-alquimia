
import { Heart, Leaf, Target, Users } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const About = () => {
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
      className="py-20 md:py-32 bg-gradient-to-b from-background via-muted/30 to-background relative overflow-hidden"
    >
      {/* Background decorativo */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-secondary rounded-full blur-3xl" />
      </div>
      
      <div className="section-container relative z-10">
        {/* Layout assimétrico moderno */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          {/* Imagem grande e destacada - 5 colunas */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative group">
              {/* Card flutuante com glassmorphism */}
              <div 
                className={`relative overflow-hidden rounded-3xl shadow-2xl transition-all duration-1000 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 backdrop-blur-sm z-10" />
                <img 
                  src="/lovable-uploads/ac57f24e-68d6-46c2-aafc-a7107053254a.png" 
                  alt="Arte representando a alquimia espiritual" 
                  className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700" 
                  loading="lazy" 
                />
              </div>
              
              {/* Elementos decorativos 3D */}
              <div className="absolute -top-8 -right-8 w-32 h-32 bg-accent/30 rounded-full blur-2xl animate-pulse-gentle" />
              <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-primary/20 rounded-full blur-3xl animate-pulse-gentle" style={{ animationDelay: '1s' }} />
              
              {/* Badge flutuante */}
              <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-xl px-4 py-2 rounded-full shadow-lg">
                <span className="text-sm font-semibold text-primary flex items-center gap-2">
                  <Leaf className="h-4 w-4" />
                  Espaço Sagrado
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
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-sm font-semibold mb-6">
                <Leaf className="h-4 w-4" />
                <span>A Casa da Alquimia</span>
              </span>
              
              {/* Título com gradiente */}
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
                  Um Lugar Para Quem Quer Meditar
                </span>
              </h2>
              
              {/* Descrição destacada */}
              <p className="text-xl md:text-2xl text-foreground/70 font-light leading-relaxed mb-8">
                Nascemos do profundo desejo de criar um espaço de silêncio e interiorização para que o autoconhecimento se faça possível como prática de vida.
              </p>
              
              {/* Texto principal */}
              <p className="text-lg text-foreground/80 leading-relaxed mb-12">
                Fundada por buscadores espirituais com décadas de experiência em trabalhos com plantas de poder, nossa comunidade dedica-se a proporcionar um espaço seguro para as transformações individuais acontecerem em toda a sua potencialidade. Fazemos isso por meio de ferramentas, como meditação, terapias de introspecção e de contato com a natureza e, também, por meio de rituais com ayahuasca.
              </p>
              
              {/* Features em cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { icon: Target, label: 'Autoconhecimento', color: 'primary' },
                  { icon: Heart, label: 'Transformação', color: 'accent' },
                  { icon: Users, label: 'Comunidade', color: 'secondary' }
                ].map((item, index) => (
                  <div 
                    key={index}
                    className="group p-4 rounded-2xl bg-white/50 backdrop-blur-sm border border-white/20 hover:border-primary/30 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105"
                  >
                    <item.icon className={`h-6 w-6 text-${item.color} mb-2 group-hover:scale-110 transition-transform`} />
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
