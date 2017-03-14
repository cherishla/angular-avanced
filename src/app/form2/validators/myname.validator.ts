import { AbstractControl } from '@angular/forms';

export function myNameValidator(control: AbstractControl) {
  if (control.value.indexOf('Lala') == 0) {
    if ((control.value as string).endsWith('0')) {
      return { myName: true };
    }
  }
  return null;
}
