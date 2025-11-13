import React, { useEffect, useState } from 'react';
import { ArrowDown, Sparkles } from 'lucide-react';
const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
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
      // Ainda definimos imageLoaded como true para acionar a exibição de fallback em vez do estado de carregamento
      setImageLoaded(true);
    };
  }, []);
  return <section id="hero" className="relative min-h-[90vh] flex items-center justify-center pt-20 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#100B0D]/30 via-azul-1/40 to-azul-1/60 z-10"></div>
        
        {imageLoaded ? <div className="w-full h-full transition-all duration-1000" style={{
        backgroundImage: `url('/lovable-uploads/87b219fd-f859-454f-af75-028b033d0a5a.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center bottom',
        opacity: isLoaded ? 0.95 : 0,
        filter: isLoaded ? 'blur(0)' : 'blur(8px)'
      }}></div> : <div className="w-full h-full bg-gradient-to-b from-azul-2/70 to-verde-3/80"></div>}
      </div>
      
      <div className="container mx-auto px-6 md:px-8 relative z-10 text-center">
        <div className={`transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex justify-center mb-6">
            <span className="chip flex items-center gap-1 shadow-lg">
              <Sparkles className="h-3 w-3 text-azul-2" />
              <span>Encontre seu caminho espiritual</span>
            </span>
          </div>
          
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight text-[#100B0D] drop-shadow-md">
            Bem-vindo à Casa da Alquimia
          </h1>
          
          <p className="max-w-2xl mx-auto text-lg md:text-xl mb-10 text-balance drop-shadow-sm font-medium text-[#100B0D]">Conecte-se com a sua essência pela oportunidade do encontro consigo no silêncio e profundidade de rituais ancestrais</p>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <a href="#about" className="text-[#100B0D]/70 hover:text-[#100B0D] transition-colors">
          <ArrowDown className="h-6 w-6 text-azul-2" />
        </a>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute top-1/3 left-10 md:left-24 w-32 h-32 bg-verde-3/20 rounded-full blur-3xl animate-pulse-gentle"></div>
      <div className="absolute bottom-1/3 right-10 md:right-24 w-40 h-40 bg-azul-2/20 rounded-full blur-3xl animate-pulse-gentle" style={{
      animationDelay: "1s"
    }}></div>
    </section>;
};
export default Hero;