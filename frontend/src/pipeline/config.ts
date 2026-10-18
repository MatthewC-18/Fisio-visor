// Flags de las etapas del pipeline (CLAUDE.md §5).
// Cada etapa se puede apagar: sin esto no hay estudio de ablación.
// En esta prueba de concepto solo existe la etapa del filtro 1€.
export interface PipelineConfig {
  oneEuro: boolean;
}

export const DEFAULT_PIPELINE_CONFIG: PipelineConfig = {
  oneEuro: true,
};
