import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire/compat';
import { MapboxglModule } from '@gnosys/mapboxgl';
import { SvgIconsModule } from '@ngneat/svg-icon';

import { UiModule } from '@gnosys/ui';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';

import { firebaseConfig } from './firebase-ntuadt';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot([], { initialNavigation: 'enabledBlocking' }),
    AngularFireModule.initializeApp(firebaseConfig),
    SvgIconsModule.forRoot({
      sizes: { md: '20px' },
    }),
    UiModule,
    MapboxglModule.withConfig({
      accessToken:
        'pk.eyJ1IjoiY2hyaXN0b2RvdWxvcyIsImEiOiJja3luYTd3eW0ydGFiMm9xcHRmMGJyOHVrIn0.c1mSurunkjU4Wyf2hxcy0g',
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
