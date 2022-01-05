import { Component } from '@angular/core';
import { SidebarItem } from '@gnosys/interfaces';
import { sidebar$, sidebarActive$, updateSidebar } from './ui.repository';

@Component({
  selector: 'gnosys-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'imsafer';
  sidebar$ = sidebar$;
  sidebarActive$ = sidebarActive$;
  updateSidebar = updateSidebar;
  onClick() {
    console.log('click');
  }
  _updateSidebar(sidebar: Array<SidebarItem> | null) {
    this.updateSidebar(sidebar);
  }
}
