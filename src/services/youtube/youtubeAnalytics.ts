import { observability } from '../observabilityService';

export interface LectureAnalyticsEvent {
  videoId: string;
  title?: string;
  teacherName?: string;
  subject?: string;
  timestamp: string;
  event:
    | 'lecture_started'
    | 'lecture_completed'
    | 'watch_progress'
    | 'resume_position'
    | 'playback_error'
    | 'dropped_frames'
    | 'live_attendance';
  watchTimeSeconds?: number;
  durationSeconds?: number;
  watchPercentage?: number;
  resumePositionSeconds?: number;
  errorMessage?: string;
}

const STORAGE_KEY = 'neetdrop_youtube_analytics';

export class YouTubeAnalytics {
  private static events: LectureAnalyticsEvent[] = [];

  static logEvent(event: Omit<LectureAnalyticsEvent, 'timestamp'>): void {
    const fullEvent: LectureAnalyticsEvent = {
      ...event,
      timestamp: new Date().toISOString(),
    };

    this.events.push(fullEvent);
    observability.log('info', 'LECTURE_RESOLVER', `YouTube Analytics: ${fullEvent.event}`, fullEvent);

    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const stored = localStorage.getItem(STORAGE_KEY);
        const list: LectureAnalyticsEvent[] = stored ? JSON.parse(stored) : [];
        list.push(fullEvent);
        // keep last 200 events
        if (list.length > 200) list.shift();
        localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
      }
    } catch (e) {
      // ignore local storage errors
    }
  }

  static getAnalyticsSummary() {
    let totalStarted = 0;
    let totalCompleted = 0;
    let totalWatchTime = 0;
    let liveAttendanceCount = 0;
    let playbackErrorsCount = 0;

    this.events.forEach((ev) => {
      if (ev.event === 'lecture_started') totalStarted++;
      if (ev.event === 'lecture_completed') totalCompleted++;
      if (ev.watchTimeSeconds) totalWatchTime += ev.watchTimeSeconds;
      if (ev.event === 'live_attendance') liveAttendanceCount++;
      if (ev.event === 'playback_error') playbackErrorsCount++;
    });

    return {
      totalStarted,
      totalCompleted,
      totalWatchTimeMinutes: Math.round(totalWatchTime / 60),
      averageWatchTimeMinutes: totalStarted > 0 ? Math.round(totalWatchTime / 60 / totalStarted) : 0,
      liveAttendanceCount,
      playbackErrorsCount,
    };
  }
}
