import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire/compat';
import { MapboxglModule } from '@gnosys/mapboxgl';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';

import { firebaseConfig } from './firebase-ntuadt';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot([], { initialNavigation: 'enabledBlocking' }),
    AngularFireModule.initializeApp(firebaseConfig),
    MapboxglModule.withConfig({
      accessToken:
        'pk.eyJ1IjoiY2hyaXN0b2RvdWxvcyIsImEiOiJja3luYTd3eW0ydGFiMm9xcHRmMGJyOHVrIn0.c1mSurunkjU4Wyf2hxcy0g',
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
