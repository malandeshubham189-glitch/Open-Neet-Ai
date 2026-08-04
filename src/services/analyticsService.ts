export interface AnalyticsEvent {
  id: string;
  eventName:
    | 'Lecture Started'
    | 'Lecture Completed'
    | 'Returned From PW'
    | 'Source Used'
    | 'Fallback Activated'
    | 'Notes Completed'
    | 'MCQ Score'
    | 'PYQ Score'
    | 'Revision Accuracy';
  topicId: string;
  topicTitle: string;
  payload?: any;
  timestamp: string;
}

const ANALYTICS_STORAGE_KEY = 'neetdrop_analytics_events_v1';

export class AnalyticsService {
  private static events: AnalyticsEvent[] = [];

  static trackEvent(
    eventName: AnalyticsEvent['eventName'],
    topicId: string,
    topicTitle: string,
    payload?: any
  ): AnalyticsEvent {
    const event: AnalyticsEvent = {
      id: `evt-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      eventName,
      topicId,
      topicTitle,
      payload,
      timestamp: new Date().toISOString()
    };

    try {
      if (typeof localStorage !== 'undefined') {
        const stored = localStorage.getItem(ANALYTICS_STORAGE_KEY);
        const list: AnalyticsEvent[] = stored ? JSON.parse(stored) : [];
        list.push(event);
        localStorage.setItem(ANALYTICS_STORAGE_KEY, JSON.stringify(list));
      }
    } catch (e) {
      console.warn('Failed to store analytics event:', e);
    }

    this.events.push(event);
    console.log(`[ANALYTICS] ${eventName} logged for topic "${topicTitle}" (${topicId})`, payload);
    return event;
  }

  static getEvents(): AnalyticsEvent[] {
    try {
      if (typeof localStorage !== 'undefined') {
        const stored = localStorage.getItem(ANALYTICS_STORAGE_KEY);
        if (stored) return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Failed to read analytics events:', e);
    }
    return this.events;
  }
}
