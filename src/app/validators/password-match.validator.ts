import { AbstractControl, ValidatorFn } from "@angular/forms";

export function controlMatchValidator(controlName: string, matchingControlName: string): ValidatorFn | null {
  return (form: AbstractControl) => {
    const control = form.get(controlName);
    const matchingControl = form.get(matchingControlName);

    if (!control || !matchingControl) {
      return null; // controls not yet available
    }

    if (matchingControl.errors && !matchingControl.errors?.['mismatch']) {
      return null;  // another validator has already set an error
    }

    if (control?.value !== matchingControl?.value) {
      matchingControl?.setErrors({ mismatch: true });
    } else {
      matchingControl?.setErrors(null);
    }

    return null;
  };
}
