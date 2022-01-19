import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ImsaferService } from '../app.service';

@Component({
  templateUrl: './strengthen.component.html',
  styleUrls: ['./strengthen.component.css'],
})
export class StrengthenComponent {
  constructor(private service: ImsaferService, private router: Router) {}

  submitCase(data: FormData) {
    this.service.uploadStrengthen(data).subscribe((data) => {
      this.router.navigate(['Results']);
    });
  }
}
