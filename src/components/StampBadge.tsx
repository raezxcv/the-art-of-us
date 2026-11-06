import React from 'react';

interface StampBadgeProps {
  label: string;
  variant?: 'stamp' | 'sticker' | 'tag' | 'rubber';
  color?: 'cherry' | 'peach' | 'butter' | 'sage' | 'brown';
  rotation?: number;
  className?: string;
}

export const StampBadge: React.FC<StampBadgeProps> = ({
  label,
  variant = 'sticker',
  color = 'cherry',
  rotation = -3,
  className = '',
}) => {
  const getColorClasses = () => {
    switch (color) {
      case 'cherry':
        return 'text-[#C0392B] border-[#C0392B] bg-[#FDF2F0]';
      case 'peach':
        return 'text-[#B84E2A] border-[#E09070] bg-[#FDEFE9]';
      case 'butter':
        return 'text-[#946200] border-[#E4B830] bg-[#FEF9E7]';
      case 'sage':
        return 'text-[#3E5C32] border-[#7F9C73] bg-[#F1F6EE]';
      case 'brown':
      default:
        return 'text-[#4A3525] border-[#8C6D53] bg-[#F5ECE0]';
    }
  };

  if (variant === 'rubber') {
    return (
      <span
        style={{ transform: `rotate(${rotation}deg)` }}
        className={`inline-block px-2.5 py-1 uppercase tracking-widest text-[11px] font-black border-2 border-dashed rounded select-none opacity-85 ink-stamp ${getColorClasses()} ${className}`}
      >
        {label}
      </span>
    );
  }

  return (
    <span
      style={{ transform: `rotate(${rotation}deg)` }}
      className={`inline-flex items-center px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider rounded-full shadow-sm border select-none transition-transform hover:scale-105 ${getColorClasses()} ${className}`}
    >
      {label}
    </span>
  );
};

