interface CacheItem<T> {
  data: T;
  timestamp: number;
  ttlMs: number;
}

export class YouTubeCache {
  private static store: Map<string, CacheItem<any>> = new Map();

  static get<T>(key: string): T | null {
    const item = this.store.get(key);
    if (!item) return null;

    if (Date.now() - item.timestamp > item.ttlMs) {
      this.store.delete(key);
      return null;
    }

    return item.data as T;
  }

  static set<T>(key: string, data: T, ttlMs: number = 300000): void {
    this.store.set(key, {
      data,
      timestamp: Date.now(),
      ttlMs,
    });
  }

  static clear(): void {
    this.store.clear();
  }

  static remove(key: string): void {
    this.store.delete(key);
  }
}
