import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css'],
})
export class ResultsComponent implements OnInit {
  results!: Array<any>;
  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.http
      .get<Array<{ _id: string; jobID: string; name: string }>>(
        '/api/optimize/strengthen'
      )
      .subscribe((data) => {
        this.results = data;
      });
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
