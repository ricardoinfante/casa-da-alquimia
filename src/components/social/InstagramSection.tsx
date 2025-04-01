
import React, { useEffect } from 'react';
import { Instagram } from 'lucide-react';

interface InstagramSectionProps {
  isVisible: boolean;
}

const InstagramSection = ({ isVisible }: InstagramSectionProps) => {
  useEffect(() => {
    // Carrega o script do Elfsight se ele ainda não foi carregado
    if (isVisible && !document.querySelector('script[src="https://static.elfsight.com/platform/platform.js"]')) {
      const script = document.createElement('script');
      script.src = "https://static.elfsight.com/platform/platform.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, [isVisible]);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-display font-semibold flex items-center">
          <Instagram className="h-6 w-6 mr-2 text-[#120F52]" /> Instagram
        </h3>
        <a 
          href="https://www.instagram.com/casadaalquimia/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-highlight hover:text-highlight/80 flex items-center text-sm font-medium transition-colors link-underline"
        >
          @casadaalquimia <span className="ml-2">→</span>
        </a>
      </div>
      
      <div className={`w-full ${isVisible ? 'animate-fade-in' : 'opacity-0'} min-h-[400px]`}>
        {/* Elfsight Instagram Feed Widget */}
        <div 
          className="elfsight-app-2df3b6a6-94fb-48e3-b9da-42cbe0ecc8c9" 
          data-elfsight-app-lazy
        ></div>
      </div>
    </div>
  );
};

export default InstagramSection;
