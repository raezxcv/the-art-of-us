import React, { useState } from 'react';
import { PageRoute } from '../types';
import { BookOpen, Clock, PlusCircle, Archive, Volume2, VolumeX, Radio, Download, RefreshCw } from 'lucide-react';
import { scrapbookAudio } from '../utils/audio';

interface NavbarProps {
  currentRoute: PageRoute;
  onRouteChange: (route: PageRoute) => void;
  memoryCount: number;
  onExport: () => void;
  onReset: () => void;
  onOpenKeepsakes: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRoute,
  onRouteChange,
  memoryCount,
  onExport,
  onReset,
  onOpenKeepsakes,
}) => {
  const [isMuted, setIsMuted] = useState(scrapbookAudio.getMuted());
  const [isAmbientPlaying, setIsAmbientPlaying] = useState(scrapbookAudio.getIsAmbientPlaying());
  const [showToolsMenu, setShowToolsMenu] = useState(false);

  const handleNavClick = (route: PageRoute) => {
    scrapbookAudio.playPaperRustle();
    onRouteChange(route);
  };

  const toggleSound = () => {
    const muted = scrapbookAudio.toggleMute();
    setIsMuted(muted);
  };

  const toggleAmbientRoom = () => {
    const active = scrapbookAudio.toggleAmbient();
    setIsAmbientPlaying(active);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#ECE3D4]/95 backdrop-blur-md border-b border-[#D8C7B4] shadow-sm">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 gap-1">
          {/* Scrapbook Spine Logo / Title */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => handleNavClick('cover')}
              className="flex items-center gap-1.5 sm:gap-2 group text-left focus:outline-none"
            >
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#C0392B] text-white flex items-center justify-center font-serif font-black text-xs sm:text-sm shadow-inner group-hover:scale-105 transition-transform shrink-0">
                IV
              </div>
              <div className="hidden min-[480px]:block">
                <span className="font-serif text-sm sm:text-lg font-bold tracking-tight text-scrap-brown group-hover:text-scrap-cherry transition-colors block leading-tight">
                  The Art of Us
                </span>
                <span className="hidden sm:block font-mono text-[10px] text-scrap-pencil uppercase tracking-widest">
                  Vol. IV • 2022–2026
                </span>
              </div>
            </button>
          </div>

          {/* Scrapbook Ribbon Navigation Tabs */}
          <nav className="flex items-center gap-1 sm:gap-2" aria-label="Scrapbook navigation">
            <button
              type="button"
              onClick={() => handleNavClick('cover')}
              title="Cover Page"
              className={`relative px-2 sm:px-3 py-1 sm:py-1.5 rounded-sm font-serif text-xs sm:text-sm transition-all duration-200 flex items-center gap-1 ${
                currentRoute === 'cover'
                  ? 'bg-[#FAF7F2] text-scrap-cherry font-bold shadow-xs -translate-y-0.5 border-b-2 border-scrap-cherry'
                  : 'text-scrap-brown hover:bg-black/5 hover:text-scrap-sepia'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="hidden md:inline">Cover</span>
            </button>

            <button
              type="button"
              onClick={() => handleNavClick('timeline')}
              title="Chronology Timeline"
              className={`relative px-2 sm:px-3 py-1 sm:py-1.5 rounded-sm font-serif text-xs sm:text-sm transition-all duration-200 flex items-center gap-1 ${
                currentRoute === 'timeline'
                  ? 'bg-[#FAF7F2] text-scrap-cherry font-bold shadow-xs -translate-y-0.5 border-b-2 border-scrap-cherry'
                  : 'text-scrap-brown hover:bg-black/5 hover:text-scrap-sepia'
              }`}
            >
              <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="hidden md:inline">Chronology</span>
              <span className="px-1 py-0.2 rounded-full text-[9px] sm:text-[10px] font-mono bg-scrap-cherry/10 text-scrap-cherry font-bold">
                {memoryCount}
              </span>
            </button>

            <button
              type="button"
              onClick={onOpenKeepsakes}
              title="Keepsakes Drawer"
              className="relative px-2 sm:px-3 py-1 sm:py-1.5 rounded-sm font-serif text-xs sm:text-sm text-scrap-brown hover:bg-black/5 hover:text-scrap-sepia transition-all duration-200 flex items-center gap-1"
            >
              <Archive className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-scrap-sage" />
              <span className="hidden md:inline">Keepsakes</span>
            </button>

            <button
              type="button"
              onClick={() => handleNavClick('add')}
              title="Paste a New Memory"
              className={`relative px-2 sm:px-3 py-1 sm:py-1.5 rounded-sm font-serif text-xs sm:text-sm transition-all duration-200 flex items-center gap-1 ${
                currentRoute === 'add'
                  ? 'bg-scrap-cherry text-white font-bold shadow-sm -translate-y-0.5'
                  : 'bg-[#D96B5F] text-white hover:bg-scrap-cherry'
              }`}
            >
              <PlusCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
              <span className="hidden sm:inline">Paste Memory</span>
              <span className="inline sm:hidden text-[11px]">Paste</span>
            </button>
          </nav>

          {/* Audio & Utility Controls */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Ambient Sound (Rain & Vinyl Needle) */}
            <button
              type="button"
              onClick={toggleAmbientRoom}
              title={isAmbientPlaying ? 'Stop ambient sound' : 'Play ambient sound'}
              aria-label={isAmbientPlaying ? 'Stop ambient sound' : 'Play ambient sound'}
              className={`p-1.5 sm:p-2 rounded-full transition-all ${
                isAmbientPlaying
                  ? 'bg-[#FAF7F2] text-scrap-cherry shadow-inner ring-1 ring-scrap-cherry animate-pulse'
                  : 'text-scrap-pencil hover:bg-black/5 hover:text-scrap-brown'
              }`}
            >
              <Radio className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>

            {/* Mute/Unmute tactile click effects */}
            <button
              type="button"
              onClick={toggleSound}
              title={isMuted ? 'Unmute' : 'Mute'}
              aria-label={isMuted ? 'Unmute' : 'Mute'}
              className="p-1.5 sm:p-2 rounded-full text-scrap-pencil hover:bg-black/5 hover:text-scrap-brown transition-colors"
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-500" /> : <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
            </button>

            {/* Extra tools dropdown (Export / Reset defaults) */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowToolsMenu(!showToolsMenu)}
                aria-label="Archive options"
                className="text-[10px] sm:text-xs font-mono font-medium text-scrap-brown hover:text-scrap-cherry px-1.5 sm:px-2 py-1 rounded border border-[#C5B5A2] bg-[#F7EFE1]"
              >
                Archive ▾
              </button>

              {showToolsMenu && (
                <div
                  className="absolute right-0 mt-2 w-48 bg-[#FAF7F2] border border-[#D8C7B4] rounded-sm shadow-xl z-50 p-1.5 text-xs font-mono"
                  onMouseLeave={() => setShowToolsMenu(false)}
                >
                  <button
                    type="button"
                    onClick={() => {
                      onExport();
                      setShowToolsMenu(false);
                    }}
                    className="w-full text-left px-3 py-2 hover:bg-[#F0E5D4] rounded flex items-center gap-2 text-scrap-brown"
                  >
                    <Download className="w-3.5 h-3.5 text-scrap-cherry" />
                    <span>Download JSON Backup</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (window.confirm('Restore initial 13 memories and sample keepsakes?')) {
                        onReset();
                        setShowToolsMenu(false);
                      }
                    }}
                    className="w-full text-left px-3 py-2 hover:bg-[#F0E5D4] rounded flex items-center gap-2 text-scrap-pencil"
                  >
                    <RefreshCw className="w-3.5 h-3.5 text-scrap-sage" />
                    <span>Restore Sample Roll</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
