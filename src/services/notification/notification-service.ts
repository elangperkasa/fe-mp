import { AxiosInstance } from 'axios';
import axiosInstance from '../../utils/axios';
import { NotificationListResponse, NotificationSummaryResponse } from './notification.response';
import {
  GetAllNotificationParams,
  ReadAllNotificationRequest,
  ReadNotificationRequest,
} from './notification.request';
import { BaseResponse } from '../shared/base.response';
import { stringify } from 'qs';

export class NotificationService {
  api: AxiosInstance = axiosInstance;

  async getAll(
    params?: GetAllNotificationParams
  ): Promise<BaseResponse<NotificationListResponse[]>> {
    const query = stringify(
      {
        page: params?.page || 1,
        'per-page': params?.perPage || 10,
        category: params?.category || 'requested',
        isRead: params?.isRead || false,
      },
      {
        filter: (key: string, value: string | number) => {
          if (key === 'isRead') {
            return value;
          }

          return value || undefined;
        },
        encode: false,
      }
    );

    const response = await this.api.get(`/notification/list?${query}`);
    return response.data;
  }

  async getSummary(): Promise<NotificationSummaryResponse> {
    const response = await this.api.get(`/notification/summary`);
    return response.data;
  }

  async read(payload: ReadNotificationRequest): Promise<void> {
    const response = await this.api.put(`/notification/read`, payload);
    return response.data;
  }

  async readAll(payload: ReadAllNotificationRequest): Promise<void> {
    const response = await this.api.put(`/notification/read-all`, payload);
    return response.data;
  }
}
