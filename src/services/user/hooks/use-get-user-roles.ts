import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { UseQueryReturn } from '../../shared/use-query-return-type';
import { UserService } from '../user-service';

interface UseGetUserRolesReturn extends UseQueryReturn {
  roles: string[];
}

export function useGetUserRoles(): UseGetUserRolesReturn {
  const api = new UserService();

  const {
    data: roles,
    error,
    isPending,
    isFetching,
    isLoading,
  } = useQuery({
    queryKey: ['user-roles'],
    queryFn: () => api.getRoles(),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  });

  return useMemo(
    () => ({
      roles: roles || [],
      error,
      isFetching: isLoading || isFetching || isPending,
    }),
    [roles, error, isPending, isLoading, isFetching]
  );
}
