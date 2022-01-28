import { Component, OnInit } from '@angular/core';
import { Map, SymbolLayer } from 'mapbox-gl';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { KeyValue } from '@angular/common';

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

  constructor(afs: AngularFirestore) {
    this.items$ = afs.doc<Stop>('bus242/go_stops').valueChanges();
  }

  ngOnInit(): void {
    this.items$.subscribe((data) => {
      console.log(data);
    });
  }

  lngLat(_stop: string): [number, number] {
    const stop = _stop as unknown as { [key: string]: string };
    console.log(stop);
    // console.log([parseFloat(stop['StopLng']), parseFloat(stop['StopLat'])]);
    return [parseFloat(stop['StopLng']), parseFloat(stop['StopLat'])];
    // return [parseFloat(stop['CS_LNG']), parseFloat(stop['CS_LAT'])];
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
}
