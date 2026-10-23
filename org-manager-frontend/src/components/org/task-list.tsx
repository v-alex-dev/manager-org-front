'use client';

import { TaskCard } from '@/components/org/task-card';
import { useTasksForOrgInstance, useToggleTaskStatus } from '@/hooks/use-tasks';

interface TaskListProps {
  orgInstanceId: number;
}

export function TaskList({ orgInstanceId }: TaskListProps) {
  const { data: tasks, isLoading, isError } = useTasksForOrgInstance(orgInstanceId);
  const toggleStatus = useToggleTaskStatus(orgInstanceId);

  if (isLoading) {
    return <p className="text-sm text-muted-foreground">Chargement des tâches...</p>;
  }

  if (isError) {
    return (
      <p className="text-sm text-destructive" role="alert">
        Impossible de charger les tâches.
      </p>
    );
  }

  if (!tasks || tasks.length === 0) {
    return <p className="text-sm text-muted-foreground">Aucune tâche pour cet ORG.</p>;
  }

  return (
    <ul className="flex flex-col gap-3">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} onToggle={(id) => toggleStatus.mutate(id)} />
      ))}
    </ul>
  );
}
