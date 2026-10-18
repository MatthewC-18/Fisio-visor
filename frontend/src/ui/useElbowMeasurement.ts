import { useEffect, useState, type RefObject } from 'react';
import { openCamera, stopCamera } from '../capture/camera';
import { ElbowPipeline, type ElbowReading } from '../pipeline/elbowPipeline';
import { createPoseDetector, type Delegate, type PoseDetector } from '../pose/poseLandmarker';

export type MeasurementStatus = 'starting_camera' | 'loading_model' | 'running' | 'error';

export interface ElbowMeasurement {
  status: MeasurementStatus;
  errorMessage: string | null;
  personDetected: boolean;
  raw: ElbowReading | null;
  filtered: ElbowReading | null;
  /** Cuadros procesados por segundo, medidos en ventanas de un segundo. */
  fps: number | null;
  delegate: Delegate | null;
}

const INITIAL_STATE: ElbowMeasurement = {
  status: 'starting_camera',
  errorMessage: null,
  personDetected: false,
  raw: null,
  filtered: null,
  fps: null,
  delegate: null,
};

const MS_PER_SECOND = 1000;

function errorText(error: unknown): string {
  return error instanceof Error ? error.message : 'Ocurrió un error inesperado.';
}

/**
 * Abre la cámara, carga el modelo y mide el codo en cada cuadro nuevo del video.
 * Corre dos pipelines sobre el mismo cuadro: uno sin filtro y otro con el filtro 1€.
 */
export function useElbowMeasurement(
  videoRef: RefObject<HTMLVideoElement | null>,
): ElbowMeasurement {
  const [state, setState] = useState<ElbowMeasurement>(INITIAL_STATE);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) {
      return;
    }
    let cancelled = false;
    let stream: MediaStream | null = null;
    let detector: PoseDetector | null = null;
    let frameRequest = 0;

    const rawPipeline = new ElbowPipeline({ oneEuro: false });
    const filteredPipeline = new ElbowPipeline({ oneEuro: true });

    let lastVideoTime = -1;
    let fps: number | null = null;
    let fpsWindowStart = performance.now();
    let fpsFrames = 0;

    function updateFps(now: number): void {
      fpsFrames += 1;
      const elapsed = now - fpsWindowStart;
      if (elapsed >= MS_PER_SECOND) {
        fps = (fpsFrames * MS_PER_SECOND) / elapsed;
        fpsFrames = 0;
        fpsWindowStart = now;
      }
    }

    function processFrame(activeDetector: PoseDetector, activeVideo: HTMLVideoElement): void {
      // performance.now() crece siempre, como exige MediaPipe en modo VIDEO.
      const now = performance.now();
      const frame = activeDetector.detect(activeVideo, now);
      updateFps(now);
      if (!frame) {
        // Sin persona, la historia del filtro ya no sirve: se reinicia.
        filteredPipeline.reset();
        setState((s) => ({ ...s, personDetected: false, raw: null, filtered: null, fps }));
        return;
      }
      // Se calcula fuera de setState: los pipelines guardan estado y no deben correr dos veces.
      const raw = rawPipeline.process(frame);
      const filtered = filteredPipeline.process(frame);
      setState((s) => ({ ...s, personDetected: true, raw, filtered, fps }));
    }

    function loop(): void {
      if (cancelled || !detector || !video) {
        return;
      }
      // Solo se procesa un cuadro nuevo: repetir el mismo engañaría al filtro con muestras duplicadas.
      const hasNewFrame =
        video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA &&
        video.currentTime !== lastVideoTime;
      if (hasNewFrame) {
        lastVideoTime = video.currentTime;
        try {
          processFrame(detector, video);
        } catch (error) {
          setState((s) => ({ ...s, status: 'error', errorMessage: errorText(error) }));
          return;
        }
      }
      frameRequest = requestAnimationFrame(loop);
    }

    async function start(activeVideo: HTMLVideoElement): Promise<void> {
      try {
        // Si el componente se desmontó mientras se abría la cámara, se cierra aquí mismo.
        const opened = await openCamera();
        if (cancelled) {
          stopCamera(opened);
          return;
        }
        stream = opened;
        activeVideo.srcObject = opened;
        await activeVideo.play();
        setState((s) => ({ ...s, status: 'loading_model' }));

        const created = await createPoseDetector();
        if (cancelled) {
          created.close();
          return;
        }
        detector = created;
        setState((s) => ({ ...s, status: 'running', delegate: created.delegate }));
        frameRequest = requestAnimationFrame(loop);
      } catch (error) {
        if (!cancelled) {
          setState((s) => ({ ...s, status: 'error', errorMessage: errorText(error) }));
        }
      }
    }

    void start(video);

    return () => {
      cancelled = true;
      cancelAnimationFrame(frameRequest);
      detector?.close();
      if (stream) {
        stopCamera(stream);
      }
      video.srcObject = null;
    };
  }, [videoRef]);

  return state;
}
