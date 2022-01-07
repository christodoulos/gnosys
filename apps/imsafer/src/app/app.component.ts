import { Component } from '@angular/core';
import { ListItem } from '@gnosys/interfaces';
import * as UI from './ui.repository';

@Component({
  selector: 'gnosys-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'imsafer';
  sidebar$ = UI.sidebar$;
  topbar$ = UI.topbar$;
  sidebarActive$ = UI.sidebarActive$;
  updateSidebar = UI.updateSidebar;
  updateTopbar = UI.updateTopbar;
  onClick() {
    console.log('click');
  }

  _updateSidebar(sidebar: Array<ListItem>) {
    this.updateSidebar(sidebar);
  }

  _updateTopbar(topbar: Array<ListItem>) {
    this.updateTopbar(topbar);
  }
}
