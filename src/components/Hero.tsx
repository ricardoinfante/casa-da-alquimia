import { ArrowDown, Calendar, Heart, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  useEffect(() => {
    setIsLoaded(true);

    // Carregando a nova imagem (logo/arte) do projeto
    const img = new Image();
    img.src = "/img/hero_fire.webp";
    img.onload = () => {
      setImageLoaded(true);
    };
    img.onerror = () => {
      img.src = "/img/hero_fire.jpg";
      img.onload = () => setImageLoaded(true);
      img.onerror = () => setImageLoaded(true);
    };
  }, []);
  
  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background com parallax */}
      <div className="absolute inset-0 z-0">
        {imageLoaded ? (
          <div
            className="w-full h-full transition-all duration-1000"
            style={{
              backgroundImage: `url('/img/hero_fire.webp')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: isLoaded ? 1 : 0,
              filter: isLoaded ? 'blur(0)' : 'blur(8px)',
            }}
          />
        ) : (
          <div className="w-full h-full bg-dark" />
        )}
        {/* Overlay escuro para legibilidade do texto */}
        <div className="absolute inset-0 bg-dark/60"></div>
      </div>
      
      
      {/* Conteúdo principal */}
      <div className="container mx-auto px-6 md:px-8 relative z-20 text-center">
        <div className={`transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Badge moderno com glassmorphism */}
          <div className="flex justify-center mb-8">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-white/10 border border-white/20">
              <Sparkles className="h-4 w-4 text-terra-3" />
              <span className="text-sm font-semibold text-white">Chapada dos Veadeiros, Goiás, Brasil</span>
            </span>
          </div>

          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight text-terra-3">
            A Casa da Alquimia
          </h1>

          <h2 className="text-xl md:text-2xl mb-12 font-semibold text-white/70">Um Lugar Para Quem Quer Se Conhecer</h2>
          
          {/* CTAs modernos */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href="#rituals"
              className="group px-8 py-4 bg-bg-light text-dark rounded-sm font-semibold transition-colors duration-200 hover:bg-secondary hover:text-white inline-flex items-center gap-2"
            >
              <Calendar className="h-5 w-5" />
              <span>Conhecer nossos rituais</span>
              <ArrowDown className="h-4 w-4 group-hover:translate-y-1 transition-transform" />
            </a>
            
            <a
              href="https://wa.me/5562996538902?text=Ol%C3%A1!%20Gostaria%20de%20conhecer%20e%20saber%20mais%20informa%C3%A7%C3%B5es%20sobre%20os%20trabalhos%20da%20Casa%20da%20Alquimia."
              target="_blank"
              rel="noopener noreferrer"
              className="group px-8 py-4 bg-terra-3 border border-terra-2 text-terra-2 rounded-sm font-semibold transition-colors duration-200 hover:bg-terra-2 hover:text-white inline-flex items-center gap-2"
            >
              <Heart className="h-5 w-5 text-terra-2 group-hover:text-white transition-colors" />
              <span>Quero saber mais</span>
            </a>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20">
        <a href="#about" aria-label="Rolar para baixo">
          <ArrowDown className="h-6 w-6 text-white/50 hover:text-white/80 transition-colors duration-300 animate-bounce" style={{ animationDuration: '2.5s' }} />
        </a>
      </div>
    </section>
  );
};

export default Hero;