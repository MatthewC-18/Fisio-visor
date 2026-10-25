import { useEffect, useRef } from 'react';
import type { PoseFrame } from '../types';

interface PoseViewerProps {
    poseFrame?: PoseFrame | null;
}

export function PoseViewer({ poseFrame }: PoseViewerProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || !poseFrame) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // 1. Limpiar el canvas en cada nuevo frame
        ctx.clearRect(0, 0, poseFrame.widthPx, poseFrame.heightPx);

        // 2. Configurar el estilo de dibujo
        ctx.fillStyle = '#10b981'; // Un verde amigable (HCI)
        ctx.strokeStyle = '#059669';
        ctx.lineWidth = 2;

        // 3. Dibujar los landmarks (puntos articulares)
        poseFrame.image.forEach((landmark) => {
            // Regla HCI: Si la visibilidad es baja, no mostramos el punto para evitar falsas esperanzas/errores
            if (landmark.visibility > 0.6) {
                // Multiplicamos la coordenada normalizada (0 a 1) por las dimensiones reales
                const pixelX = landmark.x * poseFrame.widthPx;
                const pixelY = landmark.y * poseFrame.heightPx;

                ctx.beginPath();
                ctx.arc(pixelX, pixelY, 6, 0, 2 * Math.PI);
                ctx.fill();
                ctx.stroke();
            }
        });
    }, [poseFrame]);

    return (
        <div style={{
            position: 'relative',
            width: 'fit-content',
            margin: '0 auto',
            borderRadius: '8px',
            overflow: 'hidden',
            backgroundColor: '#1f2937' // Fondo oscuro mientras no hay video real
        }}>
            {/* Contenedor simulado del video (luego se cambiará por un <video autoPlay>) */}
            <div style={{
                width: poseFrame?.widthPx || 640,
                height: poseFrame?.heightPx || 480,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#9ca3af',
                fontFamily: 'sans-serif'
            }}>
                <p>Cámara inactiva / Esperando feed...</p>
            </div>

            {/* Canvas superpuesto transparente (pointerEvents: none evita que bloquee clicks al video) */}
            <canvas
                ref={canvasRef}
                width={poseFrame?.widthPx || 640}
                height={poseFrame?.heightPx || 480}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    pointerEvents: 'none'
                }}
            />
        </div>
    );
}