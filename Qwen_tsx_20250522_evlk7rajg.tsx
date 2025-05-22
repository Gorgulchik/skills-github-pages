// src/core/utils/readinessLogger.ts
import { ReadinessResult } from '@/types/readinessTypes';

export function logReadiness(result: ReadinessResult): void {
  console.log(`[Production Readiness] ${result.readinessPercentage}%`);
  
  if (result.readinessPercentage < 100) {
    console.table({
      'Недостающие элементы': result.missingItems
    });
  }
}