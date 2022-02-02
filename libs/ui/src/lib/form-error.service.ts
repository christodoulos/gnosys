import { Injectable } from '@angular/core';
import { FormControl } from '@ngneat/reactive-forms';

@Injectable({
  providedIn: 'root',
})
export class FormErrorService {
  getError(control: FormControl<string>) {
    if (control.errors != null) {
      const error = Object.keys(control.errors)[0];
      switch (error) {
        case 'pattern':
          return 'The field pattern is invalid';
        case 'required':
          return 'The field is required';
        case 'email':
          return 'Must be an email';
        case 'minlength':
          return 'The field must be longer';
        case 'mustMatch':
          return 'The fields do not match';
      }
    }
    return '';
  }
}
