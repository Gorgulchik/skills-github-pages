// src/core/utils/featureFlags.ts
import { flags } from '@/config/featureFlags';

interface FeatureFlags {
  enableAIRecommendations: boolean;
  enableLiveStreaming: boolean;
  enableDRM: boolean;
  enableWebRTC: boolean;
  enableAnalytics: boolean;
  enablePWA: boolean;
  enableServiceWorker: boolean;
  enableOfflineMode: boolean;
  enableWebAssembly: boolean;
  enableHLSJS: boolean;
  enableFFmpeg: boolean;
  enableWebGL: boolean;
  enableWebAssemblyThreads: boolean;
  enableEncryptedMedia: boolean;
  enableWebSockets: boolean;
  enableWorkers: boolean;
  enableSharedWorkers: boolean;
  enableWebAssemblySIMD: boolean;
  enableWebAssembly64Bit: boolean;
  enableWebAssemblyExceptionHandling: boolean;
  enableWebAssemblyImportExport: boolean;
}

export const featureFlags: FeatureFlags = {
  enableAIRecommendations: flags.enableAIRecommendations ?? true,
  enableLiveStreaming: flags.enableLiveStreaming ?? true,
  enableDRM: flags.enableDRM ?? true,
  enableWebRTC: flags.enableWebRTC ?? true,
  enableAnalytics: flags.enableAnalytics ?? true,
  enablePWA: flags.enablePWA ?? true,
  enableServiceWorker: flags.enableServiceWorker ?? true,
  enableOfflineMode: flags.enableOfflineMode ?? true,
  enableWebAssembly: flags.enableWebAssembly ?? true,
  enableHLSJS: flags.enableHLSJS ?? true,
  enableFFmpeg: flags.enableFFmpeg ?? true,
  enableWebGL: flags.enableWebGL ?? true,
  enableWebAssemblyThreads: flags.enableWebAssemblyThreads ?? true,
  enableEncryptedMedia: flags.enableEncryptedMedia ?? true,
  enableWebSockets: flags.enableWebSockets ?? true,
  enableWorkers: flags.enableWorkers ?? true,
  enableSharedWorkers: flags.enableSharedWorkers ?? true,
  enableWebAssemblySIMD: flags.enableWebAssemblySIMD ?? true,
  enableWebAssembly64Bit: flags.enableWebAssembly64Bit ?? true,
  enableWebAssemblyExceptionHandling: flags.enableWebAssemblyExceptionHandling ?? true,
  enableWebAssemblyImportExport: flags.enableWebAssemblyImportExport ?? true
};

export function isFeatureEnabled(feature: keyof FeatureFlags): boolean {
  return featureFlags[feature];
}