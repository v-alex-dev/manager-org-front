import { apiFetch } from "@/lib/api/client";
import type { ArchiveFilters, CursorPage, Task } from "@/types/domain";

export function fetchArchives(filters: ArchiveFilters) {
  return apiFetch<CursorPage<Task>>("/api/archives", {
    params: { ...filters },
  });
}
