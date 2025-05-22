// src/core/utils/colorParser.ts
import { parseRGB } from '@/core/utils/rgbParser';
import { parseHEX } from '@/core/utils/hexParser';

export function parseColor(color: string): { r: number; g: number; b: number } {
  if (color.startsWith('rgb')) {
    return parseRGB(color);
  }
  
  if (color.startsWith('#')) {
    return parseHEX(color);
  }
  
  // Фоллбэк на черный цвет
  return { r: 0, g: 0, b: 0 };
}