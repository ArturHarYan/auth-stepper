import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function strictRangeValidator(min: number, max: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (value == null || value === '') return null;

    if (typeof value === 'string') {
      if (value.length > 1 && value[0] === '0') {
        return {
          invalidFormat: true,
          message: 'Numbers with leading zeros are invalid',
        };
      }

      if (!/^-?\d+$/.test(value)) {
        return { invalidNumber: true };
      }
    }

    const num = Number(value);
    if (isNaN(num)) {
      return { invalidNumber: true };
    }

    return num >= min && num <= max ? null : { range: true };
  };
}
