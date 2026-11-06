import { Memory } from '../types';
import { INITIAL_MEMORIES } from '../data/memories';

const STORAGE_KEY = 'art_of_us_memories_v1';

export function getMemories(): Memory[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_MEMORIES));
      return INITIAL_MEMORIES;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    return INITIAL_MEMORIES;
  } catch (err) {
    console.error('Failed to load memories from localStorage', err);
    return INITIAL_MEMORIES;
  }
}

export function saveMemory(memory: Memory): Memory[] {
  const current = getMemories();
  const existingIndex = current.findIndex((m) => m.id === memory.id);
  let updated: Memory[];

  if (existingIndex >= 0) {
    updated = [...current];
    updated[existingIndex] = memory;
  } else {
    updated = [memory, ...current];
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to save memory', err);
  }
  return updated;
}

export function deleteMemory(id: string): Memory[] {
  const current = getMemories();
  const updated = current.filter((m) => m.id !== id);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to delete memory', err);
  }
  return updated;
}

export function toggleFavorite(id: string): Memory[] {
  const current = getMemories();
  const updated = current.map((m) => (m.id === id ? { ...m, isFavorite: !m.isFavorite } : m));
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to toggle favorite', err);
  }
  return updated;
}

export function resetToDefaults(): Memory[] {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_MEMORIES));
  } catch (err) {
    console.error('Failed to reset memories', err);
  }
  return INITIAL_MEMORIES;
}

export function exportMemoriesJSON(): void {
  const memories = getMemories();
  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(memories, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute('href', dataStr);
  downloadAnchor.setAttribute('download', `the-art-of-us-scrapbook-${new Date().toISOString().slice(0, 10)}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}

export function importMemoriesJSON(jsonString: string): Memory[] {
  try {
    const parsed = JSON.parse(jsonString);
    if (Array.isArray(parsed) && parsed.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
      return parsed;
    }
    throw new Error('Invalid memories JSON format');
  } catch (err) {
    console.error('Failed to import JSON', err);
    throw err;
  }
}
