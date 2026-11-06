import React, { useState, useMemo } from 'react';
import { Memory, Category } from '../types';
import { PolaroidCard } from '../components/PolaroidCard';
import { TicketStub } from '../components/TicketStub';
import { WashiTape } from '../components/WashiTape';
import { Search, Filter, Sparkles, Heart, Calendar } from 'lucide-react';
import { scrapbookAudio } from '../utils/audio';

interface TimelinePageProps {
  memories: Memory[];
  onSelectMemory: (memory: Memory) => void;
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
}

export const TimelinePage: React.FC<TimelinePageProps> = ({
  memories,
  onSelectMemory,
  onToggleFavorite,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all' | 'favorites'>('all');
  const [selectedYear, setSelectedYear] = useState<number | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Extract available years
  const availableYears = useMemo(() => {
    const years = Array.from(new Set(memories.map((m) => m.year))).sort((a, b) => b - a);
    return years;
  }, [memories]);

  // Filtered memories sorted chronologically (newest first or oldest first)
  const filteredMemories = useMemo(() => {
    return memories.filter((m) => {
      // Category check
      if (selectedCategory === 'favorites' && !m.isFavorite) return false;
      if (selectedCategory !== 'all' && selectedCategory !== 'favorites' && m.category !== selectedCategory) {
        return false;
      }
      // Year check
      if (selectedYear !== 'all' && m.year !== selectedYear) return false;
      // Search check
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesTitle = m.title.toLowerCase().includes(query);
        const matchesNote = m.handwrittenNote.toLowerCase().includes(query);
        const matchesLocation = m.location.toLowerCase().includes(query);
        const matchesStory = m.story.toLowerCase().includes(query);
        return matchesTitle || matchesNote || matchesLocation || matchesStory;
      }
      return true;
    });
  }, [memories, selectedCategory, selectedYear, searchQuery]);

  const categories: { label: string; value: Category | 'all' | 'favorites' }[] = [
    { label: 'All Pages', value: 'all' },
    { label: '★ Starred', value: 'favorites' },
    { label: 'Road Trips', value: 'roadtrip' },
    { label: 'Quiet Days', value: 'quiet-day' },
    { label: 'Milestones', value: 'milestone' },
    { label: 'Diners & Feasts', value: 'food-diner' },
    { label: 'Adventures', value: 'adventure' },
  ];

  const handleFilterClick = (cat: Category | 'all' | 'favorites') => {
    scrapbookAudio.playTapePeel();
    setSelectedCategory(cat);
  };

  const handleYearClick = (year: number | 'all') => {
    scrapbookAudio.playTapePeel();
    setSelectedYear(year);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Scrapbook Header & Journal Introduction */}
      <div className="relative mb-8 pb-6 border-b border-[#D8C7B4]">
        <WashiTape style="peach" angle={-1.5} width="w-28" className="absolute -top-4 left-6" />
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-scrap-cherry font-bold">
              The Chronology • Four Years in Pages
            </span>
            <h2 className="font-display text-3xl sm:text-4xl text-scrap-brown font-bold tracking-tight mt-1">
              Everyday Dates & Roadside Keepsakes
            </h2>
            <p className="font-handwriting text-xl sm:text-2xl text-scrap-sepia mt-1">
              "We didn't take notes to write a book; we took notes so we'd remember why we laughed."
            </p>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-scrap-pencil absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search places, stories, diners..."
              className="w-full pl-9 pr-3 py-2 bg-[#FAF7F2] border border-[#C5B5A2] rounded-xs text-xs font-mono text-scrap-brown placeholder:text-scrap-pencil/60 focus:outline-none focus:ring-1 focus:ring-scrap-cherry"
            />
          </div>
        </div>

        {/* Filters Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mt-6 pt-4 border-t border-dashed border-[#DFD3C2]">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            <span className="text-xs font-mono text-scrap-pencil mr-1 flex items-center gap-1">
              <Filter className="w-3 h-3" /> Filter:
            </span>
            {categories.map((c) => (
              <button
                key={c.value}
                type="button"
                onClick={() => handleFilterClick(c.value)}
                className={`px-2.5 py-1 text-xs rounded-xs font-serif transition-all ${
                  selectedCategory === c.value
                    ? 'bg-scrap-cherry text-white font-bold shadow-xs'
                    : 'bg-[#FAF7F2] text-scrap-brown hover:bg-[#F3ECE2] border border-[#DDD3C0]'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          {/* Year Switcher */}
          <div className="flex items-center gap-1">
            <span className="text-xs font-mono text-scrap-pencil mr-1 flex items-center gap-1">
              <Calendar className="w-3 h-3" /> Year:
            </span>
            <button
              type="button"
              onClick={() => handleYearClick('all')}
              className={`px-2 py-0.5 text-xs font-mono rounded ${
                selectedYear === 'all'
                  ? 'bg-scrap-brown text-white font-bold'
                  : 'text-scrap-brown hover:underline'
              }`}
            >
              All
            </button>
            {availableYears.map((year) => (
              <button
                key={year}
                type="button"
                onClick={() => handleYearClick(year)}
                className={`px-2 py-0.5 text-xs font-mono rounded ${
                  selectedYear === year
                    ? 'bg-scrap-brown text-white font-bold'
                    : 'text-scrap-brown hover:underline'
                }`}
              >
                {year}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Empty State */}
      {filteredMemories.length === 0 && (
        <div className="bg-[#FAF7F2] p-12 text-center rounded border border-dashed border-[#C5B5A2] my-12">
          <Sparkles className="w-8 h-8 text-scrap-cherry mx-auto mb-3" />
          <h3 className="font-serif text-xl font-bold text-scrap-brown">No memories found</h3>
          <p className="font-handwriting text-xl text-scrap-sepia mt-1">
            Looks like this page in the album hasn't been pasted yet.
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory('all');
              setSelectedYear('all');
              setSearchQuery('');
            }}
            className="mt-4 px-4 py-2 bg-scrap-cherry text-white font-serif text-xs rounded shadow-xs"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Scrapbook Spreads Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-12 sm:gap-y-16 gap-x-8 sm:gap-x-10 items-start">
        {filteredMemories.map((memory, index) => (
          <div key={memory.id} className="flex flex-col items-center">
            {/* Memory Index Header on Scrapbook Page */}
            <div className="w-full flex items-center justify-between px-2 mb-2">
              <span className="font-mono text-[10px] text-scrap-pencil uppercase tracking-wider">
                PAGE 0{index + 1} • {memory.season.toUpperCase()} {memory.year}
              </span>
              {memory.isFavorite && (
                <span className="flex items-center gap-1 font-mono text-[10px] text-scrap-cherry font-bold">
                  <Heart className="w-3 h-3 fill-current" />
                  FAVORITE
                </span>
              )}
            </div>

            {/* The Polaroid Card */}
            <PolaroidCard
              memory={memory}
              onSelect={onSelectMemory}
              onToggleFavorite={onToggleFavorite}
              showKeepSakePreview={false}
              size="md"
            />

            {/* Attached Ticket Stub / Ephemera directly below */}
            {memory.keepsake && (
              <div
                className="w-full max-w-[300px] mt-3"
                style={{
                  transform: `rotate(${(memory.rotation || 0) * -0.7}deg)`,
                }}
              >
                <TicketStub
                  keepsake={memory.keepsake}
                  onClick={() => onSelectMemory(memory)}
                  className="cursor-pointer"
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
