import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ListItem } from '@gnosys/interfaces';
import { ImsaferUIRepository } from '@gnosys/state';

@Component({
  selector: 'gnosys-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'imsafer';
  sidebar$ = this.ui.sidebar$;
  topbar$ = this.ui.topbar$;
  topbarActive$ = this.ui.topbarActive$;
  sidebarActive$ = this.ui.sidebarActive$;
  updateSidebar = this.ui.updateSidebar;
  updateTopbar = this.ui.updateTopbar;

  constructor(private ui: ImsaferUIRepository, private router: Router) {
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
