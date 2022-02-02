import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormArray,
  ControlsOf,
} from '@ngneat/reactive-forms';
import { Generic, Controls } from '@gnosys/interfaces';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'form-to-text-buffer',
  templateUrl: './form-to-text-buffer.component.html',
  styleUrls: ['./form-to-text-buffer.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormToTextBufferComponent implements OnInit {
  @Input() formGroup!: Array<Array<FormGroup<ControlsOf<Generic>>>>;
  controls: Array<Array<Controls>> = [[]];

  ngOnInit(): void {
    console.log('what?');
  }
}
