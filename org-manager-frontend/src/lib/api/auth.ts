import { apiFetch } from "@/lib/api/client";
import type { LoginPayload, User } from "@/types/domain";

interface LoginResponse {
  token: string;
  user: User;
}

interface UserResponse {
  user: User;
}

export function login(payload: LoginPayload) {
  return apiFetch<LoginResponse>("/api/login", {
    method: "POST",
    body: payload,
  });
}

export function logout() {
  return apiFetch<{ message: string }>("/api/logout", { method: "POST" });
}

export function fetchCurrentUser() {
  return apiFetch<UserResponse>("/api/user");
}
