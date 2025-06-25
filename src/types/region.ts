export interface IRegionTableFilters {
  id: string;
  name: string;
  status: string;
}

export interface IRegionItem {
  id: string;
  name: string;
  description: string | null;
  status: IRegionStatus;
}

export enum IRegionStatus {
  active = 'active',
  inactive = 'inactive',
}
