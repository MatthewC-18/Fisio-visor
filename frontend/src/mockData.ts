import type { PoseFrame } from './types';

// Simulamos un cuadro de video de 640x480 con 3 puntos clave (ej. hombro, codo, muñeca)
export const mockPoseFrame: PoseFrame = {
    widthPx: 640,
    heightPx: 480,
    timestampMs: Date.now(),
    world: [], // No lo usaremos para dibujar en 2D por ahora
    image: [
        { x: 0.3, y: 0.4, z: 0.1, visibility: 0.9 }, // Punto 1 (ej. Hombro)
        { x: 0.4, y: 0.6, z: 0.1, visibility: 0.85 }, // Punto 2 (ej. Codo)
        { x: 0.5, y: 0.3, z: 0.1, visibility: 0.95 }, // Punto 3 (ej. Muñeca)
        { x: 0.8, y: 0.8, z: 0.1, visibility: 0.2 },  // Punto 4 (Baja visibilidad, no debería dibujarse)
    ]
};