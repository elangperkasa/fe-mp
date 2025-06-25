import { UseMutateAsyncFunction, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { UseMutationReturnType } from '../../shared/use-mutation-return-type';
import { UserService } from '../user-service';

export interface UseSyncUserReturn extends UseMutationReturnType {
  syncUser: UseMutateAsyncFunction<void, Error>;
  isSyncing: boolean;
}

export function useSyncUser(): UseSyncUserReturn {
  const api = new UserService();
  const client = useQueryClient();

  const {
    mutateAsync: syncUser,
    isPending: isSyncing,
    error,
  } = useMutation<void, Error>({
    mutationFn: () => api.sync(),
    onSuccess: async () => {
      await client.refetchQueries({ queryKey: ['positions'] });
      await client.refetchQueries({ queryKey: ['users'] });
      toast.success('Sync user success.');
    },
    onMutate: () => toast.info('Please wait. We are syncing the user.'),
    onError: () => toast.error('Sync user failed. Please try again.'),
  });

  return { syncUser, isSyncing, error };
}
