import { describe, expect, it } from 'vitest';
import { elbowFlexion2D, elbowFlexion3D } from '../goniometry/elbow';
import { armAtFlexion, poseWithArm } from '../goniometry/fixtures';
import type { PoseFrame } from '../types';
import { ElbowPipeline } from './elbowPipeline';

const FRAME_MS = 33;
const WIDTH_PX = 1280;
const HEIGHT_PX = 720;

/** Secuencia de cuadros con el codo oscilando entre 60° y 120°, para que el filtro tenga trabajo. */
function oscillatingFrames(count: number): PoseFrame[] {
  return Array.from({ length: count }, (_, i) => {
    const flexion = 90 + 30 * Math.sin(i);
    // El brazo izquierdo queda más cerca de la cámara (z menor) para que el lado sea estable.
    const image = poseWithArm('left', armAtFlexion(flexion, { x: 0.5, y: 0.5, z: -0.3 }, 0.2));
    const world = poseWithArm('left', armAtFlexion(flexion, { x: 0, y: 0, z: -0.3 }, 0.3));
    return { image, world, widthPx: WIDTH_PX, heightPx: HEIGHT_PX, timestampMs: i * FRAME_MS };
  });
}

describe('ElbowPipeline', () => {
  it('con oneEuro apagado entrega exactamente lo que calcula goniometry/', () => {
    const pipeline = new ElbowPipeline({ oneEuro: false });
    for (const frame of oscillatingFrames(20)) {
      const reading = pipeline.process(frame);
      expect(reading.side).toBe('left');
      expect(reading.image).toBe(frame.image);
      expect(reading.flexion2D).toEqual(elbowFlexion2D(frame.image, 'left', WIDTH_PX, HEIGHT_PX));
      expect(reading.flexion3D).toEqual(elbowFlexion3D(frame.world, 'left'));
    }
  });

  it('con oneEuro encendido el resultado cambia, así que la etapa sí actúa', () => {
    const frames = oscillatingFrames(20);
    const raw = new ElbowPipeline({ oneEuro: false });
    const filtered = new ElbowPipeline({ oneEuro: true });
    const differences = frames.map((frame) => {
      const a = raw.process(frame).flexion3D;
      const b = filtered.process(frame).flexion3D;
      return a.ok && b.ok ? Math.abs(a.degrees - b.degrees) : 0;
    });
    expect(Math.max(...differences)).toBeGreaterThan(1);
  });

  it('sin landmarks no inventa un ángulo', () => {
    const pipeline = new ElbowPipeline({ oneEuro: true });
    const empty: PoseFrame = { image: [], world: [], widthPx: 1, heightPx: 1, timestampMs: 0 };
    const reading = pipeline.process(empty);
    expect(reading.side).toBeNull();
    expect(reading.flexion2D.ok).toBe(false);
    expect(reading.flexion3D.ok).toBe(false);
  });
});
