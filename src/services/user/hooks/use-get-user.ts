import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { UseQueryReturn } from '../../shared/use-query-return-type';
import { UserDetailResponse } from '../user.response';
import { UserService } from '../user-service';

interface UseGetUserReturn extends UseQueryReturn {
  user?: UserDetailResponse;
}

export function useGetUser(id: string): UseGetUserReturn {
  const api = new UserService();

  const {
    data: user,
    error,
    isPending,
    isFetching,
    isLoading,
  } = useQuery({
    queryKey: ['user', id],
    queryFn: () => api.get(id),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  });

  return useMemo(
    () => ({
      user,
      error,
      isFetching: isLoading || isFetching || isPending,
    }),
    [user, error, isPending, isLoading, isFetching]
  );
}
