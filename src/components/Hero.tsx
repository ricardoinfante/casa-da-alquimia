import { ArrowDown, Calendar, Heart, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  useEffect(() => {
    setIsLoaded(true);

    // Carregando a nova imagem (logo/arte) do projeto
    const img = new Image();
    img.src = "/img/logog.jpeg"; // trocar para a nova imagem fornecida
    img.onload = () => {
      setImageLoaded(true);
    };
    img.onerror = (e) => {
      console.error('Failed to load image:', e);
      setImageLoaded(true);
    };
  }, []);
  
  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background com parallax */}
      <div className="absolute inset-0 z-0">
        {/* Gradiente overlay moderno */}
        <div className="absolute inset-0 bg-bg-light/60"></div>
        
        {imageLoaded ? (
          <div
            className="w-full h-full transition-all duration-1000"
            style={{
              backgroundImage: `url('/lovable-uploads/87b219fd-f859-454f-af75-028b033d0a5a.png')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: isLoaded ? 0.4 : 0,
              filter: isLoaded ? 'blur(0) grayscale(20%)' : 'blur(8px)',
            }}
          />
        ) : (
          <div className="w-full h-full bg-bg-agua" />
        )}
      </div>
      
      
      {/* Conteúdo principal */}
      <div className="container mx-auto px-6 md:px-8 relative z-20 text-center">
        <div className={`transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Badge moderno com glassmorphism */}
          <div className="flex justify-center mb-8">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-secondary/10 border border-terra-1/20">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-semibold text-foreground dark:text-white">Arte representando a alquimia espiritual</span>
            </span>
          </div>
          
          {/* Título legível em todos os modos */}
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight text-foreground dark:text-white">
            Espaço Sagrado<br />
            <span className="text-primary dark:text-accent">
              A Casa da Alquimia
            </span>
          </h1>

          <h2 className="text-xl md:text-2xl mb-12 font-semibold text-foreground/70">Um Lugar Para Quem Quer Meditar</h2>
          
          {/* CTAs modernos */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href="#rituals"
              className="group px-8 py-4 bg-primary text-white rounded-sm font-semibold transition-colors duration-200 hover:bg-primary-dark inline-flex items-center gap-2"
            >
              <Calendar className="h-5 w-5" />
              <span>Conhecer nossos rituais</span>
              <ArrowDown className="h-4 w-4 group-hover:translate-y-1 transition-transform" />
            </a>
            
            <a 
              href="https://wa.me/5562996538902?text=Ol%C3%A1!%20Gostaria%20de%20conhecer%20e%20saber%20mais%20informa%C3%A7%C3%B5es%20sobre%20os%20trabalhos%20da%20Casa%20da%20Alquimia."
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 border border-terra-1 text-terra-1 rounded-sm font-semibold transition-colors duration-200 hover:bg-terra-1 hover:text-white inline-flex items-center gap-2"
            >
              <Heart className="h-5 w-5 text-accent" />
              <span>Quero saber mais</span>
            </a>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator moderno */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20">
        <a 
          href="#about" 
          className="flex flex-col items-center gap-2 text-foreground/60 dark:text-gray-300 hover:text-foreground dark:hover:text-white transition-all duration-300 group"
        >
          <span className="text-xs uppercase tracking-wider font-medium">Role para explorar</span>
          <div className="w-6 h-10 rounded-full border-2 border-current flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-current rounded-full" />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;