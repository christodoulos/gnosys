import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css'],
})
export class ResultsComponent implements OnInit {
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http
      .get<Array<{ _id: string; jobID: string; name: string }>>(
        '/api/optimize/strengthen'
      )
      .subscribe((data) => {
        data.forEach((item) => {
          this.http
            .get(`/api/optimize/strengthen/${item.jobID}`, {
              responseType: 'arraybuffer',
            })
            .subscribe((data) => {
              this.downLoadFile(data, 'application/zip');
            });
        });
      });
  }

  downLoadFile(data: any, type: string) {
    let blob = new Blob([data], { type: type });
    let url = window.URL.createObjectURL(blob);
    let pwa = window.open(url);
    if (!pwa || pwa.closed || typeof pwa.closed == 'undefined') {
      alert('Please disable your Pop-up blocker and try again.');
    }
  }
}
