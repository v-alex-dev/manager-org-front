import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { createService, fetchServices } from '@/lib/api/services';
import { queryKeys } from '@/lib/query/keys';

export function useServices() {
  return useQuery({
    queryKey: queryKeys.services,
    queryFn: fetchServices,
    select: (response) => response.data,
    staleTime: 5 * 60_000, // les services changent rarement
  });
}

export function useCreateService() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createService,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.services }),
  });
}
