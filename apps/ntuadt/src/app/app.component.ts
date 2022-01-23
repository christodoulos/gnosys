import { Component } from '@angular/core';
import { Map, SymbolLayer } from 'mapbox-gl';

@Component({
  selector: 'gnosys-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'ntuadt';
  labelLayerId!: string;

  onLoad(mapInstance: Map) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const layers = mapInstance.getStyle().layers!;

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
