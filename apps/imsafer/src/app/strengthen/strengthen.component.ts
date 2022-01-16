import { Component } from '@angular/core';
import { StrengthenJob } from '@gnosys/interfaces';
import { Observable } from 'rxjs';
import { UploadService } from '../upload.service';

@Component({
  templateUrl: './strengthen.component.html',
  styleUrls: ['./strengthen.component.css'],
})
export class StrengthenComponent {
  strengthenJob: Observable<StrengthenJob> | undefined;
  constructor(private uploadService: UploadService) {}

  submitCase(data: FormData) {
    this.strengthenJob = this.uploadService.uploadStrengthen(data);
  }
}
