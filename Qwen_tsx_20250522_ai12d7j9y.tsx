// src/features/streaming/LiveStream.tsx
import React, { useState, useEffect, useRef } from 'react';
import SimplePeer from 'simple-peer';
import { WebRTCConfig } from '@/types/webRTCTypes';
import { ErrorHandler } from '@/core/utils/errorHandler';

interface LiveStreamProps extends WebRTCConfig {
  onError: (error: Error) => void;
  onConnect: () => void;
  onDisconnect: () => void;
}

export const LiveStream: React.FC<LiveStreamProps> = ({ 
  onError, 
  onConnect,
  onDisconnect,
  iceServers = [
    { urls: 'stun:global.stun.twilio.com:3478?transport=udp' },
    { 
      urls: 'turn:global.turn.twilio.com:3478?transport=udp',
      username: 'nova_prod',
      credential: process.env.REACT_APP_TURN_CREDENTIAL || 'fallback_cred'
    }
  ]
}) => {
  const [isStreaming, setIsStreaming] = useState(false);
  const peerRef = useRef<SimplePeer.Instance | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const reconnectAttemptsRef = useRef(0);
  const [streamUrl, setStreamUrl] = useState<string | null>(null);
  
  const getMediaStream = async () => {
    if (!navigator.mediaDevices?.getUserMedia) {
      const error = new Error('navigator.mediaDevices.getUserMedia не поддерживается');
      onError(error);
      console.error('WebRTC недоступен:', error.message);
      return;
    }
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      });
      
      streamRef.current = stream;
      setIsStreaming(true);
      onConnect();
    } catch (err) {
      const error = new Error('Разрешите доступ к камере и микрофону! ❌');
      onError(error);
      console.error('Ошибка доступа к медиаустройствам', err);
      
      if (typeof Sentry !== 'undefined') {
        Sentry.captureException(err);
      }
    }
  };
  
  const handleIncomingSignal = (signalData: string) => {
    if (!peerRef.current) return;
    
    try {
      const parsedData = JSON.parse(signalData);
      peerRef.current.signal(parsedData);
    } catch (err) {
      const error = new Error('Неверный формат сигнала');
      onError(error);
      console.error('Ошибка обработки сигнала', err);
    }
  };
  
  // Инициализация WebRTC
  useEffect(() => {
    getMediaStream();
    
    return () => {
      if (peerRef.current) {
        peerRef.current.destroy();
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, [onConnect, onError]);
  
  // ICE restart при потере соединения
  useEffect(() => {
    if (!peerRef.current) return;
    
    let restartAttempts = 0;
    const maxRestarts = 3;
    
    const handleICEConnectionStateChange = () => {
      if (peerRef.current?.iceConnectionState === 'disconnected' || 
          peerRef.current?.iceConnectionState === 'failed') {
        if (restartAttempts < maxRestarts) {
          console.log(`Переподключение ICE ${restartAttempts + 1} из ${maxRestarts}`);
          peerRef.current.restart();
          restartAttempts++;
        } else {
          console.error('Превышено максимальное число переподключений');
        }
      }
    };
    
    peerRef.current.on('iceconnectionstatechange', handleICEConnectionStateChange);
    
    return () => {
      if (peerRef.current) {
        peerRef.current.off('iceconnectionstatechange', handleICEConnectionStateChange);
      }
    };
  }, []);
  
  // Адаптивная битрейт-подстройка
  useEffect(() => {
    if (!streamRef.current) return;
    
    peerRef.current = new SimplePeer({
      initiator: true,
      stream: streamRef.current,
      config: { iceServers },
      trickle: false
    });
    
    peerRef.current.on('signal', data => {
      console.log('Signal data:', data);
      setStreamUrl(JSON.stringify(data));
    });
    
    peerRef.current.on('connect', () => {
      console.log('WebRTC соединение установлено');
      reconnectAttemptsRef.current = 0;
    });
    
    peerRef.current.on('error', err => {
      console.error('WebRTC ошибка:', err);
      reconnectWithBackoff();
    });
  }, [iceServers, onError]);
  
  // Реализация экспоненциального отката
  const reconnectWithBackoff = () => {
    const maxRetries = 5;
    const baseDelay = 1000;
    
    if (reconnectAttemptsRef.current >= maxRetries) {
      onError(new Error('Достигнуто максимальное число попыток подключения'));
      return;
    }
    
    const delay = Math.min(baseDelay * Math.pow(2, reconnectAttemptsRef.current), 10000);
    reconnectAttemptsRef.current += 1;
    
    setTimeout(async () => {
      try {
        if (streamRef.current) {
          peerRef.current = new SimplePeer({
            initiator: true,
            stream: streamRef.current,
            config: { iceServers },
            trickle: false
          });
        } else {
          peerRef.current = new SimplePeer({ 
            initiator: true, 
            config: { iceServers } 
          });
        }
        
        reconnectAttemptsRef.current = 0;
      } catch (error) {
        reconnectWithBackoff();
      }
    }, delay);
  };
  
  return (
    <div className="relative aspect-video bg-black">
      {streamUrl && (
        <div className="absolute top-4 left-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
          <p className="font-mono text-sm text-gray-700 dark:text-gray-300">
            {streamUrl}
          </p>
        </div>
      )}
      
      {streamRef.current && (
        <video 
          autoPlay 
          muted 
          playsInline
          className="w-full h-full object-contain"
        >
          {streamRef.current && (
            <source 
              src={URL.createObjectURL(streamRef.current)} 
              type="video/webm"
            />
          )}
        </video>
      )}
    </div>
  );
}