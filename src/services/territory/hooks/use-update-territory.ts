import { UseMutateAsyncFunction, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { UseMutationReturnType } from '../../shared/use-mutation-return-type';
import { TerritoryResponse } from '../territory.response';
import { UpdateTerritoryRequest } from '../territory.request';
import { TerritoryService } from '../territory-service';

export interface UseUpdateTerritoryReturn extends UseMutationReturnType {
  mutateTerritory: UseMutateAsyncFunction<
    TerritoryResponse | null,
    Error,
    { id: string; payload: UpdateTerritoryRequest }
  >;
}

export function useUpdateTerritory(): UseUpdateTerritoryReturn {
  const api = new TerritoryService();
  const client = useQueryClient();

  const { mutateAsync: mutateTerritory, error } = useMutation<
    TerritoryResponse | null,
    Error,
    { id: string; payload: UpdateTerritoryRequest }
  >({
    mutationFn: ({ id, payload }) => api.update(id, payload),
    onSuccess: async () => {
      await client.refetchQueries({ queryKey: ['territories'] });
      toast.success('Update territory success.');
    },
    onMutate: () => toast.info('Please wait. We are updating the territory.'),
    onError: () => toast.error('Update territory failed. Please try again.'),
  });

  return { mutateTerritory, error };
}
