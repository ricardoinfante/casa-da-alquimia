
import React from 'react';
import { Youtube } from 'lucide-react';
import SocialMediaPost from './SocialMediaPost';

// Dados para vídeos do YouTube com URLs diretas para as imagens
const youtubeVideos = [
  {
    id: 1,
    thumbnailUrl: "/lovable-uploads/5a67ceeb-384e-4503-a075-6ca5bd4f428b.png",
    title: "Cerimônia de ayahuasca - Casa da Alquimia",
    link: "https://www.youtube.com/watch?v=OCZz6Oz-czA"
  },
  {
    id: 2,
    thumbnailUrl: "/lovable-uploads/744bbab1-592f-45f7-aa8c-15ac950eac6f.png",
    title: "Meditação guiada - Comunhão com a natureza",
    link: "https://www.youtube.com/watch?v=rQDyVS9mFuM"
  },
];

interface YouTubeSectionProps {
  isVisible: boolean;
}

const YouTubeSection = ({ isVisible }: YouTubeSectionProps) => {
  console.log('YouTube videos:', youtubeVideos);
  
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
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {youtubeVideos.map((video, index) => (
          <SocialMediaPost
            key={video.id}
            imageUrl={video.thumbnailUrl}
            link={video.link}
            title={video.title}
            aspectRatio="video"
            icon={
              <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center">
                <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[16px] border-l-[#120F52] border-b-[8px] border-b-transparent ml-1"></div>
              </div>
            }
            isVisible={isVisible}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default YouTubeSection;
