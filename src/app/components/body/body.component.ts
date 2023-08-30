import { Component } from '@angular/core';
import { Result } from 'src/app/models/result.interface';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss'],
})
export class BodyComponent {
  result!: Result;
  constructor() {}

  onResult(formValue: Result) {
    const dividendo = formValue.dividendo;
    const divisor = formValue.divisor;
    this.result = {
      dividendo,
      divisor,
      cociente: dividendo / divisor,
      cocienteInt: Math.trunc(dividendo / divisor),
      resto: dividendo % divisor,
      restas: [],
    };
    this.calculo();
    this.procesar(this.result.minimo!);
    this.procesarLoop();
    console.log('RESPUESTA: ', this.result);
  }

  private calculo(): void {
    const dividendoString = this.result.dividendo.toString();
    const largoDividendo = dividendoString.length;
    for (let i = 1; i <= largoDividendo; i++) {
      let min = parseInt(dividendoString.substring(0, i));
      if (min / this.result.divisor >= 1) {
        this.result.minimo = min;
        this.result.restante =
          i < largoDividendo ? dividendoString.substring(i) : null;
        break;
      }
    }
  }

  private procesar(minimo: number, numeroAdd?: string): void {
    const nuevoMinimo = numeroAdd ? parseInt(`${minimo}${numeroAdd}`) : minimo;
    const cocienteParcial = Math.trunc(nuevoMinimo / this.result.divisor);
    const producto = cocienteParcial * this.result.divisor;
    const resta = nuevoMinimo - producto;
    this.result.restas.push({
      minimo,
      numeroAdd,
      cocienteParcial,
      producto,
      resta,
    });
  }

  procesarLoop(): void {
    const restanteLength = this.result.restante?.length;
    for (let i = 0; i < restanteLength!; i++) {
      this.procesar(
        this.result.restas[this.result.restas.length - 1].resta!,
        this.result.restante?.substring(i, i + 1)
      );
    }
  }
}
