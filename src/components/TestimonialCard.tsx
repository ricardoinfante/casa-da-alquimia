
import React from 'react';
import { cn } from '@/lib/utils';

interface TestimonialCardProps {
  content: string;
  author: string;
  role?: string;
  image?: string;
  className?: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  content,
  author,
  role,
  image,
  className
}) => {
  return (
    <div className={cn(
      "bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-muted shadow-sm transition-all duration-300 hover:shadow-md hover:bg-white/80",
      className
    )}>
      <div className="mb-4 text-[#264F7D]">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="36" 
          height="36" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="1" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path>
          <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"></path>
        </svg>
      </div>
      
      <blockquote className="text-foreground/90 font-serif text-lg italic mb-6">
        {content}
      </blockquote>
      
      <div className="flex items-center gap-3">
        {image && (
          <div className="w-10 h-10 rounded-full overflow-hidden">
            <img 
              src={image} 
              alt={author} 
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        )}
        
        <div>
          <div className="font-medium text-foreground">{author}</div>
          {role && <div className="text-sm text-foreground/60">{role}</div>}
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
