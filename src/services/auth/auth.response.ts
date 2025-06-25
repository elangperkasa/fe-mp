import { IUserTerritory } from '../../types/user';
import { AuthUser } from '../../auth/types';

export interface Position {
  id: string;
  name: string;
  role: string;
  refId: string;
}

export interface User extends AuthUser {}
