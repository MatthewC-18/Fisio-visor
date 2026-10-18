import { describe, expect, it } from 'vitest';
import { LandmarkSmoother } from './landmarkSmoother';

const FRAME_MS = 33;

describe('LandmarkSmoother', () => {
  it('deja pasar sin cambios el primer cuadro', () => {
    const smoother = new LandmarkSmoother();
    const first = [{ x: 0.4, y: 0.6, z: -0.1, visibility: 0.9 }];
    expect(smoother.smooth(first, 0)).toEqual(first);
  });

  it('no altera una señal constante', () => {
    const smoother = new LandmarkSmoother();
    const still = [{ x: 0.4, y: 0.6, z: -0.1, visibility: 0.9 }];
    let output = still;
    for (let frame = 0; frame < 30; frame++) {
      output = smoother.smooth(still, frame * FRAME_MS);
    }
    expect(output[0]?.x).toBeCloseTo(0.4, 12);
    expect(output[0]?.y).toBeCloseTo(0.6, 12);
    expect(output[0]?.z).toBeCloseTo(-0.1, 12);
  });

  it('atenúa un salto brusco y no toca la visibilidad', () => {
    const smoother = new LandmarkSmoother();
    smoother.smooth([{ x: 0, y: 0, z: 0, visibility: 1 }], 0);
    const [jumped] = smoother.smooth([{ x: 1, y: 0, z: 0, visibility: 0.2 }], FRAME_MS);
    expect(jumped?.x).toBeGreaterThan(0);
    expect(jumped?.x).toBeLessThan(1);
    expect(jumped?.visibility).toBe(0.2);
  });

  it('después de reset vuelve a empezar desde el valor recibido', () => {
    const smoother = new LandmarkSmoother();
    smoother.smooth([{ x: 0, y: 0, z: 0, visibility: 1 }], 0);
    smoother.reset();
    const [restarted] = smoother.smooth([{ x: 1, y: 0, z: 0, visibility: 1 }], FRAME_MS);
    expect(restarted?.x).toBe(1);
  });
});
