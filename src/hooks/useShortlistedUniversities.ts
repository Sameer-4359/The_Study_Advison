// src/hooks/useShortlistedUniversities.ts
"use client";

import { useState, useCallback, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";

export interface ShortlistedUniversity {
  universityId: string;
  universityName: string;
  country: string;
  ranking: string;
  tuitionFee: string;
  matchPercentage: number;
  addedAt: string;
}

const STORAGE_KEY = "shortlistedUniversities";
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

const SHORTLIST_UPDATED_EVENT = "shortlist-updated";

function readStoredShortlist(): ShortlistedUniversity[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (err) {
    console.error("Failed to load shortlisted universities:", err);
    return [];
  }
}

function writeStoredShortlist(shortlisted: ShortlistedUniversity[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(shortlisted));
  } catch (err) {
    console.error("Failed to save shortlisted universities:", err);
  }
}

function notifyShortlistUpdated() {
  window.dispatchEvent(new Event(SHORTLIST_UPDATED_EVENT));
}

export function useShortlistedUniversities() {
  const { token, user } = useAuth();
  const [shortlisted, setShortlisted] = useState<ShortlistedUniversity[]>([]);
  const [loading, setLoading] = useState(false);
  const [syncing, setSyncing] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const syncFromStorage = () => {
      setShortlisted(readStoredShortlist());
    };

    syncFromStorage();

    const handleStorageChange = () => syncFromStorage();

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener(SHORTLIST_UPDATED_EVENT, handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener(SHORTLIST_UPDATED_EVENT, handleStorageChange);
    };
  }, []);

  // Add university to shortlist
  const addToShortlist = useCallback(
    async (
      universityId: string,
      universityData: Omit<ShortlistedUniversity, "addedAt">,
    ) => {
      setLoading(true);
      try {
        // Check if already shortlisted
        const alreadyShortlisted = shortlisted.some(
          (uni) => uni.universityId === universityId,
        );

        if (alreadyShortlisted) {
          toast.error("University already in your shortlist");
          setLoading(false);
          return false;
        }

        const newEntry: ShortlistedUniversity = {
          ...universityData,
          addedAt: new Date().toISOString(),
        };

        setShortlisted((prev) => {
          const next = [...prev, newEntry];
          writeStoredShortlist(next);
          return next;
        });
        notifyShortlistUpdated();

        // Try to sync with backend if authenticated
        if (token && user?.id) {
          try {
            setSyncing(true);
            await fetch(`${API_BASE_URL}/student/shortlist`, {
              method: "POST",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                universityId: parseInt(universityId),
              }),
            });
          } catch (err) {
            console.warn("Failed to sync shortlist with backend:", err);
            // Still succeed with localStorage fallback
          } finally {
            setSyncing(false);
          }
        }

        toast.success("University shortlisted!");
        return true;
      } catch (err) {
        console.error("Failed to add to shortlist:", err);
        toast.error("Failed to shortlist university");
        return false;
      } finally {
        setLoading(false);
      }
    },
    [shortlisted, token, user?.id],
  );

  // Remove university from shortlist
  const removeFromShortlist = useCallback(
    async (universityId: string) => {
      setLoading(true);
      try {
        setShortlisted((prev) => {
          const next = prev.filter((uni) => uni.universityId !== universityId);
          writeStoredShortlist(next);
          return next;
        });
        notifyShortlistUpdated();

        // Try to sync with backend if authenticated
        if (token && user?.id) {
          try {
            setSyncing(true);
            await fetch(`${API_BASE_URL}/student/shortlist/${universityId}`, {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
          } catch (err) {
            console.warn("Failed to sync removal with backend:", err);
            // Still succeed with localStorage fallback
          } finally {
            setSyncing(false);
          }
        }

        toast.success("Removed from shortlist");
        return true;
      } catch (err) {
        console.error("Failed to remove from shortlist:", err);
        toast.error("Failed to remove from shortlist");
        // Revert optimistic update
        const removedUniversity = shortlisted.find(
          (uni) => uni.universityId === universityId,
        );

        if (removedUniversity) {
          setShortlisted((prev) => {
            const next = prev.some((uni) => uni.universityId === universityId)
              ? prev
              : [...prev, removedUniversity];
            writeStoredShortlist(next);
            return next;
          });
          notifyShortlistUpdated();
        }
        return false;
      } finally {
        setLoading(false);
      }
    },
    [shortlisted, token, user?.id],
  );

  // Check if university is shortlisted
  const isShortlisted = useCallback(
    (universityId: string): boolean => {
      return shortlisted.some((uni) => uni.universityId === universityId);
    },
    [shortlisted],
  );

  // Get shortlist count
  const getCount = useCallback((): number => {
    return shortlisted.length;
  }, [shortlisted]);

  // Clear all shortlisted universities
  const clearShortlist = useCallback(async () => {
    try {
      setShortlisted([]);
      writeStoredShortlist([]);
      notifyShortlistUpdated();

      // Try to sync with backend if authenticated
      if (token && user?.id) {
        try {
          setSyncing(true);
          await fetch(`${API_BASE_URL}/student/shortlist`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        } catch (err) {
          console.warn("Failed to sync clear with backend:", err);
        } finally {
          setSyncing(false);
        }
      }

      toast.success("Shortlist cleared");
      return true;
    } catch (err) {
      console.error("Failed to clear shortlist:", err);
      toast.error("Failed to clear shortlist");
      return false;
    }
  }, [token, user?.id]);

  // Inform counselor about shortlisted universities
  const informCounselor = useCallback(async () => {
    if (!token || !user?.id) {
      toast.error("Please login to inform your counselor");
      return false;
    }

    if (shortlisted.length === 0) {
      toast.error("No universities to inform counselor about");
      return false;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/student/inform-counselor`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          studentId: user.id,
          shortlistedUniversities: shortlisted.map((uni) =>
            parseInt(uni.universityId),
          ),
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to inform counselor");
      }

      toast.success("Your counselor has been informed!");
      return true;
    } catch (err) {
      console.error("Failed to inform counselor:", err);
      const message =
        err instanceof Error ? err.message : "Failed to inform counselor";
      toast.error(message);
      return false;
    } finally {
      setLoading(false);
    }
  }, [token, user?.id, shortlisted]);

  return {
    shortlisted,
    loading,
    syncing,
    addToShortlist,
    removeFromShortlist,
    isShortlisted,
    getCount,
    clearShortlist,
    informCounselor,
  };
}
