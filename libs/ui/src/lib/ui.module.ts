import { forwardRef, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

import { SvgIconsModule } from '@ngneat/svg-icon';
import { userIcons } from '../lib/svg/user';

import { CodemirrorComponent } from './codemirror/codemirror.component';
import { FormSimpleTopDownComponent } from './form-simple-top-down/form-simple-top-down.component';
import { Logo0Component } from './logo0/logo0.component';
import { TopLogin0Component } from './top-login0/top-login0.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SvgIconsModule.forChild([...userIcons]),
  ],
  declarations: [
    CodemirrorComponent,
    FormSimpleTopDownComponent,
    Logo0Component,
    TopLogin0Component,
  ],
  exports: [
    CodemirrorComponent,
    FormSimpleTopDownComponent,
    Logo0Component,
    TopLogin0Component,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CodemirrorComponent),
      multi: true,
    },
  ],
})
export class UiModule {}
