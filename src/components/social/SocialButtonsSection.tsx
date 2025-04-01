
import React from 'react';
import { Instagram, Youtube, Facebook } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SocialButtonsSection = () => {
  return (
    <div className="flex justify-center mt-16">
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
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

export default SocialButtonsSection;
