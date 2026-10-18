# Fisio-visor

Medidor de rango de movimiento articular (ROM) con cámara web, para fisioterapeutas que trabajan a domicilio.
Proyecto para el PoliByte Innovation Challenge 2026 (ESPOCH). Las reglas del equipo están en [CLAUDE.md](CLAUDE.md).

## Estado actual: prueba de concepto

Una página que abre la webcam, ejecuta MediaPipe Pose Landmarker y muestra en vivo la flexión de codo del lado más cercano a la cámara:

- en 2D (plano de la imagen) y en 3D (landmarks de mundo);
- sin filtro y con filtro 1€, lado a lado.

No es el MVP. Los números **no están validados** contra un goniómetro y todavía no hay intervalo de confianza.

## Cómo ejecutarlo

Requisitos: Node 24 y un navegador con WebGL2 (Chrome o Edge recientes).

```bash
cd frontend
npm install
npm run setup:models   # copia el WASM y descarga el modelo una sola vez (verifica SHA-256)
npm run dev            # abre http://localhost:5173
```

Después de `setup:models`, la app funciona sin internet. El video nunca sale del navegador.

Verificaciones:

```bash
npm test               # pruebas de Vitest
npm run lint           # ESLint, incluidas las reglas de dependencia entre módulos
npm run typecheck      # TypeScript estricto
npm run format:check   # Prettier
```

## Librerías y modelos de terceros

| Nombre                     | Versión                        | Licencia     | Uso                                |
| -------------------------- | ------------------------------ | ------------ | ---------------------------------- |
| `@mediapipe/tasks-vision`  | 1.0.1                          | Apache-2.0   | Pose Landmarker y archivos WASM    |
| Modelo Pose Landmarker     | `pose_landmarker_full`, float16, v1 | Ver la model card de Google | Detección de 33 landmarks |
| `1eurofilter`              | 1.3.0                          | BSD-3-Clause | Filtro 1€ (Casiez et al., 2012)    |
| React / React DOM          | 19.3.1                         | MIT          | Interfaz                           |
| Vite / Vitest              | 8.3.4 / 5.0.5                  | MIT          | Servidor de desarrollo y pruebas   |

### Registro del modelo

- **Archivo:** `pose_landmarker_full.task`, 9 398 198 bytes.
- **SHA-256:** `5134a3aad27a58b93da0088d431f366da362b44e3ccfbe3462b3827a839011b1`.
- **Origen:** `storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_full/float16/1/`.
- **Configuración:** `runningMode: VIDEO`, `numPoses: 1`, las tres confianzas mínimas en 0,5 (valores por defecto), sin máscaras de segmentación. Se usa GPU y, si falla, CPU.
- **Recursos:** WASM de unos 11,8 MB más el modelo de 9 MB. En la laptop de desarrollo, el modelo cargó en unos 0,7 s con GPU. Fue una sola medición, no un benchmark.
