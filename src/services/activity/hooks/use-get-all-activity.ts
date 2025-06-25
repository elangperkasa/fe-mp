import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { UseQueryReturn } from '../../shared/use-query-return-type';
import { BaseMeta } from '../../shared/base.response';
import { ActivityResponse } from '../activity.response';
import { GetAllActivityParams } from '../activity.request';
import { ActivityService } from '../activity-service';

interface UseGetAllActivityReturn extends UseQueryReturn {
  activities: ActivityResponse[];
  meta?: BaseMeta;
}

export function useGetAllActivity(params?: GetAllActivityParams): UseGetAllActivityReturn {
  const api = new ActivityService();

  const { data, error, isPending, isFetching, isLoading } = useQuery({
    queryKey: ['activities', params?.page, params?.perPage, params?.startDate, params?.endDate],
    queryFn: () => api.getAll(params),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  });

  return useMemo(
    () => ({
      activities: data?.data || [],
      meta: data?.meta,
      error,
      isFetching: isLoading || isFetching || isPending,
    }),
    [data, error, isPending, isLoading, isFetching]
  );
}
