# Productos comerciales que miden ROM o guían ejercicios de rehabilitación con cámara o sensores (competencia de Fisio-visor)

Notas de investigación al 19 de octubre de 2026. Todo lo que dice "no confirmado" significa que no encontré una fuente; no significa que la función no exista. Cuando la única fuente es el propio fabricante, se indica como "afirmación del fabricante". Las fechas antiguas se marcan con **[antiguo]**.

## Pregunta 1. Ficha por producto: qué miden, hardware, validación, incertidumbre, offline/en el dispositivo, privacidad, precio y usuario objetivo

### Takeaway
El mercado se divide en tres grupos: (a) programas de MSK digital para pacientes pagados por empleadores (Hinge, Sword+Kaia), que usan cámara del móvil o sensores y casi no publican error en grados; (b) herramientas para clínicos (Exer Scan, Kemtai, Kinetisense, DARI, Uplift, OneStep, Physitrack), algunas con validación pequeña o solo del fabricante; y (c) goniómetros de móvil (DrGoniometer, Angulus, Clinometer, GetMyROM), mejor validados pero manuales. La única validación independiente con sesgo en grados de un producto con cámara comparable (Kemtai) mostró una sobrestimación sistemática de unos 8–10°. Physitrack anunció (todavía "próximamente") una función casi idéntica en arquitectura a Fisio-visor: pose en el navegador con WebAssembly, sin grabar ni transmitir video, y solo números al servidor.

### Cited Findings

#### Exer Health / Exer Scan / Exer AI (Exer Labs, Denver, EE. UU.)
- Exer Health (app para pacientes en iPhone) mide ángulos articulares y ROM de articulaciones mayores (hombro, rodilla, cadera), cuenta repeticiones y da corrección de forma con audio y video. Solo usa la cámara del iPhone, sin sensores. — [App Store, Exer Health](https://apps.apple.com/app/id1505858367)
- Acceso: gratis, pero solo para personas que trabajan con "socios de salud" de Exer; hace falta un código de acceso de un profesional. Idioma: solo inglés. Última versión vista: 2.7.0, del 29/08/2024. — [App Store, Exer Health](https://apps.apple.com/app/id1505858367)
- Privacidad: el desarrollador describe su medición como "on-the-edge AI", que funciona sin enviar video a la nube ni fuera del dispositivo (afirmación del fabricante). La etiqueta de privacidad declara nombre, correo, ID de usuario y datos de "Fitness" vinculados al usuario. — [App Store, Exer Health](https://apps.apple.com/app/id1505858367)
- Exer Scan (app para clínicos en iPad e iOS): evaluaciones en la clínica de movilidad, equilibrio, marcha, sentarse y levantarse, alcance funcional, temblor, mano y ROM (incluido el de hombro, según las notas de versión). Es explícitamente "no para autoevaluación del paciente ni para uso domiciliario sin supervisión". Gratis en la tienda; el precio institucional no es público. Versión 3.22.0 (octubre de 2026). — [App Store, Exer Scan](https://apps.apple.com/us/app/exer-scan/id6466210809)
- Exer Scan se declara "Class II (510(k)-exempt) Software as a Medical Device" bajo 21 CFR § 890.5050, con un sistema de calidad conforme a 21 CFR 820 e ISO 13485:2016. — [App Store, Exer Scan](https://apps.apple.com/us/app/exer-scan/id6466210809)
- Mayo Clinic pasó el módulo de mano y muñeca de Exer de la investigación al uso clínico en ortopedia, integrado con Epic (según el resumen de búsqueda; la página devolvió 403). — [MobiHealthNews](https://www.mobihealthnews.com/news/exclusive-exer-ai-expands-partnership-mayo-clinic-clinical-deployment)
- Validación (resumen de congreso, AAOS 2026; Jeffs, Allen, Himmelberg, Crook, Zaidi, Richard y Luther): 50 pacientes de una clínica de mano, 27 mediciones de ROM de mano, muñeca y antebrazo por paciente, comparadas con el goniómetro manual de un cirujano de mano y de un preparador físico. ICC > 0,9 en el 96 % de las mediciones; validez concurrente "fuerte" en el 96,3 % y "moderada" en el 3,7 %; 60 s frente a 273 s por evaluación. La pronación del antebrazo no fue significativa (el texto dice "ICC rated as good (0.08, p>0.05)", una incoherencia que parece una errata). No reporta error medio en grados ni límites de Bland-Altman. — [Resumen AAOS 2026](https://index.mirasmart.com/AAOS2026/PDFfiles/AAOS2026-007901.pdf)
- No encontré un artículo revisado por pares de Exer con error en grados contra el goniómetro para rodilla, codo u hombro. — [Búsqueda; resumen AAOS como única evidencia](https://index.mirasmart.com/AAOS2026/PDFfiles/AAOS2026-007901.pdf)

#### Kemtai (Israel / EE. UU.; sitios global y UE)
- Producto de ROM: el paciente usa "la cámara de su smartphone o dispositivo conectado", sin equipo adicional; la IA "calcula ángulos articulares". La página no lista articulaciones, unidades, precisión, procesamiento local, precio ni ningún indicador de confianza. Usuarios: pacientes en casa, terapeutas, plataformas de salud digital y ciencias de la vida. — [Kemtai, Range of Motion](https://kemtai.com/product/range-of-motion/)
- Afirmación del fabricante: un "estudio de terceros" comparó su goniómetro digital con un laboratorio Vicon y fue "igual de preciso". No encontré ese estudio. — [Blog de Kemtai](https://kemtai.com/blog/what-are-the-advantages-of-a-digital-goniometer-over-traditional-goniometers/)
- Validación independiente (Nedović, Jovanović, Kozinc y Vujičić, MJSSM 2024; DOI 10.26773/mjssm.240908): 23 estudiantes de fisioterapia sanos, en decúbito prono, con un iPhone 12 mini en trípode a 0,7 m. Se usó una "versión ajustada del software (versión 4) que mide ROM", es decir, una versión de investigación. — [MJSSM 2024 (PDF)](https://mjssm.me/clanci/MJSSM_September_2024_Nedovic.pdf)
  - Fiabilidad entre repeticiones de Kemtai: flexión de rodilla ICC 0,91 (IC 95 %: 0,79–0,96), error típico 2,45°; extensión de cadera ICC 0,93, error típico 2,41°. EasyAngle: ICC 0,93 y 0,96. — [MJSSM 2024](https://mjssm.me/clanci/MJSSM_September_2024_Nedovic.pdf)
  - Concordancia con el goniómetro EasyAngle: flexión de rodilla con sesgo de **+10,43°** (IC 95 %: 7,91–12,96), ICC 0,71 (0,42–0,86); extensión de cadera con sesgo de **+7,96°** (4,80–11,11; diferencia relativa del 36,6 %), ICC 0,66. Conclusión: "no son intercambiables". — [MJSSM 2024](https://mjssm.me/clanci/MJSSM_September_2024_Nedovic.pdf)
  - Limitación declarada: no fijaron la pelvis porque la cámara detectaba a la persona que la fijaba como otro objeto. — [MJSSM 2024](https://mjssm.me/clanci/MJSSM_September_2024_Nedovic.pdf)
- Flexión de hombro (Fizička Kultura, 2023; 40 sujetos): Kemtai tuvo una variabilidad de las medias significativamente mayor que el goniómetro de brazos, aunque se consideró fiable al promediar tres mediciones. — [DOAJ, Fizička Kultura 2023](https://doaj.org/article/9ba52848610a4bb594b1ec5bf39e71ff)

#### Physitrack / PhysiApp Motion Capture (Reino Unido; plataforma de ejercicios a domicilio)
- Estado: "Coming soon to PhysiApp", con lista de espera y sin fecha. La versión web v1 es el MVP; la móvil v2 viene después. Cubre los 500 ejercicios más prescritos, sin ejercicios personalizados en v1. — [Physitrack Motion Capture](https://www.physitrack.com/motion-capture)
- Técnica: "un modelo de IA de código abierto rastrea ~33 puntos articulares" desde la webcam (WebRTC) y los convierte en ángulos con trigonometría. Las repeticiones se detectan por transiciones de ángulo (ejemplo: "empieza <90°, completa >160°"); las retenciones se cronometran solo con postura correcta. Hay códigos de advertencia de forma, con un indicador de "compensation warnings", y ROM logrado frente al objetivo por sesión y como tendencia. — [Physitrack Motion Capture](https://www.physitrack.com/motion-capture)
- Procesamiento y privacidad: la web v1 corre en el navegador con WebAssembly; la v2 en el dispositivo. "No video is recorded or stored"; los fotogramas se analizan en memoria y se descartan; no se transmite video ni se reconoce el rostro. Al servidor solo llegan repeticiones, duración de retenciones, códigos de advertencia y resúmenes de ángulos; ni imágenes, ni video, ni coordenadas crudas. — [Physitrack Motion Capture](https://www.physitrack.com/motion-capture)
- La página no cita precisión, validación ni ningún indicador de confianza para el usuario. Se presenta como "a measurement and reporting tool, not a decision-making tool". Muestra el sello ISO 27001:2022. Voz: unas 20 frases pregrabadas con ElevenLabs. — [Physitrack Motion Capture](https://www.physitrack.com/motion-capture)
- Precio: no publicado para Motion Capture; hay una oferta de "miembro fundador" del 30 % para su EMR/PMS si se contrata antes del 1/1/2027. Las demás funciones de IA de Physitrack son un escriba de notas SOAP, un agente administrativo y la búsqueda de ejercicios en lenguaje natural sobre más de 18 000 videos. — [Physitrack, AI tools](https://www.physitrack.com/insights/best-ai-tech-for-physical-therapy)
- Physitrack publica una versión en español de sus artículos. — [Physitrack ES](https://www.physitrack.com/es/insights/best-ai-tech-for-physical-therapy)

#### Hinge Health (EE. UU.; TrueMotion, Movement Analysis, Enso)
- TrueMotion rastrea "más de 100 puntos de referencia del cuerpo" para dar retroalimentación en tiempo real. La página no menciona grados, hardware, procesamiento local, privacidad del video ni cifras de precisión. — [Hinge Health, Computer Vision](https://www.hingehealth.com/computer-vision)
- Movement Analysis (octubre de 2025) usa TrueMotion para guiar movimientos y registrar ángulos articulares, simetría y resistencia, y los combina con cuestionarios en "Hinge Scores" (según el resumen de búsqueda; la página devolvió 403). — [Business Wire, 21/10/2025](https://www.businesswire.com/news/home/20251021731830/en/Hinge-Health-unveils-new-AI-powered-care-tools)
- Blog de I+D (16/03/2026): definieron "umbrales de precisión clínica" combinando MCID y MDC con un "intervalo de error superior unilateral": unos **9°** para sentadilla e inclinación de cadera y unos **3°** para extensión de rodilla. Validaron contra anotación 3D manual y captura óptica profesional, no contra goniómetro. Reconocen que la cámara del móvil "ve en 2D", la ambigüedad de profundidad y el escorzo; que el suavizado temporal subestima el pico de ROM en movimientos rápidos; y que el cuello subestima el ROM. No publican el error medio. — [Hinge R&D, Tracking Progress](https://rnd.hingehealth.com/blog/tracking-progress-measuring-movement)
- En poses con partes del cuerpo fuera de cuadro, la precisión pasó del 45 % al 63 % (afirmación del blog, sin definir la métrica). — [Hinge R&D blog](https://rnd.hingehealth.com/blog)
- Enso (dispositivo de electroterapia para el dolor, no de visión) tiene 510(k) K233784, del 23/02/2024. — [RegDataLab K233784](https://www.regdatalab.com/510k/K233784); [Hinge Enso](https://www.hingehealth.com/how-it-works/enso)
- App en inglés, español y francés canadiense; sin costo para los miembros a través del empleador o plan de salud (documento de un plan de 2024). — [FAQ de Hinge Health, BCBSTX](https://healthselect.bcbstx.com/pdf/hinge-health-faq.pdf)
- Contexto: Omada Health también lanzó una herramienta de visión por computador en el móvil para que fisioterapeutas midan ROM a distancia. — [MobiHealthNews, Omada](https://www.mobihealthnews.com/news/omadas-latest-msk-tech-empowers-physical-therapists-conduct-remote-appointments)

#### Sword Health (Portugal / EE. UU.; Thrive, Bloom, Move, Phoenix, rastreadores de movimiento)
- La base GUDID de la FDA lista "SWORD Phoenix 2.0" (versiones de 2 y 5 rastreadores) de Sword Health, S.A., como sistema de rehabilitación con pantalla virtual para uso domiciliario, con código de producto ISD ("Exerciser, Measuring"). El número de presentación premercado figura como "Not Available/Not Released". — [AccessGUDID, SWORD Phoenix](https://accessgudid.nlm.nih.gov/devices/05600775530051)
- Sharecare describe los rastreadores de Sword y su captura de video como "FDA-listed medical devices": registro, no autorización 510(k). — [Sharecare MSK](https://www.sharecare.com/digital-therapeutics/msk)
- Las patentes describen rastreadores con sensores inerciales, emisor de luz y antenas, y calibración de orientación entre brazo y tórax. — [USPTO, US 12,222,364 B2](https://patentsgazette.uspto.gov/week06/OG/html/1531-2/US12222364-20250211.html)
- Patente US 12,456,204 B1, "Computer Vision-Driven Interactive Full-Body Motion Tracking" (protege el Thrive Pad). Bloom usa un sensor intravaginal para el suelo pélvico, no una cámara. — [Sword Newsroom, nov. 2025](https://swordhealth.com/newsroom/three-new-ai-care-patents)
- "Vision AI": tecnología propia de detección de movimiento que funciona dentro de la app en teléfonos y tabletas, junto con Phoenix (especialista de IA) con corrección de forma en tiempo real. La única fuente es una publicación de LinkedIn sin fecha. — [LinkedIn, repost](https://pt.linkedin.com/in/jpfdop)
- No encontré una validación revisada por pares de los rastreadores de Sword con error en grados. — [Resultados de búsqueda; patentes como única documentación técnica](https://patentsgazette.uspto.gov/week06/OG/html/1531-2/US12222364-20250211.html)
- Sword compró Kaia Health por 285 millones de dólares (anunciado el 28/01/2026). Sword reemplaza la solución MSK de Kaia en EE. UU. y obtiene acceso al sistema de reembolso alemán. — [Sword Newsroom](https://swordhealth.com/newsroom/sword-acquires-kaia-health); [Kaia](https://kaiahealth.com/newsroom/press-releases/kaia-health-joins-sword-health/)

#### Kaia Health – Motion Coach (Alemania; ahora parte de Sword)
- Usa la cámara frontal del móvil o la tableta (iOS: iPhone 6S o posterior; Android 5.0 o posterior), sin sensores. Analiza forma y postura con retroalimentación audiovisual y "evalúa flexibilidad, ROM y estabilidad", sin dar ROM en grados en la página. Afirma: "Motion Coach runs directly on your own smartphone or tablet". Tiene marca CE como dispositivo médico (sello 2024), ISO 13485 (TÜV Süd), GDPR y HIPAA. Regiones: EE. UU. y Alemania. — [Kaia Motion Coach](https://kaiahealth.com/motion-coach/)
- Otra página de Kaia indica que Motion Coach "no requiere conexión a Internet para funcionar" (según el resumen de búsqueda). — [Blog de Kaia](https://kaiahealth.com/blog/motion-coach-exercise-tracking)
- Por defecto no graba video; solo graba con consentimiento explícito, para mejorar el producto. — [Ayuda de Kaia](https://kaiahealth.zammad.com/help/en-us/18-motion-coach/61-will-video-recordings-of-me-be-made-automatically-when-i-use-the-kaia-motion-coach)
- Validación (JMIR 2021; 24 pacientes con artrosis de cadera o rodilla) **[antiguo]**: concordancia en correcciones de ejercicio app–fisioterapeutas de 0,828 frente a 0,833 entre fisioterapeutas (no inferioridad, P < 0,001) en 6 ejercicios. Mide acuerdo sobre corrección de forma, no ROM en grados. — [JMIR 2021;23(7):e26658](https://jmir.org/2021/7/e26658)
- La nota de prensa de Kaia lo presentó como "tan preciso como los fisioterapeutas", una formulación más fuerte que el estadístico. — [Nota de prensa de Kaia](https://kaiahealth.com/newsroom/press-releases/clinical-study-kaia-health-computer-vision-technology-as-accurate-as-physical-therapists-in-suggesting-exercise-corrections/)

#### Uplift Labs (EE. UU.; Uplift, Uplift Capture, Signals)
- Captura 3D sin marcadores con iPhone o iPad. Hay una opción de una cámara (bateo, sentadilla, salto) y testimonios con dos iPads. Mercados: deportes (MLB, NBA, NCAA), fisioterapia y medicina deportiva. Prueba de 14 días; precio no publicado; no menciona procesamiento local ni regulación. — [Uplift.ai](https://www.uplift.ai/)
- Validación (Nicholson et al., Sensors 2026, DOI 10.3390/s26123934): 20 sujetos, saltos con contramovimiento, dos iPhones frente a un Qualisys de 12 cámaras. Límites de concordancia de 11,8 (4,4–19,1), que **superaron los límites fijados a priori**; beta de convergencia 0,87; ICC test-retest 95,5 (Qualisys 94,4). — [CiteDrive, Sensors 2026](https://www.citedrive.com/en/discovery/the-concurrent-validity-and-testretest-reliability-of-a-smartphone-based-markerless-system/)

#### Kinetisense (Canadá)
- Funciona en escritorio e iPad Pro ("un iPad en un trípode"); afirma "más de 40 movimientos de ROM articular". Puntuación KAMS, cribados SFMA, "HIPAA-ready". No publica precisión ni citas, no menciona compensación de tronco y no declara autorización FDA. — [Kinetisense](https://www.kinetisense.com/)
- Kinetisense 360 requiere iPad Pro con LiDAR. Mide ROM de espalda, cuello y flexión de hombro, valgo/varo, marcha, equilibrio y antropometría (alturas y longitudes de segmentos). Afirma que su motor fue "University validated" sin citar estudio. Suscripción de **299,99 USD al mes**. Idiomas: incluye **español** y portugués. La etiqueta de privacidad declara "Photos or Videos" vinculados al usuario. — [App Store, Kinetisense 360](https://apps.apple.com/us/app/kinetisense-360/id1451986368)

#### DARI Motion (Scientific Analytics, EE. UU.)
- 510(k) **K180880**, "DARI Health", del 07/03/2019 **[antiguo]**: clase II, 21 CFR 890.5360, código LXJ. Es un sistema de cámaras de video comerciales (número no indicado en la ficha) con captura 3D sin marcadores, esqueleto digital, cinemática y cinética (fuerza de reacción del suelo). Procesa en local o en una nube segura. — [Innolitics K180880](https://fda.innolitics.com/device/K180880)
- Desempeño en el expediente: ángulos articulares sin diferencia significativa frente al sistema con marcadores (p = 0,33); fuerza frente a plataforma r = 0,995; repetibilidad de centros articulares de 0,811 mm (99 %). El texto es un OCR con errores. — [Innolitics K180880](https://fda.innolitics.com/device/K180880)
- Fue presentado como el primer sistema de análisis de movimiento sin marcadores autorizado por la FDA (con HSS). — [HSS News](https://news.hss.edu/fda-clears-first-markerless-motion-analytic-system/)

#### MAI Motion (MSK Doctors, Reino Unido)
- Plataforma de análisis de movimiento sin marcadores, solo software, con una cámara estándar. Mide ángulos articulares, suavidad del movimiento y ROM en la prueba de sentarse y levantarse (3 repeticiones) y en sentadillas, para detectar declive de movilidad o artrosis de rodilla. Las fuentes son sobre todo del propio fabricante. — [MSK Doctors](https://search.mskdoctors.com/msk/articles/tags/markerless%20motion%20analysis); [Preprints.org 2025](https://www.preprints.org/manuscript/202504.0450/v1)

#### Ochy (Francia; carrera)
- Análisis de carrera con la cámara del móvil, con videos de 10 s de lado y de espaldas: oscilación vertical, apoyo, ciclo de pierna y ángulos articulares. — [SportBusiness 2025](https://tech.sportbusiness.com/2025/04/how-running-app-ochy-is-democratising-elite-level-tech-and-attracting-big-name-partners/); [App Store, Ochy](https://apps.apple.com/us/app/ochy-running-form-analysis/id1531481638)
- Suscripciones y paquetes de 5,99 a 119,99 USD; solo inglés. La etiqueta de privacidad declara fotos y videos recogidos, lo que sugiere subida del video (no confirmado dónde se analiza). — [App Store, Ochy](https://apps.apple.com/us/app/ochy-running-form-analysis/id1531481638)
- Precisión según la empresa: frecuencia de paso 98,85 %, tiempo de contacto 88,71 %, tiempo de vuelo 93,04 %. Rodilla "comparable a 3D"; tobillo y codo más afectados por los límites de la pose 2D. — [Running Industry Alliance](https://www.runningindustryalliance.com/?p=23731)
- Su CTO reconoce que los modelos de pose se entrenan con movimientos poco dinámicos. — [b<>com](https://b-com.com/en/news/ai-for-athletes-ochy-calls-on-bcoms-expertise-to-enhance-its-models)

#### VAY (Suiza; SDK de movimiento B2B)
- Análisis de movimiento en tiempo real con cualquier cámara 2D (móvil o portátil): conteo de repeticiones, seguimiento de forma y coaching. Funciona en apps móviles, en el navegador y en hardware. — [Wevolver](https://www.wevolver.com/article/artificial-intelligence-makes-for-effective-fitness-training); [Startupticker, 07/05/2021](https://startupticker.ch/en/news/re-pivoting-to-growth-vay-s-technology-now-available-in-the-market) **[antiguo]**
- Adquirida por Nautilus (hoy BowFlex) en septiembre de 2021 **[antiguo]**. — [Nautilus](https://nautilusinc.gcs-web.com/node/18616)

#### OneStep (Israel / EE. UU.)
- Análisis de marcha con el sensor del smartphone. Desde noviembre de 2022 **[antiguo]** mide ROM del miembro superior moviendo el teléfono con el brazo (manguito rotador, cuello). El director comercial dijo que el goniómetro clínico tiene un margen de ±5°. — [Fierce Healthcare](https://www.fiercehealthcare.com/digital-health/virtual-physical-therapy-provider-onestep-using-smartphones-determine-upper)
- Se describe como "FDA-listed/registered"; Medical Alley usó "FDA-approved", que contradice la propia empresa. — [OneStep FAQ](https://www.onestep.co/faq); [Medical Alley](https://www.medicalalley.org/onestep-secures-36-million-series-b-for-smartphone-based-motion-analysis-technology/)
- Lista de estudios de validación de marcha (Shahar y Agmon, Sensors 2021; Marom et al., Sensors 2024), que no abrí. — [OneStep, Published research](https://onestep.co/resources/published-research)

#### PeerWell **[antiguo, fecha no confirmada]**
- Plataforma de prehabilitación y rehabilitación para prótesis de cadera y rodilla. Afirmaba medir ROM "solo con el smartphone" y ser "la primera" en hacerlo. No encontré validación. — [HIT Consultant](https://hitconsultant.net/?p=37020)

#### Phio (EQL, Reino Unido) y "Plinth"
- Phio Access es un triaje conversacional (árbol de más de 3000 escenarios MSK, en menos de 5 minutos). Phio Engage ofrece programas de ejercicio, mensajería con clínicos y un panel de dolor y progreso. Está en 11 organizaciones del NHS y en varias juntas de Escocia. Las fuentes no mencionan medición por cámara. — [HTWorld](https://htworld.co.uk/news/digital-health/eleven-nhs-sites-adopt-new-physiotherapy-platform-phio-to-cut-service-wait-times-som25/); [National Health Executive](https://www.nationalhealthexecutive.com/News/ai-driven-physiotherapy-eql)
- No encontré un producto llamado "Plinth" de fisioterapia con IA. — [Búsqueda sin resultados pertinentes](https://apps.apple.com/us/app/-/id6756598601)

#### "Physio AI" y similares
- PhysioAI (App Store): escaneo de postura con seguimiento de ROM y ángulos en el tiempo; avisa que "no es una herramienta de diagnóstico médico y puede no ser perfectamente precisa". — [App Store, PhysioAI](https://apps.apple.com/us/app/-/id6756598601)
- Physmo: rehabilitación prescrita por el clínico, con estimación de pose que registra ángulos y ROM en cada sesión y los envía al fisioterapeuta. — [App Store, Physmo](https://apps.apple.com/kw/app/physmo/id6754895546)

#### Curovate (Canadá; rodilla)
- App de rehabilitación de LCA, prótesis de rodilla y de cadera, con medición de ROM de rodilla, ejercicios en video y chat con un fisioterapeuta. Plan anual de 45,99 USD; mensual entre 8,99 y 12,99 USD según la fuente. Solo inglés. — [App Store, Curovate](https://apps.apple.com/us/app/physical-therapy-acl-knee/id1477712207); [IJSPT 2022](https://pmc.ncbi.nlm.nih.gov/articles/PMC8975558)
- Validación (informe técnico IJSPT 2022, nivel de evidencia 4) **[antiguo]**: **un solo sujeto sano**, 80 mediciones con 4 dispositivos; r ≥ 0,9985 frente al goniómetro. — [IJSPT 2022 (PMC)](https://pmc.ncbi.nlm.nih.gov/articles/PMC8975558)

#### Apps de goniómetro para smartphone
- Revisión sistemática (Keogh et al., PLoS ONE 2019) **[antiguo]**: la mayoría de las apps muestra fiabilidad y validez adecuadas en la mayoría de las pruebas de ROM, con evidencia más débil en la concordancia absoluta. — [PLoS ONE 2019 (PMC)](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6505893/)
- DrGoniometer (por fotografía), flexión de codo, 2026, 56 adultos sanos: excelente fiabilidad intraevaluador y sin sesgo sistemático, pero **límites de concordancia amplios** que limitan la intercambiabilidad. — [Medipol AVESİS](https://avesis.medipol.edu.tr/yayin/d41d9b51-361e-4198-bd3b-5d9f1cd1ded2/the-reliability-and-validity-of-drgoniometer-a-smartphone-application-for-measuring-elbow-flexion)
- DrGoniometer, supinación del antebrazo (J Hand Ther 2019) **[antiguo]**: ICC intraevaluador de 0,74 a 0,88. — [ACU Research Bank](https://acuresearchbank.acu.edu.au/item/86q25/the-validity-and-reliability-of-drgoniometer-a-smartphone-application-for-measuring-forearm-supination)
- DrGoniometer: funciones básicas gratis y compras para respaldo y exportación a Excel. — [Similarweb, DrGoniometer](https://similarweb.com/es/app/apple/362356791)
- Angulus, muñeca y metacarpofalángicas (64 voluntarios): validez de 0,44 a 0,81; fiabilidad interevaluador de 0,91 a 0,96. — [PMC11088398](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC11088398/)
- Clinometer, rotación de cadera (Miley et al., JRSR 2019; n = 76) **[antiguo]**: ICC intraevaluador > 0,81–0,96 en rotación interna; r = 0,94–0,96 frente al goniómetro. — [JRSR 2019](https://jrsr.sums.ac.ir/article_45940.html)
- Goniometer Pro: se declara "solo con fines educativos"; existe un estudio de flexión pasiva de rodilla (Acta Ortopédica Mexicana 2019) cuyos resultados no recuperé. — [Resumen de búsqueda sobre apps](https://apps.apple.com/us/app/-/id6590634426)
- GetMyROM (inclinómetro del iPhone): versión Pro de 4,99–6,99 USD con exportación CSV. El desarrollador cita un ICC de 0,92–0,94 en rotación externa de hombro. — [App Store, GetMyROM Pro](https://apps.apple.com/app/id1437998886)

#### Otros encontrados de paso (no estaban en la lista)
- TRAK (España): rehabilitación digital MSK con la cámara del móvil; reconoce más de 40 movimientos articulares. Trabaja con Mapfre, Sanitas, Quirónsalud y Mutua Universal. — [Motherbase, TRAK](https://my.motherbase.ai/startup/193067-trak); [Physitrack, AI tools](https://www.physitrack.com/insights/best-ai-tech-for-physical-therapy)
- PowerPhysio (Italia) analiza la pose con la cámara del teléfono; VALD MoveHealth es gratis y se combina con plataformas de fuerza. — [Physitrack, AI tools](https://www.physitrack.com/insights/best-ai-tech-for-physical-therapy)
- ViFive: ROM activo de hombro, cadera, rodilla y tobillo por visión; flexión de hombro β = 0,93, rodilla β = 0,78, tobillo β = 0,36. — [JMAI](https://jmai.amegroups.org/article/view/9186/html)

### Inferences
- **La privacidad en el navegador no es un diferenciador por sí sola.** Physitrack anuncia web v1 con pose en el navegador vía WebAssembly, "~33 puntos" de un modelo abierto (coincide con los 33 landmarks de MediaPipe Pose; inferencia no confirmada), sin video y solo con números al servidor. Exer Health dice procesar "on the edge"; Kaia dice que corre en el dispositivo y sin Internet. Fisio-visor debe presentar la privacidad como requisito cumplido, no como su ventaja principal. Lo que sí sigue siendo distintivo es funcionar **totalmente offline**, con el modelo servido localmente: Physitrack necesita su servidor para los resúmenes.
- **El único dato independiente en grados de un competidor directo (Kemtai) muestra un sesgo de +8 a +10°**, con buena repetibilidad. Es el argumento perfecto para la tesis "medimos, corregimos y garantizamos": un sistema puede ser muy repetible y aun así estar sesgado. Fisio-visor debería reportar sesgo y límites de Bland-Altman, no solo ICC.
- Los programas grandes (Hinge, Sword+Kaia) publican acuerdo sobre forma (Kaia) o umbrales internos (Hinge), pero no MAE en grados por articulación. Los productos para clínicos publican sobre todo resúmenes de congreso o informes con n = 1 (Curovate).
- Hinge es el competidor técnicamente más cercano en el discurso: umbrales con MCID y MDC, un "intervalo de error superior unilateral", ambigüedad de profundidad y escorzo reconocidos. Ese intervalo se usa para fijar umbrales internos, no se muestra al paciente (no confirmado).
- **Tabla comparativa (síntesis de los hallazgos anteriores; "nc" = no confirmado):**

| Producto | Mide ROM en grados | Hardware | Validación publicada (independiente) | Muestra incertidumbre | En el dispositivo / offline | Precio | Usuario |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Exer Health / Scan | Sí | iPhone / iPad | Resumen AAOS 2026 (mano y muñeca, ICC) | nc | Afirma "on the edge" / nc | Gratis vía socio; institucional nc | Paciente con código / clínico |
| Kemtai | Sí (versión de investigación) | Móvil o webcam | MJSSM 2024: sesgo +10,4° rodilla, +8,0° cadera | No en la web | nc | nc | Paciente y clínico (B2B) |
| Physitrack MC | ROM frente a objetivo | Webcam (v1), móvil (v2) | Ninguna | No | Navegador, WASM; sin video; requiere servidor | nc ("próximamente") | Paciente en programa domiciliario |
| Hinge TrueMotion | Ángulos (Movement Analysis) | Móvil | Blog interno: umbrales de 3–9°, sin MAE | No para el miembro (nc) | nc | Gratis vía empleador | Paciente |
| Sword (rastreadores / Vision AI) | nc para el usuario | IMU + tableta; móvil | Ninguna encontrada | nc | Vision AI en la app (LinkedIn) | Vía empleador | Paciente |
| Kaia Motion Coach | No en grados (forma) | Cámara frontal del móvil | JMIR 2021 (forma, κ) | No | Sí, sin Internet (fabricante) | Vía plan | Paciente |
| Uplift | Cinemática 3D | 1–2 iPhones o iPads | Sensors 2026: supera límites de concordancia en salto | nc | nc | nc | Deporte y fisioterapia |
| Kinetisense 360 | Sí (más de 40 movimientos) | iPad Pro con LiDAR | Ninguna con cita | nc | nc (declara videos) | 299,99 USD al mes | Clínico |
| DARI | Sí (3D) | Varias cámaras + PC | 510(k) con datos del fabricante | nc | Local o nube | nc | Clínica y deporte |
| OneStep | Sí (miembro superior, 2022) | Sensores del móvil | Estudios de marcha (no abiertos) | nc | nc | nc | Clínico y paciente |
| Curovate | Sí (rodilla) | Móvil | n = 1 sano | nc | nc | 45,99 USD al año | Paciente |
| Goniómetros de móvil | Sí (manual, foto o inclinómetro) | Móvil | Varios estudios pequeños | No | Sí (sin pose) | Gratis a 7 USD | Clínico |

### Gaps
- No pude abrir el estudio Vicon que cita Kemtai, ni el precio de Kemtai, ni su política de video y procesamiento.
- No hay cifras de error en grados de Hinge (MAE por articulación), ni confirmación de si TrueMotion procesa en el dispositivo.
- Un resultado de búsqueda de un sitio de análisis financiero mencionó una consulta de la FDA a Hinge sobre TrueMotion en abril de 2025. No pude verificar la fuente primaria; se considera no confirmado.
- No hay fecha ni fuente oficial del "Vision AI" de Sword (solo un repost de LinkedIn), ni datos de cómo los rastreadores de Sword reportan ROM al usuario.
- El precio institucional de Exer Scan, Uplift, DARI y OneStep no es público.
- No abrí los estudios de validación de OneStep (Sensors 2021 y 2024), ni recuperé los resultados de Goniometer Pro (Acta Ortop. Mex. 2019).
- "Goniometer Records" y "Plinth": no encontré productos con esos nombres; pueden ser nombres incorrectos o productos muy pequeños.
- Sobre MAI Motion, Ochy y VAY no hay validación independiente de ángulos; el estado actual de VAY tras BowFlex está sin confirmar.

## Pregunta 2. ¿Cuáles miden explícitamente ROM en grados y cuáles solo cuentan repeticiones o dan retroalimentación de forma?

### Takeaway
Miden ROM en grados de forma confirmada: Exer, Kemtai (en su versión de investigación), Kinetisense, DARI, OneStep (miembro superior), Curovate y las apps de goniómetro. Hinge (ángulos en Movement Analysis) y Physitrack (ROM frente a objetivo) lo hacen de forma parcial o anunciada. Kaia Motion Coach, VAY y, por lo visible, Sword se centran en forma y repeticiones; Phio es triaje sin cámara.

### Cited Findings
- Exer Health "mide ángulos articulares y ROM" y además cuenta repeticiones y corrige la forma. — [App Store, Exer Health](https://apps.apple.com/app/id1505858367)
- Kemtai fue validado en grados (flexión de rodilla 130,02° frente a 119,59° del EasyAngle), pero con "una versión ajustada (versión 4) que mide ROM". — [MJSSM 2024](https://mjssm.me/clanci/MJSSM_September_2024_Nedovic.pdf)
- Physitrack Motion Capture: repeticiones por umbrales de ángulo (<90°, >160°), retenciones, advertencias de forma y "ROM achieved vs target". — [Physitrack Motion Capture](https://www.physitrack.com/motion-capture)
- Hinge Movement Analysis registra "joint angles, symmetry, and endurance"; TrueMotion en los ejercicios "analiza tu ROM" y da retroalimentación en tiempo real. — [Business Wire 2025](https://www.businesswire.com/news/home/20251021731830/en/Hinge-Health-unveils-new-AI-powered-care-tools); [Hinge R&D](https://rnd.hingehealth.com/blog/tracking-progress-measuring-movement)
- Kaia Motion Coach da retroalimentación de forma y postura; "evalúa flexibilidad, ROM y estabilidad" sin dar valores en grados. — [Kaia Motion Coach](https://kaiahealth.com/motion-coach/)
- Kaia fue validado en acuerdo sobre correcciones de ejercicio, no en ROM. — [JMIR 2021](https://jmir.org/2021/7/e26658)
- VAY: conteo de repeticiones, seguimiento de forma y coaching personalizado. — [Wevolver](https://www.wevolver.com/article/artificial-intelligence-makes-for-effective-fitness-training)
- Sword Phoenix: "real-time form correction" y guía conversacional (fuente de LinkedIn). — [LinkedIn, repost](https://pt.linkedin.com/in/jpfdop)
- Kinetisense: más de 40 movimientos de ROM articular. — [Kinetisense](https://www.kinetisense.com/)
- DARI: cinemática 3D y cinética. — [Innolitics K180880](https://fda.innolitics.com/device/K180880)
- OneStep: ROM del miembro superior. — [Fierce Healthcare](https://www.fiercehealthcare.com/digital-health/virtual-physical-therapy-provider-onestep-using-smartphones-determine-upper)
- Curovate: ROM de rodilla. — [IJSPT 2022](https://pmc.ncbi.nlm.nih.gov/articles/PMC8975558)
- Phio: triaje y programas de ejercicio, sin medición por cámara en las fuentes. — [HTWorld](https://htworld.co.uk/news/digital-health/eleven-nhs-sites-adopt-new-physiotherapy-platform-phio-to-cut-service-wait-times-som25/)
- Ochy: ángulos articulares en carrera, con la rodilla como articulación más precisa según la empresa. — [Running Industry Alliance](https://www.runningindustryalliance.com/?p=23731)

### Inferences
- En los programas para pacientes, el ROM suele ser un subproducto del conteo y de la corrección de forma. En las herramientas para clínicos, el ROM en grados es el producto principal. Fisio-visor compite en el segundo grupo (fisioterapeuta a domicilio, que mide él mismo), donde los rivales directos son Exer Scan (iPad, solo en clínica), Kinetisense (iPad Pro con LiDAR, 299,99 USD al mes), Kemtai y los goniómetros de móvil.
- Exer Scan prohíbe el uso domiciliario sin supervisión; Fisio-visor apunta a visitas domiciliarias con el fisioterapeuta presente. Es un nicho poco cubierto por los productos para clínicos confirmados.

### Gaps
- No confirmé si Sword muestra ROM en grados al miembro o al fisioterapeuta.
- No confirmé si Kemtai entrega grados en su producto comercial o solo en la versión de investigación.
- No confirmé si el ROM de PeerWell era por cámara o por los sensores del teléfono.

## Pregunta 3. ¿Algún producto muestra intervalo de incertidumbre, estado de "medición no confiable", compensación de tronco en hombro o corrección de escorzo?

### Takeaway
No encontré ningún producto comercial que muestre al usuario un intervalo de incertidumbre (ROM ± semiancho), un estado explícito de "medición no confiable", la compensación de tronco en el ROM de hombro (aparente frente a real) ni una corrección de escorzo por software basada en longitudes óseas calibradas. Los competidores atacan la profundidad con hardware (LiDAR, varias cámaras) o con modelos 2D→3D, y Hinge reconoce el escorzo como problema abierto. Son ausencias en lo publicado, no pruebas de que no existan internamente.

### Cited Findings
- Physitrack Motion Capture no menciona indicadores de confianza ni de calidad de seguimiento; sí tiene un indicador genérico de "compensation warnings" en los códigos de forma, sin especificar el tronco. — [Physitrack Motion Capture](https://www.physitrack.com/motion-capture)
- La página de ROM de Kemtai no muestra tasas de error, puntuaciones de confianza ni métricas de fiabilidad, ni detección de compensaciones. — [Kemtai ROM](https://kemtai.com/product/range-of-motion/)
- La página de Kinetisense no menciona la compensación de tronco en hombro. — [Kinetisense](https://www.kinetisense.com/)
- Hinge usa un "intervalo de error superior unilateral" con MCID y MDC para definir "safe zones" internas; el blog no describe que se muestre confianza al miembro ni que se rechacen mediciones. — [Hinge R&D](https://rnd.hingehealth.com/blog/tracking-progress-measuring-movement)
- Hinge lista el escorzo y la distorsión de perspectiva como desafíos. La herramienta de anotación consideró la transformación de perspectiva, la colocación de la cámara y las proporciones corporales, pero el blog **no describe una corrección en tiempo de ejecución**. Para la inclinación lateral alinearon el esqueleto 3D al vector de los tobillos. — [Hinge R&D](https://rnd.hingehealth.com/blog/tracking-progress-measuring-movement)
- Kinetisense 360 requiere LiDAR (sensor de profundidad) y mide longitudes de segmentos en un "Anthropometric Scan". No describe que las use para corregir el escorzo. — [App Store, Kinetisense 360](https://apps.apple.com/us/app/kinetisense-360/id1451986368)
- DARI resuelve el 3D con varias cámaras y un esqueleto digital; en el 510(k) reporta la repetibilidad de las longitudes de segmento. — [Innolitics K180880](https://fda.innolitics.com/device/K180880)
- Uplift Capture usa dos iPhones o iPads para 3D. — [Uplift.ai](https://www.uplift.ai/); [Sensors 2026](https://www.citedrive.com/en/discovery/the-concurrent-validity-and-testretest-reliability-of-a-smartphone-based-markerless-system/)
- Una búsqueda dirigida no halló ningún producto comercial que marque compensación de tronco en tareas de hombro; la compensación de tronco solo se ha validado en investigación (por ejemplo, Kinect frente a captura de video al alcanzar objetos, con 5 sujetos). — [PMC7763626](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7763626/)
- Las apps de bienestar avisan en texto genérico, como PhysioAI: "may not be perfectly accurate in every case". Es un descargo legal, no una indicación por medición. — [App Store, PhysioAI](https://apps.apple.com/us/app/-/id6756598601)
- En investigación, el ROM de hombro con pose 2D en el iPhone (Apple Vision) concordó con 3D (R² > 0,93), pero lo **sobrestimó**, y la posición del teléfono influyó. — [PMC10818695](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC10818695/)

### Inferences
- Los tres diferenciadores de Fisio-visor parecen genuinos frente a lo que se publica: intervalo conformal calibrado y mostrado al usuario, ROM de hombro aparente frente a real con la inclinación del tronco, y corrección de escorzo con longitudes calibradas y una sola cámara RGB. La defensa debe decir "no encontramos evidencia pública de", no "nadie lo hace".
- El hecho de que Hinge defina umbrales clínicos con intervalos de error valida la idea de cuantificar la incertidumbre. La diferencia de Fisio-visor es mostrarla **por medición** y con cobertura medida en datos no usados para calibrar.
- La corrección de escorzo de Fisio-visor compite conceptualmente con soluciones de hardware (LiDAR en Kinetisense, varias cámaras en DARI y Uplift). El argumento es lograr una mejora parecida con la webcam de la laptop que el fisioterapeuta ya tiene, pero solo si el benchmark lo confirma; por ahora es una hipótesis.
- El sesgo de Kemtai (+8 a +10°) y la sobrestimación de la pose 2D en hombro sugieren que la compensación de tronco y la corrección geométrica atacan errores reales y documentados.

### Gaps
- No pude revisar las apps por dentro. Algunas podrían mostrar mensajes de "acércate" o "no te vemos completo" sin documentarlo; Hinge trabaja con poses fuera de cuadro, pero no dice qué ve el usuario.
- No confirmé si Kinetisense o Exer reportan compensaciones de tronco en sus informes de hombro.

## Pregunta 4. Disponibilidad en Latinoamérica, Ecuador o en español

### Takeaway
No encontré ningún producto de esta lista con presencia confirmada en Ecuador. El español está confirmado en Hinge Health (solo para miembros de EE. UU.), en la interfaz de Kinetisense 360 y en el contenido web de Physitrack. En el mundo hispano los actores más cercanos son TRAK (España, cámara del móvil), DyCare ReHub (España, sensores inerciales) y Aictive (Chile, 2022, estado actual no confirmado).

### Cited Findings
- Hinge Health: app en inglés, español y francés canadiense, pero ligada a empleadores y planes de EE. UU. — [FAQ de Hinge, BCBSTX](https://healthselect.bcbstx.com/pdf/hinge-health-faq.pdf)
- Kinetisense 360 incluye español y portugués entre sus idiomas. — [App Store, Kinetisense 360](https://apps.apple.com/us/app/kinetisense-360/id1451986368)
- Physitrack publica contenido en español. — [Physitrack ES](https://www.physitrack.com/es/insights/best-ai-tech-for-physical-therapy)
- Exer Health, Curovate y Ochy figuran solo en inglés en el App Store. — [Exer Health](https://apps.apple.com/app/id1505858367); [Curovate](https://apps.apple.com/us/app/physical-therapy-acl-knee/id1477712207); [Ochy](https://apps.apple.com/us/app/ochy-running-form-analysis/id1531481638)
- Exer Scan: inglés. — [App Store, Exer Scan](https://apps.apple.com/us/app/exer-scan/id6466210809)
- Kaia: selector de región con EE. UU. y Alemania. — [Kaia Motion Coach](https://kaiahealth.com/motion-coach/)
- TRAK (España): cámara del móvil, más de 40 movimientos, clientes españoles (Mapfre, Sanitas, Quirónsalud, Mutua Universal). — [Motherbase, TRAK](https://my.motherbase.ai/startup/193067-trak)
- DyCare ReHub (Barcelona): telerrehabilitación con el sensor propio DyTrack; el proyecto fue financiado por la UE. — [CORDIS](https://www.cordis.europa.eu/article/id/413335-a-new-paradigm-in-physical-rehabilitation)
- Aictive (Chile, 2022) **[antiguo]**: plataforma de kinesiólogos que mapea el movimiento con IA desde un computador o tableta con cámara, y exploraba expandirse a Latinoamérica y España. — [Diario Financiero](https://www.df.cl/df-mas/punto-de-partida/los-kinesiologos-que-crearon-una-aplicacion-que-mapea-movimientos-del)

### Inferences
- En Ecuador no hay un competidor confirmado con medición de ROM por cámara, en español, para fisioterapeutas a domicilio. Los productos de EE. UU. dependen de empleadores o planes estadounidenses, o de un código de un socio, y no están disponibles para un fisioterapeuta ecuatoriano independiente. Kinetisense sí está disponible, pero cuesta 299,99 USD al mes y requiere un iPad Pro.
- Una herramienta gratuita, en español, que funciona con la laptop que el fisioterapeuta ya tiene y sin Internet (útil en zonas rurales con mala conexión) cubre un hueco real de acceso. Es una inferencia de mercado, no un dato.

### Gaps
- No encontré datos de presencia en Ecuador ni en la región andina de ningún producto.
- Un resultado de búsqueda mencionó una alianza de Sword Health con el SUS de Brasil (triaje y listas de espera), pero la fuente fue un perfil de LinkedIn no verificable; se considera no confirmado.
- No verifiqué si Kemtai o el Motion Capture de Physitrack tendrán interfaz o voz en español.

## Pregunta 5. Estado regulatorio (FDA 510(k), marca CE)

### Takeaway
Solo DARI tiene una autorización 510(k) confirmada para análisis de movimiento sin marcadores (K180880, 2019). Exer Scan se declara clase II exenta de 510(k). Sword y OneStep están "listados" o "registrados" ante la FDA, no autorizados. El 510(k) de Hinge (Enso) no es de visión. Kaia tiene marca CE como dispositivo médico. Physitrack evita la regulación presentándose como herramienta de medición y reporte, no de decisión.

### Cited Findings
- DARI Health K180880: autorizado el 07/03/2019, clase II, 21 CFR 890.5360, código LXJ, con el predicado Peak Motus (K030714). — [Innolitics K180880](https://fda.innolitics.com/device/K180880)
- Exer Scan: "Class II 510(k)-exempt medical device under 21 CFR § 890.5050"; ISO 13485:2016. — [App Store, Exer Scan](https://apps.apple.com/us/app/exer-scan/id6466210809)
- SWORD Phoenix 2.0 en GUDID: código ISD, número de presentación premercado "Not Available/Not Released". — [AccessGUDID](https://accessgudid.nlm.nih.gov/devices/05600775530051)
- Los rastreadores de Sword son "FDA-listed". — [Sharecare](https://www.sharecare.com/digital-therapeutics/msk)
- Hinge Enso: K233784, del 23/02/2024 (21 CFR 882.5890, alivio del dolor). — [RegDataLab](https://www.regdatalab.com/510k/K233784)
- Hinge solo llama "FDA-cleared" a Enso. — [Hinge Enso](https://www.hingehealth.com/how-it-works/enso)
- Kaia: marca CE (sello "Medical Device 2024"), ISO 13485 (TÜV Süd); no menciona la FDA. — [Kaia Motion Coach](https://kaiahealth.com/motion-coach/)
- OneStep: "FDA-listed/registered" según su FAQ; un tercero dice "FDA-approved", en contradicción. — [OneStep FAQ](https://www.onestep.co/faq); [Medical Alley](https://www.medicalalley.org/onestep-secures-36-million-series-b-for-smartphone-based-motion-analysis-technology/)
- Physitrack Motion Capture: "a measurement and reporting tool, not a decision-making tool"; no diagnostica, no recomienda tratamientos ni predice resultados. — [Physitrack Motion Capture](https://www.physitrack.com/motion-capture)
- Kinetisense solo declara "HIPAA-ready"; la página no menciona FDA ni CE. — [Kinetisense](https://www.kinetisense.com/)
- Goniometer Pro se declara "solo con fines educativos" (resumen de búsqueda). — [App Store, app de goniómetro](https://apps.apple.com/us/app/-/id6590634426)

### Inferences
- Para un concurso estudiantil, la regulación no es una barrera inmediata. Sí conviene que la defensa use el mismo encuadre que Physitrack y Exer: herramienta de medición que asiste al fisioterapeuta, no diagnóstica. También conviene mencionar que en Ecuador cualquier uso clínico requeriría revisar la normativa de ARCSA (no investigado aquí).
- Que incluso los productos comerciales grandes estén solo "listados" o sean "exentos" indica que el mercado compite en evidencia y no en autorizaciones. Eso refuerza la estrategia de Fisio-visor de competir con validación propia y transparente.

### Gaps
- No verifiqué el registro de Kaia en el directorio alemán DiGA ni su estado tras la compra por Sword.
- No investigué la regulación ecuatoriana (ARCSA) de software como dispositivo médico.
- No confirmé el contenido exacto de 21 CFR 890.5050 frente a 890.5360 (por qué Exer es exenta y DARI necesitó un 510(k)).
- No verifiqué la supuesta consulta de la FDA a Hinge sobre TrueMotion en 2025.
