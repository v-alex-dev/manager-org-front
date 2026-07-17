"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import { fetchCurrentUser, login as loginRequest, logout as logoutRequest } from "@/lib/api/auth";
import { clearToken, getToken, setToken } from "@/lib/auth/token-storage";
import { ApiError } from "@/lib/api/client";
import type { LoginPayload, User } from "@/types/domain";

interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  login: (payload: LoginPayload) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function restoreSession() {
      if (!getToken()) {
        setIsLoading(false);
        return;
      }
      try {
        const { user } = await fetchCurrentUser();
        setUser(user);
      } catch {
        clearToken();
      } finally {
        setIsLoading(false);
      }
    }
    restoreSession();
  }, []);

  async function login(payload: LoginPayload) {
    const response = await loginRequest(payload);
    setToken(response.token);
    setUser(response.user);
  }

  async function logout() {
    try {
      await logoutRequest();
    } catch (error) {
      // Meme si l'appel echoue (token deja expire par exemple), on nettoie
      // la session locale : l'utilisateur doit pouvoir se deconnecter.
      if (!(error instanceof ApiError)) throw error;
    } finally {
      clearToken();
      setUser(null);
    }
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth doit etre utilise a l'interieur de AuthProvider");
  }
  return context;
}
