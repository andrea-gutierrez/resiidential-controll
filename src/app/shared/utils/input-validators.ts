import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export function lettersValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const hasOnlyLetters = /^[a-zA-Z]+$/.test(control.value);

    return !hasOnlyLetters ? {nonLetter: true} : null;
  }
}

export function specialCharacterValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const hasSpecialCharacter = /^[a-zA-Z0-9^_=!#$%&()*+\-.:'\/?@ ]*$/.test(control.value);

    return hasSpecialCharacter ? {specialCharacter: true} : null;
  }
}

export function emailValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const isEmail = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/.test(control.value);
    return !isEmail ? {nonEmail: true} : null;
  }
}
