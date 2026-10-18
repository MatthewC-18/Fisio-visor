// Landmarks construidos a mano, con geometría conocida, para las pruebas.
// Solo los importan archivos *.test.ts; no entran en la app.
import type { BodySide, ImageLandmark } from '../types';
import { ARM_LANDMARKS } from './constants';
import type { Vec3 } from './vector';

// ImageLandmark y WorldLandmark tienen la misma forma, así que un mismo constructor sirve para los dos.
type Landmark = ImageLandmark;

// Número de puntos que entrega BlazePose.
const BLAZEPOSE_LANDMARK_COUNT = 33;

export interface ArmPoints {
  shoulder: Vec3;
  elbow: Vec3;
  wrist: Vec3;
}

/**
 * Brazo con una flexión de codo exacta, en el plano x-y.
 * El hombro queda sobre el codo (y menor, como en la imagen).
 * El antebrazo apunta hacia abajo a 0° y gira hacia el hombro al flexionar:
 * dirección (sen θ, cos θ). A 90° queda horizontal; a 150°, a 30° del húmero.
 */
export function armAtFlexion(flexionDeg: number, elbow: Vec3, segmentLength: number): ArmPoints {
  const theta = (flexionDeg * Math.PI) / 180;
  return {
    shoulder: { x: elbow.x, y: elbow.y - segmentLength, z: elbow.z },
    elbow,
    wrist: {
      x: elbow.x + segmentLength * Math.sin(theta),
      y: elbow.y + segmentLength * Math.cos(theta),
      z: elbow.z,
    },
  };
}

/** Gira el brazo alrededor del eje vertical que pasa por el codo, como si la persona girara. */
export function rotateArmAroundVertical(arm: ArmPoints, degrees: number): ArmPoints {
  const angle = (degrees * Math.PI) / 180;
  const rotate = (p: Vec3): Vec3 => {
    const dx = p.x - arm.elbow.x;
    const dz = p.z - arm.elbow.z;
    return {
      x: arm.elbow.x + dx * Math.cos(angle) - dz * Math.sin(angle),
      y: p.y,
      z: arm.elbow.z + dx * Math.sin(angle) + dz * Math.cos(angle),
    };
  };
  return { shoulder: rotate(arm.shoulder), elbow: arm.elbow, wrist: rotate(arm.wrist) };
}

/** Pose de 33 puntos visibles en el origen, con el brazo indicado colocado en su lugar. */
export function poseWithArm(side: BodySide, arm: ArmPoints): Landmark[] {
  const pose: Landmark[] = Array.from({ length: BLAZEPOSE_LANDMARK_COUNT }, () => ({
    x: 0,
    y: 0,
    z: 0,
    visibility: 1,
  }));
  const indices = ARM_LANDMARKS[side];
  pose[indices.shoulder] = { ...arm.shoulder, visibility: 1 };
  pose[indices.elbow] = { ...arm.elbow, visibility: 1 };
  pose[indices.wrist] = { ...arm.wrist, visibility: 1 };
  return pose;
}

/** Copia de la pose con un punto cambiado. */
export function withLandmark(
  pose: readonly Landmark[],
  index: number,
  change: Partial<Landmark>,
): Landmark[] {
  return pose.map((p, i) => (i === index ? { ...p, ...change } : p));
}
