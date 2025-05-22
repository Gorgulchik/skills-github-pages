// src/App.tsx
import React, { useEffect } from 'react';
import { ThemeProvider } from '@/core/context/ThemeProvider';
import { AuthProvider } from '@/core/context/AuthContext';
import { AppContent } from './AppContent';
import { registerServiceWorker } from '@/core/utils/serviceWorkerRegistration';
import { initAnalytics } from '@/core/utils/analyticsUtils';
import { checkFullReadiness, readinessPercentage } from '@/core/utils/infrastructureChecklist';
import { logReadiness } from '@/core/utils/readinessLogger';
import { sendToMonitoring } from '@/core/utils/readinessMonitor';
import { runLoadTest } from '@/core/utils/loadTesting';

function AppWithProviders() {
  // Инициализация Service Worker
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      registerServiceWorker();
    }
  }, []);
  
  // Инициализация аналитики
  useEffect(() => {
    initAnalytics();
  }, []);
  
  // Проверка полной готовности
  useEffect(() => {
    const readinessResult = checkFullReadiness();
    logReadiness(readinessResult);
    
    if (readinessResult.readinessPercentage < 100) {
      sendToMonitoring(readinessResult);
    }
  }, []);
  
  // Запуск нагрузочного тестирования
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      runLoadTest();
    }
  }, []);

  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default function App() {
  return (
    <React.StrictMode>
      <AppWithProviders />
    </React.StrictMode>
  );
}