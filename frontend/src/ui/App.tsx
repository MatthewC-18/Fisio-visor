import { useRef } from 'react';
import { MODEL_INFO } from '../pose/constants';
import { AngleTable } from './AngleTable';
import { CameraView } from './CameraView';
import { useElbowMeasurement, type ElbowMeasurement } from './useElbowMeasurement';

function statusText(measurement: ElbowMeasurement): string | null {
  switch (measurement.status) {
    case 'starting_camera':
      return 'Abriendo la cámara…';
    case 'loading_model':
      return 'Cargando el modelo de pose…';
    case 'error':
      return measurement.errorMessage;
    case 'running':
      return measurement.personDetected ? null : 'No se detecta a ninguna persona en el cuadro.';
  }
}

export function App() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const measurement = useElbowMeasurement(videoRef);
  const status = statusText(measurement);

  return (
    <main className="app">
      <header>
        <h1>Fisio-visor</h1>
        <p>Prueba de concepto: flexión de codo en vivo, en 2D y 3D, con y sin filtro 1€.</p>
      </header>

      <div className="layout">
        <CameraView videoRef={videoRef} raw={measurement.raw} filtered={measurement.filtered} />

        <section className="panel">
          {status && (
            <p className={measurement.status === 'error' ? 'status error' : 'status'}>{status}</p>
          )}
          <AngleTable raw={measurement.raw} filtered={measurement.filtered} />
          <p className="hint">
            Ponte de perfil, con el brazo que quieres medir del lado de la cámara. Se mide el lado
            más cercano.
          </p>
          <p className="warning">
            Sin intervalo de confianza: todavía no hay tabla de calibración. Estos números no están
            validados contra un goniómetro.
          </p>
          <dl className="meta">
            <dt>Modelo</dt>
            <dd>
              {MODEL_INFO.name} v{MODEL_INFO.version} ({MODEL_INFO.precision}), tasks-vision{' '}
              {MODEL_INFO.tasksVisionVersion}
            </dd>
            <dt>Delegado</dt>
            <dd>{measurement.delegate ?? '—'}</dd>
            <dt>Cuadros por segundo</dt>
            <dd>{measurement.fps === null ? '—' : measurement.fps.toFixed(0)}</dd>
          </dl>
        </section>
      </div>
    </main>
  );
}
