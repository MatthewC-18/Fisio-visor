import { MIN_SEGMENT_LENGTH } from './constants';

/** Punto o vector en 3D. En 2D se usa z = 0. */
export interface Vec3 {
  x: number;
  y: number;
  z: number;
}

export function subtract(a: Vec3, b: Vec3): Vec3 {
  return { x: a.x - b.x, y: a.y - b.y, z: a.z - b.z };
}

export function dot(a: Vec3, b: Vec3): number {
  return a.x * b.x + a.y * b.y + a.z * b.z;
}

export function cross(a: Vec3, b: Vec3): Vec3 {
  return {
    x: a.y * b.z - a.z * b.y,
    y: a.z * b.x - a.x * b.z,
    z: a.x * b.y - a.y * b.x,
  };
}

export function norm(v: Vec3): number {
  return Math.sqrt(dot(v, v));
}

/**
 * Ángulo entre dos vectores, en grados, entre 0 y 180.
 * Devuelve null si alguno mide casi cero, porque entonces no tiene dirección.
 */
export function angleBetweenDegrees(a: Vec3, b: Vec3): number | null {
  if (norm(a) < MIN_SEGMENT_LENGTH || norm(b) < MIN_SEGMENT_LENGTH) {
    return null;
  }
  // atan2(|a × b|, a · b) en lugar de acos(a · b / |a||b|):
  // acos pierde precisión cerca de 0° y 180°, justo donde está la extensión completa.
  const radians = Math.atan2(norm(cross(a, b)), dot(a, b));
  return (radians * 180) / Math.PI;
}
