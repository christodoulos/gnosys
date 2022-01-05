import { Store, createState, withProps, select } from '@ngneat/elf';
import { ImsaferUIProps } from '@gnosys/interfaces';

const { state, config } = createState(
  withProps<ImsaferUIProps>({
    sidebar: [
      { icon: 'solid-server', text: 'Robust', active: true },
      { icon: 'solid-fire', text: 'Fire Safety', active: false },
      { icon: 'solid-logout', text: 'Evacuation', active: false },
      { icon: 'solid-question-mark-circle', text: 'Risk', active: false },
    ],
  })
);

const imsaferUIStore = new Store({ state, name: 'imsaferUI', config });

export const sidebar$ = imsaferUIStore.pipe(select((state) => state.sidebar));
export const sidebarActive$ = imsaferUIStore.pipe(
  select((state) => state.sidebar?.find((element) => element.active))
);

export function updateSidebar(sidebar: ImsaferUIProps['sidebar']) {
  imsaferUIStore.update((state) => ({ ...state, sidebar }));
}