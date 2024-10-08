import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidators {
  static isMajorTo(): ValidatorFn {
    return (controls: AbstractControl): ValidationErrors | null => {
      const dividendo = controls.get('dividendo')?.value;
      const divisor = controls.get('divisor')?.value;

      if (dividendo === '' || divisor === '') {
        return null; // No hay errores si uno de los campos está vacío
      }

      const dividendoValue = parseInt(dividendo);
      const divisorValue = parseInt(divisor);

      if (divisorValue >= dividendoValue) {
        return { majorTo: true };
      }

      return null;
    };
  }

  static intPositive(): ValidatorFn {
    return (controls: AbstractControl): ValidationErrors | null => {
      const decimales = controls.get('decimales')?.value;
      if (typeof parseInt(decimales) !== 'number') {
        return { notNumber: true };
      } else if (parseInt(decimales) < 0) {
        return { negative: true };
      } else if (parseFloat(decimales) - parseInt(decimales) > 0) {
        return { notInteger: true };
      }

      return null;
    };
  }
}
