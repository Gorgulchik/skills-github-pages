// src/core/utils/accessibilityChecker.ts
import { hasSufficientContrast } from '@/core/utils/contrastUtils';

export function checkAccessibility(element: HTMLElement): boolean {
  const role = element.getAttribute('role');
  const ariaLabel = element.getAttribute('aria-label');
  const tabIndex = element.getAttribute('tabindex');
  
  if (!role) {
    console.warn('Элемент не имеет ARIA-роли', { element });
    return false;
  }
  
  if (!ariaLabel && tabIndex !== '-1') {
    console.warn('Элемент не имеет ARIA-лейбла', { element });
    return false;
  }
  
  const color = window.getComputedStyle(element).color;
  const backgroundColor = window.getComputedStyle(element).backgroundColor;
  
  if (!hasSufficientContrast(color, backgroundColor)) {
    console.warn('Элемент имеет недостаточную контрастность', { element });
    return false;
  }
  
  return true;
}