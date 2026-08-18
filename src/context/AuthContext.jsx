import { createContext, useCallback, useContext, useState } from "react";
import { api, clearToken, setToken } from "../services/apiClient.js";

const AuthContext = createContext(null);

const STORAGE_KEY = "admindashboard.auth.user";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const result = localStorage.getItem(STORAGE_KEY);
    return JSON.parse(result);
  });

  const login = useCallback(async (loginEmail, loginPassword) => {
    try {
      const result = await api.post("/auth/admin/login", {
        email: loginEmail,
        password: loginPassword,
      });

      if (result.data.token) {
        setToken(result.data.token);
      }

      const loggedInUser = JSON.stringify(result.data.user);

      localStorage.setItem(STORAGE_KEY, loggedInUser);
      setUser(result?.data?.user);

      return result;
    } catch (error) {
      console.error("Login failed:", error);
      return {
        success: false,
        error,
      };
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    clearToken();
    setUser(null);
  }, []);

  const value = { user, isAuthenticated: Boolean(user), login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
