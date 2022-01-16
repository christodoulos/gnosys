import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UploadService } from '../upload.service';

@Component({
  templateUrl: './strengthen.component.html',
  styleUrls: ['./strengthen.component.css'],
})
export class StrengthenComponent {
  constructor(private uploadService: UploadService, private router: Router) {}

  submitCase(data: FormData) {
    this.uploadService.uploadStrengthen(data).subscribe((data) => {
      console.log(data);
      this.router.navigate(['Results']);
    });
  }
}
