import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
import { FormControl, FormGroup, ControlsOf } from '@ngneat/reactive-forms';
import { Generic, Controls } from '@gnosys/interfaces';
import { FormErrorService } from '../form-error.service';
import * as _ from 'lodash';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'form-simple-top-down',
  templateUrl: './form-simple-top-down.component.html',
  styleUrls: ['./form-simple-top-down.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormSimpleTopDownComponent implements OnInit {
  @Input() formGroup!: FormGroup<ControlsOf<Generic>>;
  @Input() tooltips: Array<string> | undefined;
  controls: Array<Controls> = [];

  constructor(private service: FormErrorService) {}

  ngOnInit(): void {
    for (const [k, v] of Object.entries(this.formGroup.controls)) {
      this.controls.push({ name: k, value: v });
    }
  }

  getError(control: FormControl<string>) {
    return this.service.getError(control);
  }

  statCase(s: string): string {
    return _.startCase(s);
  }
}
