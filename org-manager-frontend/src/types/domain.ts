// Types calques sur la structure de reponse de l'API Laravel (Doc_API.md)

export type OrgType = "CFG" | "COMITE";
export type RecurrenceType = "HEBDO" | "OCCASIONNEL";
export type TaskStatus = "TODO" | "DONE";

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface Service {
  id: number;
  name: string;
}

export interface OrgInstance {
  id: number;
  type: OrgType;
  recurrence_type: RecurrenceType;
  date_meeting: string; // ISO date
  is_archived: boolean;
}

export interface Task {
  id: number;
  poj_title: string;
  poj_description: string | null;
  status: TaskStatus;
  reference_code: string;
  service: Service;
  org_instance: OrgInstance;
}

// Payloads d'ecriture

export interface LoginPayload {
  email: string;
  password: string;
}

export interface CreateServicePayload {
  name: string;
}

export interface CreateOrgInstancePayload {
  type: OrgType;
  recurrence_type: RecurrenceType;
  date_meeting: string;
}

export interface CreateTaskPayload {
  org_instance_id: number;
  service_id: number;
  poj_title: string;
  poj_description?: string;
}

export interface MoveTaskPayload {
  org_instance_id: number;
}

export interface ArchiveFilters {
  type?: OrgType;
  year?: number;
  poj_title?: string;
  reference_code?: string;
  cursor?: string;
}

// Enveloppes de reponse API

export interface ApiCollection<T> {
  data: T[];
}

export interface ApiResource<T> {
  data: T;
}

export interface CursorPage<T> {
  data: T[];
  path: string;
  per_page: number;
  next_cursor: string | null;
  next_page_url: string | null;
  prev_cursor: string | null;
  prev_page_url: string | null;
}
