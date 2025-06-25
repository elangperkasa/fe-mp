import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { UseQueryReturn } from '../../shared/use-query-return-type';
import { BaseMeta } from '../../shared/base.response';
import { ApprovalResponse } from '../approval.response';
import { ApprovalService } from '../approval-service';
import { GetAllApprovalParams } from '../approval.request';

interface UseGetAllApprovalReturn extends UseQueryReturn {
  approvals: ApprovalResponse[];
  meta?: BaseMeta;
}

export function useGetAllApproval(params?: GetAllApprovalParams): UseGetAllApprovalReturn {
  const api = new ApprovalService();

  const { data, error, isPending, isFetching, isLoading } = useQuery({
    queryKey: [
      'approvals',
      params?.page,
      params?.perPage,
      params?.keyword,
      params?.requestOwnerStatus,
      params?.sort,
    ],
    queryFn: () => api.getAll(params),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  });

  return useMemo(
    () => ({
      approvals: data?.data || [],
      meta: data?.meta,
      error,
      isFetching: isLoading || isFetching || isPending,
    }),
    [data, error, isPending, isLoading, isFetching]
  );
}
