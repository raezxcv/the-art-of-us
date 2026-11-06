import React, { useState } from 'react';
import { Memory } from '../types';
import { WashiTape } from './WashiTape';
import { PhotoCorner } from './PhotoCorner';
import { StampBadge } from './StampBadge';
import { Heart, RotateCw, MapPin, Calendar } from 'lucide-react';
import { scrapbookAudio } from '../utils/audio';

interface PolaroidCardProps {
  memory: Memory;
  onSelect?: (memory: Memory) => void;
  onToggleFavorite?: (id: string, e: React.MouseEvent) => void;
  showKeepSakePreview?: boolean;
  allowFlip?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const PolaroidCard: React.FC<PolaroidCardProps> = ({
  memory,
  onSelect,
  onToggleFavorite,
  showKeepSakePreview = true,
  allowFlip = true,
  className = '',
  size = 'md',
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFlipped(!isFlipped);
    scrapbookAudio.playPaperRustle();
  };

  const handleCardClick = () => {
    if (onSelect) {
      scrapbookAudio.playPaperRustle();
      onSelect(memory);
    }
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onToggleFavorite) {
      scrapbookAudio.playStampThud();
      onToggleFavorite(memory.id, e);
    }
  };

  const sizeClasses = {
    sm: 'w-64 p-3 pb-6',
    md: 'w-72 sm:w-80 p-3.5 pb-8',
    lg: 'w-80 sm:w-96 p-4 pb-10',
  }[size];

  const imageHeightClasses = {
    sm: 'aspect-square',
    md: 'aspect-square',
    lg: 'aspect-square',
  }[size];

  return (
    <div
      className={`relative inline-block select-none group perspective-1000 ${className}`}
      style={{
        transform: `rotate(${memory.rotation || 0}deg)`,
      }}
    >
      {/* Tape Attachment at top */}
      {memory.tapePosition === 'top-left' && (
        <WashiTape
          style={memory.tapeStyle}
          angle={-4}
          width="w-20"
          className="absolute -top-3 left-4 z-30"
        />
      )}
      {memory.tapePosition === 'top-right' && (
        <WashiTape
          style={memory.tapeStyle}
          angle={5}
          width="w-20"
          className="absolute -top-3 right-4 z-30"
        />
      )}
      {memory.tapePosition === 'top-center' && (
        <WashiTape
          style={memory.tapeStyle}
          angle={1}
          width="w-24"
          className="absolute -top-3 left-1/2 -translate-x-1/2 z-30"
        />
      )}

      {/* The 3D Card Container */}
      <div
        onClick={handleCardClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleCardClick();
          }
        }}
        role="button"
        tabIndex={0}
        aria-label={`Memory: ${memory.title}, ${memory.date}. Press Enter to view story.`}
        className={`relative ${sizeClasses} bg-[#FAF8F5] rounded-xs shadow-polaroid hover:shadow-polaroid-hover transition-all duration-300 transform-style-3d cursor-pointer ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
      >
        {/* FRONT OF POLAROID */}
        <div className="backface-hidden w-full h-full">
          {/* Photo Corners */}
          {memory.tapePosition === 'corners' && (
            <>
              <PhotoCorner position="top-left" />
              <PhotoCorner position="top-right" />
              <PhotoCorner position="bottom-left" />
              <PhotoCorner position="bottom-right" />
            </>
          )}

          {/* Favorite & Flip Action Buttons */}
          <div className="absolute top-5 right-5 z-20 flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
            {allowFlip && (
              <button
                type="button"
                onClick={handleFlip}
                title="Flip photo to read secret note on back"
                aria-label="Flip photo"
                className="w-7 h-7 rounded-full bg-white/80 backdrop-blur-xs text-scrap-brown hover:text-scrap-cherry hover:bg-white flex items-center justify-center shadow-sm transition-transform active:scale-90"
              >
                <RotateCw className="w-3.5 h-3.5" />
              </button>
            )}
            <button
              type="button"
              onClick={handleFavoriteClick}
              title={memory.isFavorite ? 'Remove from favorites' : 'Mark as favorite'}
              aria-label={memory.isFavorite ? 'Remove from favorites' : 'Mark as favorite'}
              className={`w-7 h-7 rounded-full backdrop-blur-xs flex items-center justify-center shadow-sm transition-transform active:scale-90 ${
                memory.isFavorite
                  ? 'bg-scrap-cherry text-white'
                  : 'bg-white/80 text-scrap-brown hover:text-scrap-cherry hover:bg-white'
              }`}
            >
              <Heart
                className={`w-3.5 h-3.5 ${memory.isFavorite ? 'fill-current' : ''}`}
              />
            </button>
          </div>

          {/* The Photograph Frame */}
          <div
            className={`relative ${imageHeightClasses} w-full overflow-hidden bg-[#E8DFD3] rounded-[2px] shadow-inner`}
          >
            <img
              src={memory.image}
              alt={memory.imageAlt || memory.title}
              className="w-full h-full object-cover filter contrast-[1.03] saturate-[0.98] transition-transform duration-500 group-hover:scale-[1.02]"
              loading="eager"
              decoding="async"
            />
            {/* Subtle vintage vignette gradient */}
            <div
              className="absolute inset-0 pointer-events-none bg-radial from-transparent via-transparent to-black/25 mix-blend-multiply"
              aria-hidden="true"
            />
          </div>

          {/* Handwritten Polaroid Margin Note */}
          <div className="pt-3 px-1">
            <p className="font-handwriting text-xl sm:text-2xl text-scrap-brown leading-snug tracking-wide">
              {memory.handwrittenNote}
            </p>
            <div className="flex items-center justify-between text-xs text-scrap-pencil mt-2 font-mono">
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3 text-scrap-cherry" />
                {memory.date}
              </span>
              <span className="flex items-center gap-1 truncate max-w-[140px]">
                <MapPin className="w-3 h-3 text-scrap-sage" />
                {memory.location}
              </span>
            </div>

            {/* Attached Stickers */}
            {memory.stickers && memory.stickers.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2.5 pt-2 border-t border-dashed border-[#E3D9CC]">
                {memory.stickers.map((sticker, idx) => (
                  <StampBadge
                    key={idx}
                    label={sticker}
                    variant="sticker"
                    color={idx % 2 === 0 ? 'cherry' : 'peach'}
                    rotation={(idx % 2 === 0 ? -2 : 2) * (idx + 1)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* BACK OF POLAROID (Secret Inscription) */}
        <div className="backface-hidden rotate-y-180 absolute inset-0 p-5 flex flex-col justify-between bg-[#F4EFE6] text-scrap-brown paper-ruled rounded-xs border border-[#DFD3C2]">
          <div>
            <div className="flex items-center justify-between border-b border-[#D8C7B4] pb-2 mb-3">
              <span className="font-mono text-[11px] uppercase tracking-wider text-scrap-cherry font-bold">
                ★ Secret Photo Margin Note
              </span>
              <button
                type="button"
                onClick={handleFlip}
                aria-label="Flip back to photo"
                className="text-xs text-scrap-brown hover:text-scrap-cherry font-mono flex items-center gap-1 underline"
              >
                <RotateCw className="w-3 h-3" /> Flip Back
              </button>
            </div>
            <p className="font-handwriting text-2xl text-scrap-sepia leading-relaxed">
              "{memory.secretBackNote}"
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-dashed border-[#D8C7B4]">
            <p className="font-serif italic text-xs text-scrap-brown/80 mb-2">
              "{memory.story.slice(0, 110)}..."
            </p>
            <span className="inline-block text-xs font-bold text-scrap-cherry font-mono uppercase tracking-wider">
              Click to Open Full Scrapbook Page →
            </span>
          </div>
        </div>
      </div>

      {/* Optional attached keepsake preview beneath or beside the photo */}
      {showKeepSakePreview && memory.keepsake && (
        <div className="mt-2 ml-3 max-w-[260px] opacity-90 group-hover:opacity-100 transition-opacity">
          <WashiTape style="grid" angle={-1} width="w-16" className="-mb-2 ml-4" />
          <div className="p-2.5 bg-[#FAF7EE] border border-[#DDD3C0] text-[11px] font-mono rounded shadow-xs text-scrap-brown">
            <span className="font-bold text-scrap-cherry uppercase text-[10px] block">
              PINNED EPHEMERA:
            </span>
            <span className="font-semibold">{memory.keepsake.title}</span>
            {memory.keepsake.subtitle && (
              <span className="block opacity-75">{memory.keepsake.subtitle}</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
