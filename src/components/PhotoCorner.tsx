import React from 'react';

interface PhotoCornerProps {
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  className?: string;
}

export const PhotoCorner: React.FC<PhotoCornerProps> = ({ position, className = '' }) => {
  const getPositionClasses = () => {
    switch (position) {
      case 'top-left':
        return 'top-0 left-0 border-t-[20px] border-l-[20px] border-t-[#3A2A1E] border-l-[#3A2A1E] border-r-[20px] border-b-[20px] border-r-transparent border-b-transparent';
      case 'top-right':
        return 'top-0 right-0 border-t-[20px] border-r-[20px] border-t-[#3A2A1E] border-r-[#3A2A1E] border-l-[20px] border-b-[20px] border-l-transparent border-b-transparent';
      case 'bottom-left':
        return 'bottom-0 left-0 border-b-[20px] border-l-[20px] border-b-[#3A2A1E] border-l-[#3A2A1E] border-r-[20px] border-t-[20px] border-r-transparent border-t-transparent';
      case 'bottom-right':
        return 'bottom-0 right-0 border-b-[20px] border-r-[20px] border-b-[#3A2A1E] border-r-[#3A2A1E] border-l-[20px] border-t-[20px] border-l-transparent border-t-transparent';
    }
  };

  return (
    <div
      className={`absolute w-0 h-0 z-10 pointer-events-none drop-shadow-sm opacity-90 ${getPositionClasses()} ${className}`}
      aria-hidden="true"
    />
  );
};
