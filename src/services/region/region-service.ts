import { AxiosInstance } from 'axios';
import { stringify } from 'qs';
import axiosInstance from '../../utils/axios';
import { BaseResponse } from '../shared/base.response';
import { RegionResponse } from './region.response';
import { CreateRegionRequest, GetAllRegionParams, UpdateRegionRequest } from './region.request';

export class RegionService {
  api: AxiosInstance = axiosInstance;

  async getAll(params?: GetAllRegionParams): Promise<BaseResponse<RegionResponse[]>> {
    const query = stringify(
      {
        page: params?.page || 1,
        'per-page': params?.perPage || 10,
        id: params?.id || '',
        name: params?.name || '',
        description: params?.description || '',
        status: params?.status || '',
      },
      {
        filter: (key: string, value: string | number) => value || undefined,
        encode: false,
      }
    );

    const response = await this.api.get(`/loyalty/region?${query}`);
    return response.data;
  }

  async getOptions(): Promise<RegionResponse[]> {
    const response = await this.api.get(`/region`);
    return response.data.data;
  }

  async getStatuses(): Promise<string[]> {
    const response = await this.api.get(`/region/statuses`);
    return response.data;
  }

  async create(payload: CreateRegionRequest): Promise<RegionResponse> {
    const response = await this.api.post(`/region`, payload);
    return response.data;
  }

  async update(id: string, payload: UpdateRegionRequest): Promise<RegionResponse> {
    const response = await this.api.put(`/region/${id}`, payload);
    return response.data;
  }

  async download(): Promise<Blob> {
    const response = await this.api.get(`/region/import/template`, { responseType: 'blob' });
    return response.data;
  }

  async upload(file: File): Promise<string> {
    const formData = new FormData();

    formData.append(`file`, file);

    const response = await this.api.post(`/region/import`, formData);
    return response.data;
  }
}
