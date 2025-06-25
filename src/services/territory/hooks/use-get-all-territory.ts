import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { UseQueryReturn } from '../../shared/use-query-return-type';
import { TerritoryResponse } from '../territory.response';
import { TerritoryService } from '../territory-service';
import { GetAllTerritoryParams } from '../territory.request';
import { BaseMeta } from '../../shared/base.response';

interface UseGetAllTerritoryReturn extends UseQueryReturn {
  territories: TerritoryResponse[];
  meta?: BaseMeta;
}

export function useGetAllTerritory(params?: GetAllTerritoryParams): UseGetAllTerritoryReturn {
  const api = new TerritoryService();

  const { data, error, isPending, isFetching, isLoading } = useQuery({
    queryKey: [
      'territories',
      params?.page,
      params?.perPage,
      params?.status,
      params?.name,
      params?.id,
      params?.description,
      params?.regionIds,
    ],
    queryFn: () => api.getAll(params),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  });

  return useMemo(
    () => ({
      territories: data?.data || [],
      meta: data?.meta,
      error,
      isFetching: isLoading || isFetching || isPending,
    }),
    [data, error, isPending, isLoading, isFetching]
  );
}
