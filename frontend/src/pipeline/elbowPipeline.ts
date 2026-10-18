import { LandmarkSmoother } from '../filters/landmarkSmoother';
import { elbowFlexion2D, elbowFlexion3D } from '../goniometry/elbow';
import { closestSide } from '../goniometry/side';
import type { AngleResult, BodySide, ImageLandmark, PoseFrame } from '../types';
import type { PipelineConfig } from './config';

// Salida del pipeline del codo. Si el equipo lo aprueba, este tipo se mueve a types.ts.
export interface ElbowReading {
  side: BodySide | null;
  flexion2D: AngleResult;
  flexion3D: AngleResult;
  /** Landmarks de imagen después de las etapas activas, para dibujarlos. */
  image: ImageLandmark[];
}

const NOT_VISIBLE: AngleResult = { ok: false, reason: 'low_visibility' };

/**
 * Pose → filtro 1€ (si está activo) → lado más cercano → flexión de codo en 2D y 3D.
 * Guarda el estado del filtro, así que se usa una instancia por configuración.
 */
export class ElbowPipeline {
  private readonly config: PipelineConfig;
  private readonly imageSmoother = new LandmarkSmoother();
  private readonly worldSmoother = new LandmarkSmoother();

  constructor(config: PipelineConfig) {
    this.config = config;
  }

  process(frame: PoseFrame): ElbowReading {
    const image = this.config.oneEuro
      ? this.imageSmoother.smooth(frame.image, frame.timestampMs)
      : frame.image;
    const world = this.config.oneEuro
      ? this.worldSmoother.smooth(frame.world, frame.timestampMs)
      : frame.world;

    const side = closestSide(image);
    if (side === null) {
      return { side, flexion2D: NOT_VISIBLE, flexion3D: NOT_VISIBLE, image };
    }
    return {
      side,
      flexion2D: elbowFlexion2D(image, side, frame.widthPx, frame.heightPx),
      flexion3D: elbowFlexion3D(world, side),
      image,
    };
  }

  /** Olvida el estado del filtro, por ejemplo cuando se pierde a la persona. */
  reset(): void {
    this.imageSmoother.reset();
    this.worldSmoother.reset();
  }
}
