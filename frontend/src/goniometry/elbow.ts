import type { AngleResult, BodySide, ImageLandmark, WorldLandmark } from '../types';
import { ARM_LANDMARKS, MIN_VISIBILITY } from './constants';
import { angleBetweenDegrees, subtract, type Vec3 } from './vector';

interface Arm<T> {
  shoulder: T;
  elbow: T;
  wrist: T;
}

/** Devuelve hombro, codo y muñeca del lado pedido, o null si falta alguno o no es visible. */
function visibleArm<T extends { visibility: number }>(
  landmarks: readonly T[],
  side: BodySide,
): Arm<T> | null {
  const indices = ARM_LANDMARKS[side];
  const shoulder = landmarks[indices.shoulder];
  const elbow = landmarks[indices.elbow];
  const wrist = landmarks[indices.wrist];
  if (!shoulder || !elbow || !wrist) {
    return null;
  }
  const allVisible = [shoulder, elbow, wrist].every((p) => p.visibility >= MIN_VISIBILITY);
  return allVisible ? { shoulder, elbow, wrist } : null;
}

/** Flexión de codo = 180° − ángulo(hombro, codo, muñeca), según CLAUDE.md §4. */
function flexionFromArm(arm: Arm<Vec3>): AngleResult {
  const upperArm = subtract(arm.shoulder, arm.elbow);
  const forearm = subtract(arm.wrist, arm.elbow);
  const inner = angleBetweenDegrees(upperArm, forearm);
  if (inner === null) {
    return { ok: false, reason: 'zero_length_segment' };
  }
  return { ok: true, degrees: 180 - inner };
}

/**
 * Flexión de codo en el plano de la imagen.
 * Necesita el tamaño del cuadro porque x e y vienen normalizados por separado:
 * sin pasar a píxeles, un cuadro 16:9 deforma el ángulo.
 */
export function elbowFlexion2D(
  image: readonly ImageLandmark[],
  side: BodySide,
  widthPx: number,
  heightPx: number,
): AngleResult {
  const arm = visibleArm(image, side);
  if (!arm) {
    return { ok: false, reason: 'low_visibility' };
  }
  const toPixels = (p: ImageLandmark): Vec3 => ({ x: p.x * widthPx, y: p.y * heightPx, z: 0 });
  return flexionFromArm({
    shoulder: toPixels(arm.shoulder),
    elbow: toPixels(arm.elbow),
    wrist: toPixels(arm.wrist),
  });
}

/** Flexión de codo con los landmarks de mundo (metros), sin proyectar. */
export function elbowFlexion3D(world: readonly WorldLandmark[], side: BodySide): AngleResult {
  const arm = visibleArm(world, side);
  if (!arm) {
    return { ok: false, reason: 'low_visibility' };
  }
  return flexionFromArm(arm);
}
