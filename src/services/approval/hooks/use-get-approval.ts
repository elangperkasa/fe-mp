import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { UseQueryReturn } from '../../shared/use-query-return-type';
import { ApprovalDetailResponse } from '../approval.response';
import { ApprovalService } from '../approval-service';

interface UseGetApprovalReturn extends UseQueryReturn {
  approval?: ApprovalDetailResponse;
}

export function useGetAppoval(id: string): UseGetApprovalReturn {
  const api = new ApprovalService();

  const {
    data: approval,
    error,
    isPending,
    isFetching,
    isLoading,
  } = useQuery({
    queryKey: ['approval', id],
    queryFn: () => api.get(id),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  });

  return useMemo(
    () => ({
      approval,
      error,
      isFetching: isLoading || isFetching || isPending,
    }),
    [approval, error, isPending, isLoading, isFetching]
  );
}
