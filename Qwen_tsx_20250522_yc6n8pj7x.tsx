// src/core/utils/drmUtils.ts
import { LicenseServer } from '@/types/licenseTypes';
import { ContentDecryption } from '@/types/licenseTypes';

export class DRMManager {
  private static instance: DRMManager;
  private licenseCache: Map<string, { license: string; expiresAt: Date }> = new Map();
  private readonly licenseServer: LicenseServer = {
    url: process.env.REACT_APP_LICENSE_SERVER_URL || 'https://drm.nova.com/license ',
    protocol: 'widevine'
  };
  
  private constructor() {}
  
  static getInstance(): DRMManager {
    if (!DRMManager.instance) {
      DRMManager.instance = new DRMManager();
    }
    return DRMManager.instance;
  }
  
  async requestLicense(
    videoId: string, 
    userId: string, 
    token: string, 
    deviceInfo: any
  ): Promise<string | null> {
    const cached = this.licenseCache.get(videoId);
    if (cached && new Date() < cached.expiresAt) {
      return cached.license;
    }
    
    try {
      const response = await fetch(this.licenseServer.url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': this.getCsrfToken()
        },
        body: JSON.stringify({
          videoId,
          userId,
          token,
          deviceInfo
        })
      });
      
      if (!response.ok) {
        throw new Error(`Ошибка получения лицензии: ${response.status}`);
      }
      
      const licenseData = await response.json();
      this.licenseCache.set(videoId, { 
        license: licenseData.license,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000)
      });
      
      return licenseData.license;
    } catch (error) {
      console.error('Ошибка получения лицензии', error);
      return null;
    }
  }
  
  private getCsrfToken(): string {
    return document.cookie
      .split('; ')
      .find(row => row.startsWith('XSRF-TOKEN='))?.split('=')[1] || '';
  }
}