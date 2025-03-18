
import React, { useEffect, useState } from 'react';
import { ArrowDown, Sparkles } from 'lucide-react';

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  useEffect(() => {
    setIsLoaded(true);
    
    // Preload the image
    const img = new Image();
    img.src = '/lovable-uploads/3a1d319a-a20f-4c45-8467-53f8e8a1b900.png';
    img.onload = () => {
      console.log('Image loaded successfully');
      setImageLoaded(true);
    };
    img.onerror = (e) => console.error('Failed to load image:', e);
  }, []);
  
  return (
    <section id="hero" className="relative min-h-[90vh] flex items-center justify-center pt-20 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-spirit-900/30 via-background/40 to-background z-10"></div>
        {imageLoaded ? (
          <div 
            className="w-full h-full transition-all duration-1000"
            style={{ 
              backgroundImage: `url('/lovable-uploads/3a1d319a-a20f-4c45-8467-53f8e8a1b900.png')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center 30%', // Positioned to show the sunset and mountains better
              opacity: isLoaded ? 0.95 : 0, // Higher opacity to show the beautiful colors
              filter: isLoaded ? 'blur(0)' : 'blur(8px)',
            }}
          ></div>
        ) : (
          <div className="w-full h-full bg-gradient-to-b from-spirit-800/70 to-earth-900/80"></div>
        )}
      </div>
      
      <div className="container mx-auto px-6 md:px-8 relative z-10 text-center">
        <div className={`transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex justify-center mb-6">
            <span className="chip bg-primary/10 text-primary font-display flex items-center gap-1 shadow-lg">
              <Sparkles className="h-3 w-3" />
              <span>Encontre seu caminho espiritual</span>
            </span>
          </div>
          
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight text-white drop-shadow-md">
            <span className="block">Transforme sua jornada</span>
            <span className="gradient-heading">espiritual e interior</span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-white/90 mb-10 text-balance drop-shadow-sm font-medium">
            Conecte-se com sua essência através de rituais ancestrais que promovem 
            autoconhecimento, cura e expansão da consciência.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="#donate" 
              className="px-8 py-4 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
            >
              Apoiar nossa missão
            </a>
            <a 
              href="#about" 
              className="px-8 py-4 bg-black/30 backdrop-blur-sm border border-white/20 text-white rounded-full font-medium hover:bg-black/40 transition-all duration-300 shadow-md"
            >
              Conhecer mais
            </a>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <a href="#about" className="text-white/70 hover:text-white transition-colors">
          <ArrowDown className="h-6 w-6" />
        </a>
      </div>
      
      {/* Decorative Elements - Adjusted colors to match sunset theme */}
      <div className="absolute top-1/3 left-10 md:left-24 w-32 h-32 bg-earth-500/20 rounded-full blur-3xl animate-pulse-gentle"></div>
      <div className="absolute bottom-1/3 right-10 md:right-24 w-40 h-40 bg-spirit-500/20 rounded-full blur-3xl animate-pulse-gentle" style={{ animationDelay: "1s" }}></div>
    </section>
  );
};

export default Hero;
