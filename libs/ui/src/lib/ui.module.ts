import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodemirrorComponent } from './codemirror/codemirror.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    CodemirrorComponent
  ],
  exports: [
    CodemirrorComponent
  ],
})
export class UiModule {}
