"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Breadcrumb from "@/components/document-s3/Breadcrumb";
import PageHeader from "@/components/document-s3/PageHeader";
import SearchFilterBar from "@/components/University-s4/SearchFilterBar";
import SectionHeader from "@/components/University-s4/SectionHeader";
import UniversityCard from "@/components/University-s4/UniversityCard";
import EnableEmailButton from "@/components/University-s4/EnableEmailButton";
import UniversityLayout from "@/components/layouts/UniversityLayout";
import ProfileFormModal from "@/components/University-s4/ProfileFormModal";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useUniversityRecommendations } from "@/hooks/useUniversityRecommendations";
import { useStudentProfile } from "@/hooks/useStudentProfile";
import { useProfile } from "@/hooks/useProfile";
import { useUniversities } from "@/hooks/useUniversities";
import { useShortlistedUniversities } from "@/hooks/useShortlistedUniversities";
import { useRouter } from "next/navigation";
import { universityApi } from "@/lib/api";
import {
  mapMainProfileToRecommendationProfile,
  analyzeProfileCompletion,
  mergeProfiles,
} from "@/lib/profileMapping";
import { Search, Filter, Sparkles, AlertCircle } from "lucide-react";

export default function UniversityRecommendationsPage() {
  const router = useRouter();
  const [savedUniversities, setSavedUniversities] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [originalProfileData, setOriginalProfileData] = useState<any>(null);
  const [profileCheckComplete, setProfileCheckComplete] = useState(false);
  const [activeTab, setActiveTab] = useState<"recommended" | "browse">(
    "recommended",
  );
  const [selectedForComparison, setSelectedForComparison] = useState<string[]>(
    [],
  );
  const [showComparisonPanel, setShowComparisonPanel] = useState(false);
  const comparisonRef = useRef<HTMLDivElement | null>(null);

  // Load both profiles: main dashboard profile and recommendation profile
  const { profile: mainProfile, loading: mainProfileLoading } = useProfile();
  const { profile, updateProfile, getProfileForRecommendation, hasProfile } =
    useStudentProfile();

  const {
    loading: recommendationsLoading,
    recommendations,
    getRecommendations,
    hasRecommendations,
    hasRequested,
    error: recommendationsError,
    clearRecommendations,
  } = useUniversityRecommendations({
    onSuccess: () => setActiveTab("recommended"),
    onError: (error) => console.error("Recommendation error:", error),
  });

  const {
    universities: browseUniversities,
    loading: browseLoading,
    countries,
    programLevels,
    fetchUniversities,
  } = useUniversities({ autoFetch: false });

  const { addToShortlist, isShortlisted } = useShortlistedUniversities();

  const [filters, setFilters] = useState({
    country: "",
    program_level: "",
    min_gpa: 0,
    max_tuition: 0,
  });

  // Analyze main profile completion
  const profileCompletion = analyzeProfileCompletion(mainProfile);
  const hasMainProfileData = profileCompletion.isComplete;
  
  // Check profile completion and auto-open modal or redirect
  useEffect(() => {
    if (mainProfileLoading) return;

    // If profile is not complete (< 80%), redirect to profile setup
    if (profileCompletion.completionPercentage < 80) {
      // Show a brief notification and redirect
      const timer = setTimeout(() => {
        router.push("/profile-setup?reason=incomplete");
      }, 1500);
      return () => clearTimeout(timer);
    }

    // If profile is complete, auto-initialize recommendation profile and open modal
    if (mainProfile && !hasProfile) {
      const mappedProfile = mapMainProfileToRecommendationProfile(mainProfile);
      setOriginalProfileData(mappedProfile);
      updateProfile(mappedProfile);
      setShowProfileModal(true);
      setProfileCheckComplete(true);
    } else if (mainProfile && hasProfile) {
      const mappedProfile = mapMainProfileToRecommendationProfile(mainProfile);
      setOriginalProfileData(mappedProfile);
      setProfileCheckComplete(true);
    }
  }, [mainProfile, mainProfileLoading, hasProfile, profileCompletion.completionPercentage, updateProfile, router]);

  // REMOVED: The useEffect that automatically loads recommendations

  const loadRecommendations = async () => {
    try {
      const studentProfile = getProfileForRecommendation();
      await getRecommendations(studentProfile, 10);
    } catch (error) {
      console.error("Failed to load recommendations:", error);
    }
  };

  // Add a handler for the "Get Recommendations" button
  const handleGetRecommendations = async () => {
    if (!hasProfile) {
      setShowProfileModal(true);
      return;
    }

    try {
      await loadRecommendations();
    } catch (error) {
      // Error is already handled by the hook
      console.error("Failed to get recommendations:", error);
    }
  };

  const handleFilterClick = () => {
    console.log("Show filters");
    // You can implement a filter modal here
  };

  const handleEnableEmail = () => {
    console.log("Enable email notifications");
  };

  const handleToggleCompare = (id: string) => {
    setSelectedForComparison((prev) =>
      prev.includes(id) ? prev.filter((uId) => uId !== id) : [...prev, id],
    );
  };

  useEffect(() => {
    if (selectedForComparison.length < 2) {
      setShowComparisonPanel(false);
    }
  }, [selectedForComparison.length]);

  const handleSave = (id: string) => {
    setSavedUniversities((prev) =>
      prev.includes(id) ? prev.filter((uId) => uId !== id) : [...prev, id],
    );

    // Save to localStorage
    const saved = JSON.parse(localStorage.getItem("savedUniversities") || "[]");
    if (!saved.includes(id)) {
      localStorage.setItem("savedUniversities", JSON.stringify([...saved, id]));
    } else {
      localStorage.setItem(
        "savedUniversities",
        JSON.stringify(saved.filter((uId: string) => uId !== id)),
      );
    }
  };

  const handleShortlist = async (university: any) => {
    const isCurrentlyShortlisted = isShortlisted(university.id);

    if (isCurrentlyShortlisted) {
      // This will be handled by the removeFromShortlist function in the useShortlistedUniversities hook
      // But we don't have that directly exposed here for convenience
      // The button shows the shortlist state and the hook manages removals from the shortlisted page
      return;
    }

    await addToShortlist(university.id, {
      universityId: university.id,
      universityName: university.universityName,
      country: university.country,
      ranking: university.ranking,
      tuitionFee: university.tuitionFee,
      matchPercentage: university.matchPercentage,
    });
  };

  const handleVisitWebsite = (website: string) => {
    if (website) {
      window.open(website, "_blank", "noopener,noreferrer");
    }
  };

  const handleUpdateProfile = (updatedProfile: any) => {
    updateProfile(updatedProfile);
    setShowProfileModal(false);
    clearRecommendations(); // Clear old recommendations
    
    // Fetch new recommendations with updated profile
    setTimeout(() => {
      getRecommendations(updatedProfile, 10);
    }, 300);
  };

  const getDeadlineLabel = (deadline?: string | null) => {
    if (!deadline) return deadline || "";
    const deadlineDate = new Date(deadline);
    if (Number.isNaN(deadlineDate.getTime())) return deadline;

    const now = new Date();
    const diffMs = deadlineDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays >= 0 && diffDays <= 30) {
      return `Closes in ${diffDays} day${diffDays === 1 ? "" : "s"}`;
    }

    return deadline;
  };

  // Load saved universities from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("savedUniversities");
    if (saved) {
      setSavedUniversities(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedQuery(searchQuery.trim());
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  // Convert backend data to frontend format
  const recommendedUniversities =
    recommendations?.recommendations.map((rec) =>
      universityApi.convertToFrontendFormat(rec.university, rec),
    ) || [];

  const browseUniversitiesFormatted = browseUniversities.map((uni) => {
    return universityApi.convertToFrontendFormat(uni as any);
  });

  const displayedUniversities =
    activeTab === "recommended"
      ? recommendedUniversities
      : browseUniversitiesFormatted;

  // Filter by search query
  const filteredUniversities = displayedUniversities.filter((uni) => {
    if (!debouncedQuery) return true;
    const query = debouncedQuery.toLowerCase();
    return (
      uni.universityName.toLowerCase().includes(query) ||
      uni.country.toLowerCase().includes(query) ||
      uni.programs.some((program: string) =>
        program.toLowerCase().includes(query),
      )
    );
  });

  const selectedComparisonUniversities = displayedUniversities.filter((uni) =>
    selectedForComparison.includes(uni.id),
  );

  const handleCompareNow = () => {
    if (selectedComparisonUniversities.length < 2) {
      return;
    }

    setShowComparisonPanel(true);
    requestAnimationFrame(() => {
      comparisonRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  };

  const comparisonRows = [
    {
      label: "Match",
      getValue: (uni: (typeof displayedUniversities)[number]) =>
        `${uni.matchPercentage}%`,
    },
    {
      label: "Tuition",
      getValue: (uni: (typeof displayedUniversities)[number]) => uni.tuitionFee,
    },
    {
      label: "Ranking",
      getValue: (uni: (typeof displayedUniversities)[number]) => uni.ranking,
    },
    {
      label: "Country",
      getValue: (uni: (typeof displayedUniversities)[number]) => uni.country,
    },
    {
      label: "Acceptance",
      getValue: (uni: (typeof displayedUniversities)[number]) =>
        uni.acceptanceRate ? `${uni.acceptanceRate}%` : "N/A",
    },
    {
      label: "Scholarship",
      getValue: (uni: (typeof displayedUniversities)[number]) =>
        uni.scholarshipAvailable ? "Available" : "Not listed",
    },
  ];

  return (
    <ProtectedRoute requiredRole="student">
      <UniversityLayout>
        <div className="pt-10"></div>
        <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <Breadcrumb
            items={[
              { label: "Dashboard", href: "/dashboard" },
              { label: "University Recommendations" },
            ]}
          />

          {/* Page Header */}
          <PageHeader
            title="University Recommendations"
            description="Discover universities that match your profile and preferences"
          />

          {/* Profile Info Banner */}
          {profile && (
            <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-sm font-semibold text-blue-800">
                    Your Profile
                  </h3>
                  <p className="text-sm text-blue-600 mt-1">
                    GPA: {profile.gpa} | Field: {profile.field_of_study} |
                    Program: {profile.desired_program}
                  </p>

                  {/* Show prefill status if main profile was used */}
                  {hasMainProfileData && (
                    <p className="text-xs text-green-600 mt-2 font-medium">
                      ✓ Profile auto-filled from your dashboard profile
                    </p>
                  )}

                  {/* Show missing fields warning if any */}
                  {!hasMainProfileData &&
                    profileCompletion.missingFields.length > 0 && (
                      <p className="text-xs text-amber-600 mt-2 font-medium flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        Missing: {profileCompletion.missingFields.join(", ")}
                      </p>
                    )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowProfileModal(true)}
                    className="px-4 py-2 text-sm font-medium text-blue-700 bg-white border border-blue-300 rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    Update Profile
                  </button>

                  {/* Get Recommendations Button */}
                  {(!hasRequested || !hasRecommendations) && (
                    <button
                      onClick={handleGetRecommendations}
                      disabled={recommendationsLoading}
                      className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      {recommendationsLoading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Getting Recommendations...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4" />
                          Get Recommendations
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Tabs */}
          <div className="mb-6 border-b border-gray-200">
            <div className="flex space-x-4">
              <button
                className={`py-2 px-1 font-medium text-sm border-b-2 transition-colors ${
                  activeTab === "recommended"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => {
                  setActiveTab("recommended");
                  setSearchQuery("");
                }}
              >
                Recommended
                {hasRecommendations && (
                  <span className="ml-2 px-2 py-0.5 text-xs bg-blue-100 text-blue-800 rounded-full">
                    {recommendations?.recommendations.length || 0}
                  </span>
                )}
              </button>
              <button
                className={`py-2 px-1 font-medium text-sm border-b-2 transition-colors ${
                  activeTab === "browse"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => {
                  setActiveTab("browse");
                  setSearchQuery("");
                  fetchUniversities();
                }}
              >
                Browse All
                <span className="ml-2 px-2 py-0.5 text-xs bg-gray-100 text-gray-800 rounded-full">
                  {browseUniversities.length}
                </span>
              </button>
            </div>
          </div>

          {/* Search and Filters - Only show when we have universities to filter */}
          {(hasRecommendations || activeTab === "browse") && (
            <SearchFilterBar
              query={searchQuery}
              onQueryChange={setSearchQuery}
              onFilterClick={handleFilterClick}
            />
          )}

          {/* Loading State for Recommendations */}
          {recommendationsLoading && (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="mt-2 text-gray-600">
                Finding your perfect universities...
              </p>
              <p className="text-sm text-gray-500 mt-1">
                This may take a few seconds
              </p>
            </div>
          )}

          {/* Loading State for Browse */}
          {browseLoading && activeTab === "browse" && (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="mt-2 text-gray-600">Loading universities...</p>
            </div>
          )}

          {/* Recommendations Section */}
          {activeTab === "recommended" && hasRecommendations && (
            <>
              <SectionHeader
                title={`Recommended Universities (${filteredUniversities.length})`}
                action={
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-600">
                      Match with {recommendations?.total_considered}{" "}
                      universities
                    </span>
                    <EnableEmailButton onClick={handleEnableEmail} />
                  </div>
                }
              />

              {filteredUniversities.map((uni, index) => (
                <div key={uni.id} className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-medium px-2 py-1 bg-blue-100 text-blue-800 rounded">
                      #{index + 1} Recommendation
                    </span>
                  </div>

                  {uni.reasons?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {uni.reasons.map((reason: string) => (
                        <span
                          key={reason}
                          className="px-2.5 py-1 text-xs font-medium rounded-full bg-blue-50 text-blue-700 border border-blue-200"
                        >
                          {reason}
                        </span>
                      ))}
                    </div>
                  )}

                  <UniversityCard
                    universityName={uni.universityName}
                    country={uni.country}
                    ranking={uni.ranking}
                    location={uni.location}
                    tuitionFee={uni.tuitionFee}
                    deadline={getDeadlineLabel(uni.deadline)}
                    matchPercentage={uni.matchPercentage}
                    programs={uni.programs}
                    requirements={uni.requirements}
                    isRecommended={uni.isRecommended}
                    isSaved={savedUniversities.includes(uni.id)}
                    isShortlisted={isShortlisted(uni.id)}
                    onSave={() => handleSave(uni.id)}
                    onVisitWebsite={() => handleVisitWebsite(uni.website || "")}
                    onShortlist={() => handleShortlist(uni)}
                    reasons={uni.reasons}
                    similarityScore={uni.similarityScore}
                    eligibilityScore={uni.eligibilityScore}
                    acceptanceRate={uni.acceptanceRate}
                    scholarshipAvailable={uni.scholarshipAvailable}
                    description={uni.description}
                  />

                  <label className="mt-3 inline-flex items-center gap-2 text-sm text-gray-600">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      checked={selectedForComparison.includes(uni.id)}
                      onChange={() => handleToggleCompare(uni.id)}
                    />
                    Add to comparison
                  </label>
                </div>
              ))}
            </>
          )}

          {/* Error State for Recommendations */}
          {activeTab === "recommended" &&
            hasRequested &&
            !hasRecommendations &&
            recommendationsError && (
              <div className="text-center py-12 bg-red-50 rounded-xl border border-red-200">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
                  <Search className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Unable to Get Recommendations
                </h3>
                <p className="text-gray-600 mb-4 max-w-md mx-auto">
                  {recommendationsError.message ||
                    "There was an error fetching recommendations."}
                </p>
                <div className="flex gap-3 justify-center">
                  <button
                    onClick={handleGetRecommendations}
                    className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Try Again
                  </button>
                  <button
                    onClick={() => setShowProfileModal(true)}
                    className="px-4 py-2 text-sm font-medium text-red-700 bg-white border border-red-300 rounded-lg hover:bg-red-50 transition-colors"
                  >
                    Update Profile
                  </button>
                </div>
              </div>
            )}

          {/* Browse Universities Section */}
          {activeTab === "browse" && !browseLoading && (
            <>
              <SectionHeader
                title={`Browse Universities (${browseUniversities.length})`}
                action={
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => fetchUniversities()}
                      className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      <Filter className="w-4 h-4" />
                      Refresh
                    </button>
                  </div>
                }
              />

              <div className="space-y-4 sm:space-y-6">
                {filteredUniversities.map((uni) => (
                  <UniversityCard
                    key={uni.id}
                    universityName={uni.universityName}
                    country={uni.country}
                    ranking={uni.ranking}
                    location={uni.location}
                    tuitionFee={uni.tuitionFee}
                    deadline={getDeadlineLabel(uni.deadline)}
                    matchPercentage={uni.matchPercentage}
                    programs={uni.programs}
                    requirements={uni.requirements}
                    isRecommended={uni.isRecommended}
                    isSaved={savedUniversities.includes(uni.id)}
                    isShortlisted={isShortlisted(uni.id)}
                    onSave={() => handleSave(uni.id)}
                    onVisitWebsite={() => handleVisitWebsite(uni.website || "")}
                    onShortlist={() => handleShortlist(uni)}
                    reasons={uni.reasons || []}
                    similarityScore={uni.similarityScore}
                    eligibilityScore={uni.eligibilityScore}
                    acceptanceRate={uni.acceptanceRate}
                    scholarshipAvailable={uni.scholarshipAvailable}
                    description={uni.description}
                  />
                ))}
              </div>
            </>
          )}

          {/* Empty State for Recommendations - No profile or not requested yet */}
          {activeTab === "recommended" &&
            !recommendationsLoading &&
            !hasRequested && (
              <div className="text-center py-16 bg-gradient-to-b from-blue-50 to-white rounded-xl border border-blue-100">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <Sparkles className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  Get Personalized Recommendations
                </h3>
                <p className="text-gray-600 mb-8 max-w-md mx-auto text-lg">
                  Tell us about your profile and we'll find the perfect
                  universities for you
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <button
                    onClick={handleGetRecommendations}
                    className="px-8 py-4 text-base font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all hover:shadow-lg flex items-center gap-3"
                  >
                    <Sparkles className="w-5 h-5" />
                    Get University Recommendations
                  </button>

                  {!hasProfile && (
                    <button
                      onClick={() => setShowProfileModal(true)}
                      className="px-6 py-3 text-sm font-medium text-blue-700 bg-white border-2 border-blue-300 rounded-lg hover:bg-blue-50 transition-colors"
                    >
                      Create Profile First
                    </button>
                  )}
                </div>

                {hasProfile && (
                  <div className="mt-8 p-4 bg-blue-50 rounded-lg max-w-md mx-auto">
                    <h4 className="font-medium text-blue-800 mb-2">
                      Your Current Profile
                    </h4>
                    <div className="text-sm text-blue-600 space-y-1">
                      <p>GPA: {profile?.gpa}</p>
                      <p>Field: {profile?.field_of_study}</p>
                      <p>Desired Program: {profile?.desired_program}</p>
                    </div>
                  </div>
                )}
              </div>
            )}

          {/* Empty State for Browse */}
          {activeTab === "browse" &&
            !browseLoading &&
            filteredUniversities.length === 0 && (
              <div className="text-center py-16">
                <p className="text-gray-500 text-lg">
                  No universities found matching your criteria
                </p>
                <p className="text-gray-400 text-sm mt-2">
                  Try adjusting your search or filters
                </p>
              </div>
            )}
        </div>

        {/* Profile Form Modal */}
        <ProfileFormModal
          isOpen={showProfileModal}
          onClose={() => setShowProfileModal(false)}
          onSubmit={handleUpdateProfile}
          initialData={profile || undefined}
          originalProfileData={originalProfileData || undefined}
        />

        {selectedForComparison.length >= 2 && (
          <div className="fixed bottom-6 right-6 z-50">
            <button
              onClick={handleCompareNow}
              className="px-5 py-3 rounded-full bg-blue-600 text-white font-semibold shadow-lg hover:bg-blue-700 transition-colors"
            >
              Compare Now ({selectedForComparison.length})
            </button>
          </div>
        )}

        {showComparisonPanel && selectedComparisonUniversities.length >= 2 && (
          <div
            ref={comparisonRef}
            className="mt-10 rounded-2xl border border-blue-200 bg-blue-50 p-4 sm:p-6 shadow-sm"
          >
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mb-5">
              <div>
                <h3 className="text-lg font-semibold text-blue-950">
                  University Comparison
                </h3>
                <p className="text-sm text-blue-800">
                  Compare the universities you selected side by side.
                </p>
              </div>
              <button
                onClick={() => setShowComparisonPanel(false)}
                className="self-start rounded-lg border border-blue-200 bg-white px-3 py-2 text-sm font-medium text-blue-700 hover:bg-blue-100 transition-colors"
              >
                Hide Comparison
              </button>
            </div>

            <div className="overflow-x-auto">
              <div
                className="grid gap-px rounded-xl border border-blue-200 bg-blue-200 min-w-[640px]"
                style={{
                  gridTemplateColumns: `180px repeat(${selectedComparisonUniversities.length}, minmax(180px, 1fr))`,
                }}
              >
                <div className="bg-blue-100 p-4 font-semibold text-blue-950 sticky left-0">
                  Criteria
                </div>
                {selectedComparisonUniversities.map((uni) => (
                  <div key={uni.id} className="bg-white p-4">
                    <div className="text-sm font-semibold text-gray-900">
                      {uni.universityName}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {uni.country}
                    </div>
                  </div>
                ))}

                {comparisonRows.map((row) => (
                  <React.Fragment key={row.label}>
                    <div className="bg-blue-100 p-4 text-sm font-medium text-blue-950 sticky left-0">
                      {row.label}
                    </div>
                    {selectedComparisonUniversities.map((uni) => (
                      <div
                        key={`${row.label}-${uni.id}`}
                        className="bg-white p-4 text-sm text-gray-700"
                      >
                        {row.getValue(uni)}
                      </div>
                    ))}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        )}
      </UniversityLayout>
    </ProtectedRoute>
  );
}
