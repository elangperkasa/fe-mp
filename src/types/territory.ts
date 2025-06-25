export interface ITerritoryTableFilters {
  id: string;
  name: string;
  status: string;
  regionIds: string;
}

export interface ITerritoryItem {
  id: string;
  regionId: string;
  name: string;
  description: string | null;
  status: ITerritoryStatus;
}

export enum ITerritoryStatus {
  active = 'active',
  inactive = 'inactive',
}
