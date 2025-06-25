import { IOutletItem } from './outlet';

export interface IApprovalTableFilters {
  keyword: string;
  requestOwnerStatus: string;
}

export interface IApprovalItem {
  id: string;
  identityCardNumber: string | null;
  name: string | null;
  phoneNumber: string | null;
  email: string | null;
  birthDate: string | null;
  status: IApprovalStatus | null;
  requestOwnerStatus: IApprovalOwnerStatus | null;
  ownerStatus: IApprovalOwnerStatus | null;
  outletId: string;
  outlet: IOutletItem;
}

export interface IApprovalHistory {
  id: string;
  prevStatus: string;
  currentStatus: string;
  reason: string | null;
  status: string;
  userId: string;
  createdAt: string;
  ActivityLog: IApprovalHistoryActivityLog;
}

interface IApprovalHistoryActivityLog {
  userName: string;
  userRole: string;
  ownerName: string;
}

export enum IApprovalStatus {
  active = 'active',
  pending = 'pending',
  banned = 'banned',
  rejected = 'rejected',
}

export enum IApprovalOwnerStatus {
  requested = 'requested',
  verified = 'verified',
  approved = 'approved',
  rejected = 'rejected',
  reconfirm = 'reconfirm',
}
