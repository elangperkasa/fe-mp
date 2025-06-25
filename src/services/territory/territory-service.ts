import { AxiosInstance } from 'axios';
import { stringify } from 'qs';
import axiosInstance from '../../utils/axios';
import { BaseResponse } from '../shared/base.response';
import { TerritoryResponse } from './territory.response';
import {
  CreateTerritoryRequest,
  GetAllTerritoryParams,
  UpdateTerritoryRequest,
} from './territory.request';

export class TerritoryService {
  api: AxiosInstance = axiosInstance;

  async getAll(params?: GetAllTerritoryParams): Promise<BaseResponse<TerritoryResponse[]>> {
    const query = stringify(
      {
        page: params?.page || 1,
        'per-page': params?.perPage || 10,
        id: params?.id || '',
        name: params?.name || '',
        description: params?.description || '',
        status: params?.status || '',
        regionIds: params?.regionIds || '',
      },
      {
        filter: (key: string, value: string | number) => value || undefined,
        encode: false,
      }
    );

    const response = await this.api.get(`/loyalty/territory?${query}`);
    return response.data;
  }

  async getOptions(): Promise<TerritoryResponse[]> {
    const response = await this.api.get(`/territory`);
    return response.data.data;
  }

  async getStatuses(): Promise<string[]> {
    const response = await this.api.get(`/territory/statuses`);
    return response.data;
  }

  async create(payload: CreateTerritoryRequest): Promise<TerritoryResponse> {
    const response = await this.api.post(`/territory`, payload);
    return response.data;
  }

  async update(id: string, payload: UpdateTerritoryRequest): Promise<TerritoryResponse> {
    const response = await this.api.put(`/territory/${id}`, payload);
    return response.data;
  }

  async download(): Promise<Blob> {
    const response = await this.api.get(`/territory/import/template`, { responseType: 'blob' });
    return response.data;
  }

  async upload(file: File): Promise<string> {
    const formData = new FormData();

    formData.append(`file`, file);

    const response = await this.api.post(`/territory/import`, formData);
    return response.data;
  }
}
