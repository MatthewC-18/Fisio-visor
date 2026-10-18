import { useEffect, useRef, type RefObject } from 'react';
import { ARM_LANDMARKS } from '../goniometry/constants';
import type { ElbowReading } from '../pipeline/elbowPipeline';
import { ARM_LINE_WIDTH_PX, ARM_POINT_RADIUS_PX, FILTERED_COLOR, RAW_COLOR } from './constants';

interface CameraViewProps {
  videoRef: RefObject<HTMLVideoElement | null>;
  raw: ElbowReading | null;
  filtered: ElbowReading | null;
}

/** Dibuja hombro, codo y muñeca del lado medido. Solo se dibuja; el video no se guarda. */
function drawArm(context: CanvasRenderingContext2D, reading: ElbowReading, color: string): void {
  if (!reading.side) {
    return;
  }
  const { shoulder, elbow, wrist } = ARM_LANDMARKS[reading.side];
  const points = [reading.image[shoulder], reading.image[elbow], reading.image[wrist]];
  const { width, height } = context.canvas;

  context.strokeStyle = color;
  context.fillStyle = color;
  context.lineWidth = ARM_LINE_WIDTH_PX;
  context.beginPath();
  points.forEach((p, i) => {
    if (!p) {
      return;
    }
    if (i === 0) {
      context.moveTo(p.x * width, p.y * height);
    } else {
      context.lineTo(p.x * width, p.y * height);
    }
  });
  context.stroke();

  for (const p of points) {
    if (p) {
      context.beginPath();
      context.arc(p.x * width, p.y * height, ARM_POINT_RADIUS_PX, 0, 2 * Math.PI);
      context.fill();
    }
  }
}

export function CameraView({ videoRef, raw, filtered }: CameraViewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !video || !context) {
      return;
    }
    // El lienzo usa el tamaño real del video para que los landmarks caigan en su sitio.
    if (canvas.width !== video.videoWidth || canvas.height !== video.videoHeight) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
    }
    context.clearRect(0, 0, canvas.width, canvas.height);
    if (raw) {
      drawArm(context, raw, RAW_COLOR);
    }
    if (filtered) {
      drawArm(context, filtered, FILTERED_COLOR);
    }
  }, [videoRef, raw, filtered]);

  return (
    // Espejo solo visual, como un espejo real. Los lados que se reportan son los del paciente.
    <div className="camera">
      <video ref={videoRef} playsInline muted />
      <canvas ref={canvasRef} />
    </div>
  );
}
