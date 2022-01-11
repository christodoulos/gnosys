import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { Router } from '@angular/router';
import { FileUploadService } from './file-upload.service';

export interface FileInfo {
  name: string;
  size: number;
  type: string;
}

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileUploadComponent {
  selectedFiles?: FileList;
  filenames: Array<FileInfo> = [];

  constructor(private service: FileUploadService, private router: Router) {}

  onFileSelection(event: Event) {
    this.filenames = [];
    const target = event.target as HTMLInputElement;
    this.selectedFiles = target.files as FileList;
    for (const a of Array.from(this.selectedFiles))
      this.filenames.push({ size: a.size, name: a.name, type: a.type });
  }

  upload(): void {
    const formData = new FormData();
    if (this.selectedFiles?.length) {
      for (let i = 0; i < this.selectedFiles.length; i++) {
        formData.append(
          'file',
          this.selectedFiles[i],
          this.selectedFiles[i].name
        );
      }
      this.service.uploadFiles(formData).subscribe((data) => {
        console.log(data);
        this.selectedFiles = undefined;
        this.filenames = [];
      });
    }
  }

  strengthen(caseName: string): void {
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      if (file)
        this.service.upload(file, caseName).subscribe((data) => {
          console.log(data);
          this.selectedFiles = undefined;
          this.filenames = [];
        });
    }
  }
}
