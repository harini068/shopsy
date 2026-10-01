export type AuthRole = "customer" | "admin";

export type AuthUser = {
  name: string;
  email: string;
  phone?: string;
  role: AuthRole;
};

export const AUTH_COOKIE_NAME = "your_shoppy_auth";
const AUTH_USER_KEY = "your_shoppy_user";
export const AUTH_LOADING_SNAPSHOT = "__auth_loading__";
const authListeners = new Set<() => void>();

export function subscribeAuth(listener: () => void) {
  authListeners.add(listener);

  const handleStorage = (event: StorageEvent) => {
    if (event.key === AUTH_USER_KEY || event.key === null) listener();
  };
  if (typeof window !== "undefined") window.addEventListener("storage", handleStorage);

  return () => {
    authListeners.delete(listener);
    if (typeof window !== "undefined") window.removeEventListener("storage", handleStorage);
  };
}

export function getAuthSnapshot() {
  if (typeof window === "undefined") return AUTH_LOADING_SNAPSHOT;

  try {
    return window.localStorage.getItem(AUTH_USER_KEY) ?? "";
  } catch {
    return "";
  }
}

function notifyAuthListeners() {
  authListeners.forEach((listener) => listener());
}

export function getAuthCookieValue(): string | null {
  if (typeof document === "undefined") return null;

  const cookies = document.cookie.split(";");
  const match = cookies.find((cookie) => cookie.trim().startsWith(`${AUTH_COOKIE_NAME}=`));

  if (!match) return null;

  return decodeURIComponent(match.split("=")[1] ?? "");
}

export function saveAuthUser(user: AuthUser) {
  if (typeof document === "undefined") return;

  const encoded = encodeURIComponent(JSON.stringify(user));
  document.cookie = `${AUTH_COOKIE_NAME}=${encoded}; path=/; max-age=86400; samesite=lax`;
  localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
  notifyAuthListeners();
}

export function clearAuthUser() {
  if (typeof document === "undefined") return;

  document.cookie = `${AUTH_COOKIE_NAME}=; path=/; max-age=0; samesite=lax`;
  localStorage.removeItem(AUTH_USER_KEY);
  notifyAuthListeners();
}

export function getStoredAuthUser(): AuthUser | null {
  if (typeof window === "undefined") return null;

  const raw = localStorage.getItem(AUTH_USER_KEY);
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw) as AuthUser;
    return parsed;
  } catch {
    return null;
  }
}
