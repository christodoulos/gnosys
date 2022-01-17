import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  AfterViewInit,
  ElementRef,
  EventEmitter,
  Output,
} from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'strengthen-upload',
  templateUrl: './strengthen-upload.component.html',
  styleUrls: ['./strengthen-upload.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StrengthenUploadComponent implements AfterViewInit {
  @ViewChild('fileInput') fileElementRef: ElementRef | undefined;
  fileInput: HTMLInputElement | undefined;
  file: File | undefined = undefined;
  name = '';
  formData: FormData | undefined;
  @Output() case: EventEmitter<FormData> = new EventEmitter<FormData>();

  ngAfterViewInit(): void {
    this.fileInput = this.fileElementRef?.nativeElement;
  }

  onFileAdded() {
    if (this.fileInput && this.fileInput.files) {
      this.file = this.fileInput.files[0];
      this.formData = new FormData();
      this.formData.append('file', this.file);
      console.log(this.formData);
    } else {
      this.formData = undefined;
      this.file = undefined;
    }
  }

  emitStrengthenCase() {
    this.formData?.append('name', this.name);
    this.case.emit(this.formData);
  }
}
