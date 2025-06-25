import { AxiosInstance } from 'axios';
import axiosInstance from '../../utils/axios';
import { BaseResponse } from '../shared/base.response';
import {
  AssignPositionRequest,
  CreatePositionRequest,
  GetAllPositionParams,
} from './position.request';
import { stringify } from 'qs';
import { PositionResponse } from './position.response';

export class PositionService {
  api: AxiosInstance = axiosInstance;

  async getAll(params?: GetAllPositionParams): Promise<BaseResponse<PositionResponse[]>> {
    const query = stringify(
      {
        page: params?.page || 1,
        'per-page': params?.perPage || 10,
        id: params?.id || '',
        keyword: params?.keyword || '',
        status: params?.status || '',
      },
      {
        filter: (key: string, value: string | number) => value || undefined,
        encode: false,
      }
    );

    const response = await this.api.get(`/position/list?${query}`);
    return response.data;
  }

  async get(id: string): Promise<PositionResponse> {
    const response = await this.api.get(`/position/${id}`);
    return response.data;
  }

  async create(payload: CreatePositionRequest): Promise<void> {
    const response = await this.api.post(`/position/create`, payload);
    return response.data;
  }

  async assign(id: string, payload: AssignPositionRequest): Promise<PositionResponse | null> {
    const response = await this.api.put(`/position/update/${id}`, payload);
    return response.data;
  }

  async sync(): Promise<void> {
    const response = await this.api.post(`/position/sync`);
    return response.data;
  }
}
