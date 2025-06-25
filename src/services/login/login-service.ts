import { AxiosInstance } from 'axios';
import axiosInstance from '../../utils/axios';
import { LoginRequest } from './login.request';
import { LoginResponse } from './login.response';

export class LoginService {
  api: AxiosInstance = axiosInstance;

  async login(payload: LoginRequest): Promise<LoginResponse> {
    const response = await this.api.post<LoginResponse>(`/auth/login`, payload);
    return response.data;
  }
}
