export interface IActivityTableFilters {
  name: string;
  startDate: Date;
  endDate: Date;
}

export interface IActivityItem {
  id: string;
  activity: string;
  createdAt: string;
}
