import { apiFetch } from "@/lib/api/client";
import type {
  ApiCollection,
  ApiResource,
  CreateOrgInstancePayload,
  OrgInstance,
  OrgType,
} from "@/types/domain";

export function fetchActiveOrgInstances(type: OrgType) {
  return apiFetch<ApiCollection<OrgInstance>>("/api/orgs/active", {
    params: { type },
  });
}

export function createOrgInstance(payload: CreateOrgInstancePayload) {
  return apiFetch<ApiResource<OrgInstance>>("/api/orgs", {
    method: "POST",
    body: payload,
  });
}

export function archiveOrgInstance(id: number) {
  return apiFetch<ApiResource<OrgInstance>>(`/api/orgs/${id}/archive`, {
    method: "PUT",
  });
}
