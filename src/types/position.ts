export interface IPositionTableFilters {
  keyword: string;
  status: string;
}

export interface IPositionItem {
  id: string;
  name: string;
  role: string | null;
  status: string;
  organizationName: string | null;
  refId: string | null;
}
