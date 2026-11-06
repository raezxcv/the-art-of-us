export type Season = 'spring' | 'summer' | 'autumn' | 'winter';
export type Category = 'roadtrip' | 'quiet-day' | 'milestone' | 'food-diner' | 'adventure';
export type TapeStyle = 'peach' | 'kraft' | 'cherry' | 'butter' | 'sage' | 'grid';
export type TapePosition = 'top-left' | 'top-right' | 'top-center' | 'corners' | 'diagonal';

export interface Keepsake {
  type: 'ticket' | 'flower' | 'receipt' | 'stamp' | 'matchbook' | 'tag';
  title: string;
  subtitle?: string;
  details?: string;
  date?: string;
  accentColor?: string;
}

export interface Memory {
  id: string;
  title: string;
  date: string;
  isoDate: string;
  year: number;
  season: Season;
  location: string;
  category: Category;
  image: string;
  imageAlt: string;
  handwrittenNote: string;
  secretBackNote: string;
  story: string;
  tapeStyle: TapeStyle;
  tapePosition: TapePosition;
  rotation: number;
  keepsake?: Keepsake;
  stickers?: string[];
  audioMood?: 'rain' | 'vinyl' | 'diner' | 'highway' | 'morning';
  isFavorite?: boolean;
}

export type PageRoute = 'cover' | 'timeline' | 'detail' | 'add' | 'keepsakes';

