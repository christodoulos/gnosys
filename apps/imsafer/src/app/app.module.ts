import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SvgIconsModule } from '@ngneat/svg-icon';
import { EffectsNgModule } from '@ngneat/effects-ng';
import { ImsaferUIEffects } from '@gnosys/state';

import { UiModule } from '@gnosys/ui';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { StrengthenComponent } from './strengthen/strengthen.component';
import { StrengthenUploadComponent } from './strengthen/strengthen-upload/strengthen-upload.component';
import { ResultsComponent } from './results/results.component';
import { BlastComponent } from './blast/blast.component';
import { FireComponent } from './fire/fire.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    StrengthenComponent,
    ResultsComponent,
    StrengthenUploadComponent,
    BlastComponent,
    FireComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: 'Strengthen', component: StrengthenComponent },
      { path: 'Blast', component: BlastComponent },
      { path: 'Results', component: ResultsComponent },
      { path: 'Fire 0', component: FireComponent },
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
  // exports: [StrengthenUploadComponent],
  exports: [],
})
export class AppModule {}
