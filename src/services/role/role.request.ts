import { BaseParams } from '../shared/base.params';

export interface GetAllRoleParams extends BaseParams {
  name?: string;
  status?: string;
}
