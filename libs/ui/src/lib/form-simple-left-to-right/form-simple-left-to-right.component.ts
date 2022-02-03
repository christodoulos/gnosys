import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
import { FormGroup, ControlsOf, FormControl } from '@ngneat/reactive-forms';
import { Generic, Controls } from '@gnosys/interfaces';
import * as _ from 'lodash';
import { FormErrorService } from '../form-error.service';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'form-simple-left-to-right',
  templateUrl: './form-simple-left-to-right.component.html',
  styleUrls: ['./form-simple-left-to-right.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormSimpleLeftToRightComponent implements OnInit {
  @Input() formGroup!: FormGroup<ControlsOf<Generic>>;
  controls: Array<Controls> = [];
  ncontrols = 0;
  constructor(private service: FormErrorService) {}

  ngOnInit(): void {
    for (const [k, v] of Object.entries(this.formGroup.controls)) {
      this.controls.push({ name: k, value: v });
      this.ncontrols += 1;
    }
  }

  inputWidth(i: number): number {
    console.log(i);
    if (i > 10) {
      return 40;
    } else {
      return 40;
    }
  }

  getError(control: FormControl<string>) {
    return this.service.getError(control);
  }

  statCase(s: string): string {
    return _.startCase(s);
  }
}
