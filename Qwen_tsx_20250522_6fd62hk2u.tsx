// src/core/utils/webRTCOptimization.ts
import { RTCPeerConnection } from 'simple-peer';

export function addICERestart(peer: RTCPeerConnection) {
  let restartAttempts = 0;
  const maxRestarts = 3;
  
  const handleICEConnectionStateChange = () => {
    if (peer.iceConnectionState === 'disconnected') {
      if (restartAttempts < maxRestarts) {
        console.log(`Переподключение ICE ${restartAttempts + 1} из ${maxRestarts}`);
        peer.restart();
        restartAttempts++;
      } else {
        console.error('Превышено максимальное число переподключений');
      }
    }
  };
  
  peer.on('iceconnectionstatechange', handleICEConnectionStateChange);
  
  return () => {
    peer.off('iceconnectionstatechange', handleICEConnectionStateChange);
  };
}