// src/hooks/useStudentProfile.ts
import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/context/AuthContext';
import { StudentProfileRequest } from '@/lib/api';
import {
  normalizeRecommendationCountry,
  normalizeRecommendationField,
  normalizeRecommendationProgramLevel,
} from '@/lib/recommendationDatasetOptions';

interface UseStudentProfileProps {
  onProfileLoaded?: (profile: StudentProfileRequest) => void;
}

export function useStudentProfile({ onProfileLoaded }: UseStudentProfileProps = {}) {
  const { user } = useAuth();
  const [profile, setProfile] = useState<StudentProfileRequest | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Load profile from localStorage or create default
  useEffect(() => {
    const loadProfile = () => {
      try {
        const savedProfile = localStorage.getItem('studentProfile');
        if (savedProfile) {
          const parsedProfile = JSON.parse(savedProfile);
          setProfile(parsedProfile);
          onProfileLoaded?.(parsedProfile);
        } else {
          // Default profile for new users
          const defaultProfile: StudentProfileRequest = {
            gpa: 3.0,
            experience_years: 0,
            research_experience: false,
            publications_count: 0,
            work_experience_relevant: false,
            leadership_experience: false,
            current_education_level: 'BACHELORS',
            field_of_study: 'Computer Science',
            desired_program: 'Masters',
            preferred_countries: [],
          };
          setProfile(defaultProfile);
          localStorage.setItem('studentProfile', JSON.stringify(defaultProfile));
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to load profile'));
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [onProfileLoaded]);

  const updateProfile = useCallback((updates: Partial<StudentProfileRequest>) => {
    setProfile(prev => {
      if (!prev) return null;
      
      const updatedProfile = { ...prev, ...updates };
      localStorage.setItem('studentProfile', JSON.stringify(updatedProfile));
      return updatedProfile;
    });
  }, []);

  const clearProfile = useCallback(() => {
    localStorage.removeItem('studentProfile');
    setProfile(null);
  }, []);

  const getProfileForRecommendation = useCallback(() => {
    if (!profile) throw new Error('No profile available');
    
    // Ensure all required fields are present
    const requiredProfile: StudentProfileRequest = {
      gpa: profile.gpa || 3.0,
      experience_years: profile.experience_years || 0,
      research_experience: profile.research_experience || false,
      publications_count: profile.publications_count || 0,
      work_experience_relevant: profile.work_experience_relevant || false,
      leadership_experience: profile.leadership_experience || false,
      current_education_level: profile.current_education_level || 'BACHELORS',
      field_of_study:
        normalizeRecommendationField(profile.field_of_study) ||
        'Computer Science',
      desired_program:
        normalizeRecommendationProgramLevel(profile.desired_program) ||
        'Masters',
      preferred_countries: (profile.preferred_countries || [])
        .map((country) => normalizeRecommendationCountry(country))
        .filter(Boolean),
      institution_name: profile.institution_name,
      ielts_score: profile.ielts_score,
      toefl_score: profile.toefl_score,
      gre_score: profile.gre_score,
      gmat_score: profile.gmat_score,
      budget_usd: profile.budget_usd,
      preferred_intake: profile.preferred_intake,
      study_mode: profile.study_mode,
    };

    return requiredProfile;
  }, [profile]);

  return {
    profile,
    loading,
    error,
    updateProfile,
    clearProfile,
    getProfileForRecommendation,
    hasProfile: !!profile,
  };
}