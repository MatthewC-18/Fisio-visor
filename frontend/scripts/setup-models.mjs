// Prepara public/models/ para que la app funcione sin internet (CLAUDE.md §3).
// 1. Copia los WASM de @mediapipe/tasks-vision, cuya versión fija está en package.json.
// 2. Descarga el modelo .task una sola vez y verifica su SHA-256.
// Se ejecuta con: npm run setup:models
import { createHash } from 'node:crypto';
import { cp, mkdir, readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const FRONTEND_DIR = new URL('..', import.meta.url);
const MODELS_DIR = new URL('public/models/', FRONTEND_DIR);
const WASM_SOURCE = new URL('node_modules/@mediapipe/tasks-vision/wasm/', FRONTEND_DIR);
const WASM_TARGET = new URL('wasm/', MODELS_DIR);

// Si se cambia el modelo, actualizar también src/pose/constants.ts, README.md y docs/decisiones.md.
const MODEL = {
  file: 'pose_landmarker_full.task',
  url: 'https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_full/float16/1/pose_landmarker_full.task',
  // Calculado al descargarlo por primera vez, el 2026-10-17.
  sha256: '5134a3aad27a58b93da0088d431f366da362b44e3ccfbe3462b3827a839011b1',
};

function sha256(buffer) {
  return createHash('sha256').update(buffer).digest('hex');
}

async function readIfExists(url) {
  try {
    return await readFile(url);
  } catch {
    return null;
  }
}

async function copyWasm() {
  await cp(WASM_SOURCE, WASM_TARGET, { recursive: true });
  console.log(`WASM copiado en ${fileURLToPath(WASM_TARGET)}`);
}

async function ensureModel() {
  const target = new URL(MODEL.file, MODELS_DIR);
  const existing = await readIfExists(target);
  if (existing && sha256(existing) === MODEL.sha256) {
    console.log(`Modelo ya presente y verificado: ${MODEL.file}`);
    return;
  }

  console.log(`Descargando ${MODEL.file}...`);
  const response = await fetch(MODEL.url);
  if (!response.ok) {
    throw new Error(`No se pudo descargar el modelo (HTTP ${response.status}).`);
  }
  const downloaded = Buffer.from(await response.arrayBuffer());
  const hash = sha256(downloaded);
  if (hash !== MODEL.sha256) {
    throw new Error(`El modelo descargado no coincide con el esperado (SHA-256 ${hash}).`);
  }
  await writeFile(target, downloaded);
  console.log(`Modelo descargado y verificado: ${MODEL.file}`);
}

await mkdir(MODELS_DIR, { recursive: true });
await copyWasm();
await ensureModel();
