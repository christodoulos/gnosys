import { Store, createState, withProps, select } from '@ngneat/elf';
import { NavList } from '@gnosys/interfaces';
import { map } from 'rxjs';

export interface ImsaferUI {
  sidebar: NavList;
  topbar: NavList;
}

export interface Topbar {
  [key: string]: NavList;
}

const topbarObj: Topbar = {
  Robust: [
    { icon: 'solid-server', text: 'Blast', active: true },
    { icon: 'solid-server', text: 'Strengthen', active: false },
  ],
  'Fire Safety': [
    { icon: 'solid-fire', text: 'Fire0', active: true },
    { icon: 'solid-fire', text: 'Fire1', active: false },
  ],
  Evacuation: [
    { icon: 'solid-logout', text: 'Evacuation0', active: true },
    { icon: 'solid-logout', text: 'Evacuation1', active: false },
  ],
  Risk: [
    { icon: 'solid-question-mark-circle', text: 'Risk0', active: true },
    { icon: 'solid-question-mark-circle', text: 'Risk1', active: false },
  ],
};

const { state, config } = createState(
  withProps<ImsaferUI>({
    sidebar: [
      { icon: 'solid-server', text: 'Robust', active: true },
      { icon: 'solid-fire', text: 'Fire Safety', active: false },
      { icon: 'solid-logout', text: 'Evacuation', active: false },
      { icon: 'solid-question-mark-circle', text: 'Risk', active: false },
    ],
    topbar: topbarObj['Robust'],
  })
);

const store = new Store({ state, name: 'imsaferUI', config });

export const sidebar$ = store.pipe(select((state) => state.sidebar));
export const sidebarActive$ = store.pipe(
  select((state) => state.sidebar.find((element) => element.active))
);
export const sidebarActiveText$ = sidebarActive$.pipe(
  map((item) => (item ? item.text : ''))
);

export const topbar$ = store.pipe(select((state) => state.topbar));

export function updateSidebar(sidebar: NavList) {
  const sidebarActive = sidebar.find((element) => element.active)?.text || '';
  const topbar = topbarObj[sidebarActive];
  store.update((state) => ({
    ...state,
    sidebar,
    topbar,
  }));
}

export function updateTopbar(topbar: NavList) {
  store.update((state) => ({ ...state, topbar }));
}
