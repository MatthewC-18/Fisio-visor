import type { BodySide } from '../types';

// Índices del modelo BlazePose de 33 puntos, según la documentación de MediaPipe Pose Landmarker.
// "left" y "right" son los lados del paciente, no los de la imagen.
export const ARM_LANDMARKS: Record<BodySide, { shoulder: number; elbow: number; wrist: number }> = {
  left: { shoulder: 11, elbow: 13, wrist: 15 },
  right: { shoulder: 12, elbow: 14, wrist: 16 },
};

// Visibilidad mínima para aceptar un punto.
// Es el mismo umbral que usaba drawing_utils de MediaPipe para dibujar un punto.
// No está calibrado con nuestros datos: queda pendiente de ajustar con el benchmark.
export const MIN_VISIBILITY = 0.5;

// Longitud por debajo de la cual un segmento no tiene dirección definida.
// Es solo una protección numérica contra dividir entre cero, no un umbral clínico.
// Unidades del cálculo: píxeles en 2D, metros en 3D.
export const MIN_SEGMENT_LENGTH = 1e-9;
