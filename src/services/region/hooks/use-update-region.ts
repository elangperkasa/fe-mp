import { UseMutateAsyncFunction, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { UseMutationReturnType } from '../../shared/use-mutation-return-type';
import { RegionResponse } from '../region.response';
import { UpdateRegionRequest } from '../region.request';
import { RegionService } from '../region-service';

export interface UseUpdateRegionReturn extends UseMutationReturnType {
  mutateRegion: UseMutateAsyncFunction<
    RegionResponse | null,
    Error,
    { id: string; payload: UpdateRegionRequest }
  >;
}

export function useUpdateRegion(): UseUpdateRegionReturn {
  const api = new RegionService();
  const client = useQueryClient();

  const { mutateAsync: mutateRegion, error } = useMutation<
    RegionResponse | null,
    Error,
    { id: string; payload: UpdateRegionRequest }
  >({
    mutationFn: ({ id, payload }) => api.update(id, payload),
    onSuccess: async () => {
      await client.refetchQueries({ queryKey: ['regions'] });
      toast.success('Update region success.');
    },
    onMutate: () => toast.info('Please wait. We are updating the region.'),
    onError: () => toast.error('Update region failed. Please try again.'),
  });

  return { mutateRegion, error };
}
