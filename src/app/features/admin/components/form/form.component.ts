import {Component} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";

import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle,} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatGridListModule} from "@angular/material/grid-list";

import {FormErrorMessageComponent} from "../../../../shared/components/form-error-message/form-error-message.component";
import {FORM_INPUT_LIST} from "../constants/formInput.constant";
import {emailValidator, lettersValidator, specialCharacterValidator} from "../../../../shared/utils/input-validators";

@Component({
  selector: 'app-admin-residential-owner-form',
  standalone: true,
  imports: [MatDialogTitle, MatDialogActions, MatDialogClose, MatButton, MatDialogContent, MatFormField, MatInput, MatLabel, MatError, ReactiveFormsModule, FormErrorMessageComponent, MatGridListModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {
  public formInputList = FORM_INPUT_LIST;

  readonly form: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, lettersValidator()]),
    document: new FormControl('', [Validators.required, specialCharacterValidator()]),
    email: new FormControl('', [Validators.required, emailValidator()]),
    tower: new FormControl(null, [Validators.required]),
    building: new FormControl(null, [Validators.required]),
  });
}
