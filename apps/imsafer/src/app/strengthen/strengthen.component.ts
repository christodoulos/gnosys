import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ImsaferService } from '../app.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  templateUrl: './strengthen.component.html',
  styleUrls: ['./strengthen.component.css'],
})
export class StrengthenComponent {
  jobID: string | undefined;
  completed: boolean | undefined;
  progress = '0';
  thumbnail: ArrayBuffer | string | null | undefined;
  jobFailed = false;
  failedReason = '';
  caseName = '';
  constructor(private service: ImsaferService, private router: Router) {}

  submitCase(data: FormData) {
    this.service
      .uploadStrengthen(data)
      .pipe(untilDestroyed(this))
      .subscribe((data) => {
        this.jobID = data['jobID'];
        this.caseName = data['name'];
        this.router.navigate(['Results']);
        if (this.jobID) {
          this.service
            .getStrengthenJob(this.jobID)
            .pipe(untilDestroyed(this))
            .subscribe((job) => {
              this.completed = job.completed;
            });
        }
      });
  }

  refresh() {
    if (this.jobID)
      this.service
        .getStrengthenJob(this.jobID)
        .pipe(untilDestroyed(this))
        .subscribe((job) => {
          console.log(job);
          this.progress = job.progress || '';
          if (job.completed && !job.failed && this.jobID) {
            this.completed = true;
            this.service
              .getStrengthenJobImage(this.jobID)
              .pipe(untilDestroyed(this))
              .subscribe((img) => {
                this.createImageFromBlob(img);
                // this.thumbnail = this.service.createImageFromBlob(img);
              });
          }
          if (job.failed) {
            this.failedReason = job.failedReason || '';
            this.jobFailed = true;
            this.completed = true;
          }
        });
  }

  reload() {
    this.service.reloadComponent('/Strengthen');
  }

  downloadResults() {
    this.service.downloadResults(
      '/api/optimize/strengthen',
      this.jobID || '',
      this.caseName
    );
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
