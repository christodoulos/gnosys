import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@ngneat/reactive-forms';

import { Validators } from '@angular/forms';

@Component({
  selector: 'gnosys-fire',
  templateUrl: './fire.component.html',
  styleUrls: ['./fire.component.css'],
})
export class FireComponent implements OnInit {
  numberRegEx = /^-?\d*\.?\d*$/;
  formvals = ['1', '3'];
  formulations = ['Minimize budget', 'Maximize FSI'];

  form1 = new FormGroup({
    formulation: new FormControl('', [
      Validators.required,
      Validators.pattern(this.numberRegEx),
    ]),
  });

  form2 = new FormGroup({
    area: new FormControl('7000.0', [
      Validators.required,
      Validators.pattern(this.numberRegEx),
    ]),
  });

  form3 = new FormGroup({
    1: new FormControl('40.0', [
      Validators.required,
      Validators.pattern(this.numberRegEx),
    ]),
    2: new FormControl('40.0', [
      Validators.required,
      Validators.pattern(this.numberRegEx),
    ]),
    3: new FormControl('10.0', [
      Validators.required,
      Validators.pattern(this.numberRegEx),
    ]),
    4: new FormControl('30.0', [
      Validators.required,
      Validators.pattern(this.numberRegEx),
    ]),
    5: new FormControl('10.0', [
      Validators.required,
      Validators.pattern(this.numberRegEx),
    ]),
    6: new FormControl('30.0', [
      Validators.required,
      Validators.pattern(this.numberRegEx),
    ]),
    7: new FormControl('20.0', [
      Validators.required,
      Validators.pattern(this.numberRegEx),
    ]),
    8: new FormControl('10.0', [
      Validators.required,
      Validators.pattern(this.numberRegEx),
    ]),
    9: new FormControl('30.0', [
      Validators.required,
      Validators.pattern(this.numberRegEx),
    ]),
    10: new FormControl('40.0', [
      Validators.required,
      Validators.pattern(this.numberRegEx),
    ]),
    11: new FormControl('40.0', [
      Validators.required,
      Validators.pattern(this.numberRegEx),
    ]),
    12: new FormControl('20.0', [
      Validators.required,
      Validators.pattern(this.numberRegEx),
    ]),
    13: new FormControl('10.0', [
      Validators.required,
      Validators.pattern(this.numberRegEx),
    ]),
    14: new FormControl('10.0', [
      Validators.required,
      Validators.pattern(this.numberRegEx),
    ]),
    15: new FormControl('20.0', [
      Validators.required,
      Validators.pattern(this.numberRegEx),
    ]),
    16: new FormControl('20.0', [
      Validators.required,
      Validators.pattern(this.numberRegEx),
    ]),
  });

  form4 = new FormGroup({
    targetBudget: new FormControl('1000000.0', [
      Validators.required,
      Validators.pattern(this.numberRegEx),
    ]),
    targetEpsilon: new FormControl('0.70', [
      Validators.required,
      Validators.pattern(this.numberRegEx),
    ]),
  });

  constructor() {}

  ngOnInit(): void {}

  changeFormulation(e: any) {
    console.log(e);
    this.form1.controls.formulation.setValue(e.target.value, {
      onlySelf: true,
    });
  }

  reload() {
    // Awfull hack but desparate times call for desparate measures
    if (
      this.form1.valid &&
      this.form2.valid &&
      this.form3.valid &&
      this.form4.valid
    ) {
      let input = '';
      for (const [, v] of Object.entries(this.form1.value)) {
        input += v;
      }
      input += '\n';
      for (const [, v] of Object.entries(this.form2.value)) {
        input += v;
      }
      input += '\n';
      for (const [, v] of Object.entries(this.form3.value)) {
        input += `${v} `;
      }
      input = input.trim();
      input += '\n';
      for (const [, v] of Object.entries(this.form4.value)) {
        input += `${v} `;
      }
      input = input.trim();
      console.log(input);
    }
  }
}
