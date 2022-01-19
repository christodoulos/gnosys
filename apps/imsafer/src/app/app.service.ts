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
}
