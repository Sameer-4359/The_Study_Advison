// src/lib/api.ts
import { 
  DocumentType, 
  DisplayDocumentType, 
  DocumentTypeMap,
  BackendDocument,
  UploadDocumentResponse,
  GetDocumentsResponse 
} from '@/lib/types/document';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

interface ApiError {
  status: string;
  message: string;
}

// Document type mapping with proper typing
const DOCUMENT_TYPE_MAP: DocumentTypeMap = {
  'Academic Transcripts': 'ACADEMIC_TRANSCRIPT',
  'Degree/Diploma Certificates': 'DEGREE_DIPLOMA',
  'Language Proficiency': 'LANGUAGE_PROFICIENCY',
  'Passport Copy': 'PASSPORT_COPY',
  'Resume/CV': 'RESUME_CV',
  'Statement of Purpose': 'STATEMENT_OF_PURPOSE',
} as const;

// Type guard to check if a string is a valid DisplayDocumentType
function isDisplayDocumentType(type: string): type is DisplayDocumentType {
  return Object.keys(DOCUMENT_TYPE_MAP).includes(type);
}

// Type guard to check if a string is a valid DocumentType
function isDocumentType(type: string): type is DocumentType {
  return Object.values(DOCUMENT_TYPE_MAP).includes(type as DocumentType);
}

// API service for document operations
export const documentApi = {
  // Upload/Update document
  async uploadDocument(token: string, file: File, typeKey: DisplayDocumentType): Promise<UploadDocumentResponse> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', DOCUMENT_TYPE_MAP[typeKey]);

    const response = await fetch(`${API_BASE_URL}/student/upload`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const error: ApiError = await response.json();
      throw new Error(error.message || 'Upload failed');
    }

    return await response.json();
  },

  // Get all documents
  async getDocuments(token: string): Promise<GetDocumentsResponse> {
    const response = await fetch(`${API_BASE_URL}/student/documents`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error: ApiError = await response.json();
      throw new Error(error.message || 'Failed to fetch documents');
    }

    return await response.json();
  },

  // Get single document
  async getDocument(token: string, id: number) {
    const response = await fetch(`${API_BASE_URL}/student/documents/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const error: ApiError = await response.json();
      throw new Error(error.message || 'Failed to fetch document');
    }

    return await response.json();
  },

  // Update document
  async updateDocument(token: string, id: number, file: File) {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${API_BASE_URL}/student/documents/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const error: ApiError = await response.json();
      throw new Error(error.message || 'Failed to update document');
    }

    return await response.json();
  },

  // Delete document
  async deleteDocument(token: string, id: number) {
    const response = await fetch(`${API_BASE_URL}/student/documents/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const error: ApiError = await response.json();
      throw new Error(error.message || 'Failed to delete document');
    }

    return await response.json();
  },

  // Get document types with proper typing
  getDocumentTypes(): DocumentTypeMap {
    return DOCUMENT_TYPE_MAP;
  },

  // Get display document types
  getDisplayDocumentTypes(): DisplayDocumentType[] {
    return Object.keys(DOCUMENT_TYPE_MAP) as DisplayDocumentType[];
  },

  // Get backend document type from display type
  getBackendType(displayType: DisplayDocumentType): DocumentType {
    return DOCUMENT_TYPE_MAP[displayType];
  },

  // Get display type from backend type
  getDisplayType(backendType: DocumentType): DisplayDocumentType {
    const entry = Object.entries(DOCUMENT_TYPE_MAP).find(([_, value]) => value === backendType);
    return entry ? entry[0] as DisplayDocumentType : 'Academic Transcripts';
  },

  // Type guard for display document type
  isDisplayDocumentType(type: string): type is DisplayDocumentType {
    return isDisplayDocumentType(type);
  },

  // Type guard for backend document type
  isDocumentType(type: string): type is DocumentType {
    return isDocumentType(type);
  },

  // Helper to calculate progress percentage
  calculateProgress(documents: BackendDocument[]): number {
    const totalTypes = this.getDisplayDocumentTypes().length;
    const uploadedTypes = new Set(documents.map(doc => doc.type)).size;
    const percentage = Math.min(100, Math.round((uploadedTypes / totalTypes) * 100));
    return percentage;
  },

  // Helper to check if a document type is uploaded
  isDocumentTypeUploaded(documents: BackendDocument[], typeKey: DisplayDocumentType): boolean {
    const backendType = DOCUMENT_TYPE_MAP[typeKey];
    return documents.some(doc => doc.type === backendType);
  },

  // Helper to get document by type
  getDocumentByType(documents: BackendDocument[], typeKey: DisplayDocumentType): BackendDocument | undefined {
    const backendType = DOCUMENT_TYPE_MAP[typeKey];
    return documents.find(doc => doc.type === backendType);
  },
};


//for profile management 
export interface UserProfileData {
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
}

export interface ProfileCompletionResponse {
  status: string;
  completionPercentage: number;
  completedFields: string[];
  missingFields: string[];
  profileSummary: {
    personalInfoCompleted: boolean;
    academicInfoCompleted: boolean;
    preferencesCompleted: boolean;
  };
}

export interface CountryItem {
  value: string;
  label: string;
}

export interface EducationLevelItem {
  value: string;
  label: string;
}

export interface ProgramItem {
  value: string;
  label: string;
}

// API service for profile operations
export const profileApi = {
  // Get user profile
  async getProfile(token: string) {
    const response = await fetch(`${API_BASE_URL}/profile`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error: ApiError = await response.json();
      throw new Error(error.message || 'Failed to fetch profile');
    }

    return await response.json();
  },

  // Update user profile
  async updateProfile(token: string, profileData: UserProfileData) {
    const response = await fetch(`${API_BASE_URL}/profile`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(profileData),
    });

    if (!response.ok) {
      const error: ApiError = await response.json();
      throw new Error(error.message || 'Failed to update profile');
    }

    return await response.json();
  },

  // Get profile completion
  async getProfileCompletion(token: string): Promise<ProfileCompletionResponse> {
    const response = await fetch(`${API_BASE_URL}/profile/completion`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error: ApiError = await response.json();
      throw new Error(error.message || 'Failed to fetch profile completion');
    }

    return await response.json();
  },

  // Get countries list
  async getCountries(token: string): Promise<CountryItem[]> {
    const response = await fetch(`${API_BASE_URL}/profile/countries`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error: ApiError = await response.json();
      throw new Error(error.message || 'Failed to fetch countries');
    }

    const data = await response.json();
    return data.countries.map((country: string) => ({
      value: country,
      label: country,
    }));
  },

  // Get education levels
  async getEducationLevels(token: string): Promise<EducationLevelItem[]> {
    const response = await fetch(`${API_BASE_URL}/profile/education-levels`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error: ApiError = await response.json();
      throw new Error(error.message || 'Failed to fetch education levels');
    }

    const data = await response.json();
    return data.educationLevels;
  },

  // Get programs by education level
  async getProgramsByLevel(token: string, currentLevel: string): Promise<ProgramItem[]> {
    const response = await fetch(`${API_BASE_URL}/profile/programs?currentLevel=${currentLevel}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error: ApiError = await response.json();
      throw new Error(error.message || 'Failed to fetch programs');
    }

    const data = await response.json();
    return data.programs;
  },

  // Delete profile
  async deleteProfile(token: string) {
    const response = await fetch(`${API_BASE_URL}/profile`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error: ApiError = await response.json();
      throw new Error(error.message || 'Failed to delete profile');
    }

    return await response.json();
  },
};




// University Recommendation Types
export interface StudentProfileRequest {
  // Academic
  gpa: number;
  ielts_score?: number;
  toefl_score?: number;
  gre_score?: number;
  gmat_score?: number;
  
  // Experience
  experience_years: number;
  research_experience: boolean;
  publications_count: number;
  work_experience_relevant: boolean;
  leadership_experience: boolean;
  
  // Education background
  current_education_level: string;
  field_of_study: string;
  institution_name?: string;
  
  // Preferences
  desired_program: string;
  preferred_countries: string[];
  budget_usd?: number;
  preferred_intake?: string;
  study_mode?: string;
}

export interface UniversityRecommendationResponse {
  university: {
    id: number;
    name: string;
    country: string;
    world_ranking: number | null;
    acceptance_rate: number | null;
    website: string | null;
    description: string | null;
    min_gpa: number;
    min_ielts: number | null;
    min_toefl: number | null;
    min_gre: number | null;
    min_gmat: number | null;
    min_experience_years: number;
    program_name: string;
    program_level: string;
    program_type: string | null;
    program_duration_months: number | null;
    tuition_fee_usd: number;
    scholarship_available: boolean;
    avg_scholarship_percentage: number | null;
    fields_offered: string[];
    requires_portfolio: boolean;
    requires_research_proposal: boolean;
    requires_interview: boolean;
    application_deadline: string | null;
    intake_seasons: string[];
    graduation_rate: number | null;
    employment_rate_6_months: number | null;
    avg_starting_salary_usd: number | null;
    created_at: string;
    updated_at: string | null;
  };
  match_score: number;
  eligibility_score: number;
  similarity_score: number;
  final_score: number;
  reasons: string[];
}

export interface RecommendationResponse {
  recommendations: UniversityRecommendationResponse[];
  total_considered: number;
  algorithm_version: string;
  processing_time_ms: number;
}

export interface UniversityListResponse {
  id: number;
  name: string;
  country: string;
  world_ranking: number | null;
  acceptance_rate: number | null;
  website: string | null;
  description: string | null;
  min_gpa: number;
  min_ielts: number | null;
  min_toefl: number | null;
  min_gre: number | null;
  min_gmat: number | null;
  min_experience_years: number;
  program_name: string;
  program_level: string;
  program_type: string | null;
  program_duration_months: number | null;
  tuition_fee_usd: number;
  scholarship_available: boolean;
  avg_scholarship_percentage: number | null;
  fields_offered: string[];
  requires_portfolio: boolean;
  requires_research_proposal: boolean;
  requires_interview: boolean;
  application_deadline: string | null;
  intake_seasons: string[];
  graduation_rate: number | null;
  employment_rate_6_months: number | null;
  avg_starting_salary_usd: number | null;
  created_at: string;
  updated_at: string | null;
}

// Base URL for Python backend
const PYTHON_API_BASE_URL = process.env.NEXT_PUBLIC_PYTHON_API_URL || "http://localhost:8005";

// University Recommendation API
export const universityApi = {
  // Get recommendations
  async getRecommendations(
    studentProfile: StudentProfileRequest, 
    top_k: number = 5
  ): Promise<RecommendationResponse> {
    const response = await fetch(`${PYTHON_API_BASE_URL}/recommendations/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        student_profile: studentProfile,
        top_k
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Failed to get recommendations: ${error}`);
    }

    return await response.json();
  },

  // Get all universities (for browsing)
  async getUniversities(
    filters?: {
      country?: string;
      program_level?: string;
      min_gpa?: number;
      max_tuition?: number;
    }
  ): Promise<UniversityListResponse[]> {
    let url = `${PYTHON_API_BASE_URL}/universities/`;
    
    if (filters) {
      const params = new URLSearchParams();
      if (filters.country) params.append('country', filters.country);
      if (filters.program_level) params.append('program_level', filters.program_level);
      if (filters.min_gpa) params.append('min_gpa', filters.min_gpa.toString());
      if (filters.max_tuition) params.append('max_tuition', filters.max_tuition.toString());
      url += `?${params.toString()}`;
    }

    const response = await fetch(url);

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Failed to fetch universities: ${error}`);
    }

    return await response.json();
  },

  // Get single university by ID
  async getUniversityById(id: number) {
    const response = await fetch(`${PYTHON_API_BASE_URL}/universities/${id}`);

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Failed to fetch university: ${error}`);
    }

    return await response.json();
  },

  // Get countries list (for filters)
  async getCountries(): Promise<string[]> {
    const universities = await this.getUniversities();
    const countries = [...new Set(universities.map(u => u.country))];
    return countries.sort();
  },

  // Get program levels (for filters)
  async getProgramLevels(): Promise<string[]> {
    const universities = await this.getUniversities();
    const levels = [...new Set(universities.map(u => u.program_level))];
    return levels.sort();
  },

  convertToFrontendFormat(
  university: UniversityListResponse | UniversityRecommendationResponse['university'],
  recommendation?: UniversityRecommendationResponse
) {
  // Create a safe object with all required fields
  const safeUniversity = {
    id: university.id,
    name: university.name,
    country: university.country,
    world_ranking: university.world_ranking,
    acceptance_rate: university.acceptance_rate,
    website: university.website || null,
    description: university.description || null,
    min_gpa: university.min_gpa,
    min_ielts: university.min_ielts,
    min_toefl: university.min_toefl || null,
    min_gre: university.min_gre || null,
    min_gmat: university.min_gmat || null,
    min_experience_years: university.min_experience_years || 0,
    program_name: university.program_name,
    program_level: university.program_level,
    program_type: university.program_type || null,
    program_duration_months: university.program_duration_months || null,
    tuition_fee_usd: university.tuition_fee_usd,
    scholarship_available: (university as any).scholarship_available || false,
    avg_scholarship_percentage: (university as any).avg_scholarship_percentage || null,
    fields_offered: (university as any).fields_offered || [university.program_name],
    requires_portfolio: (university as any).requires_portfolio || false,
    requires_research_proposal: (university as any).requires_research_proposal || false,
    requires_interview: (university as any).requires_interview || false,
    application_deadline: university.application_deadline || null,
    intake_seasons: (university as any).intake_seasons || [],
    graduation_rate: (university as any).graduation_rate || null,
    employment_rate_6_months: (university as any).employment_rate_6_months || null,
    avg_starting_salary_usd: (university as any).avg_starting_salary_usd || null,
    created_at: (university as any).created_at || new Date().toISOString(),
    updated_at: (university as any).updated_at || null,
  };

  return {
    id: safeUniversity.id.toString(),
    universityName: safeUniversity.name,
    country: safeUniversity.country,
    ranking: safeUniversity.world_ranking 
      ? `#${safeUniversity.world_ranking} Global` 
      : "Not Ranked",
    location: safeUniversity.country,
    tuitionFee: `$${safeUniversity.tuition_fee_usd.toLocaleString('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })} USD`,
    deadline: safeUniversity.application_deadline || "Rolling",
    matchPercentage: recommendation ? Math.round(recommendation.final_score * 100) : 0,
    programs: safeUniversity.fields_offered,
    requirements: {
      minGPA: safeUniversity.min_gpa.toFixed(1),
      minIELTS: safeUniversity.min_ielts?.toFixed(1) || "Not Required",
      minSAT: safeUniversity.min_gre?.toString() || undefined,
    },
    isRecommended: !!recommendation,
    // Additional fields for UI
    description: safeUniversity.description || undefined,
    acceptanceRate: safeUniversity.acceptance_rate || undefined,
    scholarshipAvailable: safeUniversity.scholarship_available,
    programDuration: safeUniversity.program_duration_months 
      ? `${safeUniversity.program_duration_months} months`
      : "Not specified",
    programType: safeUniversity.program_type,
    website: safeUniversity.website,
    intakeSeasons: safeUniversity.intake_seasons,
    // NEW FIELDS for UniversityCard
    minExperienceYears: safeUniversity.min_experience_years,
    requiresPortfolio: safeUniversity.requires_portfolio,
    requiresResearchProposal: safeUniversity.requires_research_proposal,
    requiresInterview: safeUniversity.requires_interview,
    avgScholarshipPercentage: safeUniversity.avg_scholarship_percentage,
    graduationRate: safeUniversity.graduation_rate,
    employmentRate: safeUniversity.employment_rate_6_months,
    avgStartingSalary: safeUniversity.avg_starting_salary_usd,
    // Add recommendation data directly
    reasons: recommendation?.reasons || [],
    similarityScore: recommendation?.similarity_score || undefined,
    eligibilityScore: recommendation?.eligibility_score || undefined,
  };
}
};