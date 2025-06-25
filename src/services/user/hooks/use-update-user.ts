import { UseMutateAsyncFunction, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { UseMutationReturnType } from '../../shared/use-mutation-return-type';
import { UpdateUserRequest } from '../user.request';
import { UserService } from '../user-service';

export interface UseUpdateUserReturn extends UseMutationReturnType {
  mutateUser: UseMutateAsyncFunction<void, Error, { id: string; payload: UpdateUserRequest }>;
}

export function useUpdateUser(): UseUpdateUserReturn {
  const api = new UserService();
  const client = useQueryClient();

  const { mutateAsync: mutateUser, error } = useMutation<
    void,
    Error,
    { id: string; payload: UpdateUserRequest }
  >({
    mutationFn: ({ id, payload }) => api.update(id, payload),
    onSuccess: async () => {
      await client.refetchQueries({ queryKey: ['users'] });
      toast.success('Update user success.');
    },
    onMutate: () => toast.info('Please wait. We are updating the user.'),
    onError: () => toast.error('Update user failed. Please try again.'),
  });

  return { mutateUser, error };
}
