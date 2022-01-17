import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup } from '@ngneat/reactive-forms';
import { Validators } from '@angular/forms';
import { UploadService } from '../upload.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './blast.component.html',
  styleUrls: ['./blast.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlastComponent implements OnInit {
  name = '';
  numberRegEx = /^-?\d*\.?\d*$/;
  form = new FormGroup({
    chargeWeight: new FormControl('', [
      Validators.required,
      Validators.pattern(this.numberRegEx),
    ]),
    distance: new FormControl('', [
      Validators.required,
      Validators.pattern(this.numberRegEx),
    ]),
    structureWidth: new FormControl('', [
      Validators.required,
      Validators.pattern(this.numberRegEx),
    ]),
    structureLength: new FormControl('', [
      Validators.required,
      Validators.pattern(this.numberRegEx),
    ]),
    structureHeight: new FormControl('', [
      Validators.required,
      Validators.pattern(this.numberRegEx),
    ]),
  });

  constructor(private service: UploadService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit() {
    if (this.form.valid && this.name !== '') {
      const formData = new FormData();
      formData.append('name', this.name);
      formData.append('data', JSON.stringify(this.form.value));
      console.log(
        'BLAST COMPONENT',
        formData.get('name'),
        formData.get('data')
      );

      this.service.blastJob(formData).subscribe((data) => {
        console.log(data);
        this.router.navigate(['Results']);
      });
    }
  }
}
