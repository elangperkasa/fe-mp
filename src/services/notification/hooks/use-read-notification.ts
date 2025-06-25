import { UseMutateAsyncFunction, useMutation, useQueryClient } from '@tanstack/react-query';
import { UseMutationReturnType } from '../../shared/use-mutation-return-type';
import { NotificationService } from '../notification-service';
import { ReadNotificationRequest } from '../notification.request';

export interface UseReadNotificationReturn extends UseMutationReturnType {
  mutateNotification: UseMutateAsyncFunction<void, Error, { payload: ReadNotificationRequest }>;
}

export function useReadNotification(): UseReadNotificationReturn {
  const api = new NotificationService();
  const client = useQueryClient();

  const { mutateAsync: mutateNotification, error } = useMutation<
    void,
    Error,
    { payload: ReadNotificationRequest }
  >({
    mutationFn: ({ payload }) => api.read(payload),
    onSuccess: async () => {
      await client.refetchQueries({ queryKey: ['notification-summary'] });
      await client.refetchQueries({ queryKey: ['notifications'] });
    },
  });

  return { mutateNotification, error };
}
