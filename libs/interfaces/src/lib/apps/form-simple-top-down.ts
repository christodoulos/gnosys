import { FormControl } from '@ngneat/reactive-forms';

export interface Generic {
  [key: string]: FormControl<string>;
}

export interface Controls {
  name: string;
  value: FormControl<string>;
}
