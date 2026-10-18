# CLAUDE.md — Contexto y reglas del proyecto

Este archivo lo leen los asistentes de IA de los tres integrantes en cada sesión.
Si una instrucción del usuario contradice este archivo, el asistente debe señalarlo antes de escribir código.
Este archivo solo se modifica mediante un PR aprobado por los tres integrantes.

## 1. Qué es el proyecto

Medidor de rango de movimiento articular (ROM) con cámara web, para fisioterapeutas que trabajan a domicilio con una laptop.
Concurso: PoliByte Innovation Challenge 2026 (ESPOCH). Categoría: visión por computador.

Medir ángulos con cámara ya existe (Exer, Kemtai y estudios académicos con MediaPipe). No competimos en eso.
La tesis del proyecto es: **"No confiamos en el modelo: lo medimos, lo corregimos con física y garantizamos el resto con estadística."**

El jurado son ingenieros. Valoran el rigor, la reproducibilidad y las mejoras demostradas con datos, no la cantidad de funciones.

## 2. Reglas del concurso que afectan al código

- El código debe ser original y escrito para este concurso. No se copia código de proyectos anteriores. Las librerías y los modelos preentrenados de terceros se permiten, pero se declaran en el README.
- El jurado puede revisar el historial de commits. Commits pequeños, frecuentes y con la cuenta de cada integrante.
- Cada integrante debe poder explicar cualquier módulo. El código debe ser legible antes que ingenioso.
- Los datos sintéticos se identifican siempre como sintéticos.
- Por cada modelo se registran nombre, versión, configuración y recursos necesarios.
- La demo final es en vivo; nada de resultados precargados que simulen funcionamiento.

## 3. Principios que no se negocian

- **El video nunca sale del navegador.** Se guardan solo números: landmarks crudos de las sesiones de validación, ángulos y metadatos. Nunca imágenes ni video.
- **Todo funciona sin internet.** El modelo de MediaPipe (`.task`) y los archivos WASM se sirven desde `frontend/public/models/` con versión fija, nunca desde un CDN.
- **Cada etapa del pipeline se puede encender y apagar** con un flag de configuración. Sin esto no hay estudio de ablación, y la ablación es la lámina central de la defensa.
- **Una sola implementación del pipeline,** en TypeScript. El benchmark offline ejecuta ese mismo código desde Node. Python solo hace estadística y gráficos; nunca reimplementa el pipeline.
- **Ante una medición poco confiable, la app lo dice.** Un número falso es peor que ningún número.
- **Alcance cerrado:** 4 movimientos. No se agregan otros sin acuerdo del equipo.

## 4. Movimientos y definiciones de ángulos

Convención: 0° es la extensión completa o la posición neutra, y los ángulos crecen con el movimiento.

| Movimiento | Vista de cámara | Definición |
| --- | --- | --- |
| Flexión de rodilla | Perfil (sagital) | 180° − ángulo(cadera, rodilla, tobillo) |
| Flexión de codo | Perfil (sagital) | 180° − ángulo(hombro, codo, muñeca) |
| Flexión de hombro | Perfil (sagital) | Ángulo entre el húmero (hombro → codo) y el eje del tronco, en el plano sagital |
| Abducción de hombro | Frente (frontal) | Ángulo entre el húmero (hombro → codo) y el eje del tronco, en el plano frontal |

Eje del tronco: del punto medio de las caderas al punto medio de los hombros.
Se mide el lado más cercano a la cámara. El lado ocluido tiene el doble de dispersión del error según la literatura; si el usuario elige ese lado, el intervalo lo refleja.

## 5. El pipeline y sus diferenciadores

Orden de las etapas. Cada una tiene un flag en `pipeline/config.ts`:

1. **Pose** (`pose/`): MediaPipe Pose Landmarker. Entrega landmarks de imagen (2D normalizados) y de mundo (3D en metros).
2. **Filtro 1€** (`filters/`, flag `oneEuro`): suaviza cada coordenada de cada landmark con el paquete `1eurofilter`. Los parámetros (`minCutoff`, `beta`) van en `constants.ts`, con un comentario sobre cómo se ajustaron.
3. **Ángulo base** (`goniometry/`): calcula el ángulo de cada movimiento en 2D y en 3D. Son funciones puras. Es el módulo de referencia del proyecto.
4. **Corrección por longitud de huesos** (`correction/`, flag `boneLength`):
   - Una pose de calibración al inicio de la sesión registra la longitud de cada segmento.
   - Si un segmento aparece más corto, está saliendo del plano de la cámara (escorzo). Con la razón entre la longitud observada y la calibrada se estima el ángulo fuera del plano, y con el signo de la coordenada z de MediaPipe se resuelve la dirección.
   - Se reconstruye el vector del segmento y se recalcula el ángulo.
   - Antecedente: Leuthold et al., 2025, "Physics Informed Human Posture Estimation" (arXiv 2512.06783). Nuestra versión es simplificada y se valida con nuestros propios datos.
5. **Compensación de tronco** (`compensation/`, flag `trunk`; solo para los movimientos de hombro):
   - Calcula la inclinación del tronco respecto de la vertical.
   - Reporta dos valores: el ROM aparente (húmero contra la vertical) y el ROM real (húmero contra el eje del tronco), más la inclinación del tronco.
   - Motivo: el goniómetro clínico sobrestima el rango del hombro en parte por movimientos del tronco. La cámara sí ve el tronco.
6. **Intervalo conformal** (`uncertainty/`, flag `conformal`):
   - Aplica una tabla de cuantiles calibrada para dar `ROM ± semiancho` con cobertura nominal del 90 %.
   - Usa conformal por grupos (Mondrian): un cuantil por movimiento y por grupo de dificultad. El grupo lo calcula `quality/` según la orientación, la razón de escorzo y la visibilidad.
   - La tabla la genera `analysis/conformal/` a partir de los residuos contra el goniómetro, y se exporta a `frontend/public/calibration/conformal.json` con versión y fecha.
   - Límite que hay que declarar siempre: la garantía es marginal, sobre el conjunto de mediciones, no para cada persona.
   - Si no hay tabla calibrada, la app muestra el ángulo sin intervalo y lo dice. Nunca inventa un intervalo.
7. **Guía de colocación** (`quality/`): antes de medir, indica cómo girarse hasta que el movimiento quede en el plano de la cámara. También calcula el grupo de dificultad que usa la etapa 6.

Cada medición guarda: ROM 2D, ROM 3D, ROM corregido, ROM aparente y real (en hombro), inclinación del tronco, semiancho del intervalo, grupo de dificultad, los flags activos, y el modelo con su versión.

## 6. Benchmark y ablación

- `frontend/scripts/run-benchmark.ts` lee los landmarks crudos guardados y ejecuta el pipeline con todas las combinaciones de flags. Exporta un CSV a `analysis/data/`.
- `analysis/ablation/` produce la tabla: error medio contra la referencia por configuración, más la cobertura real del intervalo en datos que no se usaron para calibrar.
- `analysis/validation/` produce el error absoluto medio, el análisis de Bland-Altman y los gráficos por movimiento.
- Todo se reproduce con un solo comando documentado en el README.

### Gemelo digital (opcional, `synthetic/`)

- Son scripts de Blender que renderizan un humano con ángulos articulares exactos y la cámara girada a 0°, 15°, 30° y 45°.
- Se usa un humano con piel y ropa, no un modelo anatómico. Las licencias de los assets se registran en `synthetic/LICENSES.md`.
- Las imágenes se procesan con la misma versión del modelo, en una página de benchmark solo de desarrollo dentro del frontend.
- Todo resultado sintético se etiqueta como sintético. No reemplaza la validación con personas reales.

## 7. Stack cerrado

| Parte | Tecnología |
| --- | --- |
| Frontend | React + TypeScript (`strict`) + Vite |
| Visión | `@mediapipe/tasks-vision` (Pose Landmarker) |
| Filtro | `1eurofilter` |
| Gráficos | Recharts |
| Backend | Python 3.12 + FastAPI + Pydantic |
| Base de datos | SQLite + SQLModel |
| Análisis | Python + numpy + pandas + scipy + matplotlib |
| Pruebas | Vitest (frontend y pipeline), pytest (backend y análisis) |
| Formato y lint | Prettier + ESLint (frontend), Ruff (Python) |
| Automatización (opcional) | Playwright, solo para la página de benchmark sintético |
| Ejecución | Docker Compose |

No se agrega ninguna dependencia que no esté en esta tabla. Si hace falta una, el asistente la propone y se detiene; no la instala.

## 8. Estructura de carpetas

```text
frontend/
  public/models/        modelo .task y WASM de MediaPipe (versión fija)
  public/calibration/   conformal.json generado por analysis/
  scripts/              run-benchmark.ts
  src/
    capture/            acceso a la cámara
    pose/               envoltorio de MediaPipe; único lugar que importa @mediapipe
    filters/            filtro 1€
    goniometry/         ángulos 2D y 3D; funciones puras (MÓDULO DE REFERENCIA)
    correction/         corrección por longitud de huesos
    compensation/       compensación de tronco
    uncertainty/        aplicación del intervalo conformal
    quality/            guía de colocación y grupo de dificultad
    pipeline/           orquesta las etapas; config.ts con los flags
    session/            flujo de medición (estados y transiciones)
    api/                cliente HTTP; único lugar que hace fetch
    ui/                 componentes visuales
    types.ts            contratos compartidos del frontend
backend/app/
  api/                  rutas de FastAPI, sin lógica de negocio
  services/             lógica de negocio
  models/               tablas de SQLModel
  schemas.py            contratos de entrada y salida
backend/tests/
analysis/
  data/                 CSV exportados (sin datos personales)
  validation/           error, Bland-Altman y gráficos
  conformal/            calibración de cuantiles
  ablation/             tabla de ablación
synthetic/              opcional: scripts de Blender y renders
docs/                   decisiones.md, protocolo y resultados
```

Reglas de dependencia:

- `goniometry/`, `filters/`, `correction/`, `compensation/`, `uncertainty/` y `quality/` son lógica pura: no importan React, MediaPipe ni `api/`. Reciben landmarks o ángulos y devuelven resultados. Así corren igual en el navegador y en Node para el benchmark.
- Solo `pose/` conoce MediaPipe. El resto usa los tipos `ImageLandmark` y `WorldLandmark` de `types.ts`.
- Solo `api/` habla con el backend.
- En el backend, `api/` llama a `services/` y `services/` usa `models/`. Nunca al revés.

## 9. Contratos y unidades

- `frontend/src/types.ts` y `backend/app/schemas.py` los escriben y aprueban las personas. El asistente implementa dentro de ellos y no los cambia por su cuenta; si cree que hace falta un cambio, lo propone y se detiene.
- Ángulos en grados. Los radianes solo existen dentro de una función.
- Landmarks de imagen normalizados entre 0 y 1; landmarks de mundo en metros, como los entrega MediaPipe.
- Fechas en ISO 8601, en UTC en la base de datos.

## 10. Estilo de código

Idioma:

- Identificadores en inglés.
- Comentarios, documentación, textos de la interfaz y mensajes de commit en español.

TypeScript:

- `strict` activado. Prohibido `any`; si es inevitable, se usa `unknown` y se valida.
- Funciones puras siempre que se pueda. Nada de estado global, salvo el estado del filtro dentro de su clase.
- Componentes de React como funciones, uno por archivo.
- Nombres en `camelCase` para funciones y variables, y en `PascalCase` para tipos y componentes.
- Sin números mágicos: los umbrales van en el `constants.ts` de cada módulo, con un comentario que diga de dónde salen.

Python:

- Tipado en todas las funciones públicas.
- `snake_case` para funciones y variables; `PascalCase` para clases.
- Las rutas de FastAPI validan, llaman a un servicio y responden.

En los dos lenguajes:

- Funciones cortas que hacen una sola cosa.
- Comentarios para explicar el porqué, no el qué. En las fórmulas, un comentario con la referencia o la derivación.
- Mensajes de error en español que el usuario final entienda.
- El formato lo deciden Prettier y Ruff, no el asistente.

## 11. Pruebas

- Las funciones de `goniometry/`, `correction/` y `compensation/` se prueban con landmarks construidos a mano con geometría conocida (por ejemplo, un codo exactamente a 90°). Cada una incluye casos de borde: punto no visible, segmento de longitud cero o ángulo fuera del rango anatómico.
- `uncertainty/` se prueba con una tabla de calibración falsa y verifica que, sin tabla, no se muestra ningún intervalo.
- El pipeline tiene una prueba que confirma que cada flag apagado deja pasar el valor sin cambios.
- Toda ruta del backend tiene una prueba de respuesta correcta y otra de entrada inválida.
- Un cambio sin pruebas no se fusiona.

## 12. Cómo debe trabajar el asistente

1. Leer este archivo y el módulo de referencia (`goniometry/`) antes de escribir código, y seguir su patrón.
2. Una tarea a la vez, tocando solo los archivos que esa tarea necesita.
3. No reescribir código que funciona si la tarea no lo pide.
4. No inventar APIs. Si no está seguro de cómo funciona una función de MediaPipe o de otra librería, lo dice.
5. No afirmar que una técnica mejora la precisión sin datos. Toda mejora se presenta como hipótesis hasta que el benchmark la confirme.
6. Al terminar, resumir qué archivos cambió, qué decisiones tomó y qué debe revisar la persona, que tiene que poder explicarlo ante el jurado.
7. Ejecutar el formateador, el lint y las pruebas antes de dar la tarea por terminada.

## 13. Flujo de Git

- Ramas `feat/<tema>`, `fix/<tema>`, `test/<tema>` y `docs/<tema>`.
- Commits con el formato `tipo(módulo): descripción en español`, por ejemplo `feat(compensacion): calcula la inclinación del tronco`.
- PR de menos de 400 líneas, revisado por otro integrante.
- Las decisiones técnicas van en `docs/decisiones.md`, con fecha y motivo.
- El código se congela el 25 de noviembre de 2026.

## 14. Plantilla de prompt

```text
Tarea: <qué hay que construir, en una frase>
Módulo: <carpeta exacta>
Contrato: <archivo de tipos que debe respetar>
Patrón a seguir: <archivo existente que sirve de ejemplo>
Pruebas: <casos que deben pasar, incluido un caso de error>
No cambies: <archivos o contratos que no se tocan>
```
