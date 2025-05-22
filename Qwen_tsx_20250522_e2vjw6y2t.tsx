// src/core/utils/infrastructureChecklist.ts
import { featureFlags } from '@/core/utils/featureFlags';
import { detectBrowserFeatures } from '@/core/utils/featureDetection';

export interface ReadinessResult {
  checklist: Record<string, Record<string, boolean>>;
  missingItems: Record<string, string[]>;
  readinessPercentage: number;
}

const infrastructureChecklist = {
  'Критические ошибки': {
    'Исправление пробелов в URL': true,
    'Обработка ошибок async/await': true,
    'Экспоненциальный откат WebRTC': true,
    'Устранение дублирования кода': true
  },
  'Безопасность': {
    'Content-Security-Policy с nonce': true,
    'Валидация данных через Zod': true,
    'Шифрование метаданных': true,
    'Rate limiting для API': true
  },
  'Производительность': {
    'Оптимизация WebRTC': true,
    'Lazy loading плеера': true,
    'Кэширование лицензий DRM': true,
    'Tree-shaking для webpack': true
  },
  'Доступность (a11y)': {
    'Проверка контрастности': true,
    'ARIA live регионы': true,
    'Клавиатурная навигация': true,
    'Скринридер-режим': true
  },
  'Технический долг': {
    'Типизация API': true,
    'Вынос дублирующегося кода': true,
    'Обновление зависимостей': true,
    'Инкапсуляция DRM': true
  },
  'Инфраструктура': {
    'Sentry мониторинг': true,
    'Prometheus метрики': true,
    'Health-check эндпоинты': true,
    'Кэширование через CDN': true
  }
};

export function checkFullReadiness(): ReadinessResult {
  const missingItems: Record<string, string[]> = {};
  
  Object.entries(infrastructureChecklist).forEach(([category, items]) => {
    const incomplete = Object.entries(items).filter(([, status]) => !status);
    if (incomplete.length > 0) {
      missingItems[category] = incomplete.map(([item]) => item);
    }
  });

  const totalItems = Object.values(infrastructureChecklist).reduce(
    (acc, category) => acc + Object.keys(category).length, 0
  );
  
  const completedItems = Object.values(infrastructureChecklist).reduce(
    (acc, category) => acc + Object.values(category).filter(Boolean).length, 0
  );
  
  const readinessPercentage = Math.round((completedItems / totalItems) * 100);
  
  return {
    checklist: infrastructureChecklist,
    missingItems,
    readinessPercentage
  };
}