import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ImsaferUIRepository } from '@gnosys/state';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ColDef } from 'ag-grid-community';
import { map, Observable } from 'rxjs';
import { ImsaferService } from '../app.service';

interface FireJobData {
  name: string;
  fireData: string;
  uuid: string;
}

interface FireJob {
  data: FireJobData;
  attemptsMade: number;
  id: string;
  progress: number;
  finishedOn: number;
}

@UntilDestroy()
@Component({
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css'],
})
export class ResultsComponent implements OnInit {
  // blastJobs: Array<any>;
  strengthenJobs$ = this.getStrengthenJobs();
  fireJobs$ = this.getFireJobs();
  results!: Array<any>;
  fireResults!: Array<any>;
  isloading$ = this.repo.isloading$;
  columnDefs: ColDef[] = [
    { field: 'name', sortable: true, filter: true },
    { field: 'jobID', editable: true },
    { field: 'jobUUID' },
    { field: 'timestamp' },
    { field: 'progress' },
    { field: 'finishedOn' },
    { field: 'processedOn' },
  ];
  constructor(
    private http: HttpClient,
    private router: Router,
    private repo: ImsaferUIRepository,
    private service: ImsaferService
  ) {
    this.getFireJobs().subscribe((data) => {
      console.log(data);
    });
  }

  getFireJobs(): Observable<Array<FireJob>> {
    return this.http.get<Array<FireJob>>('/api/optimize/fire');
  }

  getStrengthenJobs(): Observable<Array<FireJob>> {
    return this.http.get<Array<FireJob>>('/api/optimize/strengthen');
  }

  ngOnInit(): void {
    this.http
      .get<any>('/api/optimize/strengthen')
      .pipe(untilDestroyed(this))
      .subscribe((data) => {
        // console.log(data);
        this.results = data;
      });

    this.http
      .get<any>('/api/optimize/fire')
      .pipe(untilDestroyed(this))
      .subscribe((data) => {
        this.fireResults = data;
        // console.log(data);
      });
  }

  refresh() {
    this.service.reloadComponent('/results');
    // this.repo.setLoading(true);
    // this.http
    //   .get<Array<{ _id: string; jobID: string; name: string }>>(
    //     '/api/optimize/strengthen'
    //   )
    //   .pipe(untilDestroyed(this))
    //   .subscribe((data) => {
    //     this.results = data;
    //     this.repo.setLoading(false);
    //   });
  }

  downloadFile(jobID: string, filename: string): void {
    const baseUrl = `/api/optimize/strengthen/${jobID}`;

    this.http
      .get(baseUrl, { responseType: 'blob' as 'json' })
      .pipe(untilDestroyed(this))
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

  downloadFire(jobID: string, filename: string): void {
    console.log(jobID, filename);
    const baseUrl = `/api/optimize/fire/${jobID}`;

    this.http
      .get(baseUrl, { responseType: 'blob' })
      .pipe(untilDestroyed(this))
      .subscribe((response: any) => {
        const dataType = response.type;
        console.log(response, dataType);
        const binaryData = [];
        binaryData.push(response);
        const downloadLink = document.createElement('a');
        downloadLink.href = window.URL.createObjectURL(
          new Blob(binaryData, { type: dataType })
        );
        if (filename) downloadLink.setAttribute('download', `${filename}.txt`);
        document.body.appendChild(downloadLink);
        downloadLink.click();
      });
  }
}
