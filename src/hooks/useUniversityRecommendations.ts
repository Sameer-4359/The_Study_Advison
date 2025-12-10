// src/hooks/useUniversityRecommendations.ts
import { useState, useCallback } from 'react';
import { universityApi, StudentProfileRequest, RecommendationResponse } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';

interface UseUniversityRecommendationsProps {
  onSuccess?: (data: RecommendationResponse) => void;
  onError?: (error: Error) => void;
}

export function useUniversityRecommendations({ onSuccess, onError }: UseUniversityRecommendationsProps = {}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [recommendations, setRecommendations] = useState<RecommendationResponse | null>(null);
  const { user } = useAuth();

  const getRecommendations = useCallback(async (
    studentProfile: StudentProfileRequest,
    top_k: number = 5
  ) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await universityApi.getRecommendations(studentProfile, top_k);
      setRecommendations(data);
      onSuccess?.(data);
      return data;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to get recommendations');
      setError(error);
      onError?.(error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [onSuccess, onError]);

  const clearRecommendations = useCallback(() => {
    setRecommendations(null);
    setError(null);
  }, []);

  return {
    loading,
    error,
    recommendations,
    getRecommendations,
    clearRecommendations,
    hasRecommendations: !!recommendations?.recommendations?.length,
  };
}