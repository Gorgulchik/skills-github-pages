// src/core/utils/analyticsUtils.ts
import { AnalyticsEvent } from '@/types/analyticsTypes';
import { trackEvent } from '@/core/utils/analyticsTracker';

export function initAnalytics() {
  const samplingRate = 0.2;
  let eventQueue: AnalyticsEvent[] = [];
  
  if (Math.random() < samplingRate) {
    window.addEventListener('beforeunload', () => {
      sendEventsWithRetry(eventQueue);
    });
  }
}

async function sendEventsWithRetry(events: AnalyticsEvent[]) {
  const maxRetries = 5;
  const baseDelay = 1000;
  
  for (let i = 0; i < events.length; i++) {
    let retry = 0;
    
    while (retry < maxRetries) {
      try {
        const response = await fetch('/api/analytics', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-Token': getCsrfToken()
          },
          body: JSON.stringify(events[i])
        });
        
        if (response.ok) {
          events.splice(i, 1);
          i--;
          break;
        }
      } catch (error) {
        const delay = Math.min(baseDelay * Math.pow(2, retry), 10000);
        console.warn(`Ошибка отправки аналитики. Повтор через ${delay}мс`, error);
        await new Promise(resolve => setTimeout(resolve, delay));
        retry++;
      }
    }
  }
  
  if (events.length > 0) {
    console.error('Не удалось отправить аналитику для следующих событий:', events);
  }
}

function getCsrfToken(): string {
  return document.cookie
    .split('; ')
    .find(row => row.startsWith('XSRF-TOKEN='))?.split('=')[1] || '';
}