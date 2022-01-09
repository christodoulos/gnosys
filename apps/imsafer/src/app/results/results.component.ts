import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css'],
})
export class ResultsComponent implements OnInit {
  results!: Array<any>;
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.refresh();
  }

  refresh() {
    this.http
      .get<Array<{ _id: string; jobID: string; name: string }>>(
        '/api/optimize/strengthen'
      )
      .subscribe((data) => {
        this.results = data;
      });
  }

  // downLoadFile(data: any, type: string) {
  //   let blob = new Blob([data], { type: type });
  //   let url = window.URL.createObjectURL(blob);
  //   let pwa = window.open(url);
  //   if (!pwa || pwa.closed || typeof pwa.closed == 'undefined') {
  //     alert('Please disable your Pop-up blocker and try again.');
  //   }
  // }

  // downloadFile(jobID: string) {
  //   this.http
  //     .get<Blob>(`/api/optimize/strengthen/${jobID}`, {
  //       headers: new HttpHeaders().append('Content-Type', 'application/zip'),
  //     })
  //     .subscribe((data) => {
  //       console.log(data);
  //     });
  // }

  downloadFile(jobID: string, filename: string): void {
    const baseUrl = `/api/optimize/strengthen/${jobID}`;

    this.http
      .get(baseUrl, { responseType: 'blob' as 'json' })
      .subscribe((response: any) => {
        const dataType = response.type;
        const binaryData = [];
        binaryData.push(response);
        const downloadLink = document.createElement('a');
        downloadLink.href = window.URL.createObjectURL(
          new Blob(binaryData, { type: dataType })
        );
        if (filename) downloadLink.setAttribute('download', `${filename}.zip`);
        document.body.appendChild(downloadLink);
        downloadLink.click();
      });
  }
}
