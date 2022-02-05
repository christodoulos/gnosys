import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@ngneat/reactive-forms';
import { Validators } from '@angular/forms';
import { ImsaferService } from '../app.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  templateUrl: './blast.component.html',
  styleUrls: ['./blast.component.css'],
})
export class BlastComponent {
  jobID: string | undefined;
  completed: boolean | undefined;
  thumbnail: ArrayBuffer | string | null | undefined;
  jobFailed = false;
  failedReason = '';
  caseName = '';
  numberRegEx = /^-?\d*\.?\d*$/;
  form = new FormGroup({
    blastCaseID: new FormControl('', [Validators.required]),
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
  tooltips = [
    'A text identifier for the Blast Case',
    'The total weight of explosives in Kgr',
    'The distance from the building in meters',
    "The building's width in meters",
    "The building's length in meters",
    "The building's height in meters",
  ];

  constructor(private service: ImsaferService) {}

  onSubmit() {
    if (this.form.valid) {
      const formData = new FormData();
      formData.append('name', this.form.value.blastCaseID);
      formData.append('data', JSON.stringify(this.form.value));

      this.service
        .blastJob(formData)
        .pipe(untilDestroyed(this))
        .subscribe((data) => {
          this.jobID = data['jobID'];
          this.caseName = data['name'];
          if (this.jobID) {
            this.service
              .getBlastJob(this.jobID)
              .pipe(untilDestroyed(this))
              .subscribe((job) => {
                this.completed = job.completed;
              });
          }
        });
    }
  }

  refresh() {
    if (this.jobID)
      this.service
        .getBlastJob(this.jobID)
        .pipe(untilDestroyed(this))
        .subscribe((job) => {
          if (job.completed && !job.failed && this.jobID) {
            this.completed = true;
            this.service
              .getBlastJobImage(this.jobID)
              .pipe(untilDestroyed(this))
              .subscribe((img) => {
                this.createImageFromBlob(img);
              });
          }
          if (job.failed) {
            this.failedReason = job.failedReason || '';
            this.jobFailed = true;
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

  reload() {
    this.service.reloadComponent('/Blast');
  }

  downloadResults() {
    this.service.downloadResults(
      '/api/optimize/blastResults',
      this.jobID || '',
      this.caseName
    );
  }
}
