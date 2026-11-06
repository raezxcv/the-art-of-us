import React from 'react';
import { Memory } from '../types';
import { PolaroidCard } from '../components/PolaroidCard';
import { BookOpen, Sparkles, Compass, Heart, ArrowRight } from 'lucide-react';
import { scrapbookAudio } from '../utils/audio';

interface CoverPageProps {
  onOpenTimeline: () => void;
  onSelectMemory: (memory: Memory) => void;
  featuredMemory: Memory;
  allMemories: Memory[];
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
}

export const CoverPage: React.FC<CoverPageProps> = ({
  onOpenTimeline,
  onSelectMemory,
  featuredMemory,
  allMemories,
  onToggleFavorite,
}) => {
  const handleOpenClick = () => {
    scrapbookAudio.playPaperRustle();
    onOpenTimeline();
  };

  const favoriteCount = allMemories.filter((m) => m.isFavorite).length;

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-2.5 sm:p-8 md:p-12">
      {/* Outer Album Cover Binding */}
      <div className="relative w-full max-w-5xl bg-[#3D2817] text-[#FAF7F2] rounded-lg shadow-2xl p-4 sm:p-10 md:p-14 border-2 sm:border-4 border-[#24170D] overflow-hidden">
        {/* Leather/Cloth Texture Overlay */}
        <div
          className="absolute inset-0 opacity-15 pointer-events-none mix-blend-overlay"
          style={{
            backgroundImage: `radial-gradient(circle at center, #ffffff 1px, transparent 1px)`,
            backgroundSize: '12px 12px',
          }}
          aria-hidden="true"
        />

        {/* Embossed Book Spine Edge & Stitched Seam */}
        <div className="absolute left-0 top-0 bottom-0 w-3 sm:w-10 bg-linear-to-r from-black/40 via-black/20 to-transparent border-r border-[#D4AF37]/30 flex flex-col justify-between py-6 items-center">
          <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]/60" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]/60" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]/60" />
        </div>

        {/* Brass Corner Protectors */}
        <div className="absolute top-0 right-0 w-10 sm:w-16 h-10 sm:h-16 border-t-4 sm:border-t-8 border-r-4 sm:border-r-8 border-[#C5A059] rounded-tr-lg pointer-events-none opacity-80" />
        <div className="absolute bottom-0 right-0 w-10 sm:w-16 h-10 sm:h-16 border-b-4 sm:border-b-8 border-r-4 sm:border-r-8 border-[#C5A059] rounded-br-lg pointer-events-none opacity-80" />
        <div className="absolute top-0 left-0 w-10 sm:w-16 h-10 sm:h-16 border-t-4 sm:border-t-8 border-l-4 sm:border-l-8 border-[#C5A059] rounded-tl-lg pointer-events-none opacity-80" />
        <div className="absolute bottom-0 left-0 w-10 sm:w-16 h-10 sm:h-16 border-b-4 sm:border-b-8 border-l-4 sm:border-l-8 border-[#C5A059] rounded-bl-lg pointer-events-none opacity-80" />

        <div className="relative z-10 pl-3 sm:pl-8 lg:pl-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Embossed Gold Title & Editorial Narrative */}
          <div className="lg:col-span-7 space-y-6">
            {/* Archival Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#24170D] border border-[#C5A059]/40 text-[#D4AF37] font-mono text-xs tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#E6C687]" />
              <span>Personal Archive • Vol. IV</span>
            </div>

            {/* Main Gold-Foil Title */}
            <div>
              <h1 className="font-display text-3xl sm:text-5xl md:text-7xl font-bold tracking-tight text-[#F7EFE1] leading-[1.05] drop-shadow-md">
                The Art of Us
              </h1>
              <p className="font-handwriting text-xl sm:text-3xl text-[#E8BF87] mt-2">
                A keepsake for Julian & Maya • 2022 to 2026
              </p>
            </div>

            {/* Inscription Quote */}
            <div className="p-4 bg-[#2C1C10]/80 rounded border-l-4 border-[#C0392B] text-scrap-cream/90 font-serif italic text-sm sm:text-base leading-relaxed">
              "We didn't keep these Polaroids because the lighting was perfect. We kept them because
              we were laughing so hard Julian spilled the cinnamon glaze onto his jacket, and neither of
              us wanted that Tuesday morning to end."
            </div>

            {/* Curated Archive Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-3 border-y border-[#C5A059]/20 font-mono text-xs text-[#EAD8BF]">
              <div>
                <span className="block text-xl font-bold font-serif text-[#F7EFE1]">
                  {allMemories.length}
                </span>
                <span className="opacity-75">Recorded Moments</span>
              </div>
              <div>
                <span className="block text-xl font-bold font-serif text-[#F7EFE1]">
                  {favoriteCount}
                </span>
                <span className="opacity-75">Starred Keepsakes</span>
              </div>
              <div>
                <span className="block text-xl font-bold font-serif text-[#F7EFE1]">
                  1,480
                </span>
                <span className="opacity-75">Miles Driven</span>
              </div>
              <div>
                <span className="block text-xl font-bold font-serif text-[#F7EFE1]">
                  4
                </span>
                <span className="opacity-75">Seasons Passed</span>
              </div>
            </div>

            {/* Primary Action: Open the Scrapbook */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                type="button"
                onClick={handleOpenClick}
                className="group relative inline-flex items-center gap-3 px-6 py-3.5 rounded bg-linear-to-r from-[#C0392B] to-[#992216] text-white font-serif font-bold text-base shadow-xl hover:from-[#D83A3A] hover:to-[#B0281C] transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <BookOpen className="w-5 h-5 transition-transform group-hover:rotate-12" />
                <span>Open Scrapbook</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                type="button"
                onClick={() => {
                  scrapbookAudio.playPaperRustle();
                  onSelectMemory(featuredMemory);
                }}
                className="inline-flex items-center gap-2 px-4 py-3 rounded bg-[#2C1C10] border border-[#C5A059]/40 text-[#EAD8BF] font-mono text-xs hover:bg-[#382314] hover:text-white transition-colors"
              >
                <Compass className="w-3.5 h-3.5 text-[#C0392B]" />
                <span>Inspect Cover Story</span>
              </button>
            </div>
          </div>

          {/* Right Column: Featured Front Cover Polaroid */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div className="relative">
              {/* Decorative Wax Seal Tag */}
              <div className="absolute -top-6 -right-4 z-30 w-14 h-14 rounded-full bg-[#A82C24] text-[#FAF7F2] border-2 border-[#781D17] shadow-xl flex flex-col items-center justify-center font-serif font-bold text-xs rotate-12 select-none">
                <Heart className="w-4 h-4 fill-current text-white/90 mb-0.5" />
                <span className="text-[9px] tracking-widest font-mono">SEAL</span>
              </div>

              {/* The Featured Polaroid Card */}
              <PolaroidCard
                memory={featuredMemory}
                onSelect={onSelectMemory}
                onToggleFavorite={onToggleFavorite}
                showKeepSakePreview={true}
                size="md"
              />
            </div>
            <p className="text-center font-handwriting text-lg text-[#EAD8BF]/80 mt-4">
              Tap photo to examine the margin inscription
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
