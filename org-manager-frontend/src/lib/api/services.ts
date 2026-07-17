import { apiFetch } from "@/lib/api/client";
import type { ApiCollection, ApiResource, CreateServicePayload, Service } from "@/types/domain";

export function fetchServices() {
  return apiFetch<ApiCollection<Service>>("/api/services");
}

export function createService(payload: CreateServicePayload) {
  return apiFetch<ApiResource<Service>>("/api/services", {
    method: "POST",
    body: payload,
  });
}
