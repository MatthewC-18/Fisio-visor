import { describe, expect, it } from 'vitest';
import { ARM_LANDMARKS } from './constants';
import { armAtFlexion, poseWithArm, withLandmark } from './fixtures';
import { closestSide } from './side';

// Brazo izquierdo más cerca de la cámara (z = -0.3) que el derecho, que queda en z = 0.
const leftCloser = poseWithArm('left', armAtFlexion(90, { x: 0.5, y: 0.5, z: -0.3 }, 0.2));

describe('closestSide', () => {
  it('elige el lado con z menor', () => {
    expect(closestSide(leftCloser)).toBe('left');
  });

  it('elige el derecho cuando ese brazo queda más cerca', () => {
    const rightCloser = poseWithArm('right', armAtFlexion(90, { x: 0.5, y: 0.5, z: -0.3 }, 0.2));
    expect(closestSide(rightCloser)).toBe('right');
  });

  it('devuelve null si falta un punto', () => {
    const incomplete = leftCloser.slice(0, ARM_LANDMARKS.right.wrist);
    expect(closestSide(incomplete)).toBeNull();
  });

  it('usa el promedio del brazo, no solo el hombro', () => {
    // El hombro derecho está más cerca, pero codo y muñeca derechos quedan muy atrás.
    let pose = withLandmark(leftCloser, ARM_LANDMARKS.right.shoulder, { z: -0.4 });
    pose = withLandmark(pose, ARM_LANDMARKS.right.elbow, { z: 0.2 });
    pose = withLandmark(pose, ARM_LANDMARKS.right.wrist, { z: 0.2 });
    expect(closestSide(pose)).toBe('left');
  });
});
