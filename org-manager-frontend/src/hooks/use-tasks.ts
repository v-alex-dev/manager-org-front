import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { createTask, fetchTasksForOrgInstance, toggleTaskStatus } from '@/lib/api/tasks';
import { queryKeys } from '@/lib/query/keys';
import type { ApiCollection, Task } from '@/types/domain';

export function useTasksForOrgInstance(orgInstanceId: number | null) {
  return useQuery({
    queryKey: queryKeys.tasks(orgInstanceId ?? -1),
    queryFn: () => fetchTasksForOrgInstance(orgInstanceId as number),
    enabled: orgInstanceId !== null,
    select: (response) => response.data,
  });
}

export function useToggleTaskStatus(orgInstanceId: number | null) {
  const queryClient = useQueryClient();
  const key = queryKeys.tasks(orgInstanceId ?? -1);

  return useMutation({
    mutationFn: (taskId: number) => toggleTaskStatus(taskId),

    // Mise à jour optimiste : la couleur change au tap, avant la réponse serveur.
    onMutate: async (taskId) => {
      await queryClient.cancelQueries({ queryKey: key });
      const previous = queryClient.getQueryData<ApiCollection<Task>>(key);

      queryClient.setQueryData<ApiCollection<Task>>(key, (old) =>
        old
          ? {
              ...old,
              data: old.data.map((task) =>
                task.id === taskId
                  ? { ...task, status: task.status === 'TODO' ? 'DONE' : 'TODO' }
                  : task
              ),
            }
          : old
      );

      return { previous };
    },

    // Échec : on restaure l'état d'avant le tap.
    onError: (_error, _taskId, context) => {
      if (context?.previous) {
        queryClient.setQueryData(key, context.previous);
      }
    },

    // Dans tous les cas, on se resynchronise avec le serveur.
    onSettled: () => queryClient.invalidateQueries({ queryKey: key }),
  });
}
export function useCreateTask(orgInstanceId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTask,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.tasks(orgInstanceId) }),
  });
}
