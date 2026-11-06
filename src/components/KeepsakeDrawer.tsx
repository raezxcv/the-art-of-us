import React, { useState } from 'react';
import { Memory } from '../types';
import { TicketStub } from './TicketStub';
import { X, Archive, Filter } from 'lucide-react';
import { scrapbookAudio } from '../utils/audio';

interface KeepsakeDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  memories: Memory[];
  onSelectMemory: (memory: Memory) => void;
}

export const KeepsakeDrawer: React.FC<KeepsakeDrawerProps> = ({
  isOpen,
  onClose,
  memories,
  onSelectMemory,
}) => {
  const [filterType, setFilterType] = useState<string>('all');

  if (!isOpen) return null;

  // Extract all memories that possess a keepsake
  const keepsakeItems = memories
    .filter((m) => Boolean(m.keepsake))
    .filter((m) => {
      if (filterType === 'all') return true;
      return m.keepsake?.type === filterType;
    });

  const handleSelect = (mem: Memory) => {
    scrapbookAudio.playPaperRustle();
    onSelectMemory(mem);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF7F2] paper-texture shadow-2xl border-l-2 border-[#D8C7B4] flex flex-col">
          {/* Drawer Header */}
          <div className="p-6 bg-[#ECE3D4] border-b border-[#D8C7B4] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded bg-scrap-cherry text-white flex items-center justify-center shadow-xs">
                <Archive className="w-4 h-4" />
              </div>
              <div>
                <h2 className="font-serif text-lg font-bold text-scrap-brown">
                  The Keepsake Box
                </h2>
                <p className="font-mono text-[10px] text-scrap-pencil uppercase tracking-wider">
                  Preserved Physical Ephemera • {keepsakeItems.length} items
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close keepsake box"
              className="p-1.5 rounded-full text-scrap-pencil hover:text-scrap-brown hover:bg-black/5"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Filter Pills */}
          <div className="px-6 py-3 border-b border-[#DFD3C2] flex items-center gap-1.5 overflow-x-auto text-xs font-mono">
            <span className="text-scrap-pencil mr-1 flex items-center gap-1">
              <Filter className="w-3 h-3" />
            </span>
            {['all', 'ticket', 'receipt', 'flower', 'tag'].map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setFilterType(type)}
                className={`px-2.5 py-1 rounded capitalize transition-all ${
                  filterType === type
                    ? 'bg-scrap-cherry text-white font-bold'
                    : 'bg-[#F2E7D7] text-scrap-brown hover:bg-[#E8DFCF]'
                }`}
              >
                {type === 'all' ? 'All Items' : `${type}s`}
              </button>
            ))}
          </div>

          {/* Keepsakes List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-5">
            <p className="font-handwriting text-lg text-scrap-sepia">
              "Every ticket, receipt, and leaf clipped into our memory album:"
            </p>

            {keepsakeItems.length === 0 ? (
              <div className="text-center py-12 text-scrap-pencil font-mono text-xs">
                No keepsakes match this filter.
              </div>
            ) : (
              keepsakeItems.map((mem) => (
                <div
                  key={mem.id}
                  onClick={() => handleSelect(mem)}
                  className="cursor-pointer group transform transition-transform hover:-translate-y-1"
                >
                  <div className="text-[10px] font-mono text-scrap-cherry font-bold mb-1 flex items-center justify-between">
                    <span>FROM: {mem.title}</span>
                    <span className="opacity-70">{mem.date}</span>
                  </div>
                  <TicketStub keepsake={mem.keepsake!} />
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer */}
          <div className="p-4 bg-[#ECE3D4] border-t border-[#D8C7B4] text-center font-mono text-[11px] text-scrap-pencil">
            Archival Box IV • Tap any ticket to jump directly to its page
          </div>
        </div>
      </div>
    </div>
  );
};
