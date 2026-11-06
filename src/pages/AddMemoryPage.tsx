import React, { useState } from 'react';
import { Memory, Category, Season, TapeStyle, TapePosition } from '../types';
import { PolaroidCard } from '../components/PolaroidCard';
import { WashiTape } from '../components/WashiTape';
import { Upload, Sparkles, Check, ArrowLeft } from 'lucide-react';
import confetti from 'canvas-confetti';
import { scrapbookAudio } from '../utils/audio';

interface AddMemoryPageProps {
  onSaveMemory: (memory: Memory) => void;
  onCancel: () => void;
  editingMemory?: Memory | null;
}

// Preset library of our 13 custom-generated 35mm photos
const PRESET_PHOTOS = [
  { label: 'Diner Coffee Mugs', path: '/images/memories/diner-morning.jpg' },
  { label: 'Road Trip Sunset', path: '/images/memories/road-trip-sunset.jpg' },
  { label: 'Bookstore Rain Nook', path: '/images/memories/bookstore-rain.jpg' },
  { label: 'Birthday Sponge Cake', path: '/images/memories/birthday-cake.jpg' },
  { label: 'Farmers Market Peaches', path: '/images/memories/farmers-market.jpg' },
  { label: 'Vinyl Turntable', path: '/images/memories/vinyl-listening.jpg' },
  { label: 'Coastal Island Ferry', path: '/images/memories/coastal-ferry.jpg' },
  { label: '24hr Laundromat', path: '/images/memories/laundromat-night.jpg' },
  { label: 'Wildflower Picnic', path: '/images/memories/wildflower-picnic.jpg' },
  { label: 'Autumn Park Boots', path: '/images/memories/autumn-park-boots.jpg' },
  { label: 'Mountain Drive Map', path: '/images/memories/mountain-drive-map.jpg' },
  { label: 'First Coffee Napkin', path: '/images/memories/first-coffee-candid.jpg' },
  { label: 'Cider & Leaves Bench', path: '/images/memories/cider-and-leaves.jpg' },
];

export const AddMemoryPage: React.FC<AddMemoryPageProps> = ({
  onSaveMemory,
  onCancel,
  editingMemory,
}) => {
  const isEditing = Boolean(editingMemory);

  const [title, setTitle] = useState(editingMemory?.title || '');
  const [date, setDate] = useState(editingMemory?.date || 'November 6, 2026');
  const [location, setLocation] = useState(editingMemory?.location || 'Hudson Valley, NY');
  const [season, setSeason] = useState<Season>(editingMemory?.season || 'autumn');
  const [category, setCategory] = useState<Category>(editingMemory?.category || 'quiet-day');
  const [image, setImage] = useState(editingMemory?.image || PRESET_PHOTOS[0].path);
  const [handwrittenNote, setHandwrittenNote] = useState(
    editingMemory?.handwrittenNote || 'The light through the kitchen window at 4 PM.'
  );
  const [secretBackNote, setSecretBackNote] = useState(
    editingMemory?.secretBackNote || 'We promised we would never forget how quiet the street felt.'
  );
  const [story, setStory] = useState(
    editingMemory?.story ||
      'It was one of those days where nothing extraordinary happened, which made it the best kind of day.'
  );
  const [tapeStyle, setTapeStyle] = useState<TapeStyle>(editingMemory?.tapeStyle || 'cherry');
  const [tapePosition, setTapePosition] = useState<TapePosition>(
    editingMemory?.tapePosition || 'top-left'
  );
  const [hasKeepsake, setHasKeepsake] = useState(Boolean(editingMemory?.keepsake));
  const [keepsakeTitle, setKeepsakeTitle] = useState(editingMemory?.keepsake?.title || 'TRANSIT PASS');
  const [keepsakeSubtitle, setKeepsakeSubtitle] = useState(
    editingMemory?.keepsake?.subtitle || 'Two passengers'
  );
  const [keepsakeDetails, setKeepsakeDetails] = useState(
    editingMemory?.keepsake?.details || 'Tucked into the jacket pocket.'
  );
  const [stickerInput, setStickerInput] = useState(
    editingMemory?.stickers?.join(', ') || '★ FAVORITE, ROAD TRIP'
  );

  // File upload handler for custom photos
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setImage(event.target.result as string);
          scrapbookAudio.playCameraClick();
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !story.trim()) {
      alert('Please give your memory a title and write down the story.');
      return;
    }

    const stickers = stickerInput
      .split(',')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    const memoryData: Memory = {
      id: editingMemory?.id || `memory-${Date.now()}`,
      title: title.trim(),
      date: date.trim(),
      isoDate: new Date().toISOString().slice(0, 10),
      year: new Date().getFullYear(),
      season,
      location: location.trim(),
      category,
      image,
      imageAlt: `${title} memory photo`,
      handwrittenNote: handwrittenNote.trim() || 'A day to remember.',
      secretBackNote: secretBackNote.trim() || 'Recorded with love.',
      story: story.trim(),
      tapeStyle,
      tapePosition,
      rotation: (Math.random() * 4 - 2), // random subtle tilt
      isFavorite: editingMemory?.isFavorite || false,
      stickers,
      keepsake: hasKeepsake
        ? {
            type: 'ticket',
            title: keepsakeTitle.trim(),
            subtitle: keepsakeSubtitle.trim(),
            details: keepsakeDetails.trim(),
            date: date.trim(),
          }
        : undefined,
    };

    scrapbookAudio.playStampThud();

    // Trigger joyful celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#C0392B', '#F5BFA2', '#FEF3C7', '#5E6C52'],
      });
    } catch {
      // Confetti fallback
    }

    onSaveMemory(memoryData);
  };

  // Construct temporary preview memory object
  const previewMemory: Memory = {
    id: 'preview',
    title: title || 'Untitled Memory',
    date: date || 'Today',
    isoDate: '2026-11-06',
    year: 2026,
    season,
    location: location || 'Somewhere special',
    category,
    image,
    imageAlt: title,
    handwrittenNote: handwrittenNote || 'Scribble something here...',
    secretBackNote: secretBackNote || 'Secret back note...',
    story,
    tapeStyle,
    tapePosition,
    rotation: -1.2,
    stickers: stickerInput.split(',').map((s) => s.trim()).filter(Boolean),
    keepsake: hasKeepsake
      ? {
          type: 'ticket',
          title: keepsakeTitle,
          subtitle: keepsakeSubtitle,
          details: keepsakeDetails,
          date,
        }
      : undefined,
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#D8C7B4]">
        <div>
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex items-center gap-1.5 text-xs font-mono text-scrap-pencil hover:text-scrap-brown mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Album
          </button>
          <h1 className="font-display text-3xl sm:text-4xl text-scrap-brown font-bold tracking-tight">
            {isEditing ? 'Edit Scrapbook Page' : 'Paste a New Memory'}
          </h1>
          <p className="font-handwriting text-xl text-scrap-sepia mt-1">
            "Every ticket stub, polaroid, and receipt is worth holding onto."
          </p>
        </div>

        <WashiTape style="butter" angle={-2} width="w-24" className="hidden sm:inline-block" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Crafting Table Form */}
        <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-6 bg-[#FAF7F2] p-6 sm:p-8 rounded shadow-md border border-[#DFD3C2]">
          {/* Title & Date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-scrap-brown font-bold mb-1">
                Memory Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Midnight Pie at the 24hr Diner"
                className="w-full px-3 py-2 bg-white border border-[#C5B5A2] rounded-xs font-serif text-sm text-scrap-brown focus:ring-1 focus:ring-scrap-cherry focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-scrap-brown font-bold mb-1">
                Date *
              </label>
              <input
                type="text"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="e.g. October 14, 2024"
                className="w-full px-3 py-2 bg-white border border-[#C5B5A2] rounded-xs font-mono text-xs text-scrap-brown focus:ring-1 focus:ring-scrap-cherry focus:outline-none"
              />
            </div>
          </div>

          {/* Location, Season & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-scrap-brown font-bold mb-1">
                Location
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Portland ME"
                className="w-full px-3 py-2 bg-white border border-[#C5B5A2] rounded-xs font-mono text-xs text-scrap-brown focus:ring-1 focus:ring-scrap-cherry focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-scrap-brown font-bold mb-1">
                Season
              </label>
              <select
                value={season}
                onChange={(e) => setSeason(e.target.value as Season)}
                className="w-full px-3 py-2 bg-white border border-[#C5B5A2] rounded-xs font-mono text-xs text-scrap-brown focus:ring-1 focus:ring-scrap-cherry focus:outline-none"
              >
                <option value="spring">Spring</option>
                <option value="summer">Summer</option>
                <option value="autumn">Autumn</option>
                <option value="winter">Winter</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-scrap-brown font-bold mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as Category)}
                className="w-full px-3 py-2 bg-white border border-[#C5B5A2] rounded-xs font-mono text-xs text-scrap-brown focus:ring-1 focus:ring-scrap-cherry focus:outline-none"
              >
                <option value="quiet-day">Quiet Day</option>
                <option value="roadtrip">Road Trip</option>
                <option value="milestone">Milestone</option>
                <option value="food-diner">Food & Diner</option>
                <option value="adventure">Adventure</option>
              </select>
            </div>
          </div>

          {/* Photograph Selection */}
          <div className="pt-2 border-t border-dashed border-[#DFD3C2]">
            <label className="block text-xs font-mono uppercase tracking-wider text-scrap-brown font-bold mb-2">
              Photograph Source
            </label>

            {/* Upload or Preset Choice */}
            <div className="space-y-3">
              {/* Preset selection dropdown */}
              <div>
                <span className="text-[11px] font-mono text-scrap-pencil block mb-1">
                  Choose from Curated Vintage Film Rolls:
                </span>
                <select
                  value={image}
                  onChange={(e) => {
                    scrapbookAudio.playTapePeel();
                    setImage(e.target.value);
                  }}
                  className="w-full px-3 py-2 bg-white border border-[#C5B5A2] rounded-xs font-mono text-xs text-scrap-brown focus:ring-1 focus:ring-scrap-cherry focus:outline-none"
                >
                  {PRESET_PHOTOS.map((p, idx) => (
                    <option key={idx} value={p.path}>
                      Roll #{idx + 1}: {p.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Or Upload Custom Image */}
              <div className="flex items-center gap-3">
                <label className="inline-flex items-center gap-2 px-3 py-2 bg-[#F0E5D4] border border-[#C5B5A2] text-xs font-mono text-scrap-brown rounded cursor-pointer hover:bg-[#E6D7C3] transition-colors">
                  <Upload className="w-3.5 h-3.5 text-scrap-cherry" />
                  <span>Upload Your Own Photo</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
                <span className="text-[11px] font-mono text-scrap-pencil">
                  Supports JPG, PNG, WebP (stored locally)
                </span>
              </div>
            </div>
          </div>

          {/* Handwritten Margin Note (Front) */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-scrap-brown font-bold mb-1">
              Handwritten Margin Note (Front of Photo)
            </label>
            <input
              type="text"
              value={handwrittenNote}
              onChange={(e) => setHandwrittenNote(e.target.value)}
              placeholder="e.g. 5:30 AM in the rain. We had $9."
              className="w-full px-3 py-2 bg-white border border-[#C5B5A2] rounded-xs font-handwriting text-xl text-scrap-brown focus:ring-1 focus:ring-scrap-cherry focus:outline-none"
            />
          </div>

          {/* Secret Back Inscription */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-scrap-brown font-bold mb-1">
              Secret Back Inscription (Flip Side of Photo)
            </label>
            <input
              type="text"
              value={secretBackNote}
              onChange={(e) => setSecretBackNote(e.target.value)}
              placeholder="e.g. Julian tried to pretend the cinnamon glaze was intentional..."
              className="w-full px-3 py-2 bg-white border border-[#C5B5A2] rounded-xs font-handwriting text-xl text-scrap-brown focus:ring-1 focus:ring-scrap-cherry focus:outline-none"
            />
          </div>

          {/* Full Journal Narrative */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-scrap-brown font-bold mb-1">
              The Full Story *
            </label>
            <textarea
              required
              rows={4}
              value={story}
              onChange={(e) => setStory(e.target.value)}
              placeholder="Write the unedited journal reflection of this moment..."
              className="w-full px-3 py-2 bg-white border border-[#C5B5A2] rounded-xs font-serif text-sm leading-relaxed text-scrap-brown focus:ring-1 focus:ring-scrap-cherry focus:outline-none"
            />
          </div>

          {/* Washi Tape Picker */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-dashed border-[#DFD3C2]">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-scrap-brown font-bold mb-1">
                Washi Tape Color
              </label>
              <div className="flex flex-wrap gap-2">
                {(['peach', 'cherry', 'butter', 'sage', 'kraft', 'grid'] as TapeStyle[]).map(
                  (style) => (
                    <button
                      key={style}
                      type="button"
                      onClick={() => {
                        scrapbookAudio.playTapePeel();
                        setTapeStyle(style);
                      }}
                      className={`px-2.5 py-1 text-xs font-mono uppercase rounded capitalize transition-all ${
                        tapeStyle === style
                          ? 'ring-2 ring-scrap-cherry font-bold'
                          : 'opacity-70 hover:opacity-100'
                      }`}
                    >
                      <WashiTape style={style} angle={0} width="w-12" />
                    </button>
                  )
                )}
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-scrap-brown font-bold mb-1">
                Tape Position
              </label>
              <select
                value={tapePosition}
                onChange={(e) => setTapePosition(e.target.value as TapePosition)}
                className="w-full px-3 py-2 bg-white border border-[#C5B5A2] rounded-xs font-mono text-xs text-scrap-brown focus:ring-1 focus:ring-scrap-cherry focus:outline-none"
              >
                <option value="top-left">Top Left Tape</option>
                <option value="top-right">Top Right Tape</option>
                <option value="top-center">Top Center Tape</option>
                <option value="corners">Archival Photo Corners</option>
              </select>
            </div>
          </div>

          {/* Keepsake Ephemera Toggle */}
          <div className="pt-2 border-t border-dashed border-[#DFD3C2]">
            <label className="flex items-center gap-2 cursor-pointer mb-3">
              <input
                type="checkbox"
                checked={hasKeepsake}
                onChange={(e) => setHasKeepsake(e.target.checked)}
                className="rounded text-scrap-cherry focus:ring-scrap-cherry"
              />
              <span className="text-xs font-mono uppercase tracking-wider text-scrap-brown font-bold">
                Pin a Keepsake / Ticket Stub to this entry
              </span>
            </label>

            {hasKeepsake && (
              <div className="p-4 bg-[#F5ECE0] rounded space-y-3">
                <input
                  type="text"
                  value={keepsakeTitle}
                  onChange={(e) => setKeepsakeTitle(e.target.value)}
                  placeholder="Ticket title (e.g. PACIFIC COAST FERRIES)"
                  className="w-full px-3 py-1.5 bg-white border border-[#C5B5A2] rounded-xs font-mono text-xs text-scrap-brown"
                />
                <input
                  type="text"
                  value={keepsakeSubtitle}
                  onChange={(e) => setKeepsakeSubtitle(e.target.value)}
                  placeholder="Subtitle (e.g. Round Trip Stateroom Pass)"
                  className="w-full px-3 py-1.5 bg-white border border-[#C5B5A2] rounded-xs font-mono text-xs text-scrap-brown"
                />
                <input
                  type="text"
                  value={keepsakeDetails}
                  onChange={(e) => setKeepsakeDetails(e.target.value)}
                  placeholder="Notes or price details..."
                  className="w-full px-3 py-1.5 bg-white border border-[#C5B5A2] rounded-xs font-mono text-xs text-scrap-brown"
                />
              </div>
            )}
          </div>

          {/* Stickers */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-scrap-brown font-bold mb-1">
              Stickers & Stamps (comma separated)
            </label>
            <input
              type="text"
              value={stickerInput}
              onChange={(e) => setStickerInput(e.target.value)}
              placeholder="e.g. FAVORITE DAY, ROAD TRIP, KEEP SAKE"
              className="w-full px-3 py-2 bg-white border border-[#C5B5A2] rounded-xs font-mono text-xs text-scrap-brown focus:ring-1 focus:ring-scrap-cherry focus:outline-none"
            />
          </div>

          {/* Form Actions */}
          <div className="flex items-center gap-3 pt-4 border-t border-[#DFD3C2]">
            <button
              type="submit"
              className="px-6 py-3 bg-scrap-cherry hover:bg-[#A82C24] text-white font-serif font-bold text-sm rounded shadow-sm flex items-center gap-2 transition-transform active:scale-95"
            >
              <Check className="w-4 h-4" />
              <span>{isEditing ? 'Save Changes' : 'Paste into Scrapbook'}</span>
            </button>

            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-3 bg-[#EAE0D1] hover:bg-[#DFD3C2] text-scrap-brown font-mono text-xs rounded transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>

        {/* Right Column: Live Interactive Polaroid Preview */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div className="sticky top-24 w-full flex flex-col items-center">
            <span className="font-mono text-xs uppercase tracking-widest text-scrap-cherry font-bold mb-3 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Live Scrapbook Preview</span>
            </span>

            <PolaroidCard
              memory={previewMemory}
              showKeepSakePreview={hasKeepsake}
              allowFlip={true}
              size="md"
            />

            <p className="font-handwriting text-base text-scrap-pencil mt-4 text-center">
              Changes reflect live on the Polaroid above.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
