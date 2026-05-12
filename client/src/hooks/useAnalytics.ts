import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const generateId = () => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

export const getSessionId = () => {
  let sessionId = sessionStorage.getItem('uttc_session_id');
  if (!sessionId) {
    sessionId = generateId();
    sessionStorage.setItem('uttc_session_id', sessionId);
  }
  return sessionId;
};

export const getUserId = () => {
  let userId = localStorage.getItem('uttc_user_id');
  if (!userId) {
    userId = generateId();
    localStorage.setItem('uttc_user_id', userId);
  }
  return userId;
};

export const getActiveExperiments = () => {
  try {
    return JSON.parse(localStorage.getItem('uttc_experiments') || '{}');
  } catch (e) {
    return {};
  }
}

const QUEUE_KEY = 'uttc_analytics_queue';
const MAX_QUEUE_SIZE = 100;
const BATCH_INTERVAL = 5000; // 5s
const MAX_RETRIES = 3;

let batchQueue: any[] = [];
let batchTimer: NodeJS.Timeout | null = null;

const getQueue = (): any[] => {
  try {
    return JSON.parse(localStorage.getItem(QUEUE_KEY) || '[]');
  } catch {
    return [];
  }
};

const saveQueue = (queue: any[]) => {
  try {
    localStorage.setItem(QUEUE_KEY, JSON.stringify(queue.slice(0, MAX_QUEUE_SIZE)));
  } catch {}
};

const sendBatch = async (events: any[], retryCount = 0): Promise<boolean> => {
  if (events.length === 0) return true;

  try {
    const response = await fetch('/api/analytics/batch', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ events }),
      keepalive: true,
      signal: AbortSignal.timeout(10000)
    });

    if (response.ok) return true;

    if (response.status === 429 && retryCount < MAX_RETRIES) {
      await new Promise(r => setTimeout(r, Math.pow(2, retryCount) * 1000));
      return sendBatch(events, retryCount + 1);
    }

    return false;
  } catch (err) {
    if (retryCount < MAX_RETRIES) {
      await new Promise(r => setTimeout(r, Math.pow(2, retryCount) * 1000));
      return sendBatch(events, retryCount + 1);
    }
    return false;
  }
};

const flushBatch = async () => {
  if (batchTimer) {
    clearTimeout(batchTimer);
    batchTimer = null;
  }

  const toSend = [...batchQueue];
  batchQueue = [];

  if (toSend.length === 0) return;

  const success = await sendBatch(toSend);

  if (!success) {
    const queue = getQueue();
    saveQueue([...queue, ...toSend]);
  }
};

const processQueue = async () => {
  const queue = getQueue();
  if (queue.length === 0) return;

  const success = await sendBatch(queue);
  if (success) {
    localStorage.removeItem(QUEUE_KEY);
  }
};

if (typeof window !== 'undefined') {
  setInterval(processQueue, 30000);

  window.addEventListener('online', processQueue);

  window.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      flushBatch();
    }
  });

  window.addEventListener('beforeunload', () => {
    if (batchQueue.length > 0) {
      const data = JSON.stringify({ events: batchQueue });
      if (navigator.sendBeacon) {
        navigator.sendBeacon('/api/analytics/batch', data);
      }
    }
  });
}

export const trackEvent = (
  event_type: string,
  event_label?: string,
  metadata?: any
) => {
  const data = {
    session_id: getSessionId(),
    user_id: getUserId(),
    event_type,
    event_label,
    page: window.location.pathname,
    scroll_pct: metadata?.scroll_pct,
    referrer: document.referrer,
    metadata,
    experiments: getActiveExperiments(),
    timestamp: new Date().toISOString()
  };

  batchQueue.push(data);

  if (batchTimer) clearTimeout(batchTimer);
  batchTimer = setTimeout(flushBatch, BATCH_INTERVAL);

  if (batchQueue.length >= 10) {
    flushBatch();
  }
};

export const useAnalyticsLogger = () => {
  const location = useLocation();
  const pageTimer = useRef<number>(Date.now());
  const clickMap = useRef<{time: number, x: number, y: number}[]>([]);

  useEffect(() => {
    trackEvent('page_view', undefined, { load_time: window.performance?.timing?.domContentLoadedEventEnd - window.performance?.timing?.navigationStart });
    pageTimer.current = Date.now();
    clickMap.current = [];
    
    return () => {
      const timeOnPage = Math.round((Date.now() - pageTimer.current) / 1000);
      trackEvent('page_exit', undefined, { time_on_page: timeOnPage });
    }
  }, [location.pathname]);

  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;
    const handleScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        const scrollY = window.scrollY;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        if (height <= 0) return;
        const pct = Math.round((scrollY / height) * 100);
        
        const thresholds = [25, 50, 75, 90, 100];
        const tracked = JSON.parse(sessionStorage.getItem(`tracked_scroll_${location.pathname}`) || '[]');

        for (const t of thresholds) {
          if (pct >= t && !tracked.includes(t)) {
            tracked.push(t);
            sessionStorage.setItem(`tracked_scroll_${location.pathname}`, JSON.stringify(tracked));
            trackEvent('scroll_depth', undefined, { scroll_pct: t });
          }
        }
      }, 500); // Debounce
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [location.pathname]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as Element;
      const cta = target.closest('[data-analytics]');
      
      // Track valid CTA clicks
      if (cta) {
        trackEvent('cta_click', cta.getAttribute('data-analytics')!);
      }

      // Track rage clicks and dead clicks
      const now = Date.now();
      clickMap.current.push({ time: now, x: e.clientX, y: e.clientY });
      
      // keep only last 5 clicks within 2 seconds
      clickMap.current = clickMap.current.filter(c => now - c.time < 2000);
      
      if (clickMap.current.length >= 3) {
        // compute distance max
        const Xs = clickMap.current.map(c => c.x);
        const Ys = clickMap.current.map(c => c.y);
        const distance = Math.max(...Xs) - Math.min(...Xs) + Math.max(...Ys) - Math.min(...Ys);
        
        if (distance < 50) {
           trackEvent('rage_click', undefined, { x: e.clientX, y: e.clientY, path: location.pathname });
           clickMap.current = []; // reset after logging
        }
      }
    };
    
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [location.pathname]);
};
