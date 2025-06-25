export interface IRoleTableFilters {
  name: string;
  status: string;
}

export interface IRoleItem {
  id: string;
  name: string;
  status: IRoleStatus;
}

export enum IRoleStatus {
  active = 'active',
  inactive = 'inactive',
}
