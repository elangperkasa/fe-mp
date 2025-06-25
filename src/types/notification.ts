export interface INotificationItem {
  id: string;
  ownerId?: string;
  name: string;
  updatedAt: string;
  isRead: boolean;
  outlet: {
    name: string;
  };
}

export interface INotificationSummaryItem {
  task: INotificationTask;
  highlight: INotificationHighlight;
}

export interface INotificationTask {
  requested: number;
  verified: number;
  approved: number;
  rejected: number;
  reconfirm: number;
}

export interface INotificationHighlight {
  requested: {
    total: number;
    data: IHighlightItem[];
  };
  verified: {
    total: number;
    data: IHighlightItem[];
  };
  approved: {
    total: number;
    data: IHighlightItem[];
  };
  rejected: {
    total: number;
    data: IHighlightItem[];
  };
  reconfirm: {
    total: number;
    data: IHighlightItem[];
  };
}

export interface IHighlightItem {
  id: string;
  ownerId?: string;
  name: string;
  updatedAt: string;
  isRead: boolean;
  outlet: {
    name: string;
  };
}
