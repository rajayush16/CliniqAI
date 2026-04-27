import { createContext, useContext, useMemo, useState } from "react";
import type { AuthResponse, User } from "../types/auth";
import { clearToken, getToken, setToken } from "../services/api";

type AuthContextValue = {
  token: string | null;
  user: User | null;
  setSession: (response: AuthResponse) => void;
  logout: () => void;
};

const USER_KEY = "cliniqai_user";
const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setTokenState] = useState(() => getToken());
  const [user, setUser] = useState<User | null>(() => {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? (JSON.parse(raw) as User) : null;
  });

  const value = useMemo<AuthContextValue>(
    () => ({
      token,
      user,
      setSession: (response) => {
        setToken(response.access_token);
        localStorage.setItem(USER_KEY, JSON.stringify(response.user));
        setTokenState(response.access_token);
        setUser(response.user);
      },
      logout: () => {
        clearToken();
        localStorage.removeItem(USER_KEY);
        setTokenState(null);
        setUser(null);
      },
    }),
    [token, user],
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
