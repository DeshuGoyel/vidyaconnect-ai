export interface NavItem {
  href: string;
  label: string;
  icon: string;
  badge?: number;
}

export interface SelectOption<T extends string = string> {
  value: T;
  label: string;
}
