import { BaseParams } from '../shared/base.params';

export interface GetAllRegionParams extends BaseParams {
  id?: string;
  name?: string;
  description?: string;
  status?: string;
}

export interface CreateRegionRequest {
  id: string;
  name: string;
  description?: string;
}

export interface UpdateRegionRequest {
  name: string;
  description?: string;
  status: string;
}
