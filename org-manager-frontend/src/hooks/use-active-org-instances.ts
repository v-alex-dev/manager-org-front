import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { archiveOrgInstance, fetchActiveOrgInstances } from '@/lib/api/orgs';
import { queryKeys } from '@/lib/query/keys';
import type { OrgType } from '@/types/domain';

export function useActiveOrgInstances(type: OrgType) {
  return useQuery({
    queryKey: queryKeys.activeOrgInstances(type),
    queryFn: () => fetchActiveOrgInstances(type),
    select: (response) => response.data,
  });
}

export function useArchiveOrgInstance(type: OrgType) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (orgInstanceId: number) => archiveOrgInstance(orgInstanceId),
    onSuccess: () => {
      // L'ORG sort de la bulle...
      queryClient.invalidateQueries({ queryKey: queryKeys.activeOrgInstances(type) });
      // ...et doit apparaître dans les archives (préfixe commun à tous les filtres).
      queryClient.invalidateQueries({ queryKey: ['archives'] });
    },
  });
}
