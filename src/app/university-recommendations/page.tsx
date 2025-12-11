// // app/university-recommendations/page.tsx
// "use client";

// import React, { useState, useEffect } from "react";
// import Breadcrumb from "@/components/document-s3/Breadcrumb";
// import PageHeader from "@/components/document-s3/PageHeader";
// import SearchFilterBar from "@/components/University-s4/SearchFilterBar";
// import SectionHeader from "@/components/University-s4/SectionHeader";
// import UniversityCard from "@/components/University-s4/UniversityCard";
// import EnableEmailButton from "@/components/University-s4/EnableEmailButton";
// import UniversityLayout from "@/components/layouts/UniversityLayout";
// import ProfileFormModal from "@/components/University-s4/ProfileFormModal";
// import { useUniversityRecommendations } from "@/hooks/useUniversityRecommendations";
// import { useStudentProfile } from "@/hooks/useStudentProfile";
// import { useUniversities } from "@/hooks/useUniversities";
// import { universityApi } from "@/lib/api";
// import { Search, Filter } from "lucide-react";

// export default function UniversityRecommendationsPage() {
//   const [savedUniversities, setSavedUniversities] = useState<string[]>([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [showProfileModal, setShowProfileModal] = useState(false);
//   const [activeTab, setActiveTab] = useState<'recommended' | 'browse'>('recommended');
  
//   const { 
//     profile, 
//     updateProfile, 
//     getProfileForRecommendation,
//     hasProfile 
//   } = useStudentProfile();
  
//   const { 
//     loading: recommendationsLoading, 
//     recommendations, 
//     getRecommendations, 
//     hasRecommendations,
//     clearRecommendations 
//   } = useUniversityRecommendations({
//     onSuccess: () => setActiveTab('recommended'),
//     onError: (error) => console.error("Recommendation error:", error)
//   });
  
//   const { 
//     universities: browseUniversities, 
//     loading: browseLoading,
//     countries,
//     programLevels,
//     fetchUniversities 
//   } = useUniversities();
  
//   const [filters, setFilters] = useState({
//     country: "",
//     program_level: "",
//     min_gpa: 0,
//     max_tuition: 0,
//   });

//   // Load recommendations on profile change
//   useEffect(() => {
//     if (hasProfile && !recommendations) {
//       loadRecommendations();
//     }
//   }, [hasProfile, recommendations]);

//   const loadRecommendations = async () => {
//     try {
//       const studentProfile = getProfileForRecommendation();
//       await getRecommendations(studentProfile, 10);
//     } catch (error) {
//       console.error("Failed to load recommendations:", error);
//     }
//   };

//   const handleSearch = (query: string) => {
//     setSearchQuery(query);
//     if (activeTab === 'browse') {
//       // Implement search logic for browse mode
//       console.log("Searching universities for:", query);
//     }
//   };

//   const handleFilterClick = () => {
//     console.log("Show filters");
//     // You can implement a filter modal here
//   };

//   const handleEnableEmail = () => {
//     console.log("Enable email notifications");
//   };

//   const handleSave = (id: string) => {
//     setSavedUniversities((prev) =>
//       prev.includes(id) 
//         ? prev.filter((uId) => uId !== id) 
//         : [...prev, id]
//     );
    
//     // Save to localStorage
//     const saved = JSON.parse(localStorage.getItem('savedUniversities') || '[]');
//     if (!saved.includes(id)) {
//       localStorage.setItem('savedUniversities', JSON.stringify([...saved, id]));
//     } else {
//       localStorage.setItem('savedUniversities', JSON.stringify(saved.filter((uId: string) => uId !== id)));
//     }
//   };

//   const handleApplyNow = (universityId: string) => {
//     console.log("Apply now for university:", universityId);
//     // Navigate to application page or open modal
//   };

//   const handleVisitWebsite = (website: string) => {
//     if (website) {
//       window.open(website, '_blank', 'noopener,noreferrer');
//     }
//   };

//   const handleUpdateProfile = (updatedProfile: any) => {
//     updateProfile(updatedProfile);
//     setShowProfileModal(false);
//     clearRecommendations(); // Clear old recommendations
//     loadRecommendations(); // Load new recommendations
//   };

//   // Load saved universities from localStorage
//   useEffect(() => {
//     const saved = localStorage.getItem('savedUniversities');
//     if (saved) {
//       setSavedUniversities(JSON.parse(saved));
//     }
//   }, []);

//   // Convert backend data to frontend format
//  const recommendedUniversities = recommendations?.recommendations.map(rec => 
//     universityApi.convertToFrontendFormat(rec.university, rec)
//   ) || [];


//   // const browseUniversitiesFormatted = browseUniversities.map(uni => 
//   //   universityApi.convertToFrontendFormat({
//   //     ...uni,
//   //     // Add missing fields with defaults
//   //     website: null,
//   //     description: null,
//   //     min_toefl: null,
//   //     min_gre: null,
//   //     min_gmat: null,
//   //     program_type: null,
//   //     program_duration_months: null,
//   //     avg_scholarship_percentage: null,
//   //     fields_offered: [uni.program_name],
//   //     requires_portfolio: false,
//   //     requires_research_proposal: false,
//   //     requires_interview: false,
//   //     application_deadline: null,
//   //     intake_seasons: [],
//   //     graduation_rate: null,
//   //     employment_rate_6_months: null,
//   //     avg_starting_salary_usd: null,
//   //     created_at: new Date().toISOString(),
//   //     updated_at: null,
//   //   })
//   // );


//   // SIMPLEST FIX - Update just the problematic section in page.tsx

// const browseUniversitiesFormatted = browseUniversities.map(uni => {
//     // Your backend returns full university data, so just pass it through
//     return universityApi.convertToFrontendFormat(uni as any);
//   });

//   const displayedUniversities = activeTab === 'recommended' 
//     ? recommendedUniversities
//     : browseUniversitiesFormatted;

//   // Filter by search query
//   const filteredUniversities = displayedUniversities.filter(uni =>
//   uni.universityName.toLowerCase().includes(searchQuery.toLowerCase()) ||
//   uni.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
//   uni.programs.some((program: string) => 
//     program.toLowerCase().includes(searchQuery.toLowerCase())
//   )
// );

//   return (
//     <UniversityLayout>
//       <div className="pt-10"></div>
//       <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
//         {/* Breadcrumb */}
//         <Breadcrumb
//           items={[
//             { label: "Dashboard", href: "/dashboard" },
//             { label: "University Recommendations" },
//           ]}
//         />

//         {/* Page Header */}
//         <PageHeader
//           title="University Recommendations"
//           description="Discover universities that match your profile and preferences"
//         />

//         {/* Profile Info Banner */}
//         {profile && (
//           <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
//             <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
//               <div>
//                 <h3 className="text-sm font-semibold text-blue-800">Your Profile</h3>
//                 <p className="text-sm text-blue-600 mt-1">
//                   GPA: {profile.gpa} | Field: {profile.field_of_study} | Program: {profile.desired_program}
//                 </p>
//               </div>
//               <button
//                 onClick={() => setShowProfileModal(true)}
//                 className="px-4 py-2 text-sm font-medium text-blue-700 bg-white border border-blue-300 rounded-lg hover:bg-blue-50 transition-colors"
//               >
//                 Update Profile
//               </button>
//             </div>
//           </div>
//         )}

//         {/* Tabs */}
//         <div className="mb-6 border-b border-gray-200">
//           <div className="flex space-x-4">
//             <button
//               className={`py-2 px-1 font-medium text-sm border-b-2 transition-colors ${
//                 activeTab === 'recommended'
//                   ? 'border-blue-600 text-blue-600'
//                   : 'border-transparent text-gray-500 hover:text-gray-700'
//               }`}
//               onClick={() => setActiveTab('recommended')}
//             >
//               Recommended
//               {hasRecommendations && (
//                 <span className="ml-2 px-2 py-0.5 text-xs bg-blue-100 text-blue-800 rounded-full">
//                   {recommendations?.recommendations.length || 0}
//                 </span>
//               )}
//             </button>
//             <button
//               className={`py-2 px-1 font-medium text-sm border-b-2 transition-colors ${
//                 activeTab === 'browse'
//                   ? 'border-blue-600 text-blue-600'
//                   : 'border-transparent text-gray-500 hover:text-gray-700'
//               }`}
//               onClick={() => {
//                 setActiveTab('browse');
//                 fetchUniversities();
//               }}
//             >
//               Browse All
//               <span className="ml-2 px-2 py-0.5 text-xs bg-gray-100 text-gray-800 rounded-full">
//                 {browseUniversities.length}
//               </span>
//             </button>
//           </div>
//         </div>

//         {/* Search and Filters */}
//         <SearchFilterBar
//           onSearch={handleSearch}
//           onFilterClick={handleFilterClick}
//           // placeholder="Search universities by name, country, or program"
//         />

//         {/* Loading State */}
//         {(recommendationsLoading || browseLoading) && (
//           <div className="text-center py-12">
//             <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//             <p className="mt-2 text-gray-600">Loading universities...</p>
//           </div>
//         )}

//         {/* Recommendations Section */}
//         {activeTab === 'recommended' && hasRecommendations && (
//           <>
//             <SectionHeader
//               title={`Recommended Universities (${recommendations?.recommendations.length})`}
//               action={
//                 <div className="flex items-center gap-3">
//                   <span className="text-sm text-gray-600">
//                     Match with {recommendations?.total_considered} universities
//                   </span>
//                   <EnableEmailButton onClick={handleEnableEmail} />
//                 </div>
//               }
//             />
            
//             {recommendedUniversities.map((uni, index) => (
//             <div key={uni.id} className="mb-6">
//               <div className="flex items-center gap-2 mb-3">
//                 <span className="text-xs font-medium px-2 py-1 bg-blue-100 text-blue-800 rounded">
//                   #{index + 1} Recommendation
//                 </span>
//                 {uni.reasons?.length > 0 && (
//                   <span className="text-sm text-gray-600">
//                     {uni.reasons[0]}
//                   </span>
//                 )}
//               </div>
              
//               {/* Pass ALL props from the converted data */}
//               <UniversityCard
//                 universityName={uni.universityName}
//                 country={uni.country}
//                 ranking={uni.ranking}
//                 location={uni.location}
//                 tuitionFee={uni.tuitionFee}
//                 deadline={uni.deadline}
//                 matchPercentage={uni.matchPercentage}
//                 programs={uni.programs}
//                 requirements={uni.requirements}
//                 isRecommended={uni.isRecommended}
//                 isSaved={savedUniversities.includes(uni.id)}
//                 onSave={() => handleSave(uni.id)}
//                 onVisitWebsite={() => handleVisitWebsite(uni.website || '')}
//                 onApplyNow={() => handleApplyNow(uni.id)}
//                 // NEW PROPS - they're already in 'uni' from convertToFrontendFormat
//                 reasons={uni.reasons}
//                 similarityScore={uni.similarityScore}
//                 eligibilityScore={uni.eligibilityScore}
//                 acceptanceRate={uni.acceptanceRate}
//                 scholarshipAvailable={uni.scholarshipAvailable}
//                 description={uni.description}
//               />
//             </div>
//           ))}
//           </>
//         )}

//         {/* Browse Universities Section */}
//         {activeTab === 'browse' && (
//         <>
//           <SectionHeader
//             title={`Browse Universities (${browseUniversities.length})`}
//             action={
//               <div className="flex items-center gap-3">
//                 <button
//                   onClick={() => fetchUniversities()}
//                   className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
//                 >
//                   <Filter className="w-4 h-4" />
//                   Refresh
//                 </button>
//               </div>
//             }
//           />
          
//           <div className="space-y-4 sm:space-y-6">
//             {filteredUniversities.map((uni) => (
//               <UniversityCard
//                 key={uni.id}
//                 universityName={uni.universityName}
//                 country={uni.country}
//                 ranking={uni.ranking}
//                 location={uni.location}
//                 tuitionFee={uni.tuitionFee}
//                 deadline={uni.deadline}
//                 matchPercentage={uni.matchPercentage}
//                 programs={uni.programs}
//                 requirements={uni.requirements}
//                 isRecommended={uni.isRecommended}
//                 isSaved={savedUniversities.includes(uni.id)}
//                 onSave={() => handleSave(uni.id)}
//                 onVisitWebsite={() => handleVisitWebsite(uni.website || '')}
//                 onApplyNow={() => handleApplyNow(uni.id)}
//                 // For browse mode, these will be empty/default
//                 reasons={uni.reasons || []}
//                 similarityScore={uni.similarityScore}
//                 eligibilityScore={uni.eligibilityScore}
//                 acceptanceRate={uni.acceptanceRate}
//                 scholarshipAvailable={uni.scholarshipAvailable}
//                 description={uni.description}
//               />
//             ))}
//           </div>
//         </>
//       )}


//         {/* Empty State for Recommendations */}
//         {activeTab === 'recommended' && !recommendationsLoading && !hasRecommendations && (
//           <div className="text-center py-16 bg-gray-50 rounded-xl border border-gray-200">
//             <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center">
//               <Search className="w-8 h-8 text-blue-600" />
//             </div>
//             <h3 className="text-lg font-semibold text-gray-900 mb-2">
//               No Recommendations Yet
//             </h3>
//             <p className="text-gray-600 mb-6 max-w-md mx-auto">
//               {hasProfile 
//                 ? "We couldn't find universities matching your current profile. Try updating your preferences."
//                 : "Complete your student profile to get personalized university recommendations."
//               }
//             </p>
//             <button
//               onClick={() => setShowProfileModal(true)}
//               className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
//             >
//               {hasProfile ? "Update Profile" : "Create Profile"}
//             </button>
//           </div>
//         )}

//         {/* Empty State for Browse */}
//         {activeTab === 'browse' && !browseLoading && filteredUniversities.length === 0 && (
//           <div className="text-center py-16">
//             <p className="text-gray-500 text-lg">
//               No universities found matching your criteria
//             </p>
//             <p className="text-gray-400 text-sm mt-2">
//               Try adjusting your search or filters
//             </p>
//           </div>
//         )}
//       </div>

//       {/* Profile Form Modal */}
//       <ProfileFormModal
//         isOpen={showProfileModal}
//         onClose={() => setShowProfileModal(false)}
//         onSubmit={handleUpdateProfile}
//         initialData={profile || undefined}
//       />
//     </UniversityLayout>
//   );
// }



// app/university-recommendations/page.tsx - UPDATED VERSION
"use client";

import React, { useState, useEffect } from "react";
import Breadcrumb from "@/components/document-s3/Breadcrumb";
import PageHeader from "@/components/document-s3/PageHeader";
import SearchFilterBar from "@/components/University-s4/SearchFilterBar";
import SectionHeader from "@/components/University-s4/SectionHeader";
import UniversityCard from "@/components/University-s4/UniversityCard";
import EnableEmailButton from "@/components/University-s4/EnableEmailButton";
import UniversityLayout from "@/components/layouts/UniversityLayout";
import ProfileFormModal from "@/components/University-s4/ProfileFormModal";
import { useUniversityRecommendations } from "@/hooks/useUniversityRecommendations";
import { useStudentProfile } from "@/hooks/useStudentProfile";
import { useUniversities } from "@/hooks/useUniversities";
import { universityApi } from "@/lib/api";
import { Search, Filter, Sparkles } from "lucide-react"; // Added Sparkles icon

export default function UniversityRecommendationsPage() {
  const [savedUniversities, setSavedUniversities] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'recommended' | 'browse'>('recommended');
  
  const { 
    profile, 
    updateProfile, 
    getProfileForRecommendation,
    hasProfile 
  } = useStudentProfile();
  
  const { 
    loading: recommendationsLoading, 
    recommendations, 
    getRecommendations, 
    hasRecommendations,
    hasRequested, // NEW: Get hasRequested from hook
    error: recommendationsError,
    clearRecommendations 
  } = useUniversityRecommendations({
    onSuccess: () => setActiveTab('recommended'),
    onError: (error) => console.error("Recommendation error:", error)
  });
  
  const { 
    universities: browseUniversities, 
    loading: browseLoading,
    countries,
    programLevels,
    fetchUniversities 
  } = useUniversities({ autoFetch: false });
  
  const [filters, setFilters] = useState({
    country: "",
    program_level: "",
    min_gpa: 0,
    max_tuition: 0,
  });

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

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (activeTab === 'browse') {
      // Implement search logic for browse mode
      console.log("Searching universities for:", query);
    }
  };

  const handleFilterClick = () => {
    console.log("Show filters");
    // You can implement a filter modal here
  };

  const handleEnableEmail = () => {
    console.log("Enable email notifications");
  };

  const handleSave = (id: string) => {
    setSavedUniversities((prev) =>
      prev.includes(id) 
        ? prev.filter((uId) => uId !== id) 
        : [...prev, id]
    );
    
    // Save to localStorage
    const saved = JSON.parse(localStorage.getItem('savedUniversities') || '[]');
    if (!saved.includes(id)) {
      localStorage.setItem('savedUniversities', JSON.stringify([...saved, id]));
    } else {
      localStorage.setItem('savedUniversities', JSON.stringify(saved.filter((uId: string) => uId !== id)));
    }
  };

  const handleApplyNow = (universityId: string) => {
    console.log("Apply now for university:", universityId);
    // Navigate to application page or open modal
  };

  const handleVisitWebsite = (website: string) => {
    if (website) {
      window.open(website, '_blank', 'noopener,noreferrer');
    }
  };

  const handleUpdateProfile = (updatedProfile: any) => {
    updateProfile(updatedProfile);
    setShowProfileModal(false);
    clearRecommendations(); // Clear old recommendations
  };

  // Load saved universities from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('savedUniversities');
    if (saved) {
      setSavedUniversities(JSON.parse(saved));
    }
  }, []);

  // Convert backend data to frontend format
  const recommendedUniversities = recommendations?.recommendations.map(rec => 
    universityApi.convertToFrontendFormat(rec.university, rec)
  ) || [];

  const browseUniversitiesFormatted = browseUniversities.map(uni => {
    return universityApi.convertToFrontendFormat(uni as any);
  });

  const displayedUniversities = activeTab === 'recommended' 
    ? recommendedUniversities
    : browseUniversitiesFormatted;

  // Filter by search query
  const filteredUniversities = displayedUniversities.filter(uni =>
    uni.universityName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    uni.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
    uni.programs.some((program: string) => 
      program.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
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
                <h3 className="text-sm font-semibold text-blue-800">Your Profile</h3>
                <p className="text-sm text-blue-600 mt-1">
                  GPA: {profile.gpa} | Field: {profile.field_of_study} | Program: {profile.desired_program}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowProfileModal(true)}
                  className="px-4 py-2 text-sm font-medium text-blue-700 bg-white border border-blue-300 rounded-lg hover:bg-blue-50 transition-colors"
                >
                  Update Profile
                </button>
                
                {/* NEW: Get Recommendations Button */}
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
                activeTab === 'recommended'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('recommended')}
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
                activeTab === 'browse'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => {
                setActiveTab('browse');
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
        {(hasRecommendations || activeTab === 'browse') && (
          <SearchFilterBar
            onSearch={handleSearch}
            onFilterClick={handleFilterClick}
          />
        )}

        {/* Loading State for Recommendations */}
        {recommendationsLoading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-2 text-gray-600">Finding your perfect universities...</p>
            <p className="text-sm text-gray-500 mt-1">This may take a few seconds</p>
          </div>
        )}

        {/* Loading State for Browse */}
        {browseLoading && activeTab === 'browse' && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-2 text-gray-600">Loading universities...</p>
          </div>
        )}

        {/* Recommendations Section */}
        {activeTab === 'recommended' && hasRecommendations && (
          <>
            <SectionHeader
              title={`Recommended Universities (${recommendations?.recommendations.length})`}
              action={
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-600">
                    Match with {recommendations?.total_considered} universities
                  </span>
                  <EnableEmailButton onClick={handleEnableEmail} />
                </div>
              }
            />
            
            {recommendedUniversities.map((uni, index) => (
              <div key={uni.id} className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-medium px-2 py-1 bg-blue-100 text-blue-800 rounded">
                    #{index + 1} Recommendation
                  </span>
                  {uni.reasons?.length > 0 && (
                    <span className="text-sm text-gray-600">
                      {uni.reasons[0]}
                    </span>
                  )}
                </div>
                
                <UniversityCard
                  universityName={uni.universityName}
                  country={uni.country}
                  ranking={uni.ranking}
                  location={uni.location}
                  tuitionFee={uni.tuitionFee}
                  deadline={uni.deadline}
                  matchPercentage={uni.matchPercentage}
                  programs={uni.programs}
                  requirements={uni.requirements}
                  isRecommended={uni.isRecommended}
                  isSaved={savedUniversities.includes(uni.id)}
                  onSave={() => handleSave(uni.id)}
                  onVisitWebsite={() => handleVisitWebsite(uni.website || '')}
                  onApplyNow={() => handleApplyNow(uni.id)}
                  reasons={uni.reasons}
                  similarityScore={uni.similarityScore}
                  eligibilityScore={uni.eligibilityScore}
                  acceptanceRate={uni.acceptanceRate}
                  scholarshipAvailable={uni.scholarshipAvailable}
                  description={uni.description}
                />
              </div>
            ))}
          </>
        )}

        {/* Error State for Recommendations */}
        {activeTab === 'recommended' && hasRequested && !hasRecommendations && recommendationsError && (
          <div className="text-center py-12 bg-red-50 rounded-xl border border-red-200">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
              <Search className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Unable to Get Recommendations
            </h3>
            <p className="text-gray-600 mb-4 max-w-md mx-auto">
              {recommendationsError.message || "There was an error fetching recommendations."}
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
        {activeTab === 'browse' && !browseLoading && (
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
                  deadline={uni.deadline}
                  matchPercentage={uni.matchPercentage}
                  programs={uni.programs}
                  requirements={uni.requirements}
                  isRecommended={uni.isRecommended}
                  isSaved={savedUniversities.includes(uni.id)}
                  onSave={() => handleSave(uni.id)}
                  onVisitWebsite={() => handleVisitWebsite(uni.website || '')}
                  onApplyNow={() => handleApplyNow(uni.id)}
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
        {activeTab === 'recommended' && !recommendationsLoading && !hasRequested && (
          <div className="text-center py-16 bg-gradient-to-b from-blue-50 to-white rounded-xl border border-blue-100">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Get Personalized Recommendations
            </h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto text-lg">
              Tell us about your profile and we'll find the perfect universities for you
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
                <h4 className="font-medium text-blue-800 mb-2">Your Current Profile</h4>
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
        {activeTab === 'browse' && !browseLoading && filteredUniversities.length === 0 && (
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
      />
    </UniversityLayout>
  );
}