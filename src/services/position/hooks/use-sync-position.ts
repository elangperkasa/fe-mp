import { UseMutateAsyncFunction, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { UseMutationReturnType } from '../../shared/use-mutation-return-type';
import { PositionService } from '../position-service';

export interface UseSyncPositionReturn extends UseMutationReturnType {
  syncPosition: UseMutateAsyncFunction<void, Error>;
  isSyncing: boolean;
}

export function useSyncPosition(): UseSyncPositionReturn {
  const api = new PositionService();
  const client = useQueryClient();

  const {
    mutateAsync: syncPosition,
    isPending: isSyncing,
    error,
  } = useMutation<void, Error>({
    mutationFn: () => api.sync(),
    onSuccess: async () => {
      await client.refetchQueries({ queryKey: ['positions'] });
      toast.success('Sync position success.');
    },
    onMutate: () => toast.info('Please wait. We are syncing the position.'),
    onError: () => toast.error('Sync position failed. Please try again.'),
  });

  return { syncPosition, isSyncing, error };
}
