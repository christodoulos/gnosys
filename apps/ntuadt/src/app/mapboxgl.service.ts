import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseHTML } from './mapboxgl.html';

@Injectable({
  providedIn: 'root',
})
export class MapboxglService {
  constructor(private http: HttpClient) {}

  baseHTML() {
    this.http.get('assets/basentuamap.html', { responseType: 'text' });
  }
}
