import { UseMutateAsyncFunction, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { UseMutationReturnType } from '../../shared/use-mutation-return-type';
import { UserService } from '../user-service';

export interface UseDeleteUserReturn extends UseMutationReturnType {
  mutateUser: UseMutateAsyncFunction<void, Error, { id: string }>;
}

export function useDeleteUser(): UseDeleteUserReturn {
  const api = new UserService();
  const client = useQueryClient();

  const { mutateAsync: mutateUser, error } = useMutation<void, Error, { id: string }>({
    mutationFn: ({ id }) => api.delete(id),
    onSuccess: async () => {
      await client.refetchQueries({ queryKey: ['users'] });
      toast.success('Delete user success.');
    },
    onMutate: () => toast.info('Please wait. We are deleting the user.'),
    onError: () => toast.error('Delete user failed. Please try again.'),
  });

  return { mutateUser, error };
}
