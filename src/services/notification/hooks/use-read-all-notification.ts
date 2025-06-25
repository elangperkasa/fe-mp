import { UseMutateAsyncFunction, useMutation, useQueryClient } from '@tanstack/react-query';
import { UseMutationReturnType } from '../../shared/use-mutation-return-type';
import { NotificationService } from '../notification-service';
import { ReadAllNotificationRequest } from '../notification.request';

export interface UseReadNAllotificationReturn extends UseMutationReturnType {
  mutateNotification: UseMutateAsyncFunction<void, Error, { payload: ReadAllNotificationRequest }>;
}

export function useReadAllNotification(): UseReadNAllotificationReturn {
  const api = new NotificationService();
  const client = useQueryClient();

  const { mutateAsync: mutateNotification, error } = useMutation<
    void,
    Error,
    { payload: ReadAllNotificationRequest }
  >({
    mutationFn: ({ payload }) => api.readAll(payload),
    onSuccess: async () => {
      await client.refetchQueries({ queryKey: ['notification-summary'] });
      await client.refetchQueries({ queryKey: ['notifications'] });
    },
  });

  return { mutateNotification, error };
}
