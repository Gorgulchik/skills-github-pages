// src/core/utils/webRTCOptimization.ts
import { RTCPeerConnection } from 'simple-peer';

export function initWebRTCOptimizations(peer: RTCPeerConnection) {
  addICERestart(peer);
  
  peer.onnegotiationneeded = () => {
    const sender = peer.getSenders().find(sender => sender.track?.kind === 'video');
    if (sender) {
      const parameters = sender.getParameters();
      parameters.encodings.forEach(encodingParam => {
        encodingParam.scaleResolutionDownBy = Math.max(1, encodingParam.scaleResolutionDownBy * 1.5);
      });
      sender.setParameters(parameters);
    }
  };
}