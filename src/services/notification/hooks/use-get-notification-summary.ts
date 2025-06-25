import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { UseQueryReturn } from '../../shared/use-query-return-type';
import { NotificationService } from '../notification-service';
import { NotificationSummaryResponse } from '../notification.response';

interface UseGetNotificationSummaryReturn extends UseQueryReturn {
  notification?: NotificationSummaryResponse;
}

export function useGetNotificationSummary(): UseGetNotificationSummaryReturn {
  const api = new NotificationService();

  const {
    data: notification,
    error,
    isPending,
    isFetching,
    isLoading,
  } = useQuery({
    queryKey: ['notification-summary'],
    queryFn: () => api.getSummary(),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  });

  return useMemo(
    () => ({
      notification,
      error,
      isFetching: isLoading || isFetching || isPending,
    }),
    [notification, error, isPending, isLoading, isFetching]
  );
}
