import { CAMERA_IDEAL_HEIGHT_PX, CAMERA_IDEAL_WIDTH_PX } from './constants';

/** Traduce los errores de getUserMedia a mensajes que entienda quien usa la app. */
function cameraErrorMessage(error: unknown): string {
  if (error instanceof DOMException) {
    switch (error.name) {
      case 'NotAllowedError':
        return 'No hay permiso para usar la cámara. Habilítalo en el navegador y recarga la página.';
      case 'NotFoundError':
        return 'No se encontró ninguna cámara conectada.';
      case 'NotReadableError':
        return 'La cámara está ocupada por otra aplicación. Ciérrala y recarga la página.';
    }
  }
  return 'No se pudo abrir la cámara.';
}

/** Abre la cámara frontal. El video se queda en el navegador: aquí nunca se envía a ningún lado. */
export async function openCamera(): Promise<MediaStream> {
  if (!navigator.mediaDevices?.getUserMedia) {
    throw new Error('Este navegador no permite usar la cámara.');
  }
  try {
    return await navigator.mediaDevices.getUserMedia({
      video: {
        width: { ideal: CAMERA_IDEAL_WIDTH_PX },
        height: { ideal: CAMERA_IDEAL_HEIGHT_PX },
        facingMode: 'user',
      },
      audio: false,
    });
  } catch (error) {
    throw new Error(cameraErrorMessage(error), { cause: error });
  }
}

export function stopCamera(stream: MediaStream): void {
  stream.getTracks().forEach((track) => track.stop());
}
