import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { FileUploadService } from './file-upload.service';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileUploadComponent implements OnInit {
  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  fileInfos?: Observable<any>;

  constructor(private service: FileUploadService) {}

  ngOnInit(): void {
    this.fileInfos = this.service.getFiles();
  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
    console.log(event.target.files);
  }

  upload(): void {
    this.progress = 0;

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.currentFile = file;

        this.service.upload(this.currentFile).subscribe({
          next: (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round((100 * event.loaded) / event.total);
              console.log(this.progress);
            } else if (event instanceof HttpResponse) {
              console.log(event);
              // this.message = event.body.message;
              this.fileInfos = this.service.getFiles();
              console.log(this.fileInfos);
            }
          },
          error: (err: any) => {
            console.log(err);
            this.progress = 0;

            if (err.error && err.error.message) {
              this.message = err.error.message;
            } else {
              this.message = 'Could not upload the file!';
            }

            this.currentFile = undefined;
          },
        });
      }

      this.selectedFiles = undefined;
    }
  }
}
