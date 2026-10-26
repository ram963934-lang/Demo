import { AUTH_STORAGE_KEY, DEMO_EMAIL, DEMO_PASSWORD, DEMO_USER } from "@/lib/auth/constants";

export type AuthUser = {
  email: string;
  name: string;
  role: "admin";
  rememberMe: boolean;
  loggedInAt: string;
};

export function validateCredentials(email: string, password: string): boolean {
  return email.trim().toLowerCase() === DEMO_EMAIL && password === DEMO_PASSWORD;
}

export function createSession(rememberMe: boolean): AuthUser {
  return {
    ...DEMO_USER,
    rememberMe,
    loggedInAt: new Date().toISOString(),
  };
}

export function getSession(): AuthUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as AuthUser;
  } catch {
    return null;
  }
}

export function setSession(user: AuthUser): void {
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
}

export function clearSession(): void {
  localStorage.removeItem(AUTH_STORAGE_KEY);
}

export function isAuthenticated(): boolean {
  return getSession() !== null;
}
