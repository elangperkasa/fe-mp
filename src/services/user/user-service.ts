import { AxiosInstance } from 'axios';
import { stringify } from 'qs';
import { UserDetailResponse, UserResponse } from './user.response';
import axiosInstance from '../../utils/axios';
import {
  CreateUserRequest,
  GetAllUserParams,
  UpdateUserPasswordRequest,
  UpdateUserRequest,
} from './user.request';
import { BaseResponse } from '../shared/base.response';

export class UserService {
  api: AxiosInstance = axiosInstance;

  async getAll(params?: GetAllUserParams): Promise<BaseResponse<UserResponse[]>> {
    const query = stringify(
      {
        page: params?.page || 1,
        'per-page': params?.perPage || 10,
        name: params?.name || '',
        status: params?.status || '',
        role: params?.role || '',
      },
      {
        filter: (key: string, value: string | number) => value || undefined,
        encode: false,
      }
    );

    const response = await this.api.get(`/user/list?${query}`);
    return response.data;
  }

  async get(id: string): Promise<UserDetailResponse> {
    const response = await this.api.get(`/user/${id}`);
    return response.data;
  }

  async create(payload: CreateUserRequest): Promise<any> {
    const response = await this.api.post(`/user`, payload);
    return response.data;
  }

  async changePassword(id: string, payload: UpdateUserPasswordRequest): Promise<void> {
    const response = await this.api.put(`/user/change-password/${id}`, payload);
    return response.data;
  }

  async update(id: string, payload: UpdateUserRequest): Promise<void> {
    const response = await this.api.put(`/user/${id}`, payload);
    return response.data;
  }

  async delete(id: string): Promise<void> {
    const response = await this.api.delete(`/user/${id}`);
    return response.data;
  }

  async getRoles(): Promise<string[]> {
    const response = await this.api.get(`/user/roles`);
    return response.data;
  }

  async getStatuses(): Promise<string[]> {
    const response = await this.api.get(`/user/statuses`);
    return response.data;
  }

  async sync(): Promise<void> {
    const response = await this.api.post(`/user/sync`);
    return response.data;
  }
}
