export interface TelegramPost {
  id: string;
  telegramMessageId: number;
  channelUsername: string;
  postUrl: string;
  date: string;
  caption: string;
  cleanText: string;
  mediaType: 'video' | 'pdf' | 'image' | 'text' | 'link';
  mediaUrl?: string;
  downloadUrl?: string;
  fileName?: string;
  fileSize?: string;
  thumbnailUrl?: string;
  embedVideoUrl?: string;
  hashtags: string[];
  
  // Categorization
  subjectId: 'physics' | 'chemistry' | 'biology' | 'uncategorized';
  classLevel: 'Class 11' | 'Class 12' | 'All';
  chapterName: string;
  topicTag?: string;
  isUserCustomTagged?: boolean;
  
  // Metadata
  viewsCount?: string;
  sourceTag: string;
  syncedAt: string;
  isBookmarked?: boolean;
}

const TELEGRAM_STORAGE_KEY = 'neetdrop_telegram_notes_v1';
const TELEGRAM_CHANNEL_CONFIG_KEY = 'neetdrop_telegram_channel_username';
const TELEGRAM_BOT_TOKEN_KEY = 'neetdrop_telegram_bot_token';
const LAST_SYNC_TIMESTAMP_KEY = 'neetdrop_telegram_last_sync_timestamp';

export const DEFAULT_TELEGRAM_CHANNEL = 'ContactAura_Bot';

let syncIntervalTimer: any = null;

export class TelegramSyncService {
  // Get active channel username
  static getChannelUsername(): string {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(TELEGRAM_CHANNEL_CONFIG_KEY) || DEFAULT_TELEGRAM_CHANNEL;
    }
    return DEFAULT_TELEGRAM_CHANNEL;
  }

  // Set active channel username
  static setChannelUsername(username: string): void {
    if (typeof window !== 'undefined') {
      const clean = username.replace(/^@/, '').replace(/https?:\/\/t\.me\/(s\/)?/, '').trim();
      localStorage.setItem(TELEGRAM_CHANNEL_CONFIG_KEY, clean || DEFAULT_TELEGRAM_CHANNEL);
    }
  }

  // Get active Bot Token
  static getBotToken(): string {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(TELEGRAM_BOT_TOKEN_KEY) || '';
    }
    return '';
  }

  // Set active Bot Token
  static setBotToken(token: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(TELEGRAM_BOT_TOKEN_KEY, token.trim());
    }
  }

  // Get Last Synced Timestamp
  static getLastSyncTimestamp(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(LAST_SYNC_TIMESTAMP_KEY);
    }
    return null;
  }

  // Load stored posts from localStorage (Returns [] if no posts synced yet, ZERO mock data)
  static getStoredPosts(): TelegramPost[] {
    try {
      if (typeof window !== 'undefined') {
        const raw = localStorage.getItem(TELEGRAM_STORAGE_KEY);
        if (raw) {
          const parsed: TelegramPost[] = JSON.parse(raw);
          if (Array.isArray(parsed)) return parsed;
        }
      }
    } catch (err) {
      console.warn('Error reading stored telegram posts:', err);
    }
    return [];
  }

  // Save posts to localStorage
  static savePosts(posts: TelegramPost[]): void {
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem(TELEGRAM_STORAGE_KEY, JSON.stringify(posts));
        localStorage.setItem(LAST_SYNC_TIMESTAMP_KEY, new Date().toISOString());
      }
    } catch (err) {
      console.error('Error saving telegram posts:', err);
    }
  }

  // Real Sync Channel Posts via Server API (/api/telegram/sync-channel)
  static async syncChannelPosts(
    customUsername?: string,
    customBotToken?: string
  ): Promise<{
    success: boolean;
    totalSyncedCount: number;
    newPostsCount: number;
    source?: string;
    isBotOrPrivate?: boolean;
    isInvalidToken?: boolean;
    error?: string;
  }> {
    const channel = customUsername !== undefined ? customUsername : this.getChannelUsername();
    this.setChannelUsername(channel);

    if (customBotToken !== undefined) {
      this.setBotToken(customBotToken);
    }
    const token = this.getBotToken();

    try {
      const response = await fetch('/api/telegram/sync-channel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          channelUsername: channel,
          botToken: token
        })
      });

      const data = await response.json();

      if (data.success && Array.isArray(data.posts)) {
        const existingPosts = this.getStoredPosts();
        const mergedMap = new Map<string, TelegramPost>();

        // Load existing
        existingPosts.forEach((p) => mergedMap.set(p.id, p));

        let newCount = 0;
        data.posts.forEach((p: TelegramPost) => {
          if (!mergedMap.has(p.id)) {
            mergedMap.set(p.id, p);
            newCount++;
          } else {
            // Preserve user custom tag updates and bookmarks
            const existing = mergedMap.get(p.id)!;
            mergedMap.set(p.id, {
              ...p,
              subjectId: existing.isUserCustomTagged ? existing.subjectId : p.subjectId,
              chapterName: existing.isUserCustomTagged ? existing.chapterName : p.chapterName,
              isUserCustomTagged: existing.isUserCustomTagged,
              isBookmarked: existing.isBookmarked
            });
          }
        });

        const sortedPosts = Array.from(mergedMap.values()).sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );

        this.savePosts(sortedPosts);

        return {
          success: true,
          totalSyncedCount: sortedPosts.length,
          newPostsCount: newCount,
          source: data.source
        };
      }

      return {
        success: false,
        totalSyncedCount: this.getStoredPosts().length,
        newPostsCount: 0,
        isBotOrPrivate: data.isBotOrPrivate,
        isInvalidToken: data.isInvalidToken,
        error: data.error || `Failed to sync channel @${channel}`
      };
    } catch (err: any) {
      console.error('Network error during Telegram sync:', err);
      return {
        success: false,
        totalSyncedCount: this.getStoredPosts().length,
        newPostsCount: 0,
        error: `Network error: ${err?.message || String(err)}`
      };
    }
  }

  // Update category manually for a post
  static updatePostCategory(
    postId: string,
    subjectId: 'physics' | 'chemistry' | 'biology' | 'uncategorized',
    chapterName: string,
    classLevel: 'Class 11' | 'Class 12' | 'All'
  ): TelegramPost[] {
    const posts = this.getStoredPosts();
    const updated = posts.map((p) => {
      if (p.id === postId) {
        return {
          ...p,
          subjectId,
          chapterName,
          classLevel,
          isUserCustomTagged: true
        };
      }
      return p;
    });
    this.savePosts(updated);
    return updated;
  }

  // Toggle Bookmark
  static toggleBookmark(postId: string): TelegramPost[] {
    const posts = this.getStoredPosts();
    const updated = posts.map((p) => {
      if (p.id === postId) {
        return {
          ...p,
          isBookmarked: !p.isBookmarked
        };
      }
      return p;
    });
    this.savePosts(updated);
    return updated;
  }

  // Clear all synced posts
  static clearAllPosts(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(TELEGRAM_STORAGE_KEY);
      localStorage.removeItem(LAST_SYNC_TIMESTAMP_KEY);
    }
  }

  // Start periodic auto-sync every 2 hours
  static startAutoSync(hoursInterval: number = 2): void {
    this.stopAutoSync();
    syncIntervalTimer = setInterval(() => {
      this.syncChannelPosts();
    }, hoursInterval * 60 * 60 * 1000);
  }

  static stopAutoSync(): void {
    if (syncIntervalTimer) {
      clearInterval(syncIntervalTimer);
      syncIntervalTimer = null;
    }
  }
}
