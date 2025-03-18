
import React, { useEffect, useState } from 'react';
import { ArrowDown, Sparkles } from 'lucide-react';

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  useEffect(() => {
    setIsLoaded(true);
    
    // Preload the image
    const img = new Image();
    img.src = '/lovable-uploads/9bf82aef-546d-46ba-8f95-1d4766c6b47d.png';
    img.onload = () => setImageLoaded(true);
    img.onerror = (e) => console.error('Failed to load image:', e);
  }, []);
  
  return (
    <section id="hero" className="relative min-h-[90vh] flex items-center justify-center pt-20 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-spirit-900/20 via-background/50 to-background z-10"></div>
        {imageLoaded ? (
          <div 
            className={`w-full h-full bg-cover bg-center transition-all duration-1000 ${isLoaded ? 'blur-0' : 'blur-lg'}`}
            style={{ 
              backgroundImage: `url('/lovable-uploads/9bf82aef-546d-46ba-8f95-1d4766c6b47d.png')`,
              opacity: isLoaded ? 0.5 : 0 
            }}
          ></div>
        ) : (
          <div className="w-full h-full bg-gray-900"></div>
        )}
      </div>
      
      <div className="container mx-auto px-6 md:px-8 relative z-10 text-center">
        <div className={`transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex justify-center mb-6">
            <span className="chip bg-primary/10 text-primary font-display flex items-center gap-1">
              <Sparkles className="h-3 w-3" />
              <span>Encontre seu caminho espiritual</span>
            </span>
          </div>
          
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
            <span className="block">Transforme sua jornada</span>
            <span className="gradient-heading">espiritual e interior</span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-foreground/80 mb-10 text-balance">
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
              className="px-8 py-4 bg-transparent border border-foreground/20 text-foreground rounded-full font-medium hover:bg-foreground/5 transition-all duration-300"
            >
              Conhecer mais
            </a>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <a href="#about" className="text-foreground/60 hover:text-foreground transition-colors">
          <ArrowDown className="h-6 w-6" />
        </a>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute top-1/4 left-10 md:left-24 w-32 h-32 bg-spirit-500/10 rounded-full blur-3xl animate-pulse-gentle"></div>
      <div className="absolute bottom-1/4 right-10 md:right-24 w-40 h-40 bg-nature-500/10 rounded-full blur-3xl animate-pulse-gentle" style={{ animationDelay: "1s" }}></div>
    </section>
  );
};

export default Hero;
