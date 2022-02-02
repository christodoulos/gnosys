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
  form = new FormGroup({
    p1: new FormControl('10', [Validators.required]),
    p2: new FormControl('20', [
      Validators.required,
      Validators.pattern(this.numberRegEx),
    ]),
    p3: new FormControl('30', [
      Validators.required,
      Validators.pattern(this.numberRegEx),
    ]),
    p4: new FormControl('40', [
      Validators.required,
      Validators.pattern(this.numberRegEx),
    ]),
    p5: new FormControl('50', [
      Validators.required,
      Validators.pattern(this.numberRegEx),
    ]),
    p6: new FormControl('60', [
      Validators.required,
      Validators.pattern(this.numberRegEx),
    ]),
    p7: new FormControl('10', [Validators.required]),
    p8: new FormControl('20', [
      Validators.required,
      Validators.pattern(this.numberRegEx),
    ]),
    p9: new FormControl('30', [
      Validators.required,
      Validators.pattern(this.numberRegEx),
    ]),
    p10: new FormControl('40', [
      Validators.required,
      Validators.pattern(this.numberRegEx),
    ]),
    p11: new FormControl('50', [
      Validators.required,
      Validators.pattern(this.numberRegEx),
    ]),
    p12: new FormControl('60', [
      Validators.required,
      Validators.pattern(this.numberRegEx),
    ]),
    p13: new FormControl('60', [
      Validators.required,
      Validators.pattern(this.numberRegEx),
    ]),
    p14: new FormControl('60', [
      Validators.required,
      Validators.pattern(this.numberRegEx),
    ]),
    p15: new FormControl('60', [
      Validators.required,
      Validators.pattern(this.numberRegEx),
    ]),
    p16: new FormControl('60', [
      Validators.required,
      Validators.pattern(this.numberRegEx),
    ]),
  });
  constructor() {}

  ngOnInit(): void {}
}
