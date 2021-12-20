import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { EditorState } from '@codemirror/basic-setup';
import { EditorView } from '@codemirror/view';

export type EditorStateConfig = Parameters<typeof EditorState.create>[0];

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'codemirror',
  templateUrl: './codemirror.component.html',
  styleUrls: ['./codemirror.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class CodemirrorComponent implements AfterViewInit {
  @Input() config: EditorStateConfig;
  @Output() editor!: EditorView;
  @ViewChild('codemirrorhost') codemirrorhost!: ElementRef;

  ngAfterViewInit(): void {
    this.config = this.config || {};
    console.log(this.config);
    const state = EditorState.create(this.config);
    this.init(state);
  }

  init(state: EditorState) {
    this.editor = new EditorView({
      state,
      parent: this.codemirrorhost.nativeElement,
    });
  }
}
