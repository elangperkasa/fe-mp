import { AxiosInstance } from 'axios';
import axiosInstance from '../../utils/axios';
import { BaseResponse } from '../shared/base.response';
import { stringify } from 'qs';
import { ActivityResponse } from './activity.response';
import { GetAllActivityParams } from './activity.request';

export class ActivityService {
  api: AxiosInstance = axiosInstance;

  async getAll(params?: GetAllActivityParams): Promise<BaseResponse<ActivityResponse[]>> {
    const query = stringify(
      {
        page: params?.page || 1,
        'per-page': params?.perPage || 10,
        startDate: params?.startDate || '',
        endDate: params?.endDate || '',
        sort: '-createdAt',
      },
      {
        filter: (key: string, value: string | number) => value || undefined,
        encode: false,
      }
    );

    const response = await this.api.get(`/approval/activity-logs?${query}`);

    return response.data;
  }
}
