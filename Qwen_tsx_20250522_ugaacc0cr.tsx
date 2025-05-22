// src/core/utils/cspUtils.ts
import { reportCSPViolation } from '@/core/utils/cspReporter';

/**
 * Генерация случайного nonce
 */
function generateNonce(): string {
  const array = new Uint8Array(16);
  window.crypto.getRandomValues(array);
  return btoa(String.fromCharCode.apply(null, array as unknown as number[]));
}

// Единая конфигурация CSP с поддержкой nonce
export const cspConfig = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' https://trusted-cdn.com  'nonce-${generateNonce()}';
  connect-src 'self' wss: https://api.nova.com ;
  img-src 'self' data: https: blob:;
  style-src 'self' 'unsafe-inline' https: blob:;
  font-src 'self' data:;
  media-src 'self' https:;
  frame-ancestors 'none';
  form-action 'self';
  base-uri 'self';
  report-to https://api.nova.com/csp-report 
`.replace(/\s+/g, ' ');

// Создание CSP заголовка
export const cspHeader = {
  'Content-Security-Policy': cspConfig,
  'Content-Security-Policy-Report-Only': cspConfig
};

// Middleware для Express
export const cspMiddleware = (req, res, next) => {
  Object.entries(cspHeader).forEach(([key, value]) => {
    res.setHeader(key, value);
  });
  next();
};