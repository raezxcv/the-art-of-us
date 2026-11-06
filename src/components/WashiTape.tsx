import React from 'react';
import { TapeStyle } from '../types';

interface WashiTapeProps {
  style?: TapeStyle;
  className?: string;
  angle?: number;
  width?: string;
}

export const WashiTape: React.FC<WashiTapeProps> = ({
  style = 'kraft',
  className = '',
  angle = -1.5,
  width = 'w-24',
}) => {
  const getStyleClasses = () => {
    switch (style) {
      case 'peach':
        return 'bg-[#F5BFA2] washi-pattern-dots text-[#783E26]';
      case 'cherry':
        return 'bg-[#D65448] washi-pattern-stripes text-white';
      case 'butter':
        return 'bg-[#FDE68A] washi-pattern-dots text-[#785412]';
      case 'sage':
        return 'bg-[#A3B899] washi-pattern-stripes text-[#263D1C]';
      case 'grid':
        return 'bg-[#E2DACB] washi-pattern-grid text-[#4A3B2C]';
      case 'kraft':
      default:
        return 'bg-[#D4BE9B] text-[#4A3525]';
    }
  };

  return (
    <div
      className={`h-5 washi-tape shadow-sm inline-block select-none pointer-events-none z-20 ${width} ${getStyleClasses()} ${className}`}
      style={{
        transform: `rotate(${angle}deg)`,
      }}
      aria-hidden="true"
    />
  );
};

