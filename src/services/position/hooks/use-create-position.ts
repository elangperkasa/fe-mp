import { UseMutateAsyncFunction, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { UseMutationReturnType } from '../../shared/use-mutation-return-type';
import { CreatePositionRequest } from '../position.request';
import { PositionService } from '../position-service';

export interface UseCreatePositionReturn extends UseMutationReturnType {
  mutatePosition: UseMutateAsyncFunction<void, Error, { payload: CreatePositionRequest }>;
}

export function useCreatePosition(): UseCreatePositionReturn {
  const api = new PositionService();
  const client = useQueryClient();

  const { mutateAsync: mutatePosition, error } = useMutation<
    void,
    Error,
    { payload: CreatePositionRequest }
  >({
    mutationFn: ({ payload }) => api.create(payload),
    onSuccess: async () => {
      await client.refetchQueries({ queryKey: ['positions'] });
      toast.success('Create position success.');
    },
    onMutate: () => toast.info('Please wait. We are creating the position.'),
    onError: () => toast.error('Create position failed. Please try again.'),
  });

  return { mutatePosition, error };
}
