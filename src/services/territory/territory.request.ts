import { BaseParams } from '../shared/base.params';

export interface GetAllTerritoryParams extends BaseParams {
  id?: string;
  name?: string;
  description?: string;
  status?: string;
  regionIds?: string;
}

export interface CreateTerritoryRequest {
  id: string;
  regionId: string;
  name: string;
  description?: string;
}

export interface UpdateTerritoryRequest {
  regionId: string;
  distributorId: string;
  name: string;
  description?: string;
  status: string;
}
