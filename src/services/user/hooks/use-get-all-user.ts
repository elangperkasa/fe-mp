import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { UseQueryReturn } from '../../shared/use-query-return-type';
import { BaseMeta } from '../../shared/base.response';
import { UserService } from '../user-service';
import { GetAllUserParams } from '../user.request';
import { UserResponse } from '../user.response';

interface UseGetAllUserReturn extends UseQueryReturn {
  users: UserResponse[];
  meta?: BaseMeta;
}

export function useGetAllUser(params?: GetAllUserParams): UseGetAllUserReturn {
  const api = new UserService();

  const { data, error, isPending, isFetching, isLoading } = useQuery({
    queryKey: ['users', params?.page, params?.perPage, params?.status, params?.name, params?.role],
    queryFn: () => api.getAll(params),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  });

  return useMemo(
    () => ({
      users: data?.data || [],
      meta: data?.meta,
      error,
      isFetching: isLoading || isFetching || isPending,
    }),
    [data, error, isPending, isLoading, isFetching]
  );
}
