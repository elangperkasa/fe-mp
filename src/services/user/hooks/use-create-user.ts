import { UseMutateAsyncFunction, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { UseMutationReturnType } from '../../shared/use-mutation-return-type';
import { CreateUserRequest } from '../user.request';
import { UserService } from '../user-service';

export interface UseCreateUserReturn extends UseMutationReturnType {
  mutateUser: UseMutateAsyncFunction<void, Error, { payload: CreateUserRequest }>;
}

export function useCreateUser(): UseCreateUserReturn {
  const api = new UserService();
  const client = useQueryClient();

  const { mutateAsync: mutateUser, error } = useMutation<
    void,
    Error,
    { payload: CreateUserRequest }
  >({
    mutationFn: ({ payload }) => api.create(payload),
    onSuccess: async () => {
      await client.refetchQueries({ queryKey: ['users'] });
      toast.success('Create user success.');
    },
    onMutate: () => toast.info('Please wait. We are creating the user.'),
    onError: (error) => {
      toast.error(`Create user failed. Please try again. Error: ${error.message}`);
    },
  });

  return { mutateUser, error };
}
