import { InjectionToken, ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map/map.component';
import { LayerComponent } from './layer/layer.component';
import { MarkerComponent } from './marker/marker.component';
import { PopupComponent } from './popup/popup.component';
import { MAPBOX_API_KEY } from './map/map.service';
export const MAPBOX_GEOCODER_API_KEY = new InjectionToken('MapboxApiKey');

@NgModule({
  imports: [CommonModule],
  declarations: [MapComponent, LayerComponent, MarkerComponent, PopupComponent],
  exports: [MapComponent, LayerComponent, MarkerComponent, PopupComponent],
})
export class MapboxglModule {
  static withConfig(config: {
    accessToken: string;
    geocoderAccessToken?: string;
  }): ModuleWithProviders<MapboxglModule> {
    return {
      ngModule: MapboxglModule,
      providers: [
        {
          provide: MAPBOX_API_KEY,
          useValue: config.accessToken,
        },
        {
          provide: MAPBOX_GEOCODER_API_KEY,
          useValue: config.geocoderAccessToken || config.accessToken,
        },
      ],
    };
  }
}
