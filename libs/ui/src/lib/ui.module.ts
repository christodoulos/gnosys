import { forwardRef, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

import { CodemirrorComponent } from './codemirror/codemirror.component';
import { FormSimpleTopDownComponent } from './form-simple-top-down/form-simple-top-down.component';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  declarations: [CodemirrorComponent, FormSimpleTopDownComponent],
  exports: [CodemirrorComponent, FormSimpleTopDownComponent],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CodemirrorComponent),
      multi: true,
    },
  ],
})
export class UiModule {}
