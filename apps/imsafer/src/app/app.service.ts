import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StrengthenJob } from '@gnosys/interfaces';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ImsaferService {
  constructor(private http: HttpClient, private router: Router) {}

  uploadStrengthen(data: FormData): Observable<StrengthenJob> {
    return this.http.post<StrengthenJob>('/api/optimize/strengthen', data);
  }

  blastJob(data: FormData): Observable<any> {
    return this.http.post<StrengthenJob>('/api/optimize/blast', data);
  }

  getStrengthenJob(jobID: string) {
    return this.http.get<{
      completed?: boolean;
      failed?: boolean;
      failedReason?: string;
      progress?: string;
    }>(`/api/optimize/strengthenJob/${jobID}`);
  }

  getBlastJob(jobID: string) {
    return this.http.get<{
      completed?: boolean;
      failed?: boolean;
      failedReason?: string;
    }>(`/api/optimize/blast/${jobID}`);
  }

  getBlastJobImage(jobID: string) {
    return this.http.get(`/api/optimize/blast/${jobID}/picture`, {
      responseType: 'blob',
    });
  }

  reloadComponent(path: string) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([path]);
    });
  }

  downloadResults(baseURL: string, jobID: string, filename: string): void {
    const _baseUrl = `${baseURL}/${jobID}`;

    this.http
      .get(_baseUrl, { responseType: 'blob' as 'json' })
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

  createImageFromBlob(image: Blob): string | ArrayBuffer | null {
    const reader = new FileReader();
    // reader.addEventListener(
    //   'load',
    //   async () => {
    //     return reader.result;
    //   },
    //   false
    // );

    if (image) {
      reader.readAsDataURL(image);
    }
    return reader.result;
  }
}
