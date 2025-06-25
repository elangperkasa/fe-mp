import { IApprovalOwnerStatus } from '../../types/approval';

export const checkApprovalPermission = (role: string, ownerStatus: IApprovalOwnerStatus | null) => {
  if (!role) return false;

  if (role === 'SAM') {
    return ownerStatus === 'requested' || ownerStatus === 'reconfirm';
  }

  if (role === 'ADMIN_CENTRAL') {
    return ownerStatus === 'verified';
  }

  if (role === 'SUPER_ADMIN') {
    return ownerStatus === 'requested' || ownerStatus === 'verified' || ownerStatus === 'reconfirm';
  }

  return false;
};
