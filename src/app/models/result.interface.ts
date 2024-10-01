export interface Result {
  dividendo: number;
  divisor: number;
  cociente?: number;
  cocienteInt?: number | string;
  resto?: number;
  restoParcial?: number;
  minimo?: number;
  restante?: string | null;
  restas?: Resta[];
  decimales?: number;
}

export interface Resta {
  minimo?: number;
  cocienteParcial?: number;
  producto?: number;
  resta?: number;
  numeroAdd?: string | null;
  numeroCompleto?: number;
  esDecimal?: boolean;
}
