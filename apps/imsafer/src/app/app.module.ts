import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { SvgIconsModule } from '@ngneat/svg-icon';
import { EffectsNgModule } from '@ngneat/effects-ng';
import { ImsaferUIEffects } from '@gnosys/state';

import { UiModule } from '@gnosys/ui';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { StrengthenComponent } from './strengthen/strengthen.component';
import { ResultsComponent } from './results/results.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    StrengthenComponent,
    ResultsComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: 'Strengthen', component: StrengthenComponent },
      { path: 'Results', component: ResultsComponent },
      { path: '**', component: WelcomeComponent },
    ]),
    EffectsNgModule.forRoot([ImsaferUIEffects]),
    SvgIconsModule.forRoot({
      sizes: { md: '20px' },
    }),
    UiModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
