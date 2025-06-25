import { IApprovalHistory, IApprovalItem } from '../../types/approval';

export interface ApprovalResponse extends IApprovalItem {}

export interface ApprovalDetailResponse extends ApprovalResponse {
  history: IApprovalHistory[];
}
