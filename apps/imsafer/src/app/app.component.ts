import { Component } from '@angular/core';
import { ImsaferUIRepository, ImsaferUIEffects } from '@gnosys/state';
import { dispatch } from '@ngneat/effects';

@Component({
  selector: 'gnosys-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  sidebar$ = this.ui.sidebar$;
  topbar$ = this.ui.topbar$;
  topbarActive$ = this.ui.topbarActive$;
  sidebarActive$ = this.ui.sidebarActive$;
  sidebarNavigationAction = this.effects.sidebarNavigation;
  topbarNavigationAction = this.effects.topbarNavigation;
  dispatch = dispatch;

  constructor(
    private ui: ImsaferUIRepository,
    private effects: ImsaferUIEffects
  ) {}

  notYet() {
    alert('Not yet supported');
  }
}
