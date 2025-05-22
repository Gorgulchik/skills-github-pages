// src/core/utils/hexParser.ts
export function parseHEX(hex: string): { r: number; g: number; b: number } {
  if (!hex.startsWith('#') || (hex.length !== 4 && hex.length !== 7 && hex.length !== 9)) {
    throw new Error(`Неверный формат HEX цвета: ${hex}`);
  }
  
  const fullHex = hex.length === 4 
    ? hex.replace(/./g, '$&$&') 
    : hex;
  
  return {
    r: parseInt(fullHex.substr(1, 2), 16),
    g: parseInt(fullHex.substr(3, 2), 16),
    b: parseInt(fullHex.substr(5, 2), 16)
  };
}