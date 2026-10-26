"use client";

import { useRouter } from "next/navigation";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

import {
  clearSession,
  createSession,
  getSession,
  setSession,
  validateCredentials,
  type AuthUser,
} from "@/lib/auth/session";

type AuthContextValue = {
  user: AuthUser | null;
  ready: boolean;
  login: (email: string, password: string, rememberMe: boolean) => Promise<{ ok: boolean; error?: string }>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setUser(getSession());
    setReady(true);
  }, []);

  const login = useCallback(async (email: string, password: string, rememberMe: boolean) => {
    await new Promise((resolve) => setTimeout(resolve, 900));
    if (!validateCredentials(email, password)) {
      return { ok: false, error: "Invalid email or password. Try admin@dropshipguru.in / 123456" };
    }
    const session = createSession(rememberMe);
    setSession(session);
    setUser(session);
    return { ok: true };
  }, []);

  const logout = useCallback(() => {
    clearSession();
    setUser(null);
    router.push("/");
  }, [router]);

  const value = useMemo(
    () => ({ user, ready, login, logout }),
    [user, ready, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
