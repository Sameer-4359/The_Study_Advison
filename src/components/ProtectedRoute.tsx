// src/components/ProtectedRoute.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: "student" | "counselor" | "admin";
}

export default function ProtectedRoute({
  children,
  requiredRole = "student",
}: ProtectedRouteProps) {
  const router = useRouter();
  const { isAuthenticated, user, token } = useAuth();

  useEffect(() => {
    // Check if user is authenticated
    if (!isAuthenticated || !token) {
      router.push(
        "/login?redirect=" + encodeURIComponent(window.location.pathname),
      );
      return;
    }

    // Check if user has required role
    if (requiredRole && user?.role !== requiredRole) {
      router.push("/");
      return;
    }
  }, [isAuthenticated, token, user, router, requiredRole]);

  // Show loading state while checking auth
  if (!isAuthenticated || !token) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Check role mismatch
  if (requiredRole && user?.role !== requiredRole) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-600 font-semibold">Access Denied</p>
          <p className="text-gray-600 text-sm mt-2">
            This page is for {requiredRole}s only.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
