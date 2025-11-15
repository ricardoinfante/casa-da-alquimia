import { ArrowDown, Calendar, Heart, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    setIsLoaded(true);

    // Carregando a nova imagem fornecida
    const img = new Image();
    img.src = "/lovable-uploads/87b219fd-f859-454f-af75-028b033d0a5a.png";
    img.onload = () => {
      console.log('Image loaded successfully');
      setImageLoaded(true);
    };
    img.onerror = e => {
      console.error('Failed to load image:', e);
      setImageLoaded(true);
    };
  }, []);
  
  // Parallax effect no mouse
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setMousePosition({ x, y });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background com parallax */}
      <div className="absolute inset-0 z-0">
        {/* Gradiente overlay moderno */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/5 to-secondary/10 z-10"></div>
        
        {imageLoaded ? (
          <div 
            className="w-full h-full transition-all duration-1000"
            style={{
              backgroundImage: `url('/lovable-uploads/87b219fd-f859-454f-af75-028b033d0a5a.png')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: isLoaded ? 0.4 : 0,
              filter: isLoaded ? 'blur(0) grayscale(20%)' : 'blur(8px)',
              transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px) scale(1.1)`,
            }}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary/30 via-secondary/20 to-accent/30" />
        )}
      </div>
      
      {/* Partículas flutuantes decorativas */}
      <div className="absolute inset-0 z-[5]">
        <div 
          className="absolute top-1/4 left-[10%] w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "0s", transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)` }}
        />
        <div 
          className="absolute top-1/3 right-[15%] w-80 h-80 bg-secondary/15 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "2s", transform: `translate(${-mousePosition.x}px, ${-mousePosition.y}px)` }}
        />
        <div 
          className="absolute bottom-1/4 left-[20%] w-72 h-72 bg-accent/15 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "4s", transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)` }}
        />
      </div>
      
      {/* Conteúdo principal */}
      <div className="container mx-auto px-6 md:px-8 relative z-20 text-center">
        <div className={`transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Badge moderno com glassmorphism */}
          <div className="flex justify-center mb-8">
            <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/20 dark:border-gray-600/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <Sparkles className="h-4 w-4 text-primary animate-pulse" />
              <span className="text-sm font-semibold text-foreground dark:text-white">Encontre seu caminho espiritual</span>
            </span>
          </div>
          
          {/* Título legível em todos os modos */}
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-8 tracking-tight text-foreground dark:text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] dark:drop-shadow-[0_4px_12px_rgba(0,0,0,1)]">
            Bem-vindo à<br />
            <span className="text-primary dark:text-accent">
              Casa da Alquimia
            </span>
          </h1>
          
          {/* Subtítulo com sombra forte */}
          <p className="max-w-3xl mx-auto text-lg md:text-2xl mb-12 text-balance leading-relaxed font-semibold text-foreground dark:text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] dark:drop-shadow-[0_2px_8px_rgba(0,0,0,1)]">
            Conecte-se com a sua essência pela oportunidade do encontro consigo no silêncio e profundidade de rituais ancestrais
          </p>
          
          {/* CTAs modernos */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href="#rituals"
              className="group px-8 py-4 bg-primary text-primary-foreground rounded-full font-semibold shadow-lg hover:shadow-2xl hover:shadow-primary/50 transition-all duration-300 hover:scale-105 inline-flex items-center gap-2"
            >
              <Calendar className="h-5 w-5" />
              <span>Conhecer nossos rituais</span>
              <ArrowDown className="h-4 w-4 group-hover:translate-y-1 transition-transform" />
            </a>
            
            <a 
              href="https://wa.me/5562996538902?text=Olá!%20Gostaria%20de%20agendar%20uma%20conversa%20sobre%20os%20rituais%20da%20Casa%20da%20Alquimia"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl text-foreground dark:text-white rounded-full font-semibold border-2 border-white/20 dark:border-gray-600/50 hover:border-primary/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 inline-flex items-center gap-2"
            >
              <Heart className="h-5 w-5 text-accent" />
              <span>Agendar conversa</span>
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
            <div className="w-1 h-2 bg-current rounded-full animate-bounce" />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;