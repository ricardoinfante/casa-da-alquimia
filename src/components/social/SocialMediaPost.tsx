
import React, { useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

interface SocialMediaPostProps {
  imageUrl: string;
  link: string;
  title?: string;
  aspectRatio?: 'square' | 'video';
  icon: React.ReactNode;
  isVisible: boolean;
  index: number;
}

const SocialMediaPost = ({
  imageUrl,
  link,
  title,
  aspectRatio = 'square',
  icon,
  isVisible,
  index,
}: SocialMediaPostProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
    console.error(`Failed to load image: ${imageUrl}`);
  };

  return (
    <a 
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={`block overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-all duration-300 group ${isVisible ? `animate-in animate-in-delay-${index + 1}` : 'opacity-0'}`}
    >
      <div className={`relative ${aspectRatio === 'square' ? 'aspect-square' : 'aspect-video'} bg-gray-100 overflow-hidden`}>
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Skeleton className="w-full h-full bg-gray-200" />
          </div>
        )}
        {!imageError ? (
          <img 
            src={imageUrl} 
            alt={title || "Social media post"} 
            className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <span className="text-gray-500">Imagem não disponível</span>
          </div>
        )}
        <div className="absolute inset-0 bg-[#120F52]/0 group-hover:bg-[#120F52]/20 transition-colors duration-300 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
            {icon}
          </div>
        </div>
      </div>
      {title && (
        <div className="p-3">
          <h4 className="font-medium text-darktext truncate">{title}</h4>
        </div>
      )}
    </a>
  );
};

export default SocialMediaPost;
