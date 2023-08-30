export interface Result {
  dividendo: number;
  divisor: number;
  cociente?: number;
  cocienteInt?: number;
  resto?: number;
  minimo?: number;
  restante?: string | null;
  restas: Resta[];
}

export interface Resta {
  minimo?: number;
  cocienteParcial?: number;
  producto?: number;
  resta?: number;
  numeroAdd?: string | null;
  numeroCompleto?: number;
}
