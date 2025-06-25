import { UseMutateAsyncFunction, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { UseMutationReturnType } from '../../shared/use-mutation-return-type';
import { PositionResponse } from '../position.response';
import { AssignPositionRequest } from '../position.request';
import { PositionService } from '../position-service';

export interface UseAssignPositionReturn extends UseMutationReturnType {
  mutatePosition: UseMutateAsyncFunction<
    PositionResponse | null,
    Error,
    { id: string; payload: AssignPositionRequest }
  >;
}

export function useAssignPosition(): UseAssignPositionReturn {
  const api = new PositionService();
  const client = useQueryClient();

  const { mutateAsync: mutatePosition, error } = useMutation<
    PositionResponse | null,
    Error,
    { id: string; payload: AssignPositionRequest }
  >({
    mutationFn: ({ id, payload }) => api.assign(id, payload),
    onSuccess: async () => {
      await client.refetchQueries({ queryKey: ['positions'] });
      await client.refetchQueries({ queryKey: ['users'] });
      toast.success('Assign position success.');
    },
    onMutate: () => toast.info('Please wait. We are assigning the position.'),
    onError: () => toast.error('Assign position failed. Please try again.'),
  });

  return { mutatePosition, error };
}
