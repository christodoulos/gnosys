import { Component } from '@angular/core';

import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'gnosys-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  form: FormGroup;

  code = 'import os';
  constructor(private readonly fb: FormBuilder) {
    this.form = this.fb.group({
      editor: [
        {
          value: this.code,
          disabled: false,
        },
      ],
    });
  }
}
