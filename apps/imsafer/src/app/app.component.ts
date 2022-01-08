import { Component } from '@angular/core';
import { Router } from '@angular/router';
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
  topbarActive$ = UI.topbarActive$;
  sidebarActive$ = UI.sidebarActive$;
  updateSidebar = UI.updateSidebar;
  updateTopbar = UI.updateTopbar;

  constructor(private router: Router) {
    this.topbarActive$.subscribe((value) => {
      if (value) {
        this.router.navigate([value?.text]);
      } else {
        this.router.navigate(['Results']);
      }
    });
  }
  onClick() {
    console.log('click');
  }

  _updateSidebar(sidebar: Array<ListItem>) {
    this.updateSidebar(sidebar);
  }

  _updateTopbar(topbar: Array<ListItem>) {
    // const topbarActive = topbar.find((element) => element.active)?.text || '';
    // this.router.navigate([topbarActive]);
    this.updateTopbar(topbar);
  }
}
