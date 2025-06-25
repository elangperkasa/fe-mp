import { UseMutateAsyncFunction, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { UseMutationReturnType } from '../../shared/use-mutation-return-type';
import { UserService } from '../user-service';
import { UpdateUserPasswordRequest } from '../user.request';

export interface UseChangePasswordUserReturn extends UseMutationReturnType {
  mutateUser: UseMutateAsyncFunction<
    void,
    Error,
    { id: string; payload: UpdateUserPasswordRequest }
  >;
}

export function useChangePasswordUser(): UseChangePasswordUserReturn {
  const api = new UserService();
  const client = useQueryClient();

  const { mutateAsync: mutateUser, error } = useMutation<
    void,
    Error,
    { id: string; payload: UpdateUserPasswordRequest }
  >({
    mutationFn: ({ id, payload }) => api.changePassword(id, payload),
    onSuccess: async () => {
      await client.refetchQueries({ queryKey: ['users'] });
      toast.success('Change password success.');
    },
    onMutate: () => toast.info('Please wait. We are changing the password.'),
    onError: () => toast.error('Change password failed. Please try again.'),
  });

  return { mutateUser, error };
}
