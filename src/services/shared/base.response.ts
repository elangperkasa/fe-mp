export interface BaseResponse<T> {
  data: T;
  meta: BaseMeta;
}

export interface BaseMeta {
  record: BaseRecord;
  page: BasePage;
}

export interface BaseRecord {
  current: number;
  total: number;
}

export interface BasePage {
  current: number;
  total: number;
}
