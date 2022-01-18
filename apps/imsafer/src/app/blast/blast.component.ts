import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup } from '@ngneat/reactive-forms';
import { Validators } from '@angular/forms';
import { UploadService } from '../upload.service';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  templateUrl: './blast.component.html',
  styleUrls: ['./blast.component.css'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlastComponent implements OnInit {
  jobID: string | undefined;
  completed: boolean | undefined;
  thumbnail: any;
  failedReason = '';
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

  constructor(
    private service: UploadService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    if (this.form.valid && this.name !== '') {
      const formData = new FormData();
      formData.append('name', this.name);
      formData.append('data', JSON.stringify(this.form.value));

      this.service.blastJob(formData).subscribe((data) => {
        this.jobID = data['jobID'];
        console.log(this.jobID);
        if (this.jobID) {
          console.log('lala');
          this.service.getBlastJob(this.jobID).subscribe((job) => {
            console.log(job);
            this.completed = job.completed;
          });
        }
      });
    }
  }

  refresh() {
    if (this.jobID)
      this.service.getBlastJob(this.jobID).subscribe((job) => {
        console.log('refresh', job);
        if (job.completed && !job.failed && this.jobID) {
          this.completed = true;
          this.service.getBlastJobImage(this.jobID).subscribe((img) => {
            this.createImageFromBlob(img);
          });
        }
        if (job.failed) {
          this.failedReason = job.failedReason || '';
          this.completed = true;
        }
      });
  }

  createImageFromBlob(image: Blob) {
    const reader = new FileReader();
    reader.addEventListener(
      'load',
      () => {
        this.thumbnail = reader.result;
      },
      false
    );

    if (image) {
      reader.readAsDataURL(image);
    }
  }
}
