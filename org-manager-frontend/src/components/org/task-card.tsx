'use client';

import { cn } from '@/lib/utils';
import type { Task } from '@/types/domain';

interface TaskCardProps {
  task: Task;
  onToggle: (taskId: number) => void;
  onReport?: (task: Task) => void;
}

export function TaskCard({ task, onToggle, onReport }: TaskCardProps) {
  const isDone = task.status === 'DONE';

  return (
    <li className="overflow-hidden rounded-lg border bg-card text-card-foreground shadow-xs">
      {onReport ? (
        <button
          type="button"
          onClick={() => onReport(task)}
          className="w-full px-4 py-3 text-left text-sm font-semibold active:bg-accent"
        >
          {task.poj_title}
        </button>
      ) : (
        <p className="px-4 py-3 text-sm font-semibold">{task.poj_title}</p>
      )}

      <button
        type="button"
        onClick={() => onToggle(task.id)}
        aria-pressed={isDone}
        className={cn(
          'flex w-full flex-col gap-1 px-4 py-3 text-left text-sm text-white transition-colors',
          isDone ? 'bg-status-done' : 'bg-status-todo'
        )}
      >
        <span className="flex items-center justify-between gap-2 text-xs font-medium opacity-90">
          <span>{task.reference_code}</span>
          <span>{task.service.name}</span>
        </span>
        {task.poj_description && <span>{task.poj_description}</span>}
        <span className="sr-only">{isDone ? 'Fait' : 'À faire'}</span>
      </button>
    </li>
  );
}
