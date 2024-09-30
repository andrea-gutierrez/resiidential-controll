import {Component} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";

import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";
import {MatFormField, MatLabel, MatError} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";

import {FormErrorMessageComponent} from "../../../../shared/components/form-error-message/form-error-message.component";

function lettersValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const hasOnlyLetters = /^[a-zA-Z]+$/.test(control.value);

    return !hasOnlyLetters ? {nonLetter: true} : null;
  }
}

function specialCharacterValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const hasSpecialCharacter = /^[a-zA-Z0-9^_=!#$%&()*+\-.:'\/?@ ]*$/.test(control.value);

    return hasSpecialCharacter ? {specialCharacter: true} : null;
  }
}

@Component({
  selector: 'app-admin-residential-owner-form',
  standalone: true,
  imports: [MatDialogTitle, MatDialogActions, MatDialogClose, MatButton, MatDialogContent, MatFormField, MatInput, MatLabel, MatError, ReactiveFormsModule, FormErrorMessageComponent],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {
  readonly form: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, lettersValidator()]),
    document: new FormControl('', [Validators.required, specialCharacterValidator()])
  });
}
