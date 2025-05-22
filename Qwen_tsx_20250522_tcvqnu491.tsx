// src/core/utils/featureDetection.ts
import { detectBrowserFeatures } from '@/core/utils/featureDetection';

// Проверка поддержки браузером критических функций
const features = detectBrowserFeatures();

// Проверка минимальных требований
if (!features.webassembly || !features.mediaDevices) {
  document.body.innerHTML = `
    <div class="browser-compatibility-warning">
      Ваш браузер не поддерживает необходимые функции.
    </div>
  `;
  document.body.style.backgroundColor = '#fff';
  document.body.style.color = '#000';
  document.body.style.fontSize = '1.2rem';
}