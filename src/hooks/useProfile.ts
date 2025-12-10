// src/hooks/useProfile.ts
import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/context/AuthContext';
import { profileApi, UserProfileData } from '@/lib/api';
import toast from 'react-hot-toast';

export interface ProfileData {
  // Personal Information
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  dateOfBirth?: string;
  nationality?: string;
  gender?: string;
  
  // Academic Information
  currentEducationLevel?: string;
  institutionName?: string;
  fieldOfStudy?: string;
  ieltsScore?: number;
  cgpa?: number;
  academicYear?: number;
  
  // Study Preferences
  desiredProgram?: string;
  preferredCountry?: string;
  budgetRangeMin?: number;
  budgetRangeMax?: number;
  preferredIntake?: string;
  studyMode?: string;
  
  // Additional Info
  workExperience?: number;
  researchExperience?: boolean;
  publications?: number;
  
  // Metadata
  userId?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProfileStats {
  completionPercentage: number;
  completedFields: string[];
  missingFields: string[];
  profileSummary: {
    personalInfoCompleted: boolean;
    academicInfoCompleted: boolean;
    preferencesCompleted: boolean;
  };
}

export interface DropdownData {
  countries: Array<{ value: string; label: string }>;
  educationLevels: Array<{ value: string; label: string }>;
  programs: Array<{ value: string; label: string }>;
}

export const useProfile = () => {
  const { token } = useAuth();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [stats, setStats] = useState<ProfileStats>({
    completionPercentage: 0,
    completedFields: [],
    missingFields: [],
    profileSummary: {
      personalInfoCompleted: false,
      academicInfoCompleted: false,
      preferencesCompleted: false,
    },
  });
  const [dropdownData, setDropdownData] = useState<DropdownData>({
    countries: [],
    educationLevels: [],
    programs: [],
  });

  // Helper function for education progression validation
  const validateEducationProgression = (
    currentLevel: string, 
    desiredProgram: string
  ): boolean => {
    // Define education levels mapping
    const educationOrder: Record<string, number> = {
      'HIGH_SCHOOL': 1,
      'BACHELORS': 2,
      'MASTERS': 3,
      'PHD': 4,
      'POST_DOCTORAL': 5,
    };

    // Define program levels mapping (add more program types as needed)
    const programOrder: Record<string, number> = {
      'BACHELORS': 1,
      'MASTERS': 2,
      'PHD': 3,
      'POST_DOCTORAL': 4,
      'DIPLOMA': 1,
      'FOUNDATION': 1,
      'PG_DIPLOMA': 2,
      'MBA': 2,
      'RESEARCH_MASTERS': 2,
      'EXECUTIVE_EDUCATION': 2,
      'RESEARCH_FELLOWSHIP': 3,
      'EXCHANGE': 1,
    };

    const currentLevelUpper = currentLevel.toUpperCase();
    const desiredProgramUpper = desiredProgram.toUpperCase();
    
    const currentLevelOrder = educationOrder[currentLevelUpper] || 0;
    const desiredProgramOrder = programOrder[desiredProgramUpper] || 0;

    // If we can't determine the order, don't block the submission
    if (currentLevelOrder === 0 || desiredProgramOrder === 0) {
      console.warn('Could not determine education progression for:', currentLevel, desiredProgram);
      return true;
    }

    return desiredProgramOrder >= currentLevelOrder;
  };

  // Load profile data
  const loadProfile = useCallback(async () => {
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      
      // Load profile
      const profileResponse = await profileApi.getProfile(token);
      
      if (profileResponse.profile) {
        // Format date for input field
        const formattedProfile = { ...profileResponse.profile };
        if (formattedProfile.dateOfBirth) {
          formattedProfile.dateOfBirth = formattedProfile.dateOfBirth.split('T')[0];
        }
        setProfile(formattedProfile);
      } else {
        setProfile(null);
      }

      // Load completion stats
      const completionResponse = await profileApi.getProfileCompletion(token);
      setStats({
        completionPercentage: completionResponse.completionPercentage,
        completedFields: completionResponse.completedFields,
        missingFields: completionResponse.missingFields,
        profileSummary: completionResponse.profileSummary,
      });

    } catch (error) {
      console.error('Error loading profile:', error);
      toast.error('Failed to load profile data');
    } finally {
      setLoading(false);
    }
  }, [token]);

  // Load dropdown data
  const loadDropdownData = useCallback(async () => {
    if (!token) return;

    try {
      const [countries, educationLevels] = await Promise.all([
        profileApi.getCountries(token),
        profileApi.getEducationLevels(token),
      ]);

      setDropdownData({
        countries,
        educationLevels,
        programs: [], // Will be loaded based on education level
      });
    } catch (error) {
      console.error('Error loading dropdown data:', error);
      toast.error('Failed to load dropdown data');
    }
  }, [token]);

  // Load programs based on education level
  const loadPrograms = useCallback(async (currentLevel: string) => {
    if (!token || !currentLevel) return;

    try {
      const programs = await profileApi.getProgramsByLevel(token, currentLevel);
      setDropdownData(prev => ({
        ...prev,
        programs,
      }));
    } catch (error) {
      console.error('Error loading programs:', error);
    }
  }, [token]);

  // Initial load
  useEffect(() => {
    if (token) {
      loadProfile();
      loadDropdownData();
    }
  }, [token, loadProfile, loadDropdownData]);

  // Load programs when education level changes
  useEffect(() => {
    if (profile?.currentEducationLevel) {
      loadPrograms(profile.currentEducationLevel);
    }
  }, [profile?.currentEducationLevel, loadPrograms]);

  // Update profile
  const updateProfile = async (profileData: UserProfileData) => {
    if (!token) {
      toast.error('You must be logged in to update profile');
      return null;
    }

    try {
      setSaving(true);
      
      // Validate education progression
      if (profileData.currentEducationLevel && profileData.desiredProgram) {
        const isValid = validateEducationProgression(
          profileData.currentEducationLevel,
          profileData.desiredProgram
        );

        if (!isValid) {
          toast.error('You cannot apply for a program lower than your current education level');
          return null;
        }
      }

      const response = await profileApi.updateProfile(token, profileData);
      
      // Update local state
      const updatedProfile = response.profile;
      if (updatedProfile.dateOfBirth) {
        updatedProfile.dateOfBirth = updatedProfile.dateOfBirth.split('T')[0];
      }
      setProfile(updatedProfile);

      // Reload stats
      await loadProfile();

      toast.success(response.message || 'Profile updated successfully!');
      return response.profile;
    } catch (error: any) {
      console.error('Error updating profile:', error);
      toast.error(error.message || 'Failed to update profile');
      return null;
    } finally {
      setSaving(false);
    }
  };

  // Delete profile
  const deleteProfile = async () => {
    if (!token) {
      toast.error('You must be logged in to delete profile');
      return false;
    }

    try {
      const confirmed = window.confirm('Are you sure you want to delete your profile? This action cannot be undone.');
      if (!confirmed) return false;

      await profileApi.deleteProfile(token);
      
      setProfile(null);
      setStats({
        completionPercentage: 0,
        completedFields: [],
        missingFields: [],
        profileSummary: {
          personalInfoCompleted: false,
          academicInfoCompleted: false,
          preferencesCompleted: false,
        },
      });

      toast.success('Profile deleted successfully!');
      return true;
    } catch (error: any) {
      console.error('Error deleting profile:', error);
      toast.error(error.message || 'Failed to delete profile');
      return false;
    }
  };

  // Format form data for API
  const formatFormData = (formData: any): UserProfileData => {
    return {
      // Personal Information
      firstName: formData.firstName || undefined,
      lastName: formData.lastName || undefined,
      phoneNumber: formData.phone || undefined,
      dateOfBirth: formData.dateOfBirth || undefined,
      nationality: formData.nationality || undefined,
      gender: formData.gender || undefined,
      
      // Academic Information
      currentEducationLevel: formData.educationLevel || undefined,
      institutionName: formData.institution || undefined,
      fieldOfStudy: formData.major || undefined,
      ieltsScore: formData.ieltsScore ? parseFloat(formData.ieltsScore) : undefined,
      cgpa: formData.gpa ? parseFloat(formData.gpa) : undefined,
      academicYear: formData.academicYear ? parseInt(formData.academicYear) : undefined,
      
      // Study Preferences
      desiredProgram: formData.desiredProgram || undefined,
      preferredCountry: formData.preferredCountry || undefined,
      budgetRangeMin: formData.budgetRangeMin ? parseInt(formData.budgetRangeMin) : undefined,
      budgetRangeMax: formData.budgetRangeMax ? parseInt(formData.budgetRangeMax) : undefined,
      preferredIntake: formData.preferredIntake || undefined,
      studyMode: formData.studyMode || undefined,
    };
  };

  // Parse profile data for form
  const parseProfileForForm = (profileData: ProfileData | null) => {
    if (!profileData) {
      return {
        firstName: '',
        lastName: '',
        phone: '',
        dateOfBirth: '',
        nationality: '',
        gender: '',
        educationLevel: '',
        institution: '',
        major: '',
        gpa: '',
        ieltsScore: '',
        academicYear: '',
        desiredProgram: '',
        preferredCountry: '',
        budgetRangeMin: '',
        budgetRangeMax: '',
        preferredIntake: '',
        studyMode: '',
      };
    }

    return {
      firstName: profileData.firstName || '',
      lastName: profileData.lastName || '',
      phone: profileData.phoneNumber || '',
      dateOfBirth: profileData.dateOfBirth || '',
      nationality: profileData.nationality || '',
      gender: profileData.gender || '',
      educationLevel: profileData.currentEducationLevel || '',
      institution: profileData.institutionName || '',
      major: profileData.fieldOfStudy || '',
      gpa: profileData.cgpa?.toString() || '',
      ieltsScore: profileData.ieltsScore?.toString() || '',
      academicYear: profileData.academicYear?.toString() || '',
      desiredProgram: profileData.desiredProgram || '',
      preferredCountry: profileData.preferredCountry || '',
      budgetRangeMin: profileData.budgetRangeMin?.toString() || '',
      budgetRangeMax: profileData.budgetRangeMax?.toString() || '',
      preferredIntake: profileData.preferredIntake || '',
      studyMode: profileData.studyMode || '',
    };
  };

  return {
    profile,
    loading,
    saving,
    stats,
    dropdownData,
    loadProfile,
    updateProfile,
    deleteProfile,
    formatFormData,
    parseProfileForForm,
    loadPrograms,
  };
};