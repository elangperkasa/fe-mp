import { UseMutateAsyncFunction, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { UseMutationReturnType } from '../../shared/use-mutation-return-type';
import { TerritoryResponse } from '../territory.response';
import { CreateTerritoryRequest } from '../territory.request';
import { TerritoryService } from '../territory-service';

export interface UseCreateTerritoryReturn extends UseMutationReturnType {
  mutateTerritory: UseMutateAsyncFunction<
    TerritoryResponse | null,
    Error,
    { payload: CreateTerritoryRequest }
  >;
}

export function useCreateTerritory(): UseCreateTerritoryReturn {
  const api = new TerritoryService();
  const client = useQueryClient();

  const { mutateAsync: mutateTerritory, error } = useMutation<
    TerritoryResponse | null,
    Error,
    { payload: CreateTerritoryRequest }
  >({
    mutationFn: ({ payload }) => api.create(payload),
    onSuccess: async () => {
      await client.refetchQueries({ queryKey: ['territories'] });
      toast.success('Create territory success.');
    },
    onMutate: () => toast.info('Please wait. We are creating the territory.'),
    onError: () => toast.error('Create territory failed. Please try again.'),
  });

  return { mutateTerritory, error };
}
