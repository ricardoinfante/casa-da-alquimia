
import React from 'react';
import { Instagram } from 'lucide-react';
import SocialMediaPost from './SocialMediaPost';

// Dados para posts do Instagram com URLs diretas para as imagens
const instagramPosts = [
  {
    id: 1,
    imageUrl: "/lovable-uploads/87b219fd-f859-454f-af75-028b033d0a5a.png",
    link: "https://www.instagram.com/p/C3lDQVvJA_P/"
  },
  {
    id: 2,
    imageUrl: "/lovable-uploads/ac57f24e-68d6-46c2-aafc-a7107053254a.png",
    link: "https://www.instagram.com/p/C3VZQN9JW0D/"
  },
  {
    id: 3,
    imageUrl: "/lovable-uploads/ddb33374-a35f-48fc-8626-649408abcc43.png",
    link: "https://www.instagram.com/p/C1mPKT6ptc0/"
  },
  {
    id: 4,
    imageUrl: "/lovable-uploads/ed332bd6-19b1-4080-a60a-214765a38989.png",
    link: "https://www.instagram.com/p/C1TPK1NJuCf/"
  },
];

interface InstagramSectionProps {
  isVisible: boolean;
}

const InstagramSection = ({ isVisible }: InstagramSectionProps) => {
  console.log('Instagram posts:', instagramPosts);
  
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
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {instagramPosts.map((post, index) => (
          <SocialMediaPost
            key={post.id}
            imageUrl={post.imageUrl}
            link={post.link}
            aspectRatio="square"
            icon={<Instagram className="text-white h-8 w-8" />}
            isVisible={isVisible}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default InstagramSection;
