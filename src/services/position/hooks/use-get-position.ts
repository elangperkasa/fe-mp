import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { UseQueryReturn } from '../../shared/use-query-return-type';
import { PositionResponse } from '../position.response';
import { PositionService } from '../position-service';

interface UseGetPositionReturn extends UseQueryReturn {
  position?: PositionResponse;
}

export function useGetPosition(id: string): UseGetPositionReturn {
  const api = new PositionService();

  const {
    data: position,
    error,
    isPending,
    isFetching,
    isLoading,
  } = useQuery({
    queryKey: ['position', id],
    queryFn: () => api.get(id),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  });

  return useMemo(
    () => ({
      position,
      error,
      isFetching: isLoading || isFetching || isPending,
    }),
    [position, error, isPending, isLoading, isFetching]
  );
}
