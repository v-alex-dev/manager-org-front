import { apiFetch } from "@/lib/api/client";
import type {
  ApiCollection,
  ApiResource,
  CreateTaskPayload,
  MoveTaskPayload,
  Task,
} from "@/types/domain";

export function fetchTasksForOrgInstance(orgInstanceId: number) {
  return apiFetch<ApiCollection<Task>>(`/api/orgs/${orgInstanceId}/tasks`);
}

export function createTask(payload: CreateTaskPayload) {
  return apiFetch<ApiResource<Task>>("/api/tasks", {
    method: "POST",
    body: payload,
  });
}

// Bascule TODO <-> DONE, pas de corps de requete necessaire
export function toggleTaskStatus(taskId: number) {
  return apiFetch<ApiResource<Task>>(`/api/tasks/${taskId}/status`, {
    method: "PATCH",
  });
}

// Report d'une tache vers une instance ulterieure du meme type d'ORG
export function moveTask(taskId: number, payload: MoveTaskPayload) {
  return apiFetch<ApiResource<Task>>(`/api/tasks/${taskId}/move`, {
    method: "PATCH",
    body: payload,
  });
}
