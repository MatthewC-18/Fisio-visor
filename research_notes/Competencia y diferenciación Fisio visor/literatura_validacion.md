# Literatura de validación de estimación de pose sin marcadores (MediaPipe/BlazePose, OpenPose, MoveNet y otros) para medir el rango de movimiento articular

Notas de investigación (octubre de 2026). Alcance: qué se sabe ya sobre medir ROM de rodilla, codo y hombro (flexión y abducción) con cámara y sin marcadores, comparado con goniómetro o captura de movimiento (mocap), y qué vacíos quedan. Las cifras vienen de las fuentes enlazadas; lo que no pude verificar va en "Vacíos".

## 1. Revisiones sistemáticas y metaanálisis (2021–2026): errores agrupados, concordancia, por articulación y por método

### Takeaway
No encontré ningún metaanálisis que agrupe errores de estimación de pose monocular (MediaPipe/OpenPose/MoveNet) contra goniómetro para ROM clínico de rodilla, codo y hombro. Las revisiones que existen cubren la marcha o la carrera (error sagital agrupado de unos 4–6°), sensores RGB‑D para el hombro (sin MAE agrupado) o aplicaciones clínicas en general. Todas concluyen que el sin marcadores **aún no es intercambiable** con el mocap y que faltan protocolos estandarizados y poblaciones clínicas.

### Cited Findings
- **Metaanálisis de carrera (Gao et al., 2026, Frontiers in Bioengineering and Biotechnology).** Incluye 8 estudios (2021–2026, n = 1–30 por estudio; OpenPose, Theia3D, OpenCap/HRNet, Pose2Sim). El RMSE sagital agrupado fue de 3,84° en cadera (IC95 % 2,53–5,15), **4,30° en rodilla (IC95 % 2,55–6,05; intervalo de predicción 0,62–8,51°)** y 3,93° en tobillo, con I² de alrededor del 56–60 %. La rodilla dio 6,22° sobre suelo y 3,67° en cinta. Ningún estudio incluido reportó SD, SE ni IC del RMSE. Los autores concluyen que no es "interchangeable with marker-based systems". No incluye MediaPipe ni MoveNet. — [Gao et al. 2026](https://www.frontiersin.org/journals/bioengineering-and-biotechnology/articles/10.3389/fbioe.2026.1915559/full)
- **Revisión de alcance PRISMA‑ScR (Delaplace et al., arXiv, septiembre de 2026).** Cubre 117 estudios (2015–2026), la mayoría de adultos sanos caminando en laboratorio. La concordancia sagital de miembro inferior se centra en unos **5–6°**, lo que "generalmente no alcanza la aceptabilidad clínica". La mayoría de los pipelines reporta ángulos crudos sin refinamiento biomecánico. Las poblaciones patológicas y mayores y la cinemática fuera del plano casi no están validadas. — [Delaplace et al. 2026, arXiv 2609.18667](https://arxiv.org/abs/2609.18667)
- **Revisión sistemática de ROM de hombro con una sola cámara RGB‑D (Lee U. et al., 2025, Frontiers).** Incluye 14 estudios (Kinect V2, Azure Kinect, RealSense; ninguno con MediaPipe) y no reporta MAE ni RMSE. Ejemplos de límites de acuerdo (LoA):
  - Kinect V2 contra Vicon: flexión de −8,4 a 7,3° y abducción de −7,1 a 7,8° (Zulkarnain 2017).
  - Azure Kinect contra Qualisys: flexión con ICC 0,68–0,74 y LoA de −48,8 a 38,3°.
  - RealSense contra goniómetro: flexión de −17,6 a 15,3° y abducción de −14,6 a 13,9°.

  La flexión y la abducción salieron mejor que las rotaciones. La calidad metodológica (COSMIN) fue de "inadecuada" a "adecuada" en fiabilidad, con muestras de 10–30 personas. La altura de la cámara variaba entre 0,8 y 1,5 m y la distancia entre 1,5 y 3 m, y los autores piden protocolos estandarizados. — [Lee U. et al. 2025](https://pmc.ncbi.nlm.nih.gov/articles/PMC12141239/)
- **Revisión de aplicaciones clínicas del mocap sin marcadores en rehabilitación (Lam, Tang y Fong, 2023, J NeuroEng Rehabil).** Incluye 65 estudios con pacientes sintomáticos. Concluye que la aplicación clínica está "en etapas preliminares" y que el beneficio para evaluar pacientes no es concluyente. — [Lam et al. 2023](https://pmc.ncbi.nlm.nih.gov/articles/PMC10155325/)
- **Revisión sistemática de fiabilidad del ROM de miembro inferior (2025, J Bodywork Mov Ther).** Incluye 12 estudios en jóvenes sanos. Rangos de ICC: goniómetro 0,18–0,99, fotogrametría 0,78–1,00 y apps de smartphone 0,33–0,98. — [JBMT 2025](https://www.bodyworkmovementtherapies.com/article/S1360-8592(25)00011-7/abstract)
- **Encuesta técnica.** Avogaro et al. (2023, arXiv 2308.00519) señalan que la mayoría de las aplicaciones biomédicas usan OpenPose o DeepLabCut, y que las comparaciones amplias entre métodos son escasas (citan a Washabaugh 2022 y Kanko 2021). — [Avogaro et al. 2023](https://arxiv.org/pdf/2308.00519)
- **Referencia clásica de 2D en marcha (OpenPose; anterior al periodo, 2021).** Stenum et al. reportan un MAE sagital de unos 4,0° en cadera, 5,6° en rodilla y 7,4° en tobillo frente a mocap. — [Stenum et al. 2021, PLoS Comput Biol](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC8099131/)
- **Una cámara contra mocap multicámara (2025–2026, PubMed 42238785).** RMSE de 2,10–10,98° en ángulos sagitales de cadera, rodilla y tronco. — [PubMed 42238785](https://pubmed.ncbi.nlm.nih.gov/42238785/)

### Inferences
- Para tareas sagitales en el plano de la cámara y en laboratorio, el error típico de referencia de la literatura es de **≈4–6° (RMSE/MAE)**. Para el ROM de miembro superior con una cámara, los errores reportados son mayores y más heterogéneos (ver la pregunta 2).
- El campo carece de un metaanálisis de ROM clínico con pose monocular. Si el equipo hace una síntesis propia, sería un aporte, pero la tesis del proyecto está en otro lado.
- Ninguna revisión reporta incertidumbre por medición. La revisión de carrera ni siquiera pudo agrupar la incertidumbre del RMSE porque los estudios no la reportaban.

### Gaps
- No encontré la revisión y metaanálisis de 2024 sobre "dispositivos digitales vs goniometría para ROM de hombro" que se cita en otros trabajos. No pude recuperar sus cifras.
- Washabaugh et al. 2022 (Gait & Posture 97:188–195; OpenPose, MediaPipe y otros contra mocap en marcha) es la comparación entre métodos más citada. No pude acceder a sus errores por método.
- No hallé ninguna revisión sistemática específica de MediaPipe para ROM.

## 2. Estudios de validación de MediaPipe (y afines) para rodilla, codo, flexión y abducción de hombro

### Takeaway
MediaPipe ya se validó contra mocap y goniómetro en varios estudios pequeños (n = 6–40, casi siempre sanos y jóvenes). Patrón consistente:
- **Repetibilidad alta** (ICC test‑retest ≥0,9 en la mayoría de movimientos).
- **Exactitud moderada**, con errores de unos 7–15° en el pico y **concordancia muy baja con la referencia en flexión de hombro y flexión de codo**, porque MediaPipe "se aplana" al final del rango.
- La abducción de hombro vista de frente es el movimiento que mejor sale.

Que sea preciso pero sesgado es justo lo que la corrección y la calibración del proyecto buscan atacar.

### Cited Findings

#### Wang, Smith y Zhu (arXiv 2310.07322; aceptado en PLOS ONE): webcam y BlazePose 3D contra OptiTrack
- **Montaje:** 25 adultos sanos. Webcam Logitech C922 a **≈4 m**, a la altura del pecho, a unos **15 FPS efectivos**. Se usaron coordenadas 3D de mundo de BlazePose y se descartaron los puntos con visibilidad < 0,5 (solo 4 ensayos, el 0,13 %). Sin suavizado. El ángulo se calcula entre el vector del segmento en el instante t y el vector inicial, y el ROM es el máximo. — [Wang et al. 2023](https://arxiv.org/pdf/2310.07322)
- **Test‑retest de BlazePose (ICC; SEM; MDC):**

  | Movimiento | ICC | SEM | MDC |
  | --- | --- | --- | --- |
  | Abducción de hombro | 0,97 | 2,41° | 6,68° |
  | Flexión de hombro | 0,94 | 1,66° | 4,61° |
  | Flexión de codo | 0,79 | 3,76° | 10,4° |

  En general, el SEM es menor de 5° y el MDC ronda los 10°. — [Wang et al. 2023](https://arxiv.org/pdf/2310.07322)
- **Concordancia BlazePose contra OptiTrack (ICC; SEM; MDC; recta de regresión):**

  | Movimiento | ICC (IC95 %) | SEM | MDC | Regresión | r² |
  | --- | --- | --- | --- | --- | --- |
  | Abducción de hombro | 0,68 (0,56–0,77) | 12,43° | 34,44° | y = 0,9x + 40,66 | 0,75 |
  | Flexión de hombro | **0,18** (−0,14 a 0,40) | 9,73° | 26,97° | **y = 0,1x + 117,25** | **0,03** |
  | Flexión de codo | 0,53 (0,35–0,66) | 11,69° | 32,40° | y = 0,29x + 65,86 | 0,29 |

  En flexión de hombro, BlazePose da casi el mismo valor sin importar el ROM real. — [Wang et al. 2023](https://arxiv.org/pdf/2310.07322)
- **Explicación de los autores:** hay "reduced sensitivity to joint locations at the apex of the movement". En un ejemplo de flexión de codo, la diferencia entre dos muestras fue de 33° en OptiTrack y de solo 14° en BlazePose, y la curva de BlazePose queda plana en el ápice. Lo atribuyen al traje negro de mocap, al solapamiento antebrazo‑brazo y al entorno. Rodilla no se midió; solo cadera. — [Wang et al. 2023](https://arxiv.org/pdf/2310.07322)
- **Inconsistencia interna:** la Tabla 1 indica orientación "Anterior Coronal" para flexión y extensión de hombro, pero el texto dice que para esos movimientos el participante se colocó de perfil. — [Wang et al. 2023](https://arxiv.org/pdf/2310.07322)

#### Clemente et al. (Sensors 2024, 24(1):206; DOI 10.3390/s24010206): MediaPipe Pose 3D contra Qualisys
- **Montaje:**
  - 8 sanos de 19–21 años, 63 adquisiciones, solo el lado derecho.
  - Cámara Nikon a 1280×720 y 30 FPS. Para los ejercicios frontales, la cámara iba paralela al plano frontal. Para los sagitales iba **a 35° del plano frontal**, no en perfil puro.
  - Se usaron landmarks 3D y los segmentos se proyectaron sobre planos anatómicos definidos con el torso.

  — [Clemente et al. 2024](https://pmc.ncbi.nlm.nih.gov/articles/PMC10781343/)
- **Errores en el pico (MAE, MAPE, r):**

  | Ejercicio | MAE | MAPE | r |
  | --- | --- | --- | --- |
  | **Flexión de hombro** | **28,8°** | 28,7 % | 0,894 |
  | Abducción de hombro | 13,0° | 10,2 % | 0,939 |
  | Flexión de codo | 11,7° | 9,6 % | 0,903 |
  | Flexión/extensión de rodilla sentado | 4,9° | 6,6 % | 0,765 |
  | Sentadilla | 7,6° | — | — |

  Sobre todos los frames, el MAE fue de 15,6° en flexión de hombro, 7,7° en abducción y 10,6° en codo. El R² de amplitud fue de 0,82 en flexión de hombro y 0,99 en abducción. — [Clemente et al. 2024](https://pmc.ncbi.nlm.nih.gov/articles/PMC10781343/)
- **Causas y disponibilidad:** los autores atribuyen los fallos a la ambigüedad de profundidad (sobre todo en vistas laterales), la autooclusión, las poses poco representadas en el entrenamiento y la propagación del error del 2D al 3D. Las predicciones salen "desplazadas o escaladas", y proponen corregirlas con regresión lineal o cúbica. **Código y datos abiertos:** [GitHub](https://github.com/carolinaclemente00/3D-HPE-MediaPipe-Pose/) y [Zenodo 10408307](https://zenodo.org/records/10408307). — [Clemente et al. 2024](https://pmc.ncbi.nlm.nih.gov/articles/PMC10781343/)

#### Lafayette et al. (Sensors 2022/2023, 23(1):3): MediaPipe contra Kinect v2, Astra y RealSense, con Qualisys de referencia
- **Montaje:** 6 jóvenes sanos (la Tabla 3 lista 5). Sensores a 1,20 m. Vistas a 0° (frontal) y 30° (inclinada).
- **Error absoluto (AE) de MediaPipe:** 8,57 ± 3,06° en total, 9,98° en miembro superior y 7,16° en el inferior; fue el mejor de los cuatro sensores. El RMS del AE en miembro superior fue de 16,45 ± 4,93°.
- **Mediana del AE por movimiento:**

  | Movimiento | Frontal | Inclinada a 30° |
  | --- | --- | --- |
  | Flexión de rodilla | 6,74° | 8,56° |
  | Flexión de codo | 13,56° | 15,92° |
  | Abducción de hombro | 8,17° | 7,97° |
  | Flexión de hombro | 7,47° | 6,81° |

  La r fue de 0,95–0,97 en el hombro.
- **Comparación con el goniómetro:** los autores la sitúan "dentro del rango de los goniómetros de brazo corto y largo". El artículo tiene inconsistencias internas: tablas duplicadas y cifras de la discusión que no coinciden con la Tabla 4.

— [Lafayette et al. 2022](https://pmc.ncbi.nlm.nih.gov/articles/PMC9824231/)

#### Otros estudios de MediaPipe y webcam
- **Iturrieta et al. (2026, SAGE):** MediaPipe contra goniómetro universal, análisis de Bland‑Altman. 40 voluntarios y 360 mediciones de abducción por brazo. Sesgo ≈0°. LoA de **±7,19° en el brazo izquierdo y ±6,39° en el derecho**. Solo vi el resumen. — [Iturrieta et al. 2026](https://journals.sagepub.com/doi/10.1177/10554181251399001)
- **Kusunose et al. (Sensors 2023, 23(14):6445):**
  - Abducción de hombro con smartphone a 3 m y cámara a −30°, −15°, 0°, 15°, 30° y 45°. 10 sanos y goniómetro como verdad; abducción de 10° a 160° en pasos de 10°.
  - Los ángulos 2D y 3D crudos de MediaPipe "no son equivalentes" al goniómetro. El error crecía con el ángulo de abducción y con la posición de la cámara, pero no lo cuantifican.
  - Con rasgos de MediaPipe y LightGBM llegan a R² ≈ 0,99 y MAE de 0,713° (modelo con posición de cámara). Se entrenó y evaluó con solo 10 sujetos, así que hay riesgo de sobreajuste, y las cifras del resumen y de los resultados no coinciden.

  — [Kusunose et al. 2023](https://pmc.ncbi.nlm.nih.gov/articles/PMC10416158/)
- **Sabo et al. (IEEE JTEHM 2023/2024):** 97 adultos con sospecha de SED o trastorno del espectro de hipermovilidad. Compara AlphaPose, Detectron, MediaPipe‑Pose, MoveNet‑Thunder y OpenPose contra goniómetro digital, con un smartphone a 30 Hz.
  - Mejor ρ de Spearman: codo .722 (Detectron), rodilla .608 (MoveNet‑Thunder) y hombro .632 (MoveNet‑Thunder).
  - No reporta MAE ni Bland‑Altman. Ninguna librería ganó en todas las articulaciones, y los autores lo presentan como cribado, no como medición precisa.

  — [Sabo et al. 2023](https://pmc.ncbi.nlm.nih.gov/articles/PMC10712662/)
- **Dill et al. (Sensors 2024, 24:7772):** sentadillas, 9 sujetos, Qualisys y dos smartphones (frontal y lateral).
  - El 3D monocular de MediaPipe tuvo una mediana de RMSE de **56,3 mm**, frente a **30,1 mm** con fusión estéreo.
  - Ángulo de rodilla desde la cámara lateral: RMSE de **10,7° en la rodilla cercana** y **25,1° en la lejana**, que estaba ocluida.
  - La vista frontal fue peor por la falta de profundidad. Usaron el modo landmark, no world landmarks.

  — [Dill et al. 2024](https://pmc.ncbi.nlm.nih.gov/articles/PMC11644880/); trabajo previo monocular: Dill et al. 2023, Curr Dir Biomed Eng 9(1):563–566, DOI 10.1515/cdbme-2023-1141 ([ResearchGate](https://www.researchgate.net/publication/374081734_Accuracy_Evaluation_of_3D_Pose_Estimation_with_MediaPipe_Pose_for_Physical_Exercises)).
- **"A Deep Dive into MediaPipe Pose for Postural Assessment":** los modelos 2D tienen un error sistemático "uniforme y consistente" en todos los segmentos. Sirven para hombro y cadera de frente, pero no para la rodilla de frente; para la rodilla se prefiere la vista lateral. — [ResearchGate 398607117](https://www.researchgate.net/publication/398607117_A_Deep_Dive_into_MediaPipe_Pose_for_Postural_Assessment_A_Comparative_Investigation)
- **Estudio de MediaPipe en Measurement (2023, S0263224123003901):** concluye que MediaPipe es fiable y válido para telerrehabilitación en los movimientos estudiados, y en su momento afirmaba ser de los primeros en el tema. No obtuve las cifras. — [Measurement 2023](https://www.sciencedirect.com/science/article/abs/pii/S0263224123003901)

#### Estudios afines que no usan MediaPipe pero sirven de referencia
- **Codo, Rode et al. (PLOS ONE, julio de 2026):** 46 **pacientes** (36 de hombro y 10 de codo). Webcam Logitech C920 a 3 m, en vista sagital, contra Vicon.
  - Para flexión de codo, HSMR (malla 3D) dio un CCC de 0,92 y un MDC de 6,74°.
  - RTMW (2D) **sobreestimó la flexión hasta unos 13° en los ángulos mayores**, porque la rotación interna del brazo saca el antebrazo del plano de la imagen.
  - HSMR pasa de sobreestimar a subestimar hacia los 113°.
  - Para extensión de codo ningún método igualó a la estimación visual experta (CCC 0,86, MDC 5,61°).
  - Código abierto: [github.com/darode1/elbow_rom_study](https://github.com/darode1/elbow_rom_study).

  — [Rode et al. 2026](https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0353801)
- **Cadera y rodilla con la webcam de un portátil, Hellstén et al. (Healthc Technol Lett 2025):** modelo DensePose, 30 sanos, webcam 720p a 2,05 m. La flexión de rodilla dio un ICC test‑retest de 0,74, SEM de 1,0° y MDC de 2,7°. Contra la referencia, r = 0,90 y sesgo de −2,1°; la app subestima. La referencia era un marcado manual en fotogramas, no un goniómetro ni mocap, y la luz afectó a la detección. — [Hellstén et al. 2025](https://pmc.ncbi.nlm.nih.gov/articles/PMC11783685/)
- **Hombro con RGB‑D, iBalance (Lee S. et al., Sensors 2025):** 30 sanos y 10 pacientes con capsulitis adhesiva, contra goniómetro.
  - Flexión: ICC 0,85 y LoA de −5,17 a 18,01°.
  - Abducción: ICC 0,95 y LoA de −5,85 a 16,02°.
  - El sistema da sistemáticamente más que el goniómetro; el sesgo implícito es de unos +5–6°, calculado por mí a partir de los LoA.
  - MDC de 10–16°.

  — [Lee S. et al. 2025](https://pmc.ncbi.nlm.nih.gov/articles/PMC11991502/)
- **Hamilton et al. (J Bodyw Mov Ther 2024, 40:315–319):** HRNet contra MediaPipe, con mocap de referencia, en rodilla y codo; 22 sanos. Solo obtuve el resumen. — [ORCA Cardiff](https://orca.cardiff.ac.uk/id/eprint/168259/)

### Inferences
- **Lo que ya no es novedoso:**
  - Calcular ROM 2D o 3D con MediaPipe y compararlo con goniómetro o mocap.
  - Reportar ICC test‑retest alto.
  - Corregir con regresión o ML el sesgo de MediaPipe (Kusunose; Clemente propone regresiones lineales o cúbicas).
- **Lo que más falla en la literatura, en orden aproximado:**
  1. Flexión de hombro, con ICC 0,18 en Wang y MAE de 28,8° en Clemente. Lafayette, en cambio, la encontró bien (6,8–7,5°), así que la evidencia es contradictoria según la vista y la definición del ángulo.
  2. Flexión de codo, con ICC 0,53 en Wang, mediana del AE de 13,6–15,9° en Lafayette y MAE de 11,7° en Clemente.
  3. El final del rango ("aplanamiento" en el ápice).

  La abducción de frente sale relativamente bien: LoA de ±7° (Iturrieta), 8° (Lafayette) y 13° (Clemente). Rodilla en vista sagital: unos 5–9°.
- La combinación de repetibilidad alta y concordancia baja (Wang) indica un **sesgo sistemático y no ruido**. Eso justifica una etapa de corrección física (longitud de huesos) y una calibración por grupos (conformal), siempre que se valide con datos propios.
- Casi todos los estudios usan landmarks 3D de MediaPipe sin compararlos sistemáticamente con los 2D de imagen bajo la misma referencia. La comparación 2D contra 3D con ablación sería un aporte.

### Gaps
- No encontré ningún estudio que compare de frente los ángulos 2D (landmarks de imagen) y 3D (world landmarks) de MediaPipe contra la misma referencia en estos 4 movimientos. Kusunose usa los dos como rasgos de ML, pero no reporta el error crudo de cada uno.
- No hallé cifras de Hamilton et al. 2024 (HRNet contra MediaPipe en rodilla y codo), del estudio de Measurement 2023 ni del texto completo de Iturrieta 2026; todos están detrás de muros de pago o devolvieron error 403.
- Un resultado de 2026 sobre sentadilla reporta subestimación de la flexión de rodilla por MediaPipe de "−13,9 ± 15,1°" y dependencia de la geometría de adquisición. Apareció en un resumen de búsqueda y no pude identificar ni verificar la fuente primaria.
- Faltan estudios de MediaPipe con pacientes reales en ROM de hombro y codo; Rode 2026 usa pacientes, pero no MediaPipe.

## 3. Fuentes de error reportadas y su cuantificación

### Takeaway
Las fuentes de error están bien documentadas a nivel cualitativo: la perspectiva o rotación fuera del plano (escorzo), la ambigüedad de profundidad (z), la oclusión del miembro lejano, la ropa con poco contraste, la iluminación y el final del rango. Hay **pocas cuantificaciones del error en función del ángulo de cámara, y ninguna específica de MediaPipe para ROM**; la mejor la aporta OpenPose (Baldinger 2025). La z de MediaPipe es relativa y ruidosa: en monocular, el RMSE de las articulaciones casi duplica al estéreo.

### Cited Findings
- **Ángulo de cámara, OpenPose (Baldinger, Reimer y Senner, Sensors 2025, 25(3):799).**
  - Montaje: 16 sanos haciendo zancadas, 4 iPads a 45° alrededor del sujeto y Vicon de referencia.
  - RMSE por articulación según la vista: rodilla 15,5–29,4°, cadera 15,2–25,3°, codo 29,4–37,1° y hombro 23,6–36,5°.
  - Sesgo en hombro de −16,3 a −26,1°.
  - Desviación absoluta media en el pico según la cámara: entre 14,1° (atrás‑izquierda) y 23,8° (frente‑izquierda).
  - En el hombro, el ICC fue de 0,28–0,72. **El hombro no se midió de forma fiable desde ninguna vista**, y el codo dio un ICC de 0,75–0,84.
  - Causa principal: no son errores de detección de puntos, sino la **perspectiva**, es decir, la proyección 2D de un movimiento 3D. Le siguen la oclusión y la colocación de los puntos clave (centro de cadera, cuello).
  - Recomiendan validar cada montaje de cámara para cada movimiento.

  — [Baldinger et al. 2025](https://pmc.ncbi.nlm.nih.gov/articles/PMC11819822/)
- **Rotación fuera del plano en el codo:** en vista sagital, la rotación interna del húmero saca el antebrazo del plano y produce una sobreestimación de la flexión de hasta unos 13° en los ángulos altos con un modelo 2D (RTMW). Los autores sugieren reorientar la cámara perpendicular al plano de movimiento o usar varias cámaras. — [Rode et al. 2026](https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0353801)
- **Vista inclinada contra frontal (MediaPipe):** al pasar de 0° a 30°, la mediana del AE pasó de 6,74° a 8,56° en flexión de rodilla y de 13,56° a 15,92° en flexión de codo. En el hombro casi no cambió: abducción 8,17° → 7,97° y flexión 7,47° → 6,81°. Los autores reconocen que probar movimientos de un solo plano de frente pudo favorecer a MediaPipe. — [Lafayette et al. 2022](https://pmc.ncbi.nlm.nih.gov/articles/PMC9824231/)
- **Profundidad (z) de MediaPipe:**
  - La z se calcula respecto de un punto central del cuerpo y no es una profundidad medida. — [Lafayette et al. 2022](https://pmc.ncbi.nlm.nih.gov/articles/PMC9824231/)
  - La z monocular es "ruidosa y menos fiable" porque el problema está mal planteado: MediaPipe ajusta la proyección 2D a un modelo de estatura estándar. El RMSE monocular fue de 56,3 mm frente a 30,1 mm en estéreo, y la vista frontal fue peor que la lateral. — [Dill et al. 2024](https://pmc.ncbi.nlm.nih.gov/articles/PMC11644880/)
  - La flexión de hombro, el peor caso de Clemente (MAE de 28,8°), se atribuye a la profundidad más difícil de estimar en vista lateral. — [Clemente et al. 2024](https://pmc.ncbi.nlm.nih.gov/articles/PMC10781343/)
  - **REHAB24-6** (Černek, Sedmidubský y Budíková; SISAP 2025, DOI 10.1007/978-3-031-75823-2_2; Information Systems 2025, DOI 10.1016/j.is.2025.102579) tiene 65 grabaciones de 6 ejercicios de fisioterapia, 10 sujetos, 2 cámaras RGB y mocap de 16 cámaras, con ejecuciones correctas e incorrectas. Concluye que la limitación clave de los métodos actuales de 2D y 3D es **"particularly in depth estimation"**, y que el ajuste fino sobre el dataset mejora la calidad. — [Ficha SISAP](https://www.ics.muni.cz/en/research/publications/2425837); [ficha Information Systems](https://www.ics.muni.cz/en/research/publications/2505537)
- **Miembro lejano u ocluido:** en la rodilla, el RMSE fue de 10,7° en el lado cercano y de 25,1° en el lejano, con la misma cámara lateral. — [Dill et al. 2024](https://pmc.ncbi.nlm.nih.gov/articles/PMC11644880/). En otro estudio con OpenPose y una sola cámara, el error fue de 2,3–3,1° en el lado de la cámara y de 3,1–4,1° en el contrario. — [PMC10747245](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC10747245/)
- **Ropa, contraste y oclusión entre segmentos:** la flexión de codo tuvo la fiabilidad más baja (cota inferior del ICC de 0,67), y los autores lo atribuyen al traje de mocap negro, sin contraste, y al solapamiento antebrazo‑brazo. Sugieren ropa clara y ajustada y otra orientación respecto de la cámara. — [Wang et al. 2023](https://arxiv.org/pdf/2310.07322)
- **Iluminación:** afectó a la detección de puntos con la webcam de un portátil. — [Hellstén et al. 2025](https://pmc.ncbi.nlm.nih.gov/articles/PMC11783685/)
- **Final del rango:**
  - BlazePose se "aplana" en el ápice. En el ejemplo de flexión de codo, el rango entre muestras fue de 14° en BlazePose frente a 33° en mocap, y en flexión de hombro la pendiente de la regresión fue de 0,1. — [Wang et al. 2023](https://arxiv.org/pdf/2310.07322)
  - En otro estudio, los errores fueron "sustanciales, especialmente en la parte alta del ROM". — [Baldinger et al. 2025](https://pmc.ncbi.nlm.nih.gov/articles/PMC11819822/)
  - HSMR cruza de sobreestimar a subestimar hacia los 113° de flexión de codo. — [Rode et al. 2026](https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0353801)
  - El error de MediaPipe en coordenadas de hombro crecía con el ángulo de abducción. — [Kusunose et al. 2023](https://pmc.ncbi.nlm.nih.gov/articles/PMC10416158/)
- **Distancia y resolución:** la literatura usa montajes muy dispares, con webcam a unos 4 m a 15 FPS ([Wang](https://arxiv.org/pdf/2310.07322)), a 3 m ([Rode](https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0353801); [Kusunose](https://pmc.ncbi.nlm.nih.gov/articles/PMC10416158/)) o a 2,05 m con la webcam de un portátil ([Hellstén](https://pmc.ncbi.nlm.nih.gov/articles/PMC11783685/)). En RGB‑D, la distancia varía entre 1,5 y 3 m y la altura entre 0,8 y 1,5 m. — [Lee U. et al. 2025](https://pmc.ncbi.nlm.nih.gov/articles/PMC12141239/)

### Inferences
- La corrección por longitud de huesos ataca justo el error de perspectiva que Baldinger identifica como dominante, y el aplanamiento al final del rango en el que coinciden Wang, Rode y Kusunose. Es una hipótesis razonable de mejora, pero no hay datos publicados que la confirmen para MediaPipe y ROM.
- El vacío más claro y medible es una **curva de error contra la rotación de la cámara (0°, 15°, 30°, 45°) para MediaPipe**, separando 2D y 3D y con y sin corrección. El gemelo digital sintético del proyecto podría generarla, siempre etiquetada como sintética.
- El efecto del miembro lejano está cuantificado (rodilla: 10,7° contra 25,1°). Respalda la regla del proyecto de medir el lado cercano y ensanchar el intervalo para el lado ocluido.

### Gaps
- No encontré ninguna curva publicada de error de MediaPipe contra ángulo de cámara para ROM: Dill 2023 la menciona para el ancho de hombros, no para ángulos, y Kusunose no la cuantifica en crudo.
- No encontré cuantificaciones del efecto de la ropa, la luz o la distancia sobre el error angular de MediaPipe; solo hay atribuciones cualitativas.
- No hallé cifras numéricas de REHAB24-6 sobre el error de profundidad de MediaPipe; los artículos completos están detrás de muros de pago.
- No encontré estudios de MediaPipe que cuantifiquen la compensación de tronco en flexión o abducción de hombro.

## 4. Fiabilidad del goniómetro (el piso de cualquier comparación)

### Takeaway
El goniómetro universal es muy repetible con un mismo evaluador (ICC intra de 0,87–0,99) y algo menos entre evaluadores en flexión y abducción de hombro (ICC inter de 0,84–0,91). Su error absoluto no es despreciable:
- SEM de unos 3–4,6° y MDC95 de unos 8–13° en flexión de hombro.
- Diferencia mínima significativa de 10–14° en rodilla según el tipo de goniómetro.
- **Contra mocap 3D, LoA de ±20–45° en hombro.**

Comparar la cámara solo contra el goniómetro pone un techo de concordancia alcanzable.

### Cited Findings
- **Hombro, clásico (Riddle, Rothstein y Lamb, Phys Ther 1987, 67(5):668–673; anterior al periodo).** Medición pasiva en 100 pacientes, en dos grupos de 50. El ICC intraevaluador fue de 0,87–0,99 en todos los movimientos. El ICC interevaluador fue de **0,84–0,90 en flexión, abducción y rotación externa**, y de 0,26–0,55 en extensión, rotación interna y abducción y aducción horizontales. Solo da estimaciones puntuales, sin SEM ni LoA. — [PubMed 3575423](https://pubmed.ncbi.nlm.nih.gov/3575423/)
- **Hombro y codo, reciente (Spigelman et al., IJSPT 2023):** 20 adultos y 4 clínicos con más de 10 años de experiencia; goniometría presencial.

  | Movimiento | ICC inter | SEM | MDC90 | MDC95 |
  | --- | --- | --- | --- | --- |
  | Flexión de hombro | 0,88 | 3,01° | 7,03° | 8,35° |
  | Flexión de codo | 0,81 | 1,70° | 3,97° | 4,71° |
  | Extensión de codo | 0,96 | — | — | 4,10° |

  Intraevaluador, presencial: en flexión de hombro, ICC de 0,70–0,86, SEM de 3,07–4,60° y MDC95 de 8,50–12,75° según el examinador; en flexión de codo, ICC de 0,61–0,79 y MDC95 de 4,57–6,25°. No midieron abducción. — [Spigelman et al. 2023](https://pmc.ncbi.nlm.nih.gov/articles/PMC10399114/)
- **Hombro, goniómetro contra análisis 3D (Karaşin et al., J Chiropr Med 2025):** 35 pacientes con ROM restringido y 30 sanos.
  - ICC del goniómetro: interobservador 0,91 en flexión y 0,86 en abducción; intraobservador 0,97 en ambas.
  - **Goniómetro contra 3D en sanos:** flexión con sesgo de −5,5° y LoA de −25,5 a 14,6°; abducción con sesgo de −2,8° y LoA de −20,9 a 15,4°.
  - En pacientes: flexión de −40,7 a 41,8° y abducción de −45,3 a 32,6°.
  - Los autores aconsejan cautela al interpretar la goniometría de hombro.

  — [Karaşin et al. 2025](https://pmc.ncbi.nlm.nih.gov/articles/PMC12804122/)
- **Rodilla (Hancock, Hepworth y Wembridge, J Exp Orthop 2018):** 3 evaluadores, 6 rodillas y 300 mediciones. Fiabilidad inter > 0,99 e intra > 0,98 en todos los métodos. **Diferencia mínima significativa:** inclinómetro digital 6°, goniómetro de brazo largo 10°, app de smartphone 12°, y goniómetro de brazo corto y estimación visual 14°. Son las cifras que citan Lafayette et al. para situar el error de MediaPipe. — [Hancock et al. 2018](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6195503/)
- **Codo, estimación visual experta contra mocap:** diferencia absoluta media de 5,4° en flexión y 5,2° en extensión, con MDC de 5,61° en extensión. El artículo también menciona diferencias absolutas medias del goniómetro de unos 7,4° en flexión y 10,5° en extensión frente a la referencia; lo leí en el resumen de búsqueda del texto y hay que verificarlo. — [Rode et al. 2026 (PMC)](https://pmc.ncbi.nlm.nih.gov/articles/PMC13395372/)
- **Error humano clínico de referencia que se cita:** 12,78 ± 7,44° (Russo et al., citado por Lafayette). — [Lafayette et al. 2022](https://pmc.ncbi.nlm.nih.gov/articles/PMC9824231/)
- **Rango de ICC del goniómetro en miembro inferior** según una revisión sistemática de 2025: de 0,18 a 0,99. — [JBMT 2025](https://www.bodyworkmovementtherapies.com/article/S1360-8592(25)00011-7/abstract)
- **Clásico:** Gajdosik y Bohannon, "Clinical Measurement of Range of Motion: Review of Goniometry Emphasizing Reliability and Validity", Phys Ther 1987, 67(12):1867–1872, DOI 10.1093/ptj/67.12.1867. Solo obtuve la ficha y citas secundarias, no sus tablas. — [Physiopedia (cita)](https://www.physio-pedia.com/index.php/Goniometer)

### Inferences
- **Piso razonable para la comparación** (inferencia combinando fuentes): con un buen evaluador, el goniómetro tiene un SEM de unos 2–4,6° y un MDC95 de unos 5–13° según el movimiento y el examinador.
- Un sistema de cámara con LoA de unos ±7° contra goniómetro (como Iturrieta en abducción) ya está en el orden de la propia variabilidad del goniómetro.
- Que el goniómetro discrepe del mocap con LoA de ±20–45° en hombro (Karaşin) implica que **el error contra goniómetro mezcla el error de la cámara y el del goniómetro**. Conviene reportar el sesgo y los LoA de Bland‑Altman, el MDC del propio goniómetro del equipo (test‑retest del evaluador) y declarar que la referencia es imperfecta.
- Para la calibración conformal, los residuos contra el goniómetro incluyen el ruido del goniómetro, así que el semiancho del intervalo tendrá un piso dado por ese ruido. Conviene decirlo explícitamente en la defensa.

### Gaps
- No pude verificar con fuente primaria las cifras de Watkins et al. (1991, rodilla), Rothstein et al. (1983, codo y rodilla), Norkin y White (manual) ni Armstrong et al. (1998, codo). No las incluyo.
- No encontré SEM ni MDC recientes del goniómetro para la **abducción** de hombro; Spigelman no la midió y Karaşin no reporta SEM.
- Brosseau et al. (1997, rodilla) solo apareció como resumen, sin ICC ni SEM.

## 5. Incertidumbre por medición, ablación de etapas, código abierto y lo que la literatura dice que falta

### Takeaway
**Ningún estudio de ROM con MediaPipe u otro modelo monocular que haya encontrado reporta un intervalo de incertidumbre por medición con garantía de cobertura, ni una ablación de etapas del pipeline.** Lo más cercano es:
- Intervalos bayesianos calibrados en marcha con varias cámaras (Cotton y colaboradores, 2026).
- Conformal aplicado a la malla corporal (CUPS, ICML 2025), no a ángulos clínicos.

El código abierto es la excepción (Clemente 2024 y Rode 2026). Las revisiones piden protocolos estandarizados, poblaciones clínicas, validación fuera del plano y fuera del laboratorio, y reporte de incertidumbre.

### Cited Findings
- **Incertidumbre calibrada en marcha (Donahue, …, Cotton; arXiv 2601.22412, 2026).** Inferencia variacional sobre la distribución posterior de ángulos con mocap multivista sin marcadores. 68 participantes de 2 instituciones, contra pasarela instrumentada y mocap. El ECE fue generalmente < 0,1 y el error cinemático corregido por sesgo tuvo una mediana de 1,5–3,8°. La incertidumbre predicha correlaciona con el error observado. Los autores argumentan que el uso clínico exige "reliable confidence intervals … for any individual". Es multicámara y de marcha, no monocular ni de ROM. — [arXiv 2601.22412](https://arxiv.org/abs/2601.22412)
- **Conformal en pose 3D (CUPS, ICML 2025).** Predicción conformal sobre estimadores de pose y forma (malla), con una puntuación de conformidad aprendida. Reconoce que los datos de pose no son plenamente intercambiables y da cotas para la brecha de cobertura. No es clínico ni de ángulos articulares. — [CUPS, PMLR v267](https://proceedings.mlr.press/v267/zhang25g.html)
- **Cobertura desigual con un umbral único:** un estudio egocéntrico de 2026 encontró que un umbral conformal fijo daba alrededor del 90 % de cobertura global, pero solo cerca del 60 % en el 25 % de frames más difíciles. Es un argumento a favor del conformal por grupos (Mondrian). Proviene de un resumen de búsqueda (papers.cool/arxiv/2605.00233) y no lo verifiqué en el texto. — [papers.cool 2605.00233](https://papers.cool/arxiv/2605.00233)
- **El metaanálisis de carrera no pudo agrupar la incertidumbre del RMSE** porque ningún estudio reportó su SD, SE o IC. — [Gao et al. 2026](https://www.frontiersin.org/journals/bioengineering-and-biotechnology/articles/10.3389/fbioe.2026.1915559/full)
- **Señal de confianza de MediaPipe:** la "visibilidad" (0–1) se usó solo como filtro con umbral de 0,5, no como incertidumbre del ángulo. — [Wang et al. 2023](https://arxiv.org/pdf/2310.07322)
- **Corrección posterior sin ablación:**
  - Kusunose corrige con LightGBM, pero solo compara regresión lineal con LightGBM; no apaga etapas. — [Kusunose et al. 2023](https://pmc.ncbi.nlm.nih.gov/articles/PMC10416158/)
  - Clemente propone regresiones lineales o cúbicas para el desplazamiento o escalado. — [Clemente et al. 2024](https://pmc.ncbi.nlm.nih.gov/articles/PMC10781343/)
  - En Dill 2024, el filtrado Butterworth de 2 Hz **no mejoró** significativamente (p = 0,997). Es lo más parecido a una ablación de una etapa de filtrado. — [Dill et al. 2024](https://pmc.ncbi.nlm.nih.gov/articles/PMC11644880/)
  - Wang no suavizó para "no introducir errores del filtrado". — [Wang et al. 2023](https://arxiv.org/pdf/2310.07322)
- **Código y datos abiertos:** Clemente 2024 ([GitHub](https://github.com/carolinaclemente00/3D-HPE-MediaPipe-Pose/) y [Zenodo](https://zenodo.org/records/10408307)), Rode 2026 ([GitHub](https://github.com/darode1/elbow_rom_study)) y REHAB24-6 como dataset público ([ficha](https://www.ics.muni.cz/en/research/publications/2425837)). Lafayette declara datos "Not applicable" ([PMC9824231](https://pmc.ncbi.nlm.nih.gov/articles/PMC9824231/)) y Hellstén no los publica por el consentimiento ([PMC11783685](https://pmc.ncbi.nlm.nih.gov/articles/PMC11783685/)).
- **Lo que las revisiones dicen que falta:**
  - Protocolos estandarizados de altura, distancia, postura, filtrado y versión del SDK. — [Lee U. et al. 2025](https://pmc.ncbi.nlm.nih.gov/articles/PMC12141239/)
  - Validación en poblaciones patológicas y mayores, y de cinemática fuera del plano. — [Delaplace et al. 2026](https://arxiv.org/abs/2609.18667)
  - Reporte consistente de definiciones de ángulos, sistemas de coordenadas y filtrado, y validación en condiciones reales. — [Gao et al. 2026](https://www.frontiersin.org/journals/bioengineering-and-biotechnology/articles/10.3389/fbioe.2026.1915559/full)
  - Demostrar el beneficio clínico. — [Lam et al. 2023](https://pmc.ncbi.nlm.nih.gov/articles/PMC10155325/)
  - Conjuntos de entrenamiento de fisioterapia y mejor estimación de profundidad. — [Clemente et al. 2024](https://pmc.ncbi.nlm.nih.gov/articles/PMC10781343/); [REHAB24-6](https://www.ics.muni.cz/en/research/publications/2505537)
  - Investigar la configuración ideal para casa. — [Wang et al. 2023](https://arxiv.org/pdf/2310.07322)
- **Correlación no es concordancia:** varios estudios solo reportan r o ρ (Sabo 2023; Clemente usa r y similitud coseno). Sabo reconoce que así no se caracteriza el sesgo. — [Sabo et al. 2023](https://pmc.ncbi.nlm.nih.gov/articles/PMC10712662/)

### Inferences
- **Diferenciadores del proyecto que no encontré publicados para ROM monocular:**
  1. Un intervalo conformal por grupos (Mondrian) con cobertura medida en datos no usados para calibrar.
  2. Una ablación etapa por etapa (filtro 1€, corrección por longitud de huesos y compensación de tronco) ejecutada con el mismo código sobre landmarks crudos guardados.
  3. La separación entre ROM aparente y ROM real del hombro por inclinación del tronco.
  4. La guía activa de orientación para reducir el escorzo.
  5. El navegador sin conexión y en casa con la webcam de un portátil.

  Todos deben presentarse como hipótesis hasta que el benchmark los confirme.
- **Lo que no es novedoso** y conviene declarar como antecedente: el ROM con MediaPipe en webcam (Wang 2023), la corrección por regresión o ML (Kusunose 2023, Clemente 2024), el uso de la visibilidad como filtro y la idea general de intervalos calibrados en pose (Cotton 2026 con varias cámaras; CUPS 2025 para mallas).
- Para que el jurado lo vea creíble, conviene:
  - Reportar Bland‑Altman (sesgo y LoA), MAE por movimiento, ICC test‑retest, SEM y MDC.
  - Reportar la cobertura empírica del intervalo por grupo, no solo la global, porque un umbral único puede infracubrir los casos difíciles.
  - Publicar el código y los landmarks crudos, sin video, porque es algo que pocos hacen.

### Gaps
- No encontré ningún estudio clínico de ROM que use predicción conformal. La búsqueda tampoco halló una ablación formal de etapas en pipelines de ROM con MediaPipe.
- No verifiqué si existen trabajos de 2025–2026 que validen MediaPipe en domicilios reales con una laptop. Wang lo propone como trabajo futuro y Hellstén usó la webcam de un portátil, pero con DensePose y en una sala estandarizada.
- La afirmación de cobertura desigual (≈60 % en el cuartil difícil) proviene de un resumen de búsqueda y debe verificarse en la fuente antes de citarla en la defensa.
