// src/core/utils/luminanceCalculator.ts
export function calculateLuminance(color: { r: number; g: number; b: number }): number {
  const r = color.r / 255;
  const g = color.g / 255;
  const b = color.b / 255;
  
  const a = [r, g, b].map(c => 
    c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
  );
  
  return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
}