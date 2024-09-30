import {InjectionToken} from "@angular/core";
import {ErrorMessages} from "../constants/error-messages";

const defaultErrors: {
  [key: string]: any;
} = {
  required: () => ErrorMessages.Required,
  nonLetter: () => ErrorMessages.NonLetter,
  specialCharacter: () => ErrorMessages.SpeecialCharacter
};

export const FORM_ERRORS = new InjectionToken('FORM_ERRORS', {
  providedIn: 'root',
  factory: () => defaultErrors,
});