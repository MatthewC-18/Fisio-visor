// Único módulo que conoce MediaPipe (CLAUDE.md §8).
// Traduce sus resultados a los tipos de types.ts para que el resto no dependa de la librería.
import {
  FilesetResolver,
  PoseLandmarker,
  type Landmark,
  type NormalizedLandmark,
} from '@mediapipe/tasks-vision';
import type { ImageLandmark, PoseFrame, WorldLandmark } from '../types';
import {
  MIN_POSE_DETECTION_CONFIDENCE,
  MIN_POSE_PRESENCE_CONFIDENCE,
  MIN_TRACKING_CONFIDENCE,
  MODEL_ASSET_PATH,
  NUM_POSES,
  WASM_BASE_PATH,
} from './constants';

export type Delegate = 'GPU' | 'CPU';

// MediaPipe no exporta el tipo WasmFileset; se obtiene del valor que devuelve FilesetResolver.
type WasmFileset = Awaited<ReturnType<typeof FilesetResolver.forVisionTasks>>;

export interface PoseDetector {
  /** Delegado con el que se cargó el modelo: GPU si se pudo, si no CPU. */
  delegate: Delegate;
  /** Detecta la pose en el cuadro actual del video. Devuelve null si no hay persona. */
  detect(video: HTMLVideoElement, timestampMs: number): PoseFrame | null;
  close(): void;
}

function toImageLandmark(p: NormalizedLandmark): ImageLandmark {
  return { x: p.x, y: p.y, z: p.z, visibility: p.visibility };
}

function toWorldLandmark(p: Landmark): WorldLandmark {
  return { x: p.x, y: p.y, z: p.z, visibility: p.visibility };
}

async function createLandmarker(fileset: WasmFileset, delegate: Delegate): Promise<PoseLandmarker> {
  return PoseLandmarker.createFromOptions(fileset, {
    baseOptions: { modelAssetPath: MODEL_ASSET_PATH, delegate },
    runningMode: 'VIDEO',
    numPoses: NUM_POSES,
    minPoseDetectionConfidence: MIN_POSE_DETECTION_CONFIDENCE,
    minPosePresenceConfidence: MIN_POSE_PRESENCE_CONFIDENCE,
    minTrackingConfidence: MIN_TRACKING_CONFIDENCE,
    outputSegmentationMasks: false,
  });
}

/** Carga el modelo desde public/models/. Intenta con GPU y, si falla, usa CPU. */
export async function createPoseDetector(): Promise<PoseDetector> {
  let landmarker: PoseLandmarker;
  let delegate: Delegate = 'GPU';
  try {
    const fileset = await FilesetResolver.forVisionTasks(WASM_BASE_PATH);
    try {
      landmarker = await createLandmarker(fileset, 'GPU');
    } catch {
      delegate = 'CPU';
      landmarker = await createLandmarker(fileset, 'CPU');
    }
  } catch (error) {
    throw new Error(
      'No se pudo cargar el modelo de pose. Revisa que hayas ejecutado "npm run setup:models".',
      { cause: error },
    );
  }

  return {
    delegate,
    detect(video, timestampMs) {
      const result = landmarker.detectForVideo(video, timestampMs);
      const image = result.landmarks[0];
      const world = result.worldLandmarks[0];
      if (!image || !world) {
        return null;
      }
      return {
        image: image.map(toImageLandmark),
        world: world.map(toWorldLandmark),
        widthPx: video.videoWidth,
        heightPx: video.videoHeight,
        timestampMs,
      };
    },
    close() {
      landmarker.close();
    },
  };
}
