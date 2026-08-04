export interface NcertHighlight {
  id: string;
  chapterId: string;
  page: number;
  text: string;
  color: 'yellow' | 'green' | 'pink' | 'underline';
  note?: string;
  timestamp: string;
}

export interface NcertLastRead {
  chapterId: string;
  chapterName: string;
  page: number;
  scrollRatio?: number;
  updatedAt: string;
}

export interface DrawingStroke {
  id: string;
  page: number;
  tool: 'pen' | 'pencil' | 'highlighter' | 'eraser' | 'underline';
  color: string;
  strokeWidth: number;
  points: { x: number; y: number }[]; // Coordinates in normalized 0..1 ratio of canvas size
}

const HIGHLIGHTS_KEY_PREFIX = 'ncert_highlights_v1_';
const LAST_READ_KEY_PREFIX = 'ncert_last_read_v1_';
const DRAWINGS_KEY_PREFIX = 'ncert_drawings_v1_';

export function getChapterDrawings(chapterId: string): Record<number, DrawingStroke[]> {
  try {
    const raw = localStorage.getItem(`${DRAWINGS_KEY_PREFIX}${chapterId}`);
    return raw ? JSON.parse(raw) : {};
  } catch (err) {
    console.error('Error reading drawings:', err);
    return {};
  }
}

export function saveChapterDrawings(chapterId: string, pageDrawings: Record<number, DrawingStroke[]>): void {
  try {
    localStorage.setItem(`${DRAWINGS_KEY_PREFIX}${chapterId}`, JSON.stringify(pageDrawings));
  } catch (err) {
    console.error('Error saving drawings:', err);
  }
}

export function getChapterHighlights(chapterId: string): NcertHighlight[] {
  try {
    const raw = localStorage.getItem(`${HIGHLIGHTS_KEY_PREFIX}${chapterId}`);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error('Error reading highlights:', err);
    return [];
  }
}

export function saveChapterHighlight(chapterId: string, highlight: Omit<NcertHighlight, 'id' | 'timestamp'>): NcertHighlight {
  const existing = getChapterHighlights(chapterId);
  const newHighlight: NcertHighlight = {
    ...highlight,
    id: `hl-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    timestamp: new Date().toISOString()
  };
  const updated = [newHighlight, ...existing];
  try {
    localStorage.setItem(`${HIGHLIGHTS_KEY_PREFIX}${chapterId}`, JSON.stringify(updated));
  } catch (err) {
    console.error('Error saving highlight:', err);
  }
  return newHighlight;
}

export function removeChapterHighlight(chapterId: string, highlightId: string): NcertHighlight[] {
  const existing = getChapterHighlights(chapterId);
  const updated = existing.filter((h) => h.id !== highlightId);
  try {
    localStorage.setItem(`${HIGHLIGHTS_KEY_PREFIX}${chapterId}`, JSON.stringify(updated));
  } catch (err) {
    console.error('Error removing highlight:', err);
  }
  return updated;
}

export function getLastReadPosition(chapterId: string): NcertLastRead | null {
  try {
    const raw = localStorage.getItem(`${LAST_READ_KEY_PREFIX}${chapterId}`);
    return raw ? JSON.parse(raw) : null;
  } catch (err) {
    console.error('Error reading last read position:', err);
    return null;
  }
}

export function saveLastReadPosition(chapterId: string, chapterName: string, page: number, scrollRatio: number = 0): void {
  const data: NcertLastRead = {
    chapterId,
    chapterName,
    page,
    scrollRatio,
    updatedAt: new Date().toISOString()
  };
  try {
    localStorage.setItem(`${LAST_READ_KEY_PREFIX}${chapterId}`, JSON.stringify(data));
  } catch (err) {
    console.error('Error saving last read position:', err);
  }
}
