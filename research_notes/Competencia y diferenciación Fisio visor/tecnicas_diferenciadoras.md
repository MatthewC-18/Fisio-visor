# Técnicas diferenciadoras de Fisio-visor: estado del arte, novedad y presentación honesta

Notas de investigación (octubre de 2026). Cubren cuatro técnicas: corrección por escorzo con longitudes de hueso, compensación de tronco, intervalos conformales de Mondrian y filtro 1€. También cubren dos preguntas transversales: la práctica de ablación en artículos clínicos de pose y cómo presentar todo ante el jurado.
Fuentes: arXiv, PMC, repositorios y código de MediaPipe en GitHub, documentación de MAPIE y actas de conferencias. No tuve acceso directo a Google Scholar, IEEE Xplore ni ACM DL a texto completo, así que la búsqueda de "nadie lo ha hecho" no es exhaustiva.

---

## 1. Corrección por escorzo con longitudes de hueso calibradas: qué existe, qué tan nueva es la versión del equipo y qué la respalda

### Takeaway
El principio no es nuevo. Taylor (2000) mostró que, con longitudes relativas conocidas y proyección ortográfica escalada, la pose 3D queda determinada salvo una escala y una bandera binaria de dirección por segmento. Stevens et al. (2006) publicaron exactamente la fórmula `θ = arccos(L_aparente / L_real)` para corregir ángulos de codo y rodilla en video 2D, con error menor a 3°.
Leuthold et al. (2025) sí existe, con el ID verificado arXiv 2512.06783, pero su método es distinto: optimización ponderada que fusiona el 2D y el 3D de BlazePose, más un filtro de Kalman sobre razones de huesos. No usa una pose de calibración explícita ni la z normalizada.
Lo defendible como aporte del equipo es la integración: calibración por sesión, signo de z de MediaPipe para la ambigüedad de Taylor, aplicación al ROM clínico de 4 movimientos y evaluación por ablación contra goniómetro. El principio físico no es un aporte propio.

### Cited Findings

**Leuthold et al., 2025 (verificado)**
- Título exacto: "Physics Informed Human Posture Estimation Based on 3D Landmarks from Monocular RGB-Videos". Autores: Tobias Leuthold, Michele Xiloyannis e Yves Zimmermann. Enviado el 7 de diciembre de 2025 en cs.CV. El ID 2512.06783 es correcto. — [arXiv:2512.06783](https://arxiv.org/abs/2512.06783)
- Es un posprocesamiento en tiempo real que fusiona las estimaciones 2D y 3D de BlazePose mediante una optimización ponderada. Penaliza las desviaciones de la longitud ósea esperada y de modelos biomecánicos. — [arXiv:2512.06783](https://arxiv.org/abs/2512.06783)
- La función de costo suma cuatro términos:
  - J_W: parecido con los landmarks de mundo.
  - J_S: línea de visión. Los puntos 3D deben caer sobre los rayos de cámara de los landmarks 2D, ponderados por visibilidad.
  - J_B: razones de huesos individuales.
  - J_M: razones de varios huesos ligadas al hombro.

  Se resuelve con L-BFGS-B de scipy, con arranque en caliente desde el cuadro anterior. — [arXiv HTML 2512.06783](https://arxiv.org/html/2512.06783)
- No hay pose de calibración por usuario:
  - Las razones iniciales salen de videos de 11 personas en postura neutra.
  - Un filtro de Kalman las actualiza con mediciones ponderadas por confianza.
  - Se descartan las razones que se desvían más de 15 % de las iniciales.
  - Se excluyen de la actualización los miembros con más de 50° de inclinación respecto del plano de la imagen.

  — [arXiv HTML 2512.06783](https://arxiv.org/html/2512.06783)
- El artículo dice textualmente que "the normalized z-coordinate is not used in this study". La profundidad sale de la optimización, no de una regla de razón más signo de z. — [arXiv HTML 2512.06783](https://arxiv.org/html/2512.06783)
- Los segmentos del torso (ancho de hombros, tronco lateral, columna) se modelan como funciones polinómicas de la elevación humerotorácica. — [arXiv HTML 2512.06783](https://arxiv.org/html/2512.06783)
- Datos: Physio2.2M, conjunto interno de Akina disponible a pedido.
  - Referencia: Vicon con 27 cámaras a 200 Hz y 46 marcadores anatómicos.
  - 25 participantes, 7 ejercicios, 321 videos y 346 297 cuadros.

  — [arXiv HTML 2512.06783](https://arxiv.org/html/2512.06783)
- Resultados frente a BlazePose world:
  - MPJPE 3D: de 100,3 mm a 91,0 mm.
  - Error angular medio: de 12,3° (DE 6,6°) a 10,6° (DE 5,7°).
  - Varianza de longitud ósea: de ~370 mm² a ~21 mm².
  - El resumen anuncia −10,2 % en MPJPE y −16,6 % en error angular. Con los valores de la tabla salen cerca de 9,3 % y 13,8 %, y el texto no aclara contra qué línea base se calculan los porcentajes del resumen.
  - El pie de una tabla menciona un "Fast Ape dataset", lo que no coincide con el texto.

  — [arXiv:2512.06783](https://arxiv.org/abs/2512.06783); [arXiv HTML](https://arxiv.org/html/2512.06783)
- El modelo se nombra como BlazePose (Bazarevsky et al., 2020), sin versión ni variante (lite, full o heavy). — [arXiv HTML 2512.06783](https://arxiv.org/html/2512.06783)
- Limitaciones que declaran:
  - La captura de movimiento solo fija la distancia entre caderas; las demás longitudes varían hasta 2 cm.
  - BlazePose suele estimar mal la tibia y el cúbito como fuera del plano xy.
  - BlazePose subestima la inclinación del tronco.
  - La oclusión sigue siendo un reto, sobre todo en las muñecas.

  — [arXiv HTML 2512.06783](https://arxiv.org/html/2512.06783)
- No dicen que el objetivo sea el ROM clínico. Hablan de fisioterapia automatizada, salud y entrenamiento deportivo. — [arXiv:2512.06783](https://arxiv.org/abs/2512.06783)

**Taylor, 2000 (antecedente clásico)**
- Referencia: C. J. Taylor, "Reconstruction of Articulated Objects from Point Correspondences in a Single Uncalibrated Image".
  - Revista: Computer Vision and Image Understanding 80(3):349–363, diciembre de 2000, DOI 10.1006/cviu.2000.0878.
  - Versión de congreso: CVPR 2000, pp. 1677–1684.

  — [PDF CVIU](https://www.cis.upenn.edu/~cjtaylor/PUBLICATIONS/pdfs/TaylorCVIU2000.pdf); [Penn repository](https://repository.upenn.edu/entities/publication/874cccd7-9ab7-4862-9f81-cbba17121912)
- Supuestos: proyección ortográfica escalada con escala desconocida y longitudes relativas de los segmentos conocidas. — [Resumen del proyecto (Penn)](https://www.cis.upenn.edu/~cjtaylor/RESEARCH/projects/Johansson/Johansson.pdf)
- Resultado: las soluciones forman una familia de un parámetro (la escala) más una bandera binaria por segmento que indica si apunta hacia la cámara o en sentido contrario. Todas se recuperan analizando el escorzo de cada segmento. — [Resumen del proyecto (Penn)](https://www.cis.upenn.edu/~cjtaylor/RESEARCH/projects/Johansson/Johansson.pdf); [mlanthology CVPR 2000](https://mlanthology.org/cvpr/2000/taylor2000cvpr-reconstruction)

**Stevens et al., 2006 (el antecedente más cercano a la fórmula del equipo)**
- Referencia: N. J. Stevens, D. O. Schmitt, T. M. Cole III y L.-K. Chan, "Technical Note: Out-of-Plane Angular Correction Based on a Trigonometric Function for Use in Two-Dimensional Kinematic Studies". Am J Phys Anthropol, 2006, DOI 10.1002/ajpa.20359. — [PDF](https://people.ohio.edu/stevensn/documents/Stevens%20et%20al%202006%20Technical%20note.pdf)
- Método:
  1. Calcula el ángulo fuera del plano de cada segmento con `θ = cos⁻¹(L_aparente / L_real)`.
  2. Reconstruye la coordenada Z con `Z = L_aparente · tan θ`.
  3. Calcula el ángulo 3D del codo con el producto punto, usando las longitudes reales.

  Requiere medir las longitudes reales de cada sujeto. — [PDF](https://people.ohio.edu/stevensn/documents/Stevens%20et%20al%202006%20Technical%20note.pdf)
- Resultados con un objeto de calibración y un codo real de 90°:
  - Ángulo aparente de 110,0° a +45° de giro y de 180,5° a +90°.
  - Ángulo corregido de 88,1° y 87,6°.
  - Error menor a 2° a ±45° y menor a 3° a ±90°.
  - Sin corrección, la sobreestimación llega al 100 %.

  — [PDF](https://people.ohio.edu/stevensn/documents/Stevens%20et%20al%202006%20Technical%20note.pdf)
- Advertencias de los autores:
  - Por debajo de unos 20° fuera del plano casi no hay diferencia medible entre 2D y 3D (citan a Plagenhoef, 1979).
  - No recomiendan corregir en ese rango, porque el coseno es poco sensible ahí y la corrección amplifica el error de medición.
  - Tampoco la recomiendan cuando el punto proximal o el distal también están muy fuera del plano.

  — [PDF](https://people.ohio.edu/stevensn/documents/Stevens%20et%20al%202006%20Technical%20note.pdf)
- La tabla del artículo muestra Z positivas para los giros hacia la cámara y para los giros en sentido contrario. No tratan explícitamente la ambigüedad de signo. — [PDF](https://people.ohio.edu/stevensn/documents/Stevens%20et%20al%202006%20Technical%20note.pdf)

**Restricciones de longitud ósea en el "lifting" 3D (práctica común en visión por computador)**
- BLAPose (Hsu y Jang, 2024): una red recurrente predice longitudes de hueso en el video y las sustituye en la pose, conservando la dirección de cada hueso. Mejora métricas en Human3.6M. — [arXiv:2410.20731](https://arxiv.org/html/2410.20731v1)
- SPGNet añade una restricción cinemática de longitud ósea constante y reproyecta a 2D. — [Papers with Code](https://cs.paperswithcode.com/paper/spgnet-spatial-projection-guided-3d-human)
- Otro trabajo usa la longitud ósea, junto con los landmarks 2D y los intrínsecos de la cámara, como entrada de la red de lifting. — [arXiv:2105.03807](https://www.arxiv.org/pdf/2105.03807)

**Magnitud del problema en ROM clínico**
- En un estudio de sensores para artroplastia de rodilla, si la cámara no es perpendicular al plano sagital, la perspectiva 2D da un ángulo incorrecto. — [arXiv:2207.00190](https://arxiv.org/pdf/2207.00190)
- Con modelos óseos validados por fluoroscopia, el ángulo de rodilla en el plano coronal varió sustancialmente según la posición de la cámara y difirió del 3D de referencia (P < 0,0001). — [Orthop J Sports Med (SAGE)](https://journals.sagepub.com/doi/xml/10.1177/2325967118819831)
- En una revisión de ROM de hombro, el BlazePose de Wazir et al. (n=1) tuvo límites de acuerdo de ±8,8° en abducción y aducción y de ±12,6° en flexión y extensión. — [van den Hoorn et al., Sensors 2025](https://pmc.ncbi.nlm.nih.gov/articles/PMC11820973/)

### Inferences
- La técnica del equipo es, en esencia, la corrección de Stevens (2006) aplicada cuadro a cuadro sobre landmarks de MediaPipe. La z de MediaPipe se usa para elegir la bandera binaria de Taylor (2000).
  - Hay que citar a los dos como base. Leuthold (2025) sirve como antecedente moderno con BlazePose, pero con otro mecanismo.
  - Una frase honesta: "aplicamos una corrección trigonométrica clásica (Stevens 2006; Taylor 2000) con calibración por sesión, y medimos su efecto en ROM clínico".
- **Sensibilidad numérica.** La derivada de `arccos(r)` es `−1/√(1−r²)`, que se dispara cuando r → 1.
  - Un error de solo 2 % en la longitud aparente (r = 0,98) equivale a un ángulo fuera del plano fantasma de unos 11,5°.
  - Con r = 0,95, el fantasma es de unos 18°.
  - Esto coincide con la advertencia de Stevens. Sugiere una zona muerta (no corregir si r supera un umbral) como constante documentada en `correction/constants.ts`.
  - El umbral exacto debe salir del benchmark. No hay que fijarlo a ojo.
- **Razón mayor que 1.** Puede ocurrir por ruido, por perspectiva (en una laptop a corta distancia, el segmento más cercano se ve más largo) o por una calibración mal hecha. Hay que acotarla y registrarla como señal de baja calidad. La ortografía escalada de Taylor no se cumple bien a corta distancia.
- **Calidad de la pose de calibración.** Si un segmento ya estaba escorzado durante la calibración, todas las correcciones posteriores quedan sesgadas. Leuthold evita algo parecido excluyendo miembros con más de 50° de inclinación. El equipo debería verificar que la pose de calibración esté en el plano, por ejemplo con la z de los extremos o pidiendo una postura con los segmentos paralelos a la cámara.
- **Longitudes en píxeles.** Los landmarks de imagen están normalizados por ancho y alto por separado. Las longitudes deben calcularse en píxeles, o corrigiendo la relación de aspecto, para que la razón tenga sentido físico.
- **Fiabilidad de la z.** Leuthold informa que BlazePose se equivoca justamente con la profundidad de la tibia y el cúbito, y decidió no usar la z normalizada. El equipo debe medir la tasa de aciertos del signo de z contra la referencia, al menos en el gemelo digital, en vez de suponerla confiable.
- **Los hombros cambian con la elevación del brazo.** Leuthold modela el ancho de hombros y el tronco lateral como función de la elevación humerotorácica. La longitud "constante" de los segmentos que dependen del landmark del hombro no es del todo constante. Esto afecta al húmero en los movimientos de hombro.

### Gaps
- No encontré ningún estudio clínico de ROM que aplique la corrección por longitud calibrada más el signo de z sobre MediaPipe o BlazePose. La búsqueda no fue exhaustiva (sin Scholar ni IEEE a texto completo), así que solo puede afirmarse "no encontramos", nunca "no existe".
- No verifiqué en la documentación oficial cómo define MediaPipe la z normalizada (origen y escala). La página de Pose Landmarker no la define. — [Documentación de Pose Landmarker](https://developers.google.com/edge/mediapipe/solutions/vision/pose_landmarker)
- Los errores por articulación y por ejercicio de Leuthold solo aparecen en figuras. El texto no da el estado del Kalman, las covarianzas ni los pesos de la función de costo, y Physio2.2M no es público.
- No leí las ecuaciones completas de Taylor (2000). Su descripción viene del resumen del proyecto y de los metadatos.

---

## 2. Compensación de tronco en el ROM de hombro: evidencia clínica de inflado y sistemas de cámara que separan ambos valores

### Takeaway
Hay evidencia clínica de que el tronco infla las mediciones de hombro, pero es escasa y de muestras pequeñas.
- Bliss et al. (2002): el goniómetro sobreestimó 34° en flexión y 43° en abducción frente a un sistema electromagnético, y el tronco explicó parte del error.
- Fayad et al. (2008): en hombro congelado hay más extensión y torsión de tronco durante la elevación.

Una revisión narrativa de 2025 dice explícitamente que la compensación torácica puede sobreestimar el ROM de hombro con cámaras. También dice que los métodos actuales de pose en video no la separan.
Existen sistemas Kinect que detectan compensaciones como clasificación (inclinación hacia adelante), pero no encontré ningún sistema validado que reporte por separado el ROM aparente, el ROM respecto del tronco y la inclinación. Ese hueco es real.

### Cited Findings
- **Bliss, James y Williams (2002)**, "The measurement of shoulder motion: accuracy and reliability using different goniometry techniques", Orthopaedic Proceedings 84-B(Supp II):191–192.
  - Muestra: 33 sujetos.
  - Referencia: sistema electromagnético Isotrak II, que medía el tronco al mismo tiempo.
  - Resultado: los métodos goniométricos sobreestimaron 34° en flexión, 43° en abducción y 15° en rotación externa.
  - El movimiento del tronco explica parte del error en flexión, y también contribuyó la rotación humeral.
  - Solo está el resumen; no hay desglose numérico del aporte del tronco.

  — [Bone & Joint](https://boneandjoint.org.uk/Article/10.1302/0301-620X.84BSUPP_II.0840191e)
- **Fayad et al. (2008)**, hombro congelado, sistema electromagnético Polhemus Fastrak.
  - Muestra: 30 voluntarios sanos y 13 pacientes.
  - Los pacientes hicieron más extensión y torsión de tronco en niveles intermedios de elevación.
  - Los autores concluyen que la extensión y la torsión del tronco pueden compensar la elevación limitada del brazo.
  - Solo obtuve el resumen, mediante un buscador, porque el registro HAL estaba bloqueado.

  — [HAL hal-00222100](https://hal.archives-ouvertes.fr/hal-00222100)
- **van den Hoorn et al. (2025)**, "The Future of Clinical Active Shoulder Range of Motion Assessment, Best Practice, and Its Challenges: Narrative Review", Sensors 25(3):667, doi:10.3390/s25030667.
  - Las compensaciones torácicas que se suman a la elevación del brazo "may lead to an overestimation of shoulder range of motion".
  - El goniómetro y la estimación visual miden movimiento toracohumeral, así que incorporan el movimiento torácico.
  - "Current video pose methods are restricted to assessing the relative motion between the thorax and the upper arm".
  - No reportan ningún sistema de cámara que separe la compensación de tronco de forma validada.
  - Proponen a futuro un modelo basado en el esternón, con la inclinación del tórax respecto de la vertical.
  - Definir el tórax con landmarks ipsilaterales sesga el ángulo toracohumeral hacia valores mayores.

  — [PMC11820973](https://pmc.ncbi.nlm.nih.gov/articles/PMC11820973/)
- La misma revisión resume la precisión de cámaras para hombro:
  - MediaPipe en abducción frente a goniómetro (Kusunose, n=10): R² = 0,997.
  - MediaPipe (Clemente, n=8): r > 0,9 en abducción y 0,8–0,9 en flexión.
  - Kinect (Gritsenko, n=20): r de 0,30–0,45 en flexión.

  La flexión sale peor que la abducción de forma consistente. — [PMC11820973](https://pmc.ncbi.nlm.nih.gov/articles/PMC11820973/)
- **Zhi et al. (2017)**, IEEE J Transl Eng Health Med, vol. 6, 2100107. Kinect v2 durante terapia robótica de ictus, detectando inclinación hacia adelante, rotación de tronco y elevación del hombro.
  - En sanos (SVM): inclinación hacia adelante con AUC 0,98 y F1 0,82; elevación del hombro con F1 0,07.
  - En pacientes con ictus (RNN): inclinación hacia adelante con AUC 0,77 y F1 0,17.

  Detectar compensaciones en pacientes reales es difícil. — [PMC5788403](https://pmc.ncbi.nlm.nih.gov/articles/PMC5788403)
- Hay trabajos con cámaras RGB-D para analizar movimientos compensatorios de tronco en la rehabilitación de miembro superior. — [SBA, "Use of RGB-D Camera for Analysis of Compensatory Trunk Movements in Upper Limbs Rehabilitation"](https://www.sba.org.br/open_journal_systems/index.php/cba/article/view/1089)
- Sistemas comerciales como VALD HumanTrak reportan una métrica de inclinación lateral del cuello para entender compensaciones durante la flexión y la abducción de hombro. — [VALD support](https://support.vald.com/hc/en-au/articles/5001742621337-HumanTrak-Metrics-Neck-Lateral-Flexion)
- Una tesis de la Robert Morris University señala que la flexión activa de hombro sentado a veces se acompaña de extensión toracolumbar, lo que puede generar registros inconsistentes. El resultado cuantitativo no estaba disponible. — [RMU dissertation](https://lrc.rm.edu/dissertation/the-effects-of-lumbar-spine-position-on-shoulder-range-of-motion-in-asymptomatic-subjects-rmu-dissertations-1-55/)
- Los protocolos docentes listan la extensión del tronco como "movimiento truco" en el hombro. Un protocolo de laboratorio mide la flexión en supino con la columna lumbar aplanada para evitarla. — [Recurso docente (uomus.edu.iq)](https://www.uomus.edu.iq/uploads/lectures/41/cacc0ab5b0a948b28497db868129ff59.pdf)

### Inferences
- **Nombres.** El "ROM real" (húmero contra el eje del tronco) no es glenohumeral, porque incluye el ritmo escapulotorácico. Es un ángulo humerotorácico.
  - En la práctica es lo que el goniómetro debería medir si el brazo fijo queda alineado con el tronco. El "aparente" es lo que mide una lectura contaminada por la inclinación del tronco.
  - Conviene llamarlos "ROM respecto a la vertical" y "ROM respecto al tronco" para que el jurado no lo interprete como una medida articular pura.
- **Eje del tronco.** El eje usa el punto medio de las caderas y el de los hombros. Los landmarks de hombro de MediaPipe se desplazan con la elevación escapular (Leuthold modela el ancho de hombros en función de la elevación, y van den Hoorn advierte que las definiciones de tórax sesgan el ángulo).
  - Por eso la "inclinación del tronco" puede variar por la elevación escapular aunque el tronco no se mueva. Es una hipótesis que el benchmark debe medir.
- **Plano de cada movimiento.**
  - En vista frontal (abducción), la inclinación lateral del tronco cae en el plano de la imagen y se mide bien en 2D.
  - En vista sagital (flexión), la extensión lumbar también cae en el plano.
  - Las rotaciones del tronco (torsión, la que reporta Fayad) quedan fuera del plano y no se ven bien en 2D.
- **Lo que no hay que afirmar.** La evidencia (Bliss 2002) no permite decir cuántos grados aporta el tronco en un goniómetro bien aplicado; solo dice que "explica parte". Medir ese aporte con los datos propios del equipo sería en sí un resultado nuevo.
- **Qué es nuevo.** La novedad es reportar tres números a la vez (aparente, respecto al tronco e inclinación) con cámara monocular y con validación. La idea de que el tronco compensa no es nueva.

### Gaps
- No obtuve el texto completo de Fayad et al. (2008) ni la magnitud en grados de la extensión y la torsión del tronco.
- No encontré un umbral clínico validado de inclinación de tronco que invalide una medición de hombro.
- No encontré estudios que cuantifiquen cuántos grados de inflado aporta la extensión lumbar a la flexión de hombro medida con goniómetro en sujetos sanos. La tesis de la RMU podría tenerlo, pero el resultado no estaba accesible.
- No encontré ninguna app con MediaPipe que reporte de forma explícita el ROM aparente y el ROM respecto al tronco por separado. La búsqueda no fue exhaustiva.

---

## 3. Predicción conformal (split y Mondrian) para la incertidumbre de medición: aplicaciones previas, garantías y si hay uso en ROM o goniometría

### Takeaway
La predicción conformal y su variante por grupos (Mondrian) son técnicas maduras, con teoría (Vovk; Angelopoulos y Bates; Barber et al.) y librerías (MAPIE, crepes). Ya se aplicaron a pose: keypoints de objetos en CVPR 2023 y pose y forma humanas en ICML 2025.
**No encontré ninguna aplicación a ROM, goniometría ni calibración de un medidor de ángulos por cámara contra un instrumento de referencia.** Es la afirmación de novedad más defendible del proyecto, siempre que se declaren tres límites:
- La garantía es marginal, válida dentro de cada grupo pero no por persona.
- Requiere intercambiabilidad, lo que obliga a partir los datos por sujeto.
- Cada grupo necesita un tamaño de calibración suficiente.

### Cited Findings

**Fundamentos**
- Angelopoulos y Bates, "A Gentle Introduction to Conformal Prediction and Distribution-Free Uncertainty Quantification". arXiv 2107.07511; publicado en Foundations and Trends in Machine Learning (2023), doi:10.1561/2200000101. Incluye la prueba de validez del split conformal. — [arXiv:2107.07511](https://arxiv.org/pdf/2107.07511); [mlanthology](https://mlanthology.org/ftml/2023/angelopoulos2023ftml-conformal)
- Barber, Candès, Ramdas y Tibshirani, "The limits of distribution-free conditional predictive inference", Information and Inference 10:455–482 (2021).
  - La inferencia condicional exacta es imposible sin supuestos sobre la distribución.
  - El conformal da garantías marginales, promediadas sobre los puntos de prueba, mientras que los usuarios suelen querer validez para un individuo.

  — [arXiv:1903.04684](https://arxiv.org/abs/1903.04684); [PDF CMU](https://www.stat.cmu.edu/~ryantibs/papers/limits.pdf)
- Vovk, "Conditional validity of inductive conformal predictors", Machine Learning 92:349–376 (2013); versión previa en ACML 2012 (PMLR 25). Estudia versiones de validez condicional y cómo lograrlas con predictores conformales inductivos. — [arXiv:1209.2673](https://arxiv.org/abs/1209.2673); [PMLR v25](https://proceedings.mlr.press/v25/vovk12.html)
- Angelopoulos, Barber y Bates tienen un libro posterior, "Theoretical foundations of conformal prediction" (arXiv 2411.11824), con un capítulo sobre cobertura condicional. — [arXiv:2411.11824](https://arxiv.org/pdf/2411.11824v5)

**Mondrian (condicional por grupo)**
- El Mondrian divide la calibración en grupos disjuntos y aplica un procedimiento conformal en cada uno. La garantía es de cobertura condicional a pertenecer al grupo. — [arXiv:2601.03994 (pintervals)](https://arxiv.org/pdf/2601.03994)
- MAPIE implementa intervalos Mondrian para regresión. Advierte que con menos de ~200 muestras de calibración por grupo la cobertura se vuelve inestable y de alta varianza. — [MAPIE: Mondrian regression](https://mapie.readthedocs.io/en/stable/examples_mondrian/1-quickstart/plot_main-tutorial-mondrian-regression.html)
- El Mondrian da cobertura exacta en muestra finita, pero exige grupos que no se solapen, lo que lo limita a pocos grupos predefinidos. — [arXiv:2305.12616](https://arxiv.org/pdf/2305.12616v1)
- Boström y colaboradores:
  - Los "Mondrian conformal regressors" forman categorías por binning de igual tamaño sobre estimaciones de dificultad y aplican un conformal estándar en cada una; con pocos datos el binning puede quedar grueso (COPA 2026, PMLR 329).
  - La librería crepes implementa regresores conformales estándar, normalizados y Mondrian, y es agnóstica al modelo porque usa solo residuos (COPA 2022).
  - Las Mondrian conformal predictive distributions están en PMLR 152 (2021).

  — [PMLR v329](https://proceedings.mlr.press/v329/bostrom26a.html); [COPA 2022 crepes](https://cml.rhul.ac.uk/copa2022/papers/COPA2022_paper_11.pdf); [PMLR v152](https://proceedings.mlr.press/v152/bostrom21a.html)

**Aplicaciones en pose y visión**
- Yang y Pavone (CVPR 2023), "Object Pose Estimation with Statistical Guarantees".
  - Convierten los heatmaps de keypoints en regiones que contienen el keypoint real con probabilidad elegida (por ejemplo 90 %) mediante conformal inductivo.
  - Propagan la incertidumbre a la pose 6D.
  - Validan la cobertura en LineMOD Occlusion.

  — [arXiv:2303.12246](https://arxiv.org/pdf/2303.12246); [CVF Open Access](https://openaccess.thecvf.com/content/CVPR2023/papers/Yang_Object_Pose_Estimation_With_Statistical_Guarantees_Conformal_Keypoint_Detection_and_CVPR_2023_paper.pdf)
- La versión previa (NeurIPS 2022), "Conformal Semantic Keypoint Detection", calibró con unas 200 imágenes. — [NeurIPS 2022](https://nips.cc/virtual/2022/60350)
- CUPS (Zhang y Carlone, ICML 2025) estima forma y pose humanas 3D desde video RGB.
  - Entrena una función de incertidumbre junto con el estimador y la usa como puntuación de conformidad.
  - Como los cuadros de video no son intercambiables, derivan cotas para la brecha de cobertura.

  — [arXiv:2412.10431](https://arxiv.org/pdf/2412.10431); [PMLR v267](https://proceedings.mlr.press/v267/zhang25g.html)
- En odometría visual conformal, la regresión cuantílica conformalizada dio bandas demasiado conservadoras porque ignora las correlaciones entre variables. — [arXiv:2303.02207](https://arxiv.org/pdf/2303.02207)

**Medicina y biomecánica**
- Una perspectiva crítica para aplicaciones médicas sostiene que la utilidad práctica de la garantía depende mucho del tamaño del conjunto de calibración. — [arXiv:2512.14727](https://arxiv.org/html/2512.14727v1)
- Existe conformal para regresión con ruido en las etiquetas, probado en imagen médica. Es relevante porque el goniómetro de referencia también tiene error. — [arXiv:2509.15120](https://arxiv.org/html/2509.15120v1)
- En MICCAI 2025 se aplicaron conformal estándar y regresión cuantílica conformalizada a la predicción del movimiento de instrumentos quirúrgicos. — [MICCAI 2025](https://papers.miccai.org/miccai-2025/0168-Paper0260.html)
- En biomecánica, los intervalos de confianza para ángulos articulares desde captura sin marcadores multivista se obtienen por inferencia variacional, que es un enfoque bayesiano y no conformal. Los intervalos suelen ser de pocos grados y se ensanchan en las articulaciones distales. — [arXiv:2502.06486](https://arxiv.org/html/2502.06486v1)

### Inferences
- **Diseño ya conocido, aplicación nueva.** El diseño del equipo (un cuantil por movimiento y por grupo de dificultad calculado con orientación, escorzo y visibilidad) es exactamente el patrón de "Mondrian con categorías por dificultad" de Boström.
  - Hay que citarlo como técnica conocida.
  - La novedad está en la aplicación: calibrar un medidor de ROM por cámara contra el goniómetro, con grupos de dificultad físicos e interpretables.
- **Unidad de intercambiabilidad.** Varias repeticiones y cuadros de una misma persona no son intercambiables entre sí (el mismo problema que resuelve CUPS).
  - La partición entre calibración y prueba debe hacerse por sujeto.
  - Conviene usar una puntuación por sujeto y movimiento (o por repetición, con cuidado) para no inflar artificialmente el n.
- **Tamaño mínimo por grupo.** Con nivel 90 %, el split conformal usa el ⌈(n+1)·0,9⌉-ésimo residuo ordenado. Con menos de 9 puntos de calibración en un grupo, el intervalo es infinito.
  - Con 4 movimientos × k grupos, el número de sujetos crece rápido.
  - Si un grupo queda corto, lo honesto es fusionarlo con otro o no dar intervalo, lo que coincide con la regla "si no hay tabla, no hay intervalo".
- **Qué cubre el intervalo.** La garantía es sobre la diferencia con el goniómetro, no con la verdad anatómica. El intervalo cubre "lo que el goniómetro marcaría en este protocolo", incluido el propio error del goniómetro. Hay que declararlo.
- **Cambio de distribución.** Si la calibración se hace en laboratorio y el uso real es a domicilio (otra luz, otra laptop, otros pacientes), se rompe la intercambiabilidad y la cobertura nominal deja de estar garantizada. Conviene reportar la cobertura empírica en un conjunto de prueba separado por sujetos, con su intervalo binomial.
- **Variante con residuos con signo.** Si el sesgo es sistemático (por ejemplo, la cámara subestima la flexión), un intervalo simétrico desperdicia ancho. Los residuos con signo, o una corrección del sesgo antes de conformalizar, pueden dar intervalos más angostos sin perder garantía.

### Gaps
- No leí la sección de Angelopoulos y Bates sobre cobertura condicional; cito el artículo por su contenido general verificado.
- No encontré usos regulatorios (FDA o CE) de conformal en dispositivos de medición clínica.
- Dos búsquedas web dirigidas ("conformal prediction" con "range of motion", goniometría, ángulo articular, marcha o wearables) no devolvieron ningún trabajo que aplique conformal a ROM o a ángulos articulares. No fueron exhaustivas en Scholar, IEEE ni PubMed. La ausencia de resultados es una señal, no una prueba.
- No verifiqué en el texto completo de Vovk (2013) cómo trata los predictores Mondrian. Se atribuyen a Vovk y colaboradores (Mondrian confidence machine, 2003), pero no recuperé esa fuente en esta sesión.

---

## 4. Filtro 1€ para suavizar landmarks: uso en pipelines de pose, efecto en retardo y precisión, y si MediaPipe ya lo aplica

### Takeaway
El filtro 1€ (Casiez, Roussel y Vogel, CHI 2012) es el estándar de facto para suavizar entradas ruidosas en tiempo real. **MediaPipe Pose Landmarker ya aplica internamente un filtro de este tipo** (parámetros `min_cutoff`, `beta` y `derivate_cutoff`) cuando trabaja en modo flujo con una sola persona. Lo aplica tanto a los landmarks de imagen como a los de mundo.
Por eso la etapa 1€ del equipo es un segundo filtrado sobre datos ya suavizados, no un diferenciador. La ablación tiene que declarar que "1€ apagado" no significa "landmarks crudos".

### Cited Findings
- Casiez, Roussel y Vogel (2012), "1€ Filter: A Simple Speed-based Low-pass Filter for Noisy Input in Interactive Systems", CHI '12, pp. 2527–2530, DOI 10.1145/2207676.2208639. — [Página del proyecto](https://cristal.univ-lille.fr/~casiez/1euro); [HAL](https://hal.archives-ouvertes.fr/hal-00670496)
- Mecanismo: es un pasabajos de primer orden con frecuencia de corte adaptativa.
  - A baja velocidad, el corte bajo reduce el jitter.
  - A alta velocidad, el corte sube para reducir el retardo.
  - En la comparación de los autores, tiene menos retardo que otros filtros para un mismo nivel de reducción de jitter.

  — [Página del proyecto](https://cristal.univ-lille.fr/~casiez/1euro)
- Ajuste recomendado en dos pasos: primero `beta = 0` y `min_cutoff` en un valor intermedio, como 1 Hz; después se ajustan. `min_cutoff` controla el jitter y `beta` el retardo. — [Página del proyecto](https://cristal.univ-lille.fr/~casiez/1euro)
- Hay implementaciones de referencia de los autores en GitHub, con paquete de TypeScript en npm (`1eurofilter`) y de Python en PyPI. — [GitHub casiez/OneEuroFilter](https://github.com/casiez/OneEuroFilter); [npm 1eurofilter](https://www.npmjs.com/package/1eurofilter)
- **MediaPipe Tasks (código fuente).** `PoseLandmarkerGraph` activa el suavizado según el modo flujo, solo cuando se pide una pose: `set_smooth_landmarks(tasks_options.base_options().use_stream_mode())`. Con varias poses devuelve error si se intenta suavizar. — [pose_landmarker_graph.cc](https://raw.githubusercontent.com/google-ai-edge/mediapipe/master/mediapipe/tasks/cc/vision/pose_landmarker/pose_landmarker_graph.cc)
- En `pose_landmarks_detector_graph.cc`, si `smooth_landmarks` está activo:
  - Los landmarks de imagen se suavizan con `min_cutoff=0.05`, `beta=80.0` y `derivate_cutoff=1.0`, escalados por el tamaño de imagen y la ROI.
  - Los landmarks de mundo se suavizan con `min_cutoff=0.1`, `beta=40.0` y `derivate_cutoff=1.0`.
  - La visibilidad pasa por un pasabajos con `alpha=0.1`.
  - Los comentarios del código hablan de un "landmark EMA filter" y un "velocity EMA filter".
  - Las funciones vienen de `mediapipe/framework/api2/stream/smoothing.h`.

  — [pose_landmarks_detector_graph.cc](https://github.com/google-ai-edge/mediapipe/blob/master/mediapipe/tasks/cc/vision/pose_landmarker/pose_landmarks_detector_graph.cc)
- La referencia de la API de Python lista `landmarks_smoothing_calculator_pb2` con tres modos: sin filtro, One Euro y filtro de velocidad. — [MediaPipe Python API reference](https://developers.google.com/edge/api/mediapipe/python/mp/tasks/components/utils)
- Un comentario en un foro (anecdótico) dice que el repositorio actual de MediaPipe usa por defecto el "one euro filter", y que el filtro anterior de velocidad relativa dependía mucho de la tasa de cuadros. — [GitHub discussion asus4/tf-lite-unity-sample #287](https://github.com/asus4/tf-lite-unity-sample/discussions/287)
- La documentación pública de Pose Landmarker no menciona el suavizado. Solo define los modos IMAGE, VIDEO y LIVE_STREAM, y la opción `min_tracking_confidence`. — [Documentación de Pose Landmarker](https://developers.google.com/edge/mediapipe/solutions/vision/pose_landmarker)

### Inferences
- **El filtro de MediaPipe probablemente es 1€.** El trío de parámetros `min_cutoff`, `beta` y `derivate_cutoff` es exactamente el del filtro 1€. Junto con la lista de la API de Python, apunta a que el suavizado interno de MediaPipe es un One Euro. El código del grafo no lo nombra, así que es una inferencia fuerte, no un hecho verificado.
- **Modos de ejecución.** En `@mediapipe/tasks-vision`, lo más probable es que VIDEO y LIVE_STREAM activen `use_stream_mode` y que IMAGE no lo haga. Hay que verificarlo.
  - Si se cumple, procesar en IMAGE da landmarks sin el suavizado interno, pero también sin seguimiento entre cuadros.
  - Los landmarks crudos que se guardan para el benchmark ya vienen suavizados si se capturaron en VIDEO. Hay que registrar el modo como metadato.
- **Efecto sobre el ROM máximo.** Todo pasabajos introduce retardo y puede recortar los picos. Como el ROM es el máximo del ángulo, el filtrado podría subestimarlo en movimientos rápidos.
  - En la práctica clínica el paciente sostiene el final del rango, lo que debería reducir el efecto.
  - Es una hipótesis que el benchmark debe medir (ROM con y sin la etapa 1€).
- **Presentación.** El filtro 1€ se presenta como higiene estándar del pipeline, no como aporte. El aporte es medir su efecto en la ablación.

### Gaps
- No encontré estudios que comparen 1€ con Butterworth u otros filtros sobre el ROM derivado de MediaPipe, con retardo y error frente a una referencia.
- No abrí `mediapipe/framework/api2/stream/smoothing.h` para confirmar que `SmoothLandmarks` instancia el One Euro.
- No verifiqué cómo traduce la API web de tasks-vision los modos de ejecución a `use_stream_mode`.
- No obtuve los resultados numéricos del experimento original de Casiez et al. más allá de la afirmación cualitativa de menor retardo.

---

## 5. Estudios de ablación en artículos clínicos de estimación de pose: con qué frecuencia se reportan

### Takeaway
Son raros y superficiales. Lo típico en los estudios clínicos con MediaPipe u OpenPose es medir el acuerdo de un sistema completo contra un goniómetro o una captura de movimiento (ICC, Bland-Altman, MAE). No se reporta qué etapa del pipeline aporta qué.
Incluso Leuthold et al. (2025), el antecedente más cercano, reporta una sola ablación menor. No encontré ningún metaestudio que cuantifique la frecuencia.

### Cited Findings
- Leuthold et al. reportan una única ablación: reiniciar las razones de huesos en cada video frente a reutilizarlas del mismo participante.
  - No hay ablaciones que quiten términos de la función de costo, el Kalman ni el peso por visibilidad.
  - Los valores p se dan por landmark y por ejercicio, pero el texto no nombra la prueba estadística.

  — [arXiv HTML 2512.06783](https://arxiv.org/html/2512.06783)
- Una revisión sistemática de pose en salud (PRISMA, 41 estudios de 2020–2025) describe evidencia heterogénea y validación clínica limitada en el mundo real. Señala problemas de oclusión, luz y falta de conjuntos de datos estandarizados. — [Pose Estimation Frameworks in Healthcare: A Systematic Review (JAETS)](https://journal.yrpipku.com/index.php/jaets/article/view/9779)
- Los estudios de ROM de hombro con cámara que resume van den Hoorn et al. reportan R², ICC, límites de acuerdo y MAE de sistemas completos. Varias muestras son muy pequeñas (n=1, n=2, n=8, n=10). — [PMC11820973](https://pmc.ncbi.nlm.nih.gov/articles/PMC11820973/)
- Una revisión sistemática de cámaras RGB-D para ROM de hombro (14 estudios) encontró mejor fiabilidad y menos heterogeneidad en movimientos simples (abducción y flexión) que en movimientos complejos. — [PMC12141239](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC12141239/)

### Inferences
- **Ablación como diferenciador.** Una tabla de ablación completa (2⁴ combinaciones de flags, error contra el goniómetro y cobertura conformal en datos no usados para calibrar) estaría por encima de la práctica típica en este nicho. Es un diferenciador de rigor más fuerte que cualquier técnica aislada.
- **Muestras pequeñas.** Como las muestras de la literatura son pequeñas, el equipo no necesita una muestra enorme para estar a la par. Sí necesita declarar el n, la partición por sujeto y los intervalos de confianza de cada diferencia de la ablación.

### Gaps
- No encontré ningún metaestudio ni revisión que cuente cuántos artículos clínicos de pose reportan ablación. La conclusión de que son raros se apoya en ejemplos, no en un conteo.
- Un artículo de congreso sobre BlazePose con posprocesamiento (Kalman y FDF) reportaría una mejora de cerca del 10 % en el error angular, pero no pude verificar la fuente ni su referencia completa. Por eso no lo cito como hallazgo.

---

## 6. Cómo presentar cada técnica de forma honesta ante un jurado de ingenieros

### Takeaway
La narrativa más sólida es esta: "ninguna técnica es nueva por separado; lo nuevo es el pipeline completo con cada etapa medida por ablación y un intervalo con garantía estadística calibrado contra el goniómetro". Cada técnica debe nombrar su antecedente y presentar cualquier mejora como hipótesis hasta que la confirmen los datos propios.
La afirmación de novedad más fuerte y verificable es el conformal (Mondrian) aplicado a ROM. La más débil es el filtro 1€, que MediaPipe ya aplica internamente.

### Cited Findings
- Corrección por escorzo:
  - Antecedentes directos: Stevens et al. (2006), con la fórmula arccos y error menor a 3° en un objeto rígido, y Taylor (2000), con la ambigüedad binaria por segmento. — [Stevens 2006 PDF](https://people.ohio.edu/stevensn/documents/Stevens%20et%20al%202006%20Technical%20note.pdf); [Taylor 2000 PDF](https://www.cis.upenn.edu/~cjtaylor/PUBLICATIONS/pdfs/TaylorCVIU2000.pdf)
  - Antecedente moderno con BlazePose: Leuthold et al. (2025), con 12,3° → 10,6° de error angular en su conjunto Vicon. — [arXiv HTML 2512.06783](https://arxiv.org/html/2512.06783)
- Compensación de tronco:
  - Evidencia de inflado: Bliss et al. (2002) y Fayad et al. (2008). — [Bone & Joint](https://boneandjoint.org.uk/Article/10.1302/0301-620X.84BSUPP_II.0840191e); [HAL](https://hal.archives-ouvertes.fr/hal-00222100)
  - Hueco declarado en la literatura: los métodos de pose en video no separan la compensación. — [van den Hoorn et al. 2025](https://pmc.ncbi.nlm.nih.gov/articles/PMC11820973/)
- Conformal:
  - Garantía marginal, y la condicional exacta es imposible sin supuestos. — [Barber et al.](https://arxiv.org/abs/1903.04684)
  - Mondrian, con cobertura por grupo y necesidad de muestras por grupo. — [MAPIE](https://mapie.readthedocs.io/en/stable/examples_mondrian/1-quickstart/plot_main-tutorial-mondrian-regression.html)
  - Usos previos en pose. — [Yang y Pavone 2023](https://arxiv.org/pdf/2303.12246); [CUPS 2025](https://arxiv.org/pdf/2412.10431)
- 1€: es la técnica de Casiez et al. (2012), y MediaPipe ya la aplica con parámetros propios en modo flujo. — [Casiez 1€](https://cristal.univ-lille.fr/~casiez/1euro); [pose_landmarks_detector_graph.cc](https://github.com/google-ai-edge/mediapipe/blob/master/mediapipe/tasks/cc/vision/pose_landmarker/pose_landmarks_detector_graph.cc)

### Inferences
Frases sugeridas, una por técnica:
- **Escorzo:** "Aplicamos una corrección trigonométrica clásica (Stevens 2006; Taylor 2000), similar en espíritu a Leuthold 2025, con calibración por sesión y el signo de z de MediaPipe. Hipótesis: reduce el error cuando el segmento sale más de 20° del plano. Resultado: [tabla de ablación]."
  - Mostrar también dónde empeora, por ejemplo cerca del plano por la sensibilidad del arccos.
- **Tronco:** "La literatura documenta que el tronco infla el ROM de hombro (Bliss 2002; Fayad 2008) y que las cámaras actuales no lo separan (van den Hoorn 2025). Nosotros reportamos los tres números."
  - Evitar la palabra "real" sin aclarar que es humerotorácico.
- **Conformal:** "No encontramos uso previo de conformal en ROM. Nuestra garantía es de cobertura del 90 % por grupo, marginal sobre las mediciones, frente al goniómetro, con datos partidos por sujeto. No es una garantía para cada paciente."
  - Mostrar la cobertura empírica en el conjunto de prueba, con su intervalo de confianza.
- **1€:** "Es higiene estándar. MediaPipe ya filtra internamente. Medimos si un segundo filtro ayuda o perjudica al ROM máximo."
- **Preguntas probables del jurado:**
  - ¿Por qué no usar directamente los landmarks de mundo 3D? Respuesta: la ablación compara 2D, 3D y corregido.
  - ¿Cuántos sujetos tiene cada grupo Mondrian?
  - ¿El goniómetro es la verdad? No; tiene su propio error, que el intervalo hereda.
  - ¿Qué pasa con la intercambiabilidad entre repeticiones de una misma persona?
  - ¿Los datos sintéticos validan algo? Solo bajo condiciones controladas, y siempre etiquetados como sintéticos.

### Gaps
- La calificación de novedad depende de búsquedas no exhaustivas. Antes de la defensa convendría repetir en Google Scholar y PubMed las búsquedas "conformal" + "goniometry/ROM" y "bone length" + "MediaPipe" + "range of motion".
- No hay datos propios todavía. Toda afirmación de mejora queda pendiente del benchmark.
