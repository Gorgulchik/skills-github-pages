// src/core/utils/loadTesting.ts
import { loadTest } from '@/core/utils/loadTesting';

// Запуск нагрузочного тестирования
export function runLoadTest() {
  const results = loadTest(loadTestConfig);
  console.log('Результаты нагрузочного тестирования:', results);
}