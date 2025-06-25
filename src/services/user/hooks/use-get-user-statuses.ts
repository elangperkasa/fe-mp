import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { UseQueryReturn } from '../../shared/use-query-return-type';
import { UserService } from '../user-service';

interface UseGetUserStatusesReturn extends UseQueryReturn {
  statuses: string[];
}

export function useGetUserStatuses(): UseGetUserStatusesReturn {
  const api = new UserService();

  const {
    data: statuses,
    error,
    isPending,
    isFetching,
    isLoading,
  } = useQuery({
    queryKey: ['user-statuses'],
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
