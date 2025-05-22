// src/core/utils/rateLimiting.ts
import { trackEvent } from '@/core/utils/analyticsTracker';

const RATE_LIMIT_CONFIG = {
  'POST:/api/upload': {
    limit: 100,
    windowMs: 15 * 60 * 1000 // 15 минут
  },
  'POST:/api/analytics': {
    limit: 200,
    windowMs: 5 * 60 * 1000 // 5 минут
  }
};

export function rateLimiter(req, res, next) {
  const endpoint = `${req.method}:${req.url}`;
  
  if (!RATE_LIMIT_CONFIG[endpoint]) {
    next();
    return;
  }
  
  const { limit, windowMs } = RATE_LIMIT_CONFIG[endpoint];
  const now = Date.now();
  const key = `rate-limit:${endpoint}:${req.ip}`;
  const stats = getRateLimitStats(key);
  
  if (stats.count > limit && now - stats.start < windowMs) {
    res.status(429).json({ 
      error: 'Слишком много запросов',
      retryAfter: Math.ceil((stats.start + windowMs - now) / 1000)
    });
    trackEvent('rate-limit-exceeded', {
      endpoint,
      ip: req.ip,
      count: stats.count,
      windowMs
    });
    return;
  }
  
  updateRateLimitStats(key);
  next();
}

function getRateLimitStats(key: string): { count: number; start: number } {
  // Получение статистики из Redis
  return { count: 0, start: 0 }; // Пример возврата
}

function updateRateLimitStats(key: string) {
  // Обновление статистики
}