import { FormControl, FormGroup } from '@angular/forms';
import { CustomValidators } from './custom.validators';

describe('CustomValidators', () => {
  describe('isMajorTo', () => {
    function buildGroup(dividendo: any, divisor: any) {
      return new FormGroup({
        dividendo: new FormControl(dividendo),
        divisor: new FormControl(divisor),
      });
    }

    it('should return null when any control is empty or null', () => {
      const validator = CustomValidators.isMajorTo();

      expect(validator(buildGroup('', '10'))).toBeNull();
      expect(validator(buildGroup('10', ''))).toBeNull();
      expect(validator(buildGroup(null, '10'))).toBeNull();
      expect(validator(buildGroup('10', null))).toBeNull();
    });

    it('should return null when divisor is smaller than dividendo', () => {
      const validator = CustomValidators.isMajorTo();
      const group = buildGroup('100', '10');

      const result = validator(group);

      expect(result).toBeNull();
    });

    it('should return error when divisor is greater or equal to dividendo', () => {
      const validator = CustomValidators.isMajorTo();

      expect(validator(buildGroup('10', '10'))).toEqual({ majorTo: true });
      expect(validator(buildGroup('10', '20'))).toEqual({ majorTo: true });
    });

    it('should return error when values cannot be converted to numbers', () => {
      const validator = CustomValidators.isMajorTo();
      const group = buildGroup('abc', '5');

      const result = validator(group);

      expect(result).toEqual({ majorTo: true });
    });
  });

  describe('intPositive', () => {
    function buildGroup(decimales: any) {
      return new FormGroup({
        decimales: new FormControl(decimales),
      });
    }

    it('should return null when value is empty or null (handled by required)', () => {
      const validator = CustomValidators.intPositive();

      expect(validator(buildGroup(''))).toBeNull();
      expect(validator(buildGroup(null))).toBeNull();
    });

    it('should return notNumber when value is NaN', () => {
      const validator = CustomValidators.intPositive();
      const result = validator(buildGroup('abc'));

      expect(result).toEqual({ notNumber: true });
    });

    it('should return notInteger when value is not an integer', () => {
      const validator = CustomValidators.intPositive();
      const result = validator(buildGroup(1.5));

      expect(result).toEqual({ notInteger: true });
    });

    it('should return negative when value is out of range [0, 10]', () => {
      const validator = CustomValidators.intPositive();

      expect(validator(buildGroup(-1))).toEqual({ negative: true });
      expect(validator(buildGroup(11))).toEqual({ negative: true });
    });

    it('should return null for valid integer in range [0, 10]', () => {
      const validator = CustomValidators.intPositive();

      expect(validator(buildGroup(0))).toBeNull();
      expect(validator(buildGroup(5))).toBeNull();
      expect(validator(buildGroup(10))).toBeNull();
    });
  });
});

