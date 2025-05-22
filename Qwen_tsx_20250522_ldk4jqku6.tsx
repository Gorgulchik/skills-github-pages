// src/core/utils/testUtils.ts
import { testDRM } from '@/core/utils/drmTester';
import { testWebRTC } from '@/core/utils/webRTCTest';
import { testSecurity } from '@/core/utils/securityTest';

/**
 * Запуск модульных тестов
 */
export function runTests() {
  describe('Проверка DRM', () => {
    testDRM();
  });
  
  describe('Проверка WebRTC', () => {
    testWebRTC();
  });
  
  describe('Проверка безопасности', () => {
    testSecurity();
  });
}