// src/core/utils/analyticsTracker.ts
import { logEvent } from 'firebase/analytics';
import { analytics } from '@/firebase';

export function trackEvent(event: string, data: Record<string, any>) {
  if (typeof gtag === 'function') {
    gtag('event', event, {
      event_category: 'Infrastructure',
      ...data
    });
  }
  
  if (analytics) {
    logEvent(analytics, event, data);
  }
  
  console.log(`[Analytics] ${event}`, data);
}