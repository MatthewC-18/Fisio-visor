import { describe, expect, it } from 'vitest';
import type { AngleResult } from '../types';
import { ARM_LANDMARKS } from './constants';
import { elbowFlexion2D, elbowFlexion3D } from './elbow';
import { armAtFlexion, poseWithArm, rotateArmAroundVertical, withLandmark } from './fixtures';

// Precisión de las comparaciones: solo errores de punto flotante.
const DECIMALS = 9;

function degreesOf(result: AngleResult): number {
  if (!result.ok) {
    throw new Error(`Se esperaba un ángulo y llegó el error "${result.reason}"`);
  }
  return result.degrees;
}

describe('elbowFlexion2D', () => {
  // Cuadro cuadrado: coordenadas normalizadas y en píxeles tienen la misma forma.
  const elbow = { x: 0.5, y: 0.5, z: 0 };

  it.each([0, 90, 150])('mide %i° con el brazo en el plano de la imagen', (flexion) => {
    const pose = poseWithArm('left', armAtFlexion(flexion, elbow, 0.2));
    expect(degreesOf(elbowFlexion2D(pose, 'left', 640, 640))).toBeCloseTo(flexion, DECIMALS);
  });

  it('pasa a píxeles: en un cuadro 16:9 el codo a 90° sigue midiendo 90°', () => {
    const widthPx = 1280;
    const heightPx = 720;
    const armPx = armAtFlexion(90, { x: 640, y: 360, z: 0 }, 200);
    const normalize = (p: { x: number; y: number; z: number }) => ({
      x: p.x / widthPx,
      y: p.y / heightPx,
      z: 0,
    });
    const pose = poseWithArm('right', {
      shoulder: normalize(armPx.shoulder),
      elbow: normalize(armPx.elbow),
      wrist: normalize(armPx.wrist),
    });
    expect(degreesOf(elbowFlexion2D(pose, 'right', widthPx, heightPx))).toBeCloseTo(90, DECIMALS);
  });

  it('no mide si la muñeca no es visible', () => {
    const pose = poseWithArm('left', armAtFlexion(90, elbow, 0.2));
    const hidden = withLandmark(pose, ARM_LANDMARKS.left.wrist, { visibility: 0.1 });
    expect(elbowFlexion2D(hidden, 'left', 640, 640)).toEqual({
      ok: false,
      reason: 'low_visibility',
    });
  });

  it('no mide si faltan los landmarks', () => {
    expect(elbowFlexion2D([], 'left', 640, 640)).toEqual({ ok: false, reason: 'low_visibility' });
  });

  it('no mide si el antebrazo tiene longitud cero', () => {
    const arm = armAtFlexion(90, elbow, 0.2);
    const pose = poseWithArm('left', { ...arm, wrist: arm.elbow });
    expect(elbowFlexion2D(pose, 'left', 640, 640)).toEqual({
      ok: false,
      reason: 'zero_length_segment',
    });
  });
});

describe('elbowFlexion3D', () => {
  // Landmarks de mundo en metros: codo en el origen, húmero y antebrazo de 30 cm.
  const elbow = { x: 0, y: 0, z: 0 };

  it.each([0, 90, 150])('mide %i° en el espacio', (flexion) => {
    const pose = poseWithArm('right', armAtFlexion(flexion, elbow, 0.3));
    expect(degreesOf(elbowFlexion3D(pose, 'right'))).toBeCloseTo(flexion, DECIMALS);
  });

  it('da el mismo ángulo aunque el brazo gire 40° fuera del plano de la cámara', () => {
    const arm = rotateArmAroundVertical(armAtFlexion(90, elbow, 0.3), 40);
    const pose = poseWithArm('right', arm);
    expect(degreesOf(elbowFlexion3D(pose, 'right'))).toBeCloseTo(90, DECIMALS);
  });

  it('no mide si el hombro no es visible', () => {
    const pose = poseWithArm('right', armAtFlexion(90, elbow, 0.3));
    const hidden = withLandmark(pose, ARM_LANDMARKS.right.shoulder, { visibility: 0 });
    expect(elbowFlexion3D(hidden, 'right')).toEqual({ ok: false, reason: 'low_visibility' });
  });
});
