import type { ArchiveFilters, OrgType } from "@/types/domain";

export const queryKeys = {
  currentUser: ["current-user"] as const,
  services: ["services"] as const,
  activeOrgInstances: (type: OrgType) => ["org-instances", "active", type] as const,
  tasks: (orgInstanceId: number) => ["tasks", orgInstanceId] as const,
  archives: (filters: ArchiveFilters) => ["archives", filters] as const,
};
