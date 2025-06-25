import { BaseParams } from '../shared/base.params';

export interface GetAllPositionParams extends BaseParams {
  id?: string;
  keyword?: string;
  status?: string;
}

export interface CreatePositionRequest {
  name: string;
  role: string;
}

export interface AssignPositionRequest {
  name: string;
  role: string;
  status: string;
  organizationName?: string;
}
