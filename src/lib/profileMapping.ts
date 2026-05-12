// src/lib/profileMapping.ts
// Utility to map between main profile (ProfileData) and recommendation profile (StudentProfileRequest)

import { ProfileData } from "@/hooks/useProfile";
import { StudentProfileRequest } from "@/lib/api";

/**
 * Maps main dashboard profile data to university recommendation profile format
 * @param mainProfile - The profile data from useProfile hook
 * @returns StudentProfileRequest mapped from main profile with sensible defaults
 */
export function mapMainProfileToRecommendationProfile(
  mainProfile: ProfileData | null,
): StudentProfileRequest {
  if (!mainProfile) {
    // Return default profile if no main profile exists
    return {
      gpa: 3.0,
      experience_years: 0,
      research_experience: false,
      publications_count: 0,
      work_experience_relevant: false,
      leadership_experience: false,
      current_education_level: "BACHELORS",
      field_of_study: "Computer Science",
      desired_program: "MASTERS",
      preferred_countries: [],
    };
  }

  // Map fields from main profile to recommendation profile
  return {
    // Core academic fields
    gpa: mainProfile.cgpa || 3.0,
    current_education_level: mainProfile.currentEducationLevel || "BACHELORS",
    field_of_study: mainProfile.fieldOfStudy || "Computer Science",
    institution_name: mainProfile.institutionName,

    // Program preference
    desired_program: mainProfile.desiredProgram || "MASTERS",
    preferred_countries: mainProfile.preferredCountry
      ? [mainProfile.preferredCountry]
      : [],

    // Test scores
    ielts_score: mainProfile.ieltsScore,
    toefl_score: mainProfile.ieltsScore, // Use IELTS as fallback if TOEFL not available

    // Experience and accomplishments
    experience_years: mainProfile.workExperience || 0,
    research_experience: mainProfile.researchExperience || false,
    publications_count: mainProfile.publications || 0,
    work_experience_relevant: mainProfile.workExperience ? true : false,
    leadership_experience: false, // Not in main profile

    // Study preferences
    budget_usd: mainProfile.budgetRangeMax,
    preferred_intake: mainProfile.preferredIntake,
    study_mode: mainProfile.studyMode,
  };
}

/**
 * Checks if main profile has required fields for recommendations
 * @param mainProfile - The profile data from useProfile hook
 * @returns Object with completion info
 */
export function analyzeProfileCompletion(mainProfile: ProfileData | null): {
  isComplete: boolean;
  completionPercentage: number;
  missingFields: string[];
  completedFields: string[];
} {
  const completedFields: string[] = [];
  const missingFields: string[] = [];

  if (!mainProfile) {
    return {
      isComplete: false,
      completionPercentage: 0,
      missingFields: [
        "GPA",
        "Field of Study",
        "Current Education Level",
        "Desired Program",
        "Preferred Country",
      ],
      completedFields: [],
    };
  }

  // Check each field
  const requiredFields = [
    {
      key: "gpa",
      field: "GPA",
      hasValue: mainProfile.cgpa && mainProfile.cgpa > 0,
    },
    {
      key: "fieldOfStudy",
      field: "Field of Study",
      hasValue: !!mainProfile.fieldOfStudy,
    },
    {
      key: "currentEducationLevel",
      field: "Current Education Level",
      hasValue: !!mainProfile.currentEducationLevel,
    },
    {
      key: "desiredProgram",
      field: "Desired Program",
      hasValue: !!mainProfile.desiredProgram,
    },
    {
      key: "preferredCountry",
      field: "Preferred Country",
      hasValue: !!mainProfile.preferredCountry,
    },
  ];

  requiredFields.forEach((field) => {
    if (field.hasValue) {
      completedFields.push(field.field);
    } else {
      missingFields.push(field.field);
    }
  });

  const completionPercentage = Math.round(
    (completedFields.length / requiredFields.length) * 100,
  );

  return {
    isComplete: missingFields.length === 0,
    completionPercentage,
    missingFields,
    completedFields,
  };
}

/**
 * Merges main profile and recommendation profile data
 * Prefers recommendation profile for explicit values but fills gaps from main profile
 */
export function mergeProfiles(
  mainProfile: ProfileData | null,
  recommendationProfile: StudentProfileRequest,
): StudentProfileRequest {
  const mapped = mapMainProfileToRecommendationProfile(mainProfile);

  return {
    // Use recommendation profile values if set, otherwise use mapped main profile
    gpa:
      recommendationProfile.gpa && recommendationProfile.gpa > 0
        ? recommendationProfile.gpa
        : mapped.gpa,
    current_education_level:
      recommendationProfile.current_education_level ||
      mapped.current_education_level,
    field_of_study:
      recommendationProfile.field_of_study || mapped.field_of_study,
    institution_name:
      recommendationProfile.institution_name || mapped.institution_name,
    desired_program:
      recommendationProfile.desired_program || mapped.desired_program,
    preferred_countries:
      recommendationProfile.preferred_countries &&
      recommendationProfile.preferred_countries.length > 0
        ? recommendationProfile.preferred_countries
        : mapped.preferred_countries,
    experience_years:
      recommendationProfile.experience_years || mapped.experience_years,
    research_experience:
      recommendationProfile.research_experience || mapped.research_experience,
    publications_count:
      recommendationProfile.publications_count || mapped.publications_count,
    work_experience_relevant:
      recommendationProfile.work_experience_relevant ||
      mapped.work_experience_relevant,
    leadership_experience:
      recommendationProfile.leadership_experience ||
      mapped.leadership_experience,
    ielts_score: recommendationProfile.ielts_score || mapped.ielts_score,
    toefl_score: recommendationProfile.toefl_score || mapped.toefl_score,
    gre_score: recommendationProfile.gre_score || mapped.gre_score,
    gmat_score: recommendationProfile.gmat_score || mapped.gmat_score,
    budget_usd: recommendationProfile.budget_usd || mapped.budget_usd,
    preferred_intake:
      recommendationProfile.preferred_intake || mapped.preferred_intake,
    study_mode: recommendationProfile.study_mode || mapped.study_mode,
  };
}
