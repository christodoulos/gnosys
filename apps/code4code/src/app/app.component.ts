import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from '@gnosys/api-interfaces';

import { basicSetup } from '@codemirror/basic-setup';
import { python } from '@codemirror/lang-python';

@Component({
  selector: 'gnosys-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  hello$ = this.http.get<Message>('/api/hello');
  config = {
    doc: 'print("Hello World!")',
    extensions: [basicSetup, python()],
  };
  constructor(private http: HttpClient) {}
}
