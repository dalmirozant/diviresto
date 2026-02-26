import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidators {
  static isMajorTo(): ValidatorFn {
    return (controls: AbstractControl): ValidationErrors | null => {
      const dividendo = controls.get('dividendo')?.value;
      const divisor = controls.get('divisor')?.value;

      if (dividendo === '' || divisor === '' || dividendo == null || divisor == null) {
        // No hay errores si uno de los campos está vacío; dejamos que otros
        // validadores (p.ej. required) se encarguen de estos casos.
        return null;
      }

      const dividendoValue = Number(dividendo);
      const divisorValue = Number(divisor);

      if (Number.isNaN(dividendoValue) || Number.isNaN(divisorValue)) {
        return { majorTo: true };
      }

      if (divisorValue >= dividendoValue) {
        return { majorTo: true };
      }

      return null;
    };
  }

  static intPositive(): ValidatorFn {
    return (controls: AbstractControl): ValidationErrors | null => {
      const decimales = controls.get('decimales')?.value;
      const value = Number(decimales);

      if (decimales === '' || decimales == null) {
        // El required del control se encarga de este caso.
        return null;
      }

      if (Number.isNaN(value)) {
        return { notNumber: true };
      }

      if (!Number.isInteger(value)) {
        return { notInteger: true };
      }

      if (value < 0 || value > 10) {
        // Reutilizamos la misma clave usada en la plantilla para mostrar
        // el mensaje de rango (min 0 max 10).
        return { negative: true };
      }

      return null;
    };
  }
}
