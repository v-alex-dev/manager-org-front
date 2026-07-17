const TOKEN_KEY = "org_manager_token";

// Le token Sanctum est stocke cote client car l'API utilise l'auth par token
// (pas le mode cookie SPA de Sanctum). Isole ici pour pouvoir migrer vers un
// autre mecanisme de stockage sans toucher au reste de l'application.

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(TOKEN_KEY);
}
