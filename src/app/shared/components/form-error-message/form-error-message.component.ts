import {Component, inject, Input, OnDestroy, OnInit} from '@angular/core';
import {FormGroupDirective} from "@angular/forms";
import {AsyncPipe} from "@angular/common";

import {BehaviorSubject, distinctUntilChanged, merge, Subscription} from "rxjs";

import {FORM_ERRORS} from "../../utils/error-messages.enum";

@Component({
  selector: 'app-form-error-message',
  standalone: true,
  imports: [
    AsyncPipe
  ],
  templateUrl: './form-error-message.component.html',
  styleUrl: './form-error-message.component.scss'
})
export class FormErrorMessageComponent implements OnInit, OnDestroy {
  private subscription = new Subscription();
  private formGroupDirective = inject(FormGroupDirective);
  errors = inject(FORM_ERRORS);
  message$ = new BehaviorSubject<string>('');

  @Input() controlName!: string;

  ngOnInit(): void {
    if (this.formGroupDirective) {
      const control = this.formGroupDirective.control.get(this.controlName);

      if (control) {
        this.subscription = merge(control.valueChanges, this.formGroupDirective.ngSubmit)
          .pipe(distinctUntilChanged())
          .subscribe(() => {
            const controlErrors = control.errors;

            if (controlErrors) {
              const firstKey = Object.keys(controlErrors)[0];
              const getError = this.errors[firstKey];
              // Get message from the configuration
              const text = getError(controlErrors[firstKey]);


              // Set the error based on the configuration
              this.setError(text);
            } else {
              this.setError('');
            }
          });
      }
    }
  }

  setError(text: string) {
    this.message$.next(text);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
