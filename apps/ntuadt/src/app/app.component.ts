import { Component, OnInit } from '@angular/core';
import { Map, SymbolLayer } from 'mapbox-gl';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MapboxglService } from './mapboxgl.service';

export interface Stop {
  // StopLat: string;
  // StopLng: string;
  [key: string]: string;
}

@Component({
  selector: 'gnosys-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'ntuadt';
  labelLayerId: string | undefined;
  items$: Observable<Stop | undefined>;
  lalakis = false;
  srcdoc = 'Loading...';

  constructor(
    afs: AngularFirestore,
    private http: HttpClient,
    private service: MapboxglService
  ) {
    this.items$ = afs.doc<Stop>('bus242/position').valueChanges();
  }

  ngOnInit(): void {
    this.chart3();
  }

  lngLat(_stop: string): [number, number] {
    const stop = _stop as unknown as { [key: string]: string };
    console.log(stop);
    // console.log([parseFloat(stop['StopLng']), parseFloat(stop['StopLat'])]);
    // return [parseFloat(stop['StopLng']), parseFloat(stop['StopLat'])];
    return [parseFloat(stop['CS_LNG']), parseFloat(stop['CS_LAT'])];
  }

  info(_stop: string): string {
    const stop = _stop as unknown as { [key: string]: string };
    return stop['StopDescr'];
  }

  onLoad(mapInstance: Map) {
    const layers = mapInstance.getStyle().layers;

    if (layers) {
      for (let i = 0; i < layers.length; i++) {
        if (
          layers[i].type === 'symbol' &&
          (<SymbolLayer>layers[i]).layout?.['text-field']
        ) {
          this.labelLayerId = layers[i].id;
          break;
        }
      }
    }
  }

  chart1() {
    this.http
      .get('assets/map1.html', { responseType: 'text' })
      .subscribe((data) => (this.srcdoc = data));
  }

  chart2() {
    this.http
      .get('assets/map2.html', { responseType: 'text' })
      .subscribe((data) => (this.srcdoc = data));
  }

  chart3() {
    this.http
      .get('assets/basentuamap.html', { responseType: 'text' })
      .subscribe((data) => (this.srcdoc = data));
  }

  chart4() {
    this.http
      .get('assets/itia.html', { responseType: 'text' })
      .subscribe((data) => (this.srcdoc = data));
  }
}
