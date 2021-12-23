import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SvgIconsModule } from '@ngneat/svg-icon';
import { arrowsIcons } from '@gnosys/ui';

import { AppComponent } from './app.component';

import { UiModule } from '@gnosys/ui';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    SvgIconsModule.forRoot({ icons: [...arrowsIcons] }),
    UiModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
