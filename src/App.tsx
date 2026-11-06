import React, { useState, useEffect } from 'react';
import { Memory, PageRoute } from './types';
import { getMemories, saveMemory, deleteMemory, toggleFavorite, resetToDefaults, exportMemoriesJSON } from './utils/storage';
import { Navbar } from './components/Navbar';
import { CoverPage } from './pages/CoverPage';
import { TimelinePage } from './pages/TimelinePage';
import { MemoryDetailPage } from './pages/MemoryDetailPage';
import { AddMemoryPage } from './pages/AddMemoryPage';
import { KeepsakeDrawer } from './components/KeepsakeDrawer';
import { scrapbookAudio } from './utils/audio';

export function App() {
  const [memories, setMemories] = useState<Memory[]>([]);
  const [currentRoute, setCurrentRoute] = useState<PageRoute>('cover');
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);
  const [editingMemory, setEditingMemory] = useState<Memory | null>(null);
  const [isKeepsakesOpen, setIsKeepsakesOpen] = useState(false);

  // Initialize memories from localStorage / seed and sync URL hash
  useEffect(() => {
    const loaded = getMemories();
    setMemories(loaded);

    const syncFromHash = () => {
      const rawHash = window.location.hash.replace(/^#\/?/, '');
      if (!rawHash) {
        setCurrentRoute('cover');
        return;
      }
      const [route, param] = rawHash.split('/');
      if (route === 'timeline' || route === 'add' || route === 'cover') {
        setCurrentRoute(route as PageRoute);
      } else if (route === 'detail') {
        setCurrentRoute('detail');
        if (param) {
          const found = loaded.find((m) => m.id === param);
          if (found) setSelectedMemory(found);
        } else if (!selectedMemory && loaded.length > 0) {
          setSelectedMemory(loaded[0]);
        }
      }
    };

    syncFromHash();
    window.addEventListener('hashchange', syncFromHash);
    return () => window.removeEventListener('hashchange', syncFromHash);
  }, []);

  // Handlers
  const handleSelectMemory = (memory: Memory) => {
    setSelectedMemory(memory);
    setCurrentRoute('detail');
    window.location.hash = `#detail/${memory.id}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRouteChange = (route: PageRoute) => {
    if (route === 'add') {
      setEditingMemory(null);
    }
    setCurrentRoute(route);
    window.location.hash = `#${route}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = toggleFavorite(id);
    setMemories(updated);
    if (selectedMemory && selectedMemory.id === id) {
      setSelectedMemory(updated.find((m) => m.id === id) || null);
    }
  };

  const handleSaveMemory = (memory: Memory) => {
    const updated = saveMemory(memory);
    setMemories(updated);
    setSelectedMemory(memory);
    setEditingMemory(null);
    setCurrentRoute('detail');
    window.location.hash = `#detail/${memory.id}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteMemory = (id: string) => {
    const updated = deleteMemory(id);
    setMemories(updated);
    setSelectedMemory(null);
    setCurrentRoute('timeline');
    window.location.hash = '#timeline';
  };

  const handleEditMemory = (memory: Memory) => {
    setEditingMemory(memory);
    setCurrentRoute('add');
    window.location.hash = '#add';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleResetDefaults = () => {
    const updated = resetToDefaults();
    setMemories(updated);
    if (selectedMemory) {
      setSelectedMemory(updated[0]);
    }
    setCurrentRoute('cover');
    window.location.hash = '#cover';
  };

  const handleExport = () => {
    scrapbookAudio.playStampThud();
    exportMemoriesJSON();
  };

  const featuredMemory = memories[0] || null;

  return (
    <div className="min-h-screen flex flex-col bg-[#ECE3D4] text-scrap-brown selection:bg-scrap-cherry selection:text-white">
      {/* Top Navbar */}
      <Navbar
        currentRoute={currentRoute}
        onRouteChange={handleRouteChange}
        memoryCount={memories.length}
        onExport={handleExport}
        onReset={handleResetDefaults}
        onOpenKeepsakes={() => setIsKeepsakesOpen(true)}
      />

      {/* Main Pages */}
      <main className="flex-1">
        {currentRoute === 'cover' && featuredMemory && (
          <CoverPage
            onOpenTimeline={() => handleRouteChange('timeline')}
            onSelectMemory={handleSelectMemory}
            featuredMemory={featuredMemory}
            allMemories={memories}
            onToggleFavorite={handleToggleFavorite}
          />
        )}

        {currentRoute === 'timeline' && (
          <TimelinePage
            memories={memories}
            onSelectMemory={handleSelectMemory}
            onToggleFavorite={handleToggleFavorite}
          />
        )}

        {currentRoute === 'detail' && (selectedMemory || memories[0]) && (
          <MemoryDetailPage
            memory={selectedMemory || memories[0]}
            allMemories={memories}
            onBackToTimeline={() => setCurrentRoute('timeline')}
            onSelectMemory={handleSelectMemory}
            onEditMemory={handleEditMemory}
            onDeleteMemory={handleDeleteMemory}
            onToggleFavorite={handleToggleFavorite}
          />
        )}

        {currentRoute === 'add' && (
          <AddMemoryPage
            onSaveMemory={handleSaveMemory}
            onCancel={() => {
              if (selectedMemory) {
                setCurrentRoute('detail');
              } else {
                setCurrentRoute('timeline');
              }
            }}
            editingMemory={editingMemory}
          />
        )}
      </main>

      {/* Keepsake Drawer Modal */}
      <KeepsakeDrawer
        isOpen={isKeepsakesOpen}
        onClose={() => setIsKeepsakesOpen(false)}
        memories={memories}
        onSelectMemory={handleSelectMemory}
      />

      {/* Footnote on physical craftsmanship */}
      <footer className="mt-auto py-8 border-t border-[#D8C7B4] text-center font-mono text-xs text-scrap-pencil">
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-scrap-cherry inline-block" />
            <span>The Art of Us • Digital Scrapbook Volume IV</span>
          </div>
          <div>Preserving Polaroids, tickets, and ordinary magic since 2022</div>
          <div>Handcrafted for Julian & Maya</div>
        </div>
      </footer>
    </div>
  );
}
export default App;
