import type { BodySide, ImageLandmark } from '../types';
import { ARM_LANDMARKS } from './constants';

/** Promedio de z de hombro, codo y muñeca de un lado, o null si falta algún punto. */
function meanArmDepth(image: readonly ImageLandmark[], side: BodySide): number | null {
  const { shoulder, elbow, wrist } = ARM_LANDMARKS[side];
  const indices = [shoulder, elbow, wrist];
  let sum = 0;
  for (const index of indices) {
    const point = image[index];
    if (!point) {
      return null;
    }
    sum += point.z;
  }
  return sum / indices.length;
}

/**
 * Lado más cercano a la cámara: el de menor z promedio.
 * MediaPipe documenta que un z menor está más cerca de la cámara.
 * Hipótesis por validar: en vista de perfil, el brazo cercano tiene z claramente menor.
 * En empate (vista de frente) devuelve el izquierdo; no hay histéresis entre cuadros.
 */
export function closestSide(image: readonly ImageLandmark[]): BodySide | null {
  const left = meanArmDepth(image, 'left');
  const right = meanArmDepth(image, 'right');
  if (left === null || right === null) {
    return null;
  }
  return left <= right ? 'left' : 'right';
}
