import { AbstractControl, ValidatorFn } from '@angular/forms';

export function myNameValidator(control: AbstractControl) {
  if (control.value.indexOf('Lala') == 0) {
    if ((control.value as string).endsWith('0')) {
      return { myName: true };
    }
  }
  return null;
}

export function forbiddenNameValidator(nameRe: RegExp): ValidatorFn {
  return(control: AbstractControl):{[key: string]:any}=>{
    const name = control.value;
    const no = nameRe.test(name);
    return no ? {'forbiddenName': true}: null;
  }
}
