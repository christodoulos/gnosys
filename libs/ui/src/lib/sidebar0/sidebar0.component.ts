import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
import { ListItem } from '@gnosys/interfaces';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'sidebar0',
  templateUrl: './sidebar0.component.html',
  styleUrls: ['./sidebar0.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Sidebar0Component implements OnInit {
  @Input() items: Array<ListItem> = [];
  @Input() active = 0;
  constructor() {}

  ngOnInit(): void {}
}
