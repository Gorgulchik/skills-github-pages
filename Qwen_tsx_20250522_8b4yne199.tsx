// src/core/utils/rgbParser.ts
export function parseRGB(rgb: string): { r: number; g: number; b: number } {
  const match = rgb.match(/rgb$$(\d+),\s*(\d+),\s*(\d+)$$/);
  if (!match) {
    throw new Error(`Неверный формат RGB цвета: ${rgb}`);
  }
  
  return {
    r: parseInt(match[1], 10),
    g: parseInt(match[2], 10),
    b: parseInt(match[3], 10)
  };
}