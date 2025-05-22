// src/core/utils/drmTester.ts
import { DRMManager } from '@/core/utils/drmUtils';

describe('Проверка DRM функционала', () => {
  it('Получение лицензии', async () => {
    const drm = DRMManager.getInstance();
    const license = await drm.requestLicense('test-id', 'user-123', 'token', { browser: 'Chrome' });
    expect(license).toBeDefined();
    expect(typeof license).toBe('string');
  });
  
  it('Истечение срока лицензии', () => {
    const drm = DRMManager.getInstance();
    drm['licenseCache'].set('expired-id', { 
      license: 'expired-license',
      expiresAt: new Date(Date.now() - 1000)
    });
    
    const isValid = (drm as any).validateLicense('expired-id');
    expect(isValid).toBe(false);
  });
  
  it('Декодирование контента', async () => {
    const drm = DRMManager.getInstance();
    const decoder = await drm.getDecryptionKey();
    const encryptedData = new ArrayBuffer(24);
    
    await expect(drm.decryptContent(encryptedData)).rejects.toThrow();
  });
}