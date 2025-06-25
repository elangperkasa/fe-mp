import { AxiosInstance } from 'axios';
import axiosInstance from '../../utils/axios';
import { BaseResponse } from '../shared/base.response';
import { stringify } from 'qs';
import { GetAllApprovalParams, UpdateApprovalRequest } from './approval.request';
import { ApprovalDetailResponse, ApprovalResponse } from './approval.response';

export class ApprovalService {
  api: AxiosInstance = axiosInstance;

  async getAll(params?: GetAllApprovalParams): Promise<BaseResponse<ApprovalResponse[]>> {
    const query = stringify(
      {
        page: params?.page || 1,
        'per-page': params?.perPage || 10,
        keyword: params?.keyword || '',
        requestOwnerStatus:
          !params?.requestOwnerStatus || params?.requestOwnerStatus === 'all'
            ? ''
            : params?.requestOwnerStatus,
        sort: params?.sort || '-updatedAt',
      },
      {
        filter: (key: string, value: string | number) => value || undefined,
        encode: false,
      }
    );

    const response = await this.api.get(`/loyalty/user?${query}`);

    return response.data;
  }

  async get(id: string): Promise<ApprovalDetailResponse> {
    const response = await this.api.get(`/loyalty/user/${id}`);
    return response.data;
  }

  async approval(id: string, payload: UpdateApprovalRequest): Promise<ApprovalResponse> {
    const response = await this.api.post(`/approval`, payload);
    return response.data;
  }
}
