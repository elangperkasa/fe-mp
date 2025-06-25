import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { UseQueryReturn } from '../../shared/use-query-return-type';
import { RegionService } from '../region-service';
import { RegionResponse } from '../region.response';
import { GetAllRegionParams } from '../region.request';
import { BaseMeta } from '../../shared/base.response';

interface UseGetAllRegionReturn extends UseQueryReturn {
  regions: RegionResponse[];
  meta?: BaseMeta;
}

export function useGetAllRegion(params?: GetAllRegionParams): UseGetAllRegionReturn {
  const api = new RegionService();

  const { data, error, isPending, isFetching, isLoading } = useQuery({
    queryKey: [
      'regions',
      params?.page,
      params?.perPage,
      params?.status,
      params?.name,
      params?.id,
      params?.description,
    ],
    queryFn: () => api.getAll(params),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  });

  return useMemo(
    () => ({
      regions: data?.data || [],
      meta: data?.meta,
      error,
      isFetching: isLoading || isFetching || isPending,
    }),
    [data, error, isPending, isLoading, isFetching]
  );
}
