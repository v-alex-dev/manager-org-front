import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { fetchTasksForOrgInstance, toggleTaskStatus } from '@/lib/api/tasks';
import { queryKeys } from '@/lib/query/keys';
import type { ApiCollection, Task } from '@/types/domain';
