import { Component } from '@angular/core';
import { Map, SymbolLayer } from 'mapbox-gl';

@Component({
  selector: 'gnosys-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'ntuadt';
  labelLayerId: string | undefined;

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
