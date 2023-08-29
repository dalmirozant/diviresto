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
    };
    this.calculo();
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
          i < largoDividendo ? parseInt(dividendoString.substring(i)) : null;
        break;
      }
    }
  }
}
