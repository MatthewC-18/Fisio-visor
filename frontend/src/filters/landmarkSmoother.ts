import { OneEuroFilter } from '1eurofilter';
import { INITIAL_FREQUENCY_HZ, ONE_EURO_PARAMS } from './constants';

interface Point {
  x: number;
  y: number;
  z: number;
  visibility: number;
}

interface PointFilters {
  x: OneEuroFilter;
  y: OneEuroFilter;
  z: OneEuroFilter;
}

function createFilter(): OneEuroFilter {
  const { minCutoff, beta, dCutoff } = ONE_EURO_PARAMS;
  return new OneEuroFilter(INITIAL_FREQUENCY_HZ, minCutoff, beta, dCutoff);
}

/**
 * Suaviza cada coordenada (x, y, z) de cada landmark con su propio filtro 1€.
 * La visibilidad pasa sin filtrar: es una probabilidad, no una posición.
 * Guarda estado entre cuadros, así que se usa una instancia por cada flujo de landmarks.
 */
export class LandmarkSmoother {
  private filters: PointFilters[] = [];

  smooth<T extends Point>(landmarks: readonly T[], timestampMs: number): T[] {
    // El paquete espera la marca de tiempo en segundos.
    const timestampSec = timestampMs / 1000;
    return landmarks.map((point, index) => {
      const filters = this.filtersFor(index);
      return {
        ...point,
        x: filters.x.filter(point.x, timestampSec),
        y: filters.y.filter(point.y, timestampSec),
        z: filters.z.filter(point.z, timestampSec),
      };
    });
  }

  /** Olvida la historia, por ejemplo cuando se pierde a la persona. */
  reset(): void {
    this.filters = [];
  }

  private filtersFor(index: number): PointFilters {
    const existing = this.filters[index];
    if (existing) {
      return existing;
    }
    const created = { x: createFilter(), y: createFilter(), z: createFilter() };
    this.filters[index] = created;
    return created;
  }
}
