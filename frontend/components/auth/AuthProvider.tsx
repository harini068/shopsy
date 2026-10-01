"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { clearAuthUser, getStoredAuthUser, saveAuthUser, type AuthUser } from "@/lib/auth";

type AuthContextType = {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (email: string, password: string) => AuthUser;
  signUp: (user: AuthUser, password: string) => AuthUser;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = getStoredAuthUser();
    setUser(storedUser);
    setIsLoading(false);
  }, []);

  const signIn = useCallback((email: string, password: string) => {
    const storedUser = getStoredAuthUser();
    if (!storedUser || storedUser.email !== email) {
      const fallbackUser: AuthUser = {
        name: "Demo User",
        email,
        phone: "",
        role: "customer",
      };
      saveAuthUser(fallbackUser);
      setUser(fallbackUser);
      return fallbackUser;
    }

    if (password.trim().length < 6) {
      throw new Error("Password must be at least 6 characters long.");
    }

    saveAuthUser(storedUser);
    setUser(storedUser);
    return storedUser;
  }, []);

  const signUp = useCallback((newUser: AuthUser, password: string) => {
    if (password.trim().length < 6) {
      throw new Error("Password must be at least 6 characters long.");
    }

    const userToSave: AuthUser = {
      ...newUser,
      role: newUser.role ?? "customer",
    };

    saveAuthUser(userToSave);
    setUser(userToSave);
    return userToSave;
  }, []);

  const signOut = useCallback(() => {
    clearAuthUser();
    setUser(null);
  }, []);

  const value = useMemo<AuthContextType>(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      isLoading,
      signIn,
      signUp,
      signOut,
    }),
    [user, isLoading, signIn, signUp, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
