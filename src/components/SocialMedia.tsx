
import React, { useState } from 'react';
import { Instagram, Youtube } from 'lucide-react';
import { useIntersectionObserver } from '@/utils/animations';
import { Skeleton } from '@/components/ui/skeleton';
import { AspectRatio } from '@/components/ui/aspect-ratio';

// Dados dos posts do Instagram (simulados)
const instagramPosts = [
  {
    id: 1,
    imageUrl: "https://source.unsplash.com/300x300?nature,ritual",
    link: "https://www.instagram.com/p/C3lDQVvJA_P/"
  },
  {
    id: 2,
    imageUrl: "https://source.unsplash.com/300x300?meditation,spiritual",
    link: "https://www.instagram.com/p/C3VZQN9JW0D/"
  },
  {
    id: 3,
    imageUrl: "https://source.unsplash.com/300x300?ayahuasca,plant",
    link: "https://www.instagram.com/p/C1mPKT6ptc0/"
  },
  {
    id: 4,
    imageUrl: "https://source.unsplash.com/300x300?ceremony,tribal",
    link: "https://www.instagram.com/p/C1TPK1NJuCf/"
  },
];

// Dados dos vídeos do YouTube (simulados)
const youtubeVideos = [
  {
    id: 1,
    thumbnailUrl: "https://source.unsplash.com/400x225?ayahuasca,ceremony",
    title: "Cerimônia de ayahuasca - Casa da Alquimia",
    link: "https://www.youtube.com/watch?v=sample1"
  },
  {
    id: 2,
    thumbnailUrl: "https://source.unsplash.com/400x225?meditation,nature",
    title: "Meditação guiada - Comunhão com a natureza",
    link: "https://www.youtube.com/watch?v=sample2"
  },
];

const SocialMedia = () => {
  const [ref, isVisible] = useIntersectionObserver();
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});
  
  const handleImageLoad = (id: string) => {
    setLoadedImages(prev => ({
      ...prev,
      [id]: true
    }));
  };
  
  return (
    <section ref={ref} id="social-media" className="py-16 md:py-24 bg-lightbg/20 relative overflow-hidden">
      <div className="absolute inset-0 bg-noise opacity-5"></div>
      <div className="section-container relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="chip inline-flex items-center gap-1 mb-4">
            <span>Redes Sociais</span>
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
            Acompanhe nossas 
            <span className="gradient-heading ml-2">publicações</span>
          </h2>
          <p className="text-foreground/80 text-lg">
            Fique por dentro das nossas atividades, cerimônias e compartilhe sua jornada conosco
            através das nossas redes sociais.
          </p>
        </div>
        
        <div className={`space-y-16 ${isVisible ? 'animate-in' : 'opacity-0'}`}>
          {/* Instagram Section */}
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
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {instagramPosts.map((post, index) => (
                <a 
                  key={post.id}
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-all duration-300 group ${isVisible ? `animate-in animate-in-delay-${index + 1}` : 'opacity-0'}`}
                >
                  <div className="relative aspect-square bg-gray-100 overflow-hidden">
                    {!loadedImages[`insta-${post.id}`] && (
                      <Skeleton className="absolute inset-0 bg-gray-200" />
                    )}
                    <img 
                      src={post.imageUrl} 
                      alt="Instagram post" 
                      className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 ${loadedImages[`insta-${post.id}`] ? 'opacity-100' : 'opacity-0'}`}
                      onLoad={() => handleImageLoad(`insta-${post.id}`)}
                    />
                    <div className="absolute inset-0 bg-[#120F52]/0 group-hover:bg-[#120F52]/20 transition-colors duration-300 flex items-center justify-center">
                      <Instagram className="text-white opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8" />
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
          
          {/* YouTube Section */}
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
                <a 
                  key={video.id}
                  href={video.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-all duration-300 group ${isVisible ? `animate-in animate-in-delay-${index + 1}` : 'opacity-0'}`}
                >
                  <div className="relative aspect-video bg-gray-100 overflow-hidden">
                    {!loadedImages[`yt-${video.id}`] && (
                      <Skeleton className="absolute inset-0 bg-gray-200" />
                    )}
                    <img 
                      src={video.thumbnailUrl} 
                      alt={video.title} 
                      className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 ${loadedImages[`yt-${video.id}`] ? 'opacity-100' : 'opacity-0'}`}
                      onLoad={() => handleImageLoad(`yt-${video.id}`)}
                    />
                    <div className="absolute inset-0 bg-[#120F52]/0 group-hover:bg-[#120F52]/20 transition-colors duration-300 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[16px] border-l-[#120F52] border-b-[8px] border-b-transparent ml-1"></div>
                      </div>
                    </div>
                  </div>
                  <div className="p-3">
                    <h4 className="font-medium text-darktext truncate">{video.title}</h4>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
        
        <div className="flex justify-center mt-16">
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
            <a 
              href="https://www.instagram.com/casadaalquimia/" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-6 py-3 bg-[#264F7D]/10 border border-[#264F7D]/20 text-[#264F7D] rounded-full font-medium hover:bg-[#264F7D]/15 transition-colors"
            >
              <Instagram className="h-5 w-5" />
              Seguir no Instagram
            </a>
            <a 
              href="https://www.youtube.com/channel/UCXfwqPXGttI4Q6Xu5XBmX6g" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-6 py-3 bg-[#264F7D]/10 border border-[#264F7D]/20 text-[#264F7D] rounded-full font-medium hover:bg-[#264F7D]/15 transition-colors"
            >
              <Youtube className="h-5 w-5" />
              Inscreva-se no YouTube
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialMedia;
