
import React from 'react';
import { X } from 'lucide-react';

interface DonationModalContainerProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const DonationModalContainer: React.FC<DonationModalContainerProps> = ({ 
  isOpen, 
  onClose, 
  children 
}) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      
      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-xl max-w-md w-full max-h-[90vh] overflow-auto animate-scale-in">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-foreground/60 hover:text-foreground transition-colors"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>
        
        {children}
      </div>
    </div>
  );
};

export default DonationModalContainer;
