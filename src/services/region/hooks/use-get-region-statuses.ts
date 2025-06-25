import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { UseQueryReturn } from '../../shared/use-query-return-type';
import { RegionService } from '../region-service';

interface UseGetRegionStatusesReturn extends UseQueryReturn {
  statuses: string[];
}

export function useGetRegionStatuses(): UseGetRegionStatusesReturn {
  const api = new RegionService();

  const {
    data: statuses,
    error,
    isPending,
    isFetching,
    isLoading,
  } = useQuery({
    queryKey: ['region-statuses'],
    queryFn: () => api.getStatuses(),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  });

  return useMemo(
    () => ({
      statuses: statuses || [],
      error,
      isFetching: isLoading || isFetching || isPending,
    }),
    [statuses, error, isPending, isLoading, isFetching]
  );
}
