import { BaseParams } from '../shared/base.params';

export interface GetAllNotificationParams extends BaseParams {
  category: string;
  isRead: boolean;
}

export interface ReadNotificationRequest {
  id: string;
  isRequestedType: boolean;
}

export interface ReadAllNotificationRequest {
  ids: string[];
  isRequestedType: boolean;
}
