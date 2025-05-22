// src/core/utils/sentryUtils.ts
import * as Sentry from '@sentry/browser';
import { Integrations } from '@sentry/tracing';

// Инициализация Sentry
Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [new Integrations.BrowserTracing()],
  tracesSampleRate: 0.2,
  beforeSend(event) {
    event.tags = {
      ...event.tags,
      environment: process.env.NODE_ENV,
      version: process.env.npm_package_version
    };
    return event;
  }
});

// Обертка для React
export const sentryReactWrapper = Sentry;