import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { UseQueryReturn } from '../../shared/use-query-return-type';
import { BaseMeta } from '../../shared/base.response';
import { PositionResponse } from '../position.response';
import { GetAllPositionParams } from '../position.request';
import { PositionService } from '../position-service';

interface UseGetAllPositionReturn extends UseQueryReturn {
  positions: PositionResponse[];
  meta?: BaseMeta;
}

export function useGetAllPosition(params?: GetAllPositionParams): UseGetAllPositionReturn {
  const api = new PositionService();

  const { data, error, isPending, isFetching, isLoading } = useQuery({
    queryKey: [
      'positions',
      params?.page,
      params?.perPage,
      params?.status,
      params?.keyword,
      params?.id,
    ],
    queryFn: () => api.getAll(params),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  });

  return useMemo(
    () => ({
      positions: data?.data || [],
      meta: data?.meta,
      error,
      isFetching: isLoading || isFetching || isPending,
    }),
    [data, error, isPending, isLoading, isFetching]
  );
}
