import { AxiosInstance } from 'axios';
import axiosInstance from '../../utils/axios';

export class RoleService {
  api: AxiosInstance = axiosInstance;

  async getAll(): Promise<string[]> {
    const response = await this.api.get(`/user/roles`);
    return response.data;
  }
}
