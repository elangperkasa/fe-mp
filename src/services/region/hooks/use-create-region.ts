import { UseMutateAsyncFunction, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { UseMutationReturnType } from '../../shared/use-mutation-return-type';
import { RegionResponse } from '../region.response';
import { CreateRegionRequest } from '../region.request';
import { RegionService } from '../region-service';

export interface UseCreateRegionReturn extends UseMutationReturnType {
  mutateRegion: UseMutateAsyncFunction<
    RegionResponse | null,
    Error,
    { payload: CreateRegionRequest }
  >;
}

export function useCreateRegion(): UseCreateRegionReturn {
  const api = new RegionService();
  const client = useQueryClient();

  const { mutateAsync: mutateRegion, error } = useMutation<
    RegionResponse | null,
    Error,
    { payload: CreateRegionRequest }
  >({
    mutationFn: ({ payload }) => api.create(payload),
    onSuccess: async () => {
      await client.refetchQueries({ queryKey: ['regions'] });
      toast.success('Create region success.');
    },
    onMutate: () => toast.info('Please wait. We are creating the region.'),
    onError: () => toast.error('Create region failed. Please try again.'),
  });

  return { mutateRegion, error };
}
