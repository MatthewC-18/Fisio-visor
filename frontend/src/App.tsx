import { useState } from 'react';
import { PoseViewer } from './components/PoseViewer';
import { mockPoseFrame } from './mockData';
import type { PoseFrame } from './types';

export default function App() {
    // Manejamos el estado del frame (útil para cuando lleguen por WebSocket o API)
    const [currentFrame, setCurrentFrame] = useState<PoseFrame | null>(mockPoseFrame);

    return (
        <main style={{ padding: '2rem', fontFamily: 'sans-serif', textAlign: 'center' }}>
            <h1>Fisio Visor - Rehabilitación Asistida</h1>
            <p style={{ color: '#4b5563', marginBottom: '2rem' }}>
                Alinea tu cuerpo con los puntos verdes.
            </p>

            {/* Renderizamos el componente pasándole los datos */}
            <PoseViewer poseFrame={currentFrame} />

        </main>
    );
}