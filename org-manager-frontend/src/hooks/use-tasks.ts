import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { fetchTasksForOrgInstance, toggleTaskStatus } from '@/lib/api/tasks';
import { queryKeys } from '@/lib/query/keys';
import type { ApiCollection, Task } from '@/types/domain';

export function useTasksForOrgInstance(orgInstanceId: number | null) {}
export function useToggleTaskStatus(orgInstanceId: number | null) {}
