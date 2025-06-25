import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { UseQueryReturn } from '../../shared/use-query-return-type';
import { BaseMeta } from '../../shared/base.response';
import { NotificationService } from '../notification-service';
import { GetAllNotificationParams } from '../notification.request';
import { NotificationListResponse } from '../notification.response';

interface UseGetAllNotificationReturn extends UseQueryReturn {
  notifications: NotificationListResponse[];
  meta?: BaseMeta;
}

export function useGetAllNotification(
  params?: GetAllNotificationParams
): UseGetAllNotificationReturn {
  const api = new NotificationService();

  const { data, error, isPending, isFetching, isLoading } = useQuery({
    queryKey: ['notifications', params?.page, params?.perPage, params?.category, params?.isRead],
    queryFn: () => api.getAll(params),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  });

  return useMemo(
    () => ({
      notifications: data?.data || [],
      meta: data?.meta,
      error,
      isFetching: isLoading || isFetching || isPending,
    }),
    [data, error, isPending, isLoading, isFetching]
  );
}
