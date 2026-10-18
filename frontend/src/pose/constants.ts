// Modelo de pose y su configuración (CLAUDE.md §2: se registran nombre, versión y configuración).
// Todo se sirve localmente desde public/models/, lo prepara scripts/setup-models.mjs.
// Si se cambia el modelo, actualizar también ese script, README.md y docs/decisiones.md.
export const MODEL_INFO = {
  name: 'pose_landmarker_full',
  precision: 'float16',
  version: '1',
  // Debe coincidir con la versión fija de @mediapipe/tasks-vision en package.json.
  tasksVisionVersion: '1.0.1',
} as const;

export const MODEL_ASSET_PATH = `${import.meta.env.BASE_URL}models/pose_landmarker_full.task`;
export const WASM_BASE_PATH = `${import.meta.env.BASE_URL}models/wasm`;

// Una sola persona en cuadro: el paciente.
export const NUM_POSES = 1;

// Umbrales de confianza de MediaPipe. Dejamos los valores por defecto documentados (0.5)
// hasta tener datos propios que justifiquen otros.
export const MIN_POSE_DETECTION_CONFIDENCE = 0.5;
export const MIN_POSE_PRESENCE_CONFIDENCE = 0.5;
export const MIN_TRACKING_CONFIDENCE = 0.5;
