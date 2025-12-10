// src/hooks/useUniversities.ts
import { useState, useCallback, useEffect } from 'react';
import { universityApi, UniversityListResponse } from '@/lib/api';

interface UseUniversitiesProps {
  filters?: {
    country?: string;
    program_level?: string;
    min_gpa?: number;
    max_tuition?: number;
  };
}

export function useUniversities({ filters }: UseUniversitiesProps = {}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [universities, setUniversities] = useState<UniversityListResponse[]>([]);
  const [countries, setCountries] = useState<string[]>([]);
  const [programLevels, setProgramLevels] = useState<string[]>([]);

  const fetchUniversities = useCallback(async (customFilters?: typeof filters) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await universityApi.getUniversities(customFilters || filters);
      setUniversities(data);
      return data;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to fetch universities');
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [filters]);

  const fetchCountries = useCallback(async () => {
    try {
      const countries = await universityApi.getCountries();
      setCountries(countries);
      return countries;
    } catch (err) {
      console.error('Failed to fetch countries:', err);
      return [];
    }
  }, []);

  const fetchProgramLevels = useCallback(async () => {
    try {
      const levels = await universityApi.getProgramLevels();
      setProgramLevels(levels);
      return levels;
    } catch (err) {
      console.error('Failed to fetch program levels:', err);
      return [];
    }
  }, []);

  // Initialize filters
  useEffect(() => {
    fetchCountries();
    fetchProgramLevels();
  }, [fetchCountries, fetchProgramLevels]);

  return {
    loading,
    error,
    universities,
    countries,
    programLevels,
    fetchUniversities,
    refetch: () => fetchUniversities(),
    totalCount: universities.length,
  };
}