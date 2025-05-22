// src/core/utils/loadTestingConfig.ts
import { loadTest } from '@/core/utils/loadTesting';
import { checkHealth } from '@/core/utils/healthCheck';

/**
 * Конфигурация нагрузочного тестирования
 */
export const loadTestConfig = {
  config: {
    target: 'https://nova.com ',
    phases: [
      { duration: 60, arrivalRate: 10 },   // Базовая нагрузка
      { duration: 120, arrivalRate: 100 }, // Пиковая нагрузка
      { duration: 60, arrivalRate: 0 }    // Окончание теста
    ],
    default: {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      timeout: 30000
    }
  },
  scenarios: {
    'video-streaming': {
      flow: [
        { get: '/watch/test-video' },
        { post: '/api/analytics', body: { videoId: 'test-video' } },
        { get: '/api/license/test-video' }
      ]
    },
    'upload': {
      flow: [
        { post: '/api/upload', body: { video: 'test.mp4' } },
        { post: '/api/verify', body: { hash: 'test-hash' } }
      ]
    },
    'home-page': {
      flow: [
        { get: '/' },
        { get: '/api/recommendations' },
        { get: '/api/trending' }
      ]
    }
  }
};

/**
 * Запуск нагрузочного тестирования
 */
export function runLoadTest() {
  const results = loadTest(loadTestConfig);
  console.log('Результаты нагрузочного тестирования:', results);
  checkHealth();
}