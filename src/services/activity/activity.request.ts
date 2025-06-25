import { BaseParams } from '../shared/base.params';

export interface GetAllActivityParams extends BaseParams {
  startDate?: Date | string;
  endDate?: Date | string;
}
