// Parámetros del filtro 1€ (Casiez, Roussel y Vogel, CHI 2012).
// AÚN NO ESTÁN AJUSTADOS: son valores de partida.
// - minCutoff = 1 Hz y dCutoff = 1 Hz: valores por defecto del paquete 1eurofilter.
// - beta = 0.1: el valor del ejemplo mínimo del paquete.
// Ajuste pendiente con el procedimiento del artículo: beta = 0 y bajar minCutoff hasta quitar
// el temblor en reposo; después subir beta hasta quitar el retraso en movimientos rápidos.
export const ONE_EURO_PARAMS = {
  minCutoff: 1.0,
  beta: 0.1,
  dCutoff: 1.0,
};

// Frecuencia inicial estimada, en Hz. Solo se usa en el primer cuadro:
// después el filtro la recalcula con las marcas de tiempo. 30 Hz es lo típico de una webcam.
export const INITIAL_FREQUENCY_HZ = 30;
