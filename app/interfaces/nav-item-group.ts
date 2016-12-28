import { Type } from '@angular/core';

interface INavItem {
  title: string;
  page: Type;
  bgImage: string;
  smallText: string;
  borderColor: string;
  badge?: number;
}

export interface INavItemGroup {
  hasHeader: boolean;
  header: string;
  listItems: [INavItem];
}
