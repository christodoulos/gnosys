import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SvgIconsModule } from '@ngneat/svg-icon';
import { EffectsNgModule } from '@ngneat/effects-ng';
// import { AgGridModule } from 'ag-grid-angular';
import {
  TippyModule,
  tooltipVariation,
  popperVariation,
} from '@ngneat/helipopper';

import { ImsaferUIEffects } from '@gnosys/state';

import { UiModule } from '@gnosys/ui';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { StrengthenComponent } from './strengthen/strengthen.component';
import { StrengthenUploadComponent } from './strengthen/strengthen-upload/strengthen-upload.component';
import { ResultsComponent } from './results/results.component';
import { BlastComponent } from './blast/blast.component';
import { FireComponent } from './fire/fire.component';
import { RobustComponent } from './robust/robust.component';
import { EvacuationComponent } from './evacuation/evacuation.component';
import { RiskComponent } from './risk/risk.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    StrengthenComponent,
    ResultsComponent,
    StrengthenUploadComponent,
    BlastComponent,
    FireComponent,
    RobustComponent,
    EvacuationComponent,
    RiskComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: 'robust', component: RobustComponent },
      { path: 'strengthen', component: StrengthenComponent },
      { path: 'blast', component: BlastComponent },
      { path: 'results', component: ResultsComponent },
      { path: 'fire', component: FireComponent },
      { path: 'risk', component: RiskComponent },
      { path: 'evacuation', component: EvacuationComponent },
      { path: '**', component: WelcomeComponent },
    ]),
    EffectsNgModule.forRoot([ImsaferUIEffects]),
    SvgIconsModule.forRoot({
      sizes: { md: '20px' },
    }),
    // AgGridModule.withComponents([]),
    TippyModule.forRoot({
      defaultVariation: 'tooltip',
      variations: {
        tooltip: tooltipVariation,
        popper: popperVariation,
      },
    }),
    UiModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  // exports: [StrengthenUploadComponent],
  exports: [],
})
export class AppModule {}
