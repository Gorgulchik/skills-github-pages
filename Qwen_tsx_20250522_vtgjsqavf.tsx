// src/core/utils/featureDetection.ts
import { parseColor } from '@/core/utils/colorParser';

/**
 * Обнаружение возможностей браузера
 * @returns Объект с поддержкой функций
 */
export function detectBrowserFeatures() {
  return {
    webgl: typeof WebGLRenderingContext !== 'undefined',
    webgl2: typeof WebGL2RenderingContext !== 'undefined',
    webassembly: typeof WebAssembly !== 'undefined',
    webassemblyThreads: WebAssembly.validateStreaming ? 'streaming' : 'not supported',
    encryptedMedia: typeof MediaKeys !== 'undefined',
    mediaCapabilities: typeof navigator.mediaCapabilities !== 'undefined',
    mediaSession: typeof MediaSession !== 'undefined',
    pictureInPicture: document.pictureInPictureElement !== 'undefined',
    mediaDevices: typeof navigator.mediaDevices !== 'undefined',
    getUserMedia: typeof navigator.mediaDevices?.getUserMedia !== 'undefined',
    mediaRecorder: typeof MediaRecorder !== 'undefined',
    webcodecs: typeof WebCodecs !== 'undefined',
    webgpu: typeof navigator.gpu !== 'undefined',
    indexedDB: typeof indexedDB !== 'undefined',
    serviceWorker: typeof navigator.serviceWorker !== 'undefined',
    webauthn: typeof PublicKeyCredential !== 'undefined',
    websockets: typeof WebSocket !== 'undefined',
    workers: typeof Worker !== 'undefined',
    sharedWorkers: typeof SharedWorker !== 'undefined',
    webassemblySIMD: typeof WebAssembly.Global !== 'undefined',
    webassembly64Bit: typeof WebAssembly.Tag !== 'undefined',
    webassemblyExceptionHandling: typeof WebAssembly.Module.exports !== 'undefined',
    webassemblyImportExport: typeof WebAssembly.Module.imports !== 'undefined'
  };
}