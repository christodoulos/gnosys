import {
  HttpClient,
  HttpEventType,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { BlastJob, StrengthenJob } from '@gnosys/interfaces';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  constructor(private http: HttpClient) {}

  // uploadStrengthen(data: FormData): Observable<number> | null {
  //   let status: Observable<number> | null = null;
  //   const req = new HttpRequest('POST', '/api/optimize/strengthen', data, {
  //     reportProgress: true,
  //     responseType: 'json',
  //   });
  //   const progress = new Subject<number>();
  //   this.http.request(req).subscribe((event) => {
  //     if (event.type === HttpEventType.UploadProgress) {
  //       if (event.total) {
  //         const percentDone = Math.round((100 * event.loaded) / event.total);
  //         console.log('%%%%%%%%%', percentDone);
  //         progress.next(percentDone);
  //       }
  //     } else if (event instanceof HttpResponse) {
  //       console.log(event);
  //       progress.complete();
  //     }
  //     status = progress.asObservable();
  //   });
  //   return status;
  // }

  uploadStrengthen(data: FormData): Observable<StrengthenJob> {
    return this.http.post<StrengthenJob>('/api/optimize/strengthen', data);
  }

  blastJob(data: FormData): Observable<any> {
    return this.http.post<StrengthenJob>('/api/optimize/blast', data);
  }
}
