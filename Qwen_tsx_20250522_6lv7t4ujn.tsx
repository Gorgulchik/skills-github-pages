// src/core/utils/securityTest.ts
import { hasSufficientContrast } from '@/core/utils/contrastUtils';
import { parseColor } from '@/core/utils/colorParser';

describe('Проверка безопасности', () => {
  it('Проверка контрастности', () => {
    const black = parseColor('rgb(0, 0, 0)');
    const white = parseColor('rgb(255, 255, 255)');
    
    expect(hasSufficientContrast(black, white)).toBe(true);
    expect(hasSufficientContrast(white, black)).toBe(true);
  });
  
  it('Шифрование данных', async () => {
    const encoder = new TextEncoder();
    const key = await window.crypto.subtle.generateKey(
      { name: 'AES-GCM', length: 256 },
      true,
      ['encrypt', 'decrypt']
    );
    
    const data = encoder.encode('test data');
    const iv = window.crypto.getRandomValues(new Uint8Array(12));
    
    const cipherText = await window.crypto.subtle.encrypt(
      { name: 'AES-GCM', iv },
      key,
      data
    );
    
    expect(cipherText).toBeDefined();
    expect(cipherText.byteLength).toBeGreaterThan(0);
  });
}