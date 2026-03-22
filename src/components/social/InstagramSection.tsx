
import React, { useEffect } from 'react';
import { Facebook, Instagram, Youtube } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Substitua pelo Widget ID gerado no painel do Behold.so
const BEHOLD_WIDGET_ID = 'ubXDmyHpvag3yUZUWoPm';

interface InstagramSectionProps {
  isVisible: boolean;
}

const InstagramSection = ({ isVisible }: InstagramSectionProps) => {
  useEffect(() => {
    if (isVisible && !document.querySelector('script[src="https://w.behold.so/widget.js"]')) {
      const script = document.createElement('script');
      script.src = 'https://w.behold.so/widget.js';
      script.type = 'module';
      script.async = true;
      document.body.appendChild(script);
    }
  }, [isVisible]);

  return (
    <div id="instagram">
      {/* Widget container — renderizado incondicionalmente para o MutationObserver do Behold encontrar o elemento */}
      <div className="min-h-[400px] w-full">
        <div data-behold-id={BEHOLD_WIDGET_ID}></div>
      </div>

      {/* Rodapé do feed */}
      <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
          <Button
            asChild
            className="bg-[#934211] border border-[#934211] text-white hover:bg-[#7A4900] hover:border-[#7A4900] transition-all duration-200 shadow-sm"
          >
            <a
              href="https://www.instagram.com/casadaalquimia/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <Instagram className="h-4 w-4" />
              Seguir @casadaalquimia
            </a>
          </Button>

          <Button
            asChild
            variant="outline"
            className="bg-[#934211]/10 border border-[#934211]/30 text-[#934211] hover:bg-[#B5771C]/15 hover:border-[#B5771C] hover:text-[#B5771C] transition-all duration-200"
          >
            <a
              href="https://www.facebook.com/casadaalquimia/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <Facebook className="h-4 w-4" />
              Facebook
            </a>
          </Button>

          <Button
            asChild
            variant="outline"
            className="bg-[#934211]/10 border border-[#934211]/30 text-[#934211] hover:bg-[#B5771C]/15 hover:border-[#B5771C] hover:text-[#B5771C] transition-all duration-200"
          >
            <a
              href="https://www.youtube.com/@ACasadaAlquimia"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <Youtube className="h-4 w-4" />
              Canal no YouTube
            </a>
          </Button>
      </div>
    </div>
  );
};

export default InstagramSection;
