export interface ListItem {
  icon?: string;
  text: string;
  active?: boolean;
  routerLink?: string;
}

export type NavList = Array<ListItem>;
