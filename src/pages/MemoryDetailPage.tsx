import React from 'react';
import { Memory } from '../types';
import { PolaroidCard } from '../components/PolaroidCard';
import { WashiTape } from '../components/WashiTape';
import { TicketStub } from '../components/TicketStub';
import { StampBadge } from '../components/StampBadge';
import { ArrowLeft, ArrowRight, Heart, Edit3, Trash2, Calendar, MapPin, Sparkles, Volume2 } from 'lucide-react';
import { scrapbookAudio } from '../utils/audio';

interface MemoryDetailPageProps {
  memory: Memory;
  allMemories: Memory[];
  onBackToTimeline: () => void;
  onSelectMemory: (memory: Memory) => void;
  onEditMemory: (memory: Memory) => void;
  onDeleteMemory: (id: string) => void;
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
}

export const MemoryDetailPage: React.FC<MemoryDetailPageProps> = ({
  memory,
  allMemories,
  onBackToTimeline,
  onSelectMemory,
  onEditMemory,
  onDeleteMemory,
  onToggleFavorite,
}) => {
  // Find index and previous/next memories
  const currentIndex = allMemories.findIndex((m) => m.id === memory.id);
  const prevMemory = currentIndex > 0 ? allMemories[currentIndex - 1] : null;
  const nextMemory = currentIndex < allMemories.length - 1 ? allMemories[currentIndex + 1] : null;

  // Find related memories (same category or year, excluding current)
  const relatedMemories = allMemories
    .filter((m) => m.id !== memory.id && (m.category === memory.category || m.year === memory.year))
    .slice(0, 3);

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to remove "${memory.title}" from the scrapbook?`)) {
      scrapbookAudio.playStampThud();
      onDeleteMemory(memory.id);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Navigation Breadcrumb Bar */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#D8C7B4]">
        <button
          type="button"
          onClick={() => {
            scrapbookAudio.playPaperRustle();
            onBackToTimeline();
          }}
          className="inline-flex items-center gap-2 font-serif text-sm text-scrap-brown hover:text-scrap-cherry transition-colors font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Chronology</span>
        </button>

        <div className="flex items-center gap-3">
          {/* Previous Page Turn */}
          {prevMemory && (
            <button
              type="button"
              onClick={() => {
                scrapbookAudio.playPaperRustle();
                onSelectMemory(prevMemory);
              }}
              title={`Previous: ${prevMemory.title}`}
              className="p-2 text-xs font-mono rounded border border-[#C5B5A2] bg-[#FAF7F2] text-scrap-brown hover:bg-[#F0E5D4] flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Prev Page</span>
            </button>
          )}

          {/* Next Page Turn */}
          {nextMemory && (
            <button
              type="button"
              onClick={() => {
                scrapbookAudio.playPaperRustle();
                onSelectMemory(nextMemory);
              }}
              title={`Next: ${nextMemory.title}`}
              className="p-2 text-xs font-mono rounded border border-[#C5B5A2] bg-[#FAF7F2] text-scrap-brown hover:bg-[#F0E5D4] flex items-center gap-1"
            >
              <span className="hidden sm:inline">Next Page</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}

          {/* Favorite Toggle */}
          <button
            type="button"
            onClick={(e) => onToggleFavorite(memory.id, e)}
            className={`p-2 text-xs font-mono rounded border flex items-center gap-1 ${
              memory.isFavorite
                ? 'bg-scrap-cherry text-white border-scrap-cherry'
                : 'border-[#C5B5A2] bg-[#FAF7F2] text-scrap-brown hover:text-scrap-cherry'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${memory.isFavorite ? 'fill-current' : ''}`} />
            <span className="hidden sm:inline">{memory.isFavorite ? 'Starred' : 'Star'}</span>
          </button>

          {/* Edit Entry */}
          <button
            type="button"
            onClick={() => onEditMemory(memory)}
            className="p-2 text-xs font-mono rounded border border-[#C5B5A2] bg-[#FAF7F2] text-scrap-brown hover:text-scrap-cherry flex items-center gap-1"
          >
            <Edit3 className="w-3.5 h-3.5 text-scrap-cherry" />
            <span className="hidden sm:inline">Edit Entry</span>
          </button>

          {/* Delete Entry */}
          <button
            type="button"
            onClick={handleDelete}
            title="Delete memory"
            className="p-2 text-xs font-mono rounded border border-red-200 bg-red-50 text-red-700 hover:bg-red-100 flex items-center gap-1"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Remove</span>
          </button>
        </div>
      </div>

      {/* Main Scrapbook Two-Page Spread */}
      <div className="relative bg-[#FAF7F2] paper-texture rounded-sm shadow-2xl p-6 sm:p-10 md:p-12 border border-[#E0D5C3]">
        {/* Washi Tapes on Top Margin */}
        <WashiTape style={memory.tapeStyle} angle={-2} width="w-32" className="absolute -top-3 left-12" />
        <WashiTape style="kraft" angle={1.5} width="w-24" className="absolute -top-3 right-16" />

        {/* Spread Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-dashed border-[#DFD3C2] pb-6 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-xs uppercase tracking-widest text-scrap-cherry font-bold">
                SCRAPBOOK SPREAD #{currentIndex + 1} • {memory.season.toUpperCase()} {memory.year}
              </span>
              {memory.isFavorite && (
                <span className="flex items-center gap-1 font-mono text-xs text-scrap-cherry font-bold">
                  • <Heart className="w-3 h-3 fill-current" /> FAVORITE MEMORY
                </span>
              )}
            </div>
            <h1 className="font-display text-3xl sm:text-5xl font-bold text-scrap-brown tracking-tight">
              {memory.title}
            </h1>
          </div>

          <div className="flex flex-col sm:items-end font-mono text-xs text-scrap-pencil">
            <span className="flex items-center gap-1.5 font-bold text-scrap-brown">
              <Calendar className="w-3.5 h-3.5 text-scrap-cherry" />
              {memory.date}
            </span>
            <span className="flex items-center gap-1.5 mt-0.5">
              <MapPin className="w-3.5 h-3.5 text-scrap-sage" />
              {memory.location}
            </span>
          </div>
        </div>

        {/* Content Layout: Left Polaroid / Right Narrative */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Interactive Polaroid with Flip Side */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <PolaroidCard
              memory={memory}
              size="lg"
              onToggleFavorite={onToggleFavorite}
              allowFlip={true}
              showKeepSakePreview={false}
            />

            <p className="text-center font-handwriting text-base text-scrap-pencil mt-4">
              Click photo or flip icon to reveal secret handwritten inscription
            </p>

            {/* Pinned Ephemera / Keepsake */}
            {memory.keepsake && (
              <div className="w-full max-w-sm mt-6">
                <div className="flex items-center gap-1 font-mono text-xs uppercase tracking-wider text-scrap-cherry font-bold mb-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Collected Artifact</span>
                </div>
                <TicketStub keepsake={memory.keepsake} />
              </div>
            )}
          </div>

          {/* Right Column: Full Journal Entry & Marginalia */}
          <div className="lg:col-span-7 space-y-6">
            {/* Ambient Sound Atmosphere Chip */}
            {memory.audioMood && (
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F3ECE2] border border-[#DDD3C0] text-xs font-mono text-scrap-brown">
                <Volume2 className="w-3.5 h-3.5 text-scrap-cherry" />
                <span>
                  Sound Atmosphere: <strong className="capitalize">{memory.audioMood}</strong>
                </span>
              </div>
            )}

            {/* The Journal Story */}
            <div className="prose prose-stone max-w-none">
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-scrap-brown mb-3">
                The Story
              </h2>
              <p className="font-serif text-base sm:text-lg leading-relaxed text-scrap-brown/90 whitespace-pre-line first-letter:text-4xl first-letter:font-display first-letter:font-bold first-letter:float-left first-letter:mr-2 first-letter:text-scrap-cherry">
                {memory.story}
              </p>
            </div>

            {/* Postscript Marginalia Note */}
            <div className="relative p-5 bg-[#FAF3E8] border-l-4 border-scrap-cherry rounded shadow-inner">
              <WashiTape style="butter" angle={-1} width="w-20" className="absolute -top-2.5 right-4" />
              <span className="font-mono text-xs uppercase tracking-wider text-scrap-cherry font-bold block mb-1">
                Postscript • Julian's Note
              </span>
              <p className="font-handwriting text-2xl text-scrap-sepia leading-snug">
                "Years from now, this will still be one of the best decisions we ever made."
              </p>
            </div>

            {/* Stickers / Tags */}
            {memory.stickers && memory.stickers.length > 0 && (
              <div className="pt-4 border-t border-dashed border-[#DFD3C2]">
                <span className="text-xs font-mono text-scrap-pencil block mb-2 uppercase tracking-wider">
                  Album Stamps & Category Tags:
                </span>
                <div className="flex flex-wrap gap-2">
                  {memory.stickers.map((stk, idx) => (
                    <StampBadge
                      key={idx}
                      label={stk}
                      variant="sticker"
                      color={idx % 2 === 0 ? 'cherry' : 'sage'}
                      rotation={idx % 2 === 0 ? -2 : 3}
                    />
                  ))}
                  <StampBadge
                    label={memory.category.toUpperCase()}
                    variant="rubber"
                    color="brown"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Memories Strip at Bottom */}
        {relatedMemories.length > 0 && (
          <div className="mt-14 pt-8 border-t-2 border-dashed border-[#DFD3C2]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display text-2xl text-scrap-brown font-bold">
                From the Same Pages & Seasons
              </h3>
              <span className="font-mono text-xs text-scrap-pencil">
                Related in {memory.year}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedMemories.map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => {
                    scrapbookAudio.playPaperRustle();
                    onSelectMemory(rel);
                  }}
                  className="group bg-[#FAF8F5] p-3 rounded-xs border border-[#DDD3C0] shadow-sm hover:shadow-md cursor-pointer transition-all transform hover:-translate-y-1"
                >
                  <div className="aspect-square w-full overflow-hidden bg-black rounded-xs mb-2">
                    <img
                      src={rel.image}
                      alt={rel.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <h4 className="font-serif font-bold text-sm text-scrap-brown group-hover:text-scrap-cherry line-clamp-1">
                    {rel.title}
                  </h4>
                  <p className="font-handwriting text-lg text-scrap-sepia line-clamp-1">
                    {rel.handwrittenNote}
                  </p>
                  <span className="font-mono text-[10px] text-scrap-pencil block mt-1">
                    {rel.date}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
