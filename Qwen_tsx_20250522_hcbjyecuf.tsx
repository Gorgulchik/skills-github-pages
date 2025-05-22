// src/core/utils/accessibilityUtils.ts
import { checkAccessibility } from '@/core/utils/accessibilityChecker';

// Инициализация проверок доступности
export function setupAccessibilityChecks() {
  document.querySelectorAll('a').forEach(link => {
    checkAccessibility(link as HTMLElement);
  });
  
  document.querySelectorAll('[role="dialog"]').forEach(dialog => {
    checkAccessibility(dialog as HTMLElement);
  });
  
  document.querySelectorAll('[data-contrast]').forEach(element => {
    const contrast = window.getComputedStyle(element).getPropertyValue('data-contrast');
    if (parseFloat(contrast) < 4.5) {
      console.warn(`Элемент ${element.tagName} имеет недостаточную контрастность`);
    }
  });
  
  document.querySelectorAll('*[aria-hidden="false"]').forEach(element => {
    if (!element.hasAttribute('role')) {
      console.warn('Интерактивный элемент без ARIA-роли', { element });
    }
  });
}