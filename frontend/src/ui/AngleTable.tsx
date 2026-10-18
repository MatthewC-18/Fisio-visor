import type { ElbowReading } from '../pipeline/elbowPipeline';
import type { AngleResult, BodySide } from '../types';
import { DISPLAY_DECIMALS, FILTERED_COLOR, RAW_COLOR } from './constants';

interface AngleTableProps {
  raw: ElbowReading | null;
  filtered: ElbowReading | null;
}

const SIDE_LABEL: Record<BodySide, string> = { left: 'Izquierdo', right: 'Derecho' };

const FAILURE_LABEL: Record<Extract<AngleResult, { ok: false }>['reason'], string> = {
  low_visibility: 'Brazo no visible',
  zero_length_segment: 'Segmento sin longitud',
};

/** Si la medición no es confiable se dice por qué, en lugar de mostrar un número. */
function formatAngle(result: AngleResult | undefined): string {
  if (!result) {
    return '—';
  }
  return result.ok ? `${result.degrees.toFixed(DISPLAY_DECIMALS)}°` : FAILURE_LABEL[result.reason];
}

function formatSide(side: BodySide | null | undefined): string {
  return side ? SIDE_LABEL[side] : '—';
}

export function AngleTable({ raw, filtered }: AngleTableProps) {
  return (
    <table className="angles">
      <thead>
        <tr>
          <th>Flexión de codo</th>
          <th>
            <span className="swatch" style={{ background: RAW_COLOR }} /> Sin filtro
          </th>
          <th>
            <span className="swatch" style={{ background: FILTERED_COLOR }} /> Con filtro 1€
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>2D (plano de la imagen)</th>
          <td>{formatAngle(raw?.flexion2D)}</td>
          <td>{formatAngle(filtered?.flexion2D)}</td>
        </tr>
        <tr>
          <th>3D (landmarks de mundo)</th>
          <td>{formatAngle(raw?.flexion3D)}</td>
          <td>{formatAngle(filtered?.flexion3D)}</td>
        </tr>
        <tr>
          <th>Lado medido</th>
          <td>{formatSide(raw?.side)}</td>
          <td>{formatSide(filtered?.side)}</td>
        </tr>
      </tbody>
    </table>
  );
}
