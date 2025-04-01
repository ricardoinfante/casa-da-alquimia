
import React from 'react';
import { Instagram, Youtube, Facebook } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface YouTubeSectionProps {
  isVisible: boolean;
}

const YouTubeSection = ({ isVisible }: YouTubeSectionProps) => {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-display font-semibold flex items-center">
          <Youtube className="h-6 w-6 mr-2 text-[#120F52]" /> YouTube
        </h3>
        <a 
          href="https://www.youtube.com/channel/UCXfwqPXGttI4Q6Xu5XBmX6g" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-highlight hover:text-highlight/80 flex items-center text-sm font-medium transition-colors link-underline"
        >
          Nosso canal <span className="ml-2">→</span>
        </a>
      </div>
      
      {/* YouTube Player */}
      <div className={`w-full ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
        <div className="aspect-video w-full overflow-hidden rounded-lg shadow-lg">
          <iframe 
            width="100%" 
            height="100%" 
            src="https://www.youtube.com/embed/2RpPiW68uSs?si=ZvGWZOUj_mL2PZ_A&controls=0" 
            title="YouTube video player" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            referrerPolicy="strict-origin-when-cross-origin" 
            allowFullScreen
            className="w-full h-full"
          ></iframe>
        </div>
      </div>
      
      {/* Social Media Buttons */}
      <div className="flex flex-col md:flex-row justify-center pt-6 space-y-4 md:space-y-0 md:space-x-6">
        <Button
          asChild
          variant="outline"
          className="bg-[#264F7D]/10 border border-[#264F7D]/20 text-[#264F7D] hover:bg-[#264F7D]/15"
        >
          <a 
            href="https://www.instagram.com/casadaalquimia/" 
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2"
          >
            <Instagram className="h-5 w-5" />
            Seguir no Instagram
          </a>
        </Button>
        
        <Button
          asChild
          variant="outline"
          className="bg-[#264F7D]/10 border border-[#264F7D]/20 text-[#264F7D] hover:bg-[#264F7D]/15"
        >
          <a 
            href="https://www.youtube.com/channel/UCXfwqPXGttI4Q6Xu5XBmX6g" 
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2"
          >
            <Youtube className="h-5 w-5" />
            Inscreva-se no YouTube
          </a>
        </Button>
        
        <Button
          asChild
          variant="outline"
          className="bg-[#264F7D]/10 border border-[#264F7D]/20 text-[#264F7D] hover:bg-[#264F7D]/15"
        >
          <a 
            href="https://www.facebook.com/casadaalquimia/" 
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2"
          >
            <Facebook className="h-5 w-5" />
            Seguir no Facebook
          </a>
        </Button>
      </div>
    </div>
  );
};

export default YouTubeSection;
