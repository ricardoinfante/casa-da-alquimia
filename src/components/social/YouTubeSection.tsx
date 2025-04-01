
import React from 'react';
import { Youtube } from 'lucide-react';

interface YouTubeSectionProps {
  isVisible: boolean;
}

const YouTubeSection = ({ isVisible }: YouTubeSectionProps) => {
  const videoId = "2RpPiW68uSs";
  
  return (
    <div>
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
      
      <div className={`w-full ${isVisible ? 'animate-in' : 'opacity-0'}`}>
        <div className="aspect-video w-full overflow-hidden rounded-lg shadow-md">
          <iframe 
            width="100%" 
            height="100%" 
            src={`https://www.youtube.com/embed/${videoId}?si=ZvGWZOUj_mL2PZ_A&controls=0`}
            title="YouTube video player" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            referrerPolicy="strict-origin-when-cross-origin" 
            allowFullScreen
            className="w-full h-full"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default YouTubeSection;
