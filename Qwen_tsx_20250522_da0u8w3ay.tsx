// src/core/utils/accessibilityChecker.ts
import { hasSufficientContrast } from '@/core/utils/contrastUtils';

export function checkAccessibility(element: HTMLElement): boolean {
  const role = element.getAttribute('role');
  const ariaLabel = element.getAttribute('aria-label');
  const tabIndex = element.getAttribute('tabindex');
  
  // Проверка ARIA-роли
  if (!role) {
    console.warn('Элемент не имеет ARIA-роли', { element });
    return false;
  }
  
  // Проверка ARIA-лейбла
  if (!ariaLabel && tabIndex !== '-1') {
    console.warn('Элемент не имеет ARIA-лейбла', { element });
    return false;
  }
  
  // Проверка контрастности
  const color = window.getComputedStyle(element).color;
  const backgroundColor = window.getComputedStyle(element).backgroundColor;
  
  if (!hasSufficientContrast(color, backgroundColor)) {
    console.warn('Элемент имеет недостаточную контрастность', { element });
    return false;
  }
  
  return true;
}