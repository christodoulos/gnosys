import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { ListItem, NavList } from '@gnosys/interfaces';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'topbar0',
  templateUrl: './topbar0.component.html',
  styleUrls: ['./topbar0.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Topbar0Component {
  @Input() items: NavList = [];
  @Output() selection = new EventEmitter<NavList>();

  async emitSelection(selection: ListItem) {
    this.items.forEach((item) =>
      item.text === selection.text
        ? (item.active = true)
        : (item.active = false)
    );
    this.selection.emit(this.items);
  }
}
