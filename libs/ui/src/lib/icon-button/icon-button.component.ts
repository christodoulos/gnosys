import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'icon-button',
  templateUrl: './icon-button.component.html',
  styleUrls: ['./icon-button.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconButtonComponent {
  @Input() iconkey = 'question-mark-circle';
  @Input() text = 'Button Text';
  @Input() notAllowed = false;
}
