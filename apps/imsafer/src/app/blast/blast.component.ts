import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup } from '@ngneat/reactive-forms';
import { Validators } from '@angular/forms';

@Component({
  templateUrl: './blast.component.html',
  styleUrls: ['./blast.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlastComponent implements OnInit {
  form = new FormGroup({
    chargeWeight: new FormControl('', [Validators.required]),
    distance: new FormControl('', [Validators.required]),
    structureWidth: new FormControl('', [Validators.required]),
    structureLength: new FormControl('', [Validators.required]),
    structureHeight: new FormControl('', [Validators.required]),
  });

  constructor() {}

  ngOnInit(): void {}

  onSubmit() {
    console.log(this.form.value);
  }
}
