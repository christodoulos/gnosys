import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'logo0',
  templateUrl: './logo0.component.html',
  styleUrls: ['./logo0.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Logo0Component {
  @Input() image = '';
  @Input() text = '';
}
