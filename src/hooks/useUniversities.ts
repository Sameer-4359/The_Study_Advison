// // src/hooks/useUniversities.ts
// import { useState, useCallback, useEffect } from 'react';
// import { universityApi, UniversityListResponse } from '@/lib/api';

// interface UseUniversitiesProps {
//   filters?: {
//     country?: string;
//     program_level?: string;
//     min_gpa?: number;
//     max_tuition?: number;
//   };
// }

// export function useUniversities({ filters }: UseUniversitiesProps = {}) {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<Error | null>(null);
//   const [universities, setUniversities] = useState<UniversityListResponse[]>([]);
//   const [countries, setCountries] = useState<string[]>([]);
//   const [programLevels, setProgramLevels] = useState<string[]>([]);

//   const fetchUniversities = useCallback(async (customFilters?: typeof filters) => {
//     setLoading(true);
//     setError(null);
    
//     try {
//       const data = await universityApi.getUniversities(customFilters || filters);
//       setUniversities(data);
//       return data;
//     } catch (err) {
//       const error = err instanceof Error ? err : new Error('Failed to fetch universities');
//       setError(error);
//       throw error;
//     } finally {
//       setLoading(false);
//     }
//   }, [filters]);

//   const fetchCountries = useCallback(async () => {
//     try {
//       const countries = await universityApi.getCountries();
//       setCountries(countries);
//       return countries;
//     } catch (err) {
//       console.error('Failed to fetch countries:', err);
//       return [];
//     }
//   }, []);

//   const fetchProgramLevels = useCallback(async () => {
//     try {
//       const levels = await universityApi.getProgramLevels();
//       setProgramLevels(levels);
//       return levels;
//     } catch (err) {
//       console.error('Failed to fetch program levels:', err);
//       return [];
//     }
//   }, []);

//   // Initialize filters
//   useEffect(() => {
//     fetchCountries();
//     fetchProgramLevels();
//   }, [fetchCountries, fetchProgramLevels]);

//   return {
//     loading,
//     error,
//     universities,
//     countries,
//     programLevels,
//     fetchUniversities,
//     refetch: () => fetchUniversities(),
//     totalCount: universities.length,
//   };
// }




// src/hooks/useUniversities.ts - UPDATED VERSION
import { useState, useCallback, useEffect } from 'react';
import { universityApi, UniversityListResponse } from '@/lib/api';

interface UseUniversitiesProps {
  filters?: {
    country?: string;
    program_level?: string;
    min_gpa?: number;
    max_tuition?: number;
  };
  autoFetch?: boolean; // NEW: Add option to disable auto-fetch
}

export function useUniversities({ filters, autoFetch = false }: UseUniversitiesProps = {}) {
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
      
      // Extract countries and program levels from the fetched data
      // This prevents extra API calls
      const uniqueCountries = [...new Set(data.map(u => u.country))].sort();
      const uniqueLevels = [...new Set(data.map(u => u.program_level))].sort();
      
      setCountries(uniqueCountries);
      setProgramLevels(uniqueLevels);
      
      return data;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to fetch universities');
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [filters]);

  // NEW: Combined fetch for filters (simpler approach)
  const fetchFilters = useCallback(async () => {
    try {
      // Try to fetch filters from backend
      const countries = await universityApi.getCountries();
      const levels = await universityApi.getProgramLevels();
      setCountries(countries);
      setProgramLevels(levels);
      return { countries, levels };
    } catch (err) {
      console.warn('Could not fetch filters from backend, using defaults:', err);
      // Return empty arrays as fallback
      return { countries: [], levels: [] };
    }
  }, []);

  // Initialize filters - Only if autoFetch is true
  useEffect(() => {
    if (autoFetch) {
      fetchFilters();
    }
  }, [fetchFilters, autoFetch]);

  return {
    loading,
    error,
    universities,
    countries,
    programLevels,
    fetchUniversities,
    fetchFilters, // NEW: Export fetchFilters
    refetch: () => fetchUniversities(),
    totalCount: universities.length,
  };
}