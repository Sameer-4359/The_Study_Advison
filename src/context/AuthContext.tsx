"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  fullName: string;
  email: string;
  role: string;
  paymentStatus?: "free" | "paid";
}

interface AuthContextProps {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string, user: User) => void;
  signup: (token: string, user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const isAuthenticated = !!token;

  // ---------------------
  // Load stored session
  // ---------------------
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      const parsedUser = JSON.parse(storedUser) as User;
      const normalizedUser: User = {
        ...parsedUser,
        role: parsedUser.role || "student",
        paymentStatus: parsedUser.paymentStatus || "free",
      };

      setToken(storedToken);
      setUser(normalizedUser);

      try {
        document.cookie = `token=${encodeURIComponent(storedToken)}; path=/`;
        document.cookie = `role=${encodeURIComponent(normalizedUser.role)}; path=/`;
        document.cookie = `paymentStatus=${encodeURIComponent(
          normalizedUser.paymentStatus || "free",
        )}; path=/`;
      } catch (err) {
        // ignore in non-browser environments
      }
    }
  }, []);

  // ---------------------
  // Login function
  // ---------------------
  const login = (newToken: string, newUser: User) => {
    const normalizedUser: User = {
      ...newUser,
      role: newUser.role || "student",
      paymentStatus: newUser.paymentStatus || "free",
    };

    localStorage.setItem("token", newToken);
    localStorage.setItem("user", JSON.stringify(normalizedUser));

    setToken(newToken);
    setUser(normalizedUser);

    // Set simple cookies so Next.js middleware (server) can inspect auth state.
    try {
      document.cookie = `token=${encodeURIComponent(newToken)}; path=/`;
      document.cookie = `role=${encodeURIComponent(normalizedUser.role)}; path=/`;
      document.cookie = `paymentStatus=${encodeURIComponent(
        normalizedUser.paymentStatus || "free",
      )}; path=/`;
    } catch (err) {
      // ignore in non-browser environments
    }

    // After login, unpaid students should go to /pricing
    if (
      normalizedUser.role === "student" &&
      normalizedUser.paymentStatus !== "paid"
    ) {
      router.push("/pricing");
      return;
    }

    router.push("/student/dashboard");
  };

  // Signup uses the same logic
  const signup = login;

  // ---------------------
  // Logout function
  // ---------------------
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setToken(null);
    setUser(null);

    try {
      document.cookie = `token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
      document.cookie = `role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
      document.cookie = `paymentStatus=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    } catch (err) {}

    router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{ user, token, isAuthenticated, login, signup, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
