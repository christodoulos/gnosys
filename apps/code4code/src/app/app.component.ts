import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from '@gnosys/api-interfaces';

import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'gnosys-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  form: FormGroup;

  hello$ = this.http.get<Message>('/api/hello');
  code = 'import os';
  constructor(private http: HttpClient, private readonly fb: FormBuilder) {
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
