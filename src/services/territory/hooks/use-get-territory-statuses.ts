import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { UseQueryReturn } from '../../shared/use-query-return-type';
import { TerritoryService } from '../territory-service';

interface UseGetTerritoryStatusesReturn extends UseQueryReturn {
  statuses: string[];
}

export function useGetTerritoryStatuses(): UseGetTerritoryStatusesReturn {
  const api = new TerritoryService();

  const {
    data: statuses,
    error,
    isPending,
    isFetching,
    isLoading,
  } = useQuery({
    queryKey: ['territory-statuses'],
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
