import { forwardRef, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {
  FormsModule,
  ReactiveFormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

import { SvgIconsModule } from '@ngneat/svg-icon';
import { userIcons } from '../lib/svg/user';
import { imsaferIcons } from '../lib/svg/imsafer';

import { CodemirrorComponent } from './codemirror/codemirror.component';
import { FormSimpleTopDownComponent } from './form-simple-top-down/form-simple-top-down.component';
import { Logo0Component } from './logo0/logo0.component';
import { TopLogin0Component } from './top-login0/top-login0.component';
import { Sidebar0Component } from './sidebar0/sidebar0.component';
import { FileUploadComponent } from './file-upload/file-upload.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SvgIconsModule.forChild([...userIcons, ...imsaferIcons]),
  ],
  declarations: [
    CodemirrorComponent,
    FormSimpleTopDownComponent,
    Logo0Component,
    TopLogin0Component,
    Sidebar0Component,
    FileUploadComponent,
  ],
  exports: [
    CodemirrorComponent,
    FormSimpleTopDownComponent,
    Logo0Component,
    TopLogin0Component,
    Sidebar0Component,
    FileUploadComponent,
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
