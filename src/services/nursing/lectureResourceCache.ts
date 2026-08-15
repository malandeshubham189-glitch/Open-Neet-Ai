import { NursingLectureResource, ResourceValidationStatus } from '../../types/nursing';

const CACHE_KEY = 'nursing_lecture_resource_cache_v3';

export interface CachedResourceEntry {
  topicId: string;
  resource: NursingLectureResource;
  cachedAt: string;
  lastValidated: string;
}

export class LectureResourceCache {
  private static cacheMap: Map<string, NursingLectureResource[]> = new Map();
  private static initialized = false;

  private static init() {
    if (this.initialized) return;
    try {
      const data = localStorage.getItem(CACHE_KEY);
      if (data) {
        const parsed: Record<string, NursingLectureResource[]> = JSON.parse(data);
        Object.entries(parsed).forEach(([topicId, list]) => {
          this.cacheMap.set(topicId, list);
        });
      }
    } catch {
      // Fallback to memory cache safely
    }
    this.initialized = true;
  }

  public static get(topicId: string): NursingLectureResource[] | null {
    this.init();
    return this.cacheMap.get(topicId) || null;
  }

  public static set(topicId: string, resources: NursingLectureResource[]) {
    this.init();
    this.cacheMap.set(topicId, resources);
    this.persist();
  }

  public static invalidate(topicId: string) {
    this.init();
    this.cacheMap.delete(topicId);
    this.persist();
  }

  public static updateResourceStatus(
    topicId: string,
    videoId: string,
    status: ResourceValidationStatus
  ) {
    this.init();
    const list = this.cacheMap.get(topicId) || [];
    const updated = list.map((r) => {
      if (r.videoId === videoId) {
        return { ...r, status, lastValidated: new Date().toISOString() };
      }
      return r;
    });
    this.cacheMap.set(topicId, updated);
    this.persist();
  }

  private static persist() {
    try {
      const obj: Record<string, NursingLectureResource[]> = {};
      this.cacheMap.forEach((v, k) => {
        obj[k] = v;
      });
      localStorage.setItem(CACHE_KEY, JSON.stringify(obj));
    } catch {
      // Storage quota or private mode fallback
    }
  }
}

// Export pipeline alias
export const NursingResourceCache = LectureResourceCache;
