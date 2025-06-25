import { UseMutateAsyncFunction, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { UseMutationReturnType } from '../../shared/use-mutation-return-type';
import { ApprovalResponse } from '../approval.response';
import { ApprovalService } from '../approval-service';
import { UpdateApprovalRequest } from '../approval.request';

export interface UseUpdateApprovalReturn extends UseMutationReturnType {
  mutateApproval: UseMutateAsyncFunction<
    ApprovalResponse | null,
    Error,
    { id: string; payload: UpdateApprovalRequest }
  >;
}

export function useUpdateApproval(): UseUpdateApprovalReturn {
  const api = new ApprovalService();
  const client = useQueryClient();

  const { mutateAsync: mutateApproval, error } = useMutation<
    ApprovalResponse | null,
    Error,
    { id: string; payload: UpdateApprovalRequest }
  >({
    mutationFn: ({ id, payload }) => api.approval(id, payload),
    onSuccess: async () => {
      await client.refetchQueries({ queryKey: ['approval'] });
      await client.refetchQueries({ queryKey: ['approvals'] });
      await client.refetchQueries({ queryKey: ['notification-summary'] });
      toast.success('Update approval account success.');
    },
    onMutate: () => toast.info('Please wait. We are updating the approval account.'),
    onError: () => toast.error('Update approval account failed. Please try again.'),
  });

  return { mutateApproval, error };
}
