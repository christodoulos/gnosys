import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { SidebarItem } from '@gnosys/interfaces';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'sidebar0',
  templateUrl: './sidebar0.component.html',
  styleUrls: ['./sidebar0.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Sidebar0Component {
  @Input() items: Array<SidebarItem> | null = [];
  @Output() selection = new EventEmitter<Array<SidebarItem> | null>();

  emitSelection(selection: SidebarItem) {
    this.items?.forEach((item) =>
      item.text === selection.text
        ? (item.active = true)
        : (item.active = false)
    );
    this.selection.emit(this.items);
  }
}
