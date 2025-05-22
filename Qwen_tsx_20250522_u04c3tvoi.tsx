// src/core/utils/contrastUtils.ts
import { parseColor } from '@/core/utils/colorParser';
import { calculateLuminance } from '@/core/utils/luminanceCalculator';

export function hasSufficientContrast(
  foreground: string, 
  background: string
): boolean {
  const fg = parseColor(foreground);
  const bg = parseColor(background);
  
  const fgLuminance = calculateLuminance(fg);
  const bgLuminance = calculateLuminance(bg);
  
  const contrast = (Math.max(fgLuminance, bgLuminance) + 0.05) / 
                  (Math.min(fgLuminance, bgLuminance) + 0.05);
  
  return contrast >= 4.5;
}