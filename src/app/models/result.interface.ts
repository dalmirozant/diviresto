export interface Result {
  dividendo: number;
  divisor: number;
  cociente?: number;
  cocienteInt?: number;
  resto?: number;
  minimo?: number;
  restante?: number | null;
}

export interface Resta {
  cocienteParcial?: number;
  producto?: number;
  resta?: number;
  numeroAdd?: number;
  numeroCompleto?: number;
}
