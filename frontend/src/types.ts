// Contratos compartidos del frontend.
// Los escriben y aprueban las personas del equipo (CLAUDE.md §9). No se cambian sin acuerdo.

/** Landmark de imagen. x e y van normalizados entre 0 y 1, por el ancho y el alto del cuadro. */
export interface ImageLandmark {
  x: number;
  y: number;
  /** Profundidad relativa con origen en el centro de las caderas. Menor valor = más cerca de la cámara. */
  z: number;
  /** Probabilidad de que el punto sea visible, entre 0 y 1. */
  visibility: number;
}

/** Landmark de mundo, en metros, con origen en el centro de las caderas. */
export interface WorldLandmark {
  x: number;
  y: number;
  z: number;
  visibility: number;
}

/** Una pose detectada en un cuadro de video. */
export interface PoseFrame {
  image: ImageLandmark[];
  world: WorldLandmark[];
  widthPx: number;
  heightPx: number;
  timestampMs: number;
}

/** Lado del paciente, no de la imagen. */
export type BodySide = 'left' | 'right';

export type AngleResult =
  { ok: true; degrees: number } | { ok: false; reason: 'low_visibility' | 'zero_length_segment' };
