import { Store, createState, withProps, select } from '@ngneat/elf';
import {
  actionsFactory,
  createAction,
  createEffect,
  ofType,
  props,
} from '@ngneat/effects';

import { NavList } from '@gnosys/interfaces';
import { map, tap } from 'rxjs';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

export interface ImsaferUI {
  sidebar: NavList;
  topbar: NavList;
  loading: boolean;
}

export const SidebarOBJ: NavList = [
  {
    icon: 'solid-server',
    text: 'Robust',
    active: false,
    routerLink: 'robust',
  },
  {
    icon: 'solid-fire',
    text: 'Fire Safety',
    active: false,
    routerLink: 'fire',
  },
  {
    icon: 'solid-logout',
    text: 'Evacuation',
    active: false,
    routerLink: 'evacuation',
  },
  {
    icon: 'solid-question-mark-circle',
    text: 'Risk',
    active: false,
    routerLink: 'risk',
  },
  { text: 'separator' },
  {
    icon: 'calculator',
    text: 'Results',
    active: false,
    routerLink: 'results',
  },
];

export interface Topbar {
  [key: string]: NavList;
}

const topbarOBJ: Topbar = {
  Robust: [
    { icon: 'solid-server', text: 'Blast', active: true },
    { icon: 'solid-server', text: 'Strengthen', active: false },
  ],
  'Fire Safety': [
    { icon: 'solid-fire', text: 'Fire 0', active: true },
    { icon: 'solid-fire', text: 'Fire 1', active: false },
  ],
  Evacuation: [
    { icon: 'solid-logout', text: 'Evacuation 0', active: true },
    { icon: 'solid-logout', text: 'Evacuation 1', active: false },
  ],
  Risk: [
    { icon: 'solid-question-mark-circle', text: 'Risk 0', active: true },
    { icon: 'solid-question-mark-circle', text: 'Risk 1', active: false },
  ],
  Results: [],
};

const { state, config } = createState(
  withProps<ImsaferUI>({
    sidebar: SidebarOBJ,
    topbar: topbarOBJ['Robust'],
    loading: false,
  })
);

const store = new Store({ state, name: 'imsaferUI', config });

@Injectable({ providedIn: 'root' })
export class ImsaferUIRepository {
  sidebar$ = store.pipe(select((state) => state.sidebar));
  sidebarActive$ = store.pipe(
    select((state) => state.sidebar.find((element) => element.active))
  );
  sidebarActiveText$ = this.sidebarActive$.pipe(
    map((item) => (item ? item.text : ''))
  );

  topbar$ = store.pipe(select((state) => state.topbar));
  topbarActive$ = store.pipe(
    select((state) => state.topbar.find((element) => element.active))
  );
  topbarActiveText$ = this.topbarActive$.pipe(
    map((item) => (item ? item.text : ''))
  );

  isloading$ = store.pipe(select((state) => state.loading));

  constructor(private router: Router) {}

  updateSidebar(sidebar: NavList) {
    const sidebarActive =
      sidebar.find((element) => element.active)?.routerLink || '';
    const topbar = topbarOBJ[sidebarActive];
    store.update((state) => ({
      ...state,
      sidebar,
      topbar,
    }));
    this.router.navigate([sidebarActive]);
  }

  updateTopbar(topbar: NavList) {
    const topbarActive = topbar.find((element) => element.active)?.text || '';
    store.update((state) => ({ ...state, topbar }));
    this.router.navigate([topbarActive]);
  }

  setLoading(value: boolean) {
    store.update((state) => ({ ...state, loading: value }));
  }
}

@Injectable({ providedIn: 'root' })
export class ImsaferUIEffects {
  constructor(private ui: ImsaferUIRepository) {}

  sidebarNavigation = createAction(
    '[Imsafer] Sidebar Navigation',
    props<{ navlist: NavList }>()
  );

  topbarNavigation = createAction(
    'Topbar Navigation',
    props<{ navlist: NavList }>()
  );

  navigationActions = actionsFactory('IMSAFER');

  sidebarNavigationEffect$ = createEffect((actions$) =>
    actions$.pipe(
      ofType(this.sidebarNavigation),
      tap((payload) => this.ui.updateSidebar(payload.navlist))
    )
  );

  topbarNavigationEffect$ = createEffect((actions$) =>
    actions$.pipe(
      ofType(this.topbarNavigation),
      tap((payload) => this.ui.updateTopbar(payload.navlist))
    )
  );

  navigationEffects = [
    this.sidebarNavigationEffect$,
    this.topbarNavigationEffect$,
  ];
}
