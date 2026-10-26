# Decisiones técnicas

Cada entrada lleva su fecha y su motivo. Lo que dice "hipótesis" se mantiene así hasta que el benchmark lo confirme.

## 2026-10-17 · Prueba de concepto de flexión de codo

**Alcance.** Es una página que mide la flexión de codo en vivo, en 2D y 3D, con y sin filtro 1€. No es el MVP: no tiene backend, ni corrección por longitud de huesos, ni compensación, ni intervalo conformal.

**Versión de MediaPipe: `@mediapipe/tasks-vision` 1.0.1.** La 1.1.1 había salido tres días antes. Preferimos una versión con más de dos meses en uso. Las APIs se verificaron en `vision.d.ts`.

**Modelo: `pose_landmarker_full`, float16, v1.** Es el término medio entre `lite` (5,5 MB) y `heavy` (29 MB). Falta comparar los tres con nuestros datos.

**El modelo y el WASM no van en git.** `frontend/scripts/setup-models.mjs` copia el WASM desde `node_modules` (versión fija en `package.json`), descarga el `.task` una sola vez y verifica su SHA-256. Así el repositorio no carga unos 45 MB de binarios, y la versión sigue siendo reproducible.

**El ángulo 2D se calcula en píxeles.** MediaPipe normaliza x por el ancho e y por el alto. En un cuadro de 16:9, calcular con las coordenadas normalizadas deforma el ángulo. Por eso `elbowFlexion2D` recibe el tamaño del cuadro. Hay una prueba que lo cubre.

**Ángulo con `atan2(|a×b|, a·b)` en lugar de `acos`.** `acos` pierde precisión cerca de 0° y 180°, y la extensión completa del codo está justo en 0°.

**Lado más cercano: promedio de z de imagen de hombro, codo y muñeca.** La documentación de MediaPipe dice que un z menor está más cerca de la cámara. *Hipótesis*: en vista de perfil, esto elige bien el brazo. No hay histéresis, así que en vista de frente el lado puede alternar entre cuadros.

**Visibilidad mínima: 0,5.** Es el umbral que usaba `drawing_utils` de MediaPipe. No está calibrado.

**Parámetros del filtro 1€ sin ajustar.** Se usan `minCutoff = 1 Hz`, `beta = 0,1` y `dCutoff = 1 Hz`, que son los valores por defecto y del ejemplo del paquete. Están pendientes de ajustar con el procedimiento de Casiez et al. (2012). Hoy no se puede decir que el filtro mejore la precisión.

**"Con y sin 1€" son dos pipelines en paralelo** sobre el mismo cuadro: `ElbowPipeline({ oneEuro: true })` y `ElbowPipeline({ oneEuro: false })`. Así se respeta la regla de que cada etapa tiene un flag.

**`pipeline/` se trata como lógica pura.** No está en la lista de CLAUDE.md §8, pero el benchmark lo ejecuta desde Node. ESLint prohíbe que importe React o MediaPipe.

**Las reglas de dependencia se revisan con ESLint** (`no-restricted-imports` y `no-restricted-globals`): solo `pose/` importa `@mediapipe`, la lógica pura no importa React ni `api/`, y solo `api/` usa `fetch`.

**Dependencias de herramientas aprobadas** que no estaban en la tabla de CLAUDE.md §7: `typescript`, `@vitejs/plugin-react`, `@types/react`, `@types/react-dom`, `@eslint/js`, `typescript-eslint`, `eslint-plugin-react-hooks` y `eslint-config-prettier`. TypeScript está fijo en la 6.0.3 porque `typescript-eslint` 8.71 no acepta la 7.

**Propuesta pendiente: `ElbowReading` a `types.ts`.** Es la salida del pipeline y la usa la interfaz. Por ahora vive en `pipeline/elbowPipeline.ts` porque `types.ts` lo aprueba el equipo.

**Rango anatómico sin validar.** Una flexión fuera del rango normal todavía no se marca. Queda para cuando se defina el umbral con su fuente.
