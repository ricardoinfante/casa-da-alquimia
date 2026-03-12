
import React, { useEffect } from 'react';
import { Instagram } from 'lucide-react';
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
      <div className="flex items-center justify-between mt-4">
        <a
          href="https://www.instagram.com/casadaalquimia/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-highlight hover:text-highlight/80 flex items-center text-sm font-medium transition-colors link-underline"
        >
          @casadaalquimia <span className="ml-2">→</span>
        </a>

        <Button
          asChild
          variant="outline"
          className="bg-azul-2/10 border border-azul-2/20 text-azul-2 hover:bg-azul-2/15"
        >
          <a
            href="https://www.instagram.com/casadaalquimia/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2"
          >
            <Instagram className="h-4 w-4" />
            Seguir no Instagram
          </a>
        </Button>
      </div>
    </div>
  );
};

export default InstagramSection;
