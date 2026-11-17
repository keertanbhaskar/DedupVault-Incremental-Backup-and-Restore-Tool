import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import api from "../services/api";

// Create the authentication context
const AuthContext = createContext(null);

// Authentication provider
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Verify the saved token and retrieve the logged-in user
  const refreshUser = useCallback(async () => {
    const token =
      localStorage.getItem("access_token") ||
      sessionStorage.getItem("access_token");

    if (!token) {
      setUser(null);
      setIsLoading(false);
      return;
    }

    try {
      const response = await api.get("/auth/me");

      setUser(response.data);
    } catch (error) {
      console.error("Authentication verification failed:", error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Check authentication when the application starts
  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  // Centralized logout function
  const logout = useCallback(() => {
    localStorage.removeItem("access_token");
    sessionStorage.removeItem("access_token");

    setUser(null);
  }, []);

  // Share authentication data with the application
  const contextValue = useMemo(
    () => ({
      user,
      setUser,
      isLoading,
      isAuthenticated: Boolean(user),
      refreshUser,
      logout,
    }),
    [user, isLoading, refreshUser, logout],
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

// Custom hook for accessing authentication
export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside an AuthProvider");
  }

  return context;
}
