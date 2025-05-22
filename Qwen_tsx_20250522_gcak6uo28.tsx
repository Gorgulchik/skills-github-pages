// src/core/utils/readinessMonitor.ts
import { ReadinessResult } from '@/types/readinessTypes';
import * as Sentry from '@sentry/browser';

export function sendToMonitoring(result: ReadinessResult): void {
  if (result.readinessPercentage === 100) {
    Sentry.captureMessage('Полная готовность к продакшену', {
      level: 'info',
      extra: {
        readiness: result.readinessPercentage
      }
    });
  } else {
    Sentry.captureMessage('Недостающие элементы для 100% готовности', {
      level: 'warning',
      extra: {
        readiness: result.readinessPercentage,
        missingItems: result.missingItems
      }
    });
  }
}