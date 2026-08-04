export interface LogEntry {
  id: string;
  level: 'info' | 'warn' | 'error' | 'debug';
  category: 'AI_GATEWAY' | 'LECTURE_RESOLVER' | 'CURRICULUM' | 'PROGRESS' | 'REVISION' | 'SYSTEM';
  message: string;
  metadata?: any;
  timestamp: string;
}

export interface MetricEntry {
  name: string;
  value: number;
  unit: 'ms' | 'tokens' | 'count' | 'percent';
  timestamp: string;
}

class ObservabilityService {
  private logs: LogEntry[] = [];
  private metrics: MetricEntry[] = [];
  private maxCapacity = 500;

  log(level: LogEntry['level'], category: LogEntry['category'], message: string, metadata?: any): LogEntry {
    const entry: LogEntry = {
      id: `log-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      level,
      category,
      message,
      metadata,
      timestamp: new Date().toISOString()
    };

    this.logs.push(entry);
    if (this.logs.length > this.maxCapacity) {
      this.logs.shift();
    }

    if (level === 'error') {
      console.error(`[${category}] ${message}`, metadata || '');
    } else if (level === 'warn') {
      console.warn(`[${category}] ${message}`, metadata || '');
    } else {
      console.log(`[${category}] ${message}`, metadata || '');
    }

    return entry;
  }

  recordMetric(name: string, value: number, unit: MetricEntry['unit'] = 'count'): MetricEntry {
    const entry: MetricEntry = {
      name,
      value,
      unit,
      timestamp: new Date().toISOString()
    };

    this.metrics.push(entry);
    if (this.metrics.length > this.maxCapacity) {
      this.metrics.shift();
    }

    return entry;
  }

  getLogs(): LogEntry[] {
    return [...this.logs];
  }

  getMetrics(): MetricEntry[] {
    return [...this.metrics];
  }

  getAITokenMetrics() {
    return [];
  }

  getSystemStatusReport() {
    const totalLogs = this.logs.length;
    const errorsCount = this.logs.filter((l) => l.level === 'error').length;
    const warnsCount = this.logs.filter((l) => l.level === 'warn').length;

    return {
      status: errorsCount === 0 ? 'HEALTHY' : errorsCount < 5 ? 'DEGRADED' : 'CRITICAL',
      totalLogs,
      errorsCount,
      warnsCount,
      totalAITokenUsage: 0,
      recentTokenCalls: 0,
      timestamp: new Date().toISOString()
    };
  }
}

export const observability = new ObservabilityService();
