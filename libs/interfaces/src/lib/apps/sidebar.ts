export interface SidebarItem {
  icon: string;
  text: string;
  active: boolean;
}

export interface ImsaferUIProps {
  sidebar: Array<SidebarItem> | null;
}
