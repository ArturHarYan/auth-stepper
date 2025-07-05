import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const confirmPasswordValidator = (
  passwordControlName: string
): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    const passwordControl = control.parent?.get(passwordControlName);
    if (passwordControl && control.value !== passwordControl.value) {
      return { mismatch: true };
    }
    return null;
  };
};
