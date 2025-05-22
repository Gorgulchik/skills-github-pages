// src/core/utils/webRTCTest.ts
import { RTCPeerConnection } from 'simple-peer';
import { initWebRTCOptimizations, addICERestart } from '@/core/utils/webRTCOptimization';

describe('Проверка WebRTC функционала', () => {
  it('Создание WebRTC соединения', () => {
    const peer = new RTCPeerConnection();
    expect(peer).toBeDefined();
    expect(peer.iceConnectionState).toBe('new');
  });
  
  it('ICE restart', () => {
    const peer = new RTCPeerConnection();
    addICERestart(peer);
    
    // Подделка разрыва соединения
    peer.iceConnectionState = 'disconnected';
    peer.dispatchEvent(new Event('iceconnectionstatechange'));
    
    setTimeout(() => {
      expect(peer.iceConnectionState).not.toBe('disconnected');
    }, 1500);
  });
  
  it('Адаптивный битрейт', () => {
    const peer = new RTCPeerConnection();
    initWebRTCOptimizations(peer);
    
    // Подделка события negotiationneeded
    peer.dispatchEvent(new Event('negotiationneeded'));
    
    const sender = peer.getSenders()[0];
    const parameters = sender.getParameters();
    expect(parameters.encodings[0].scaleResolutionDownBy).toBeGreaterThan(1);
  });
}