// app/university-recommendations/page.tsx
"use client";

import React, { useState } from "react";
import Breadcrumb from "@/components/document-s3/Breadcrumb";
import PageHeader from "@/components/document-s3/PageHeader";
import SearchFilterBar from "@/components/University-s4/SearchFilterBar";
import SectionHeader from "@/components/University-s4/SectionHeader";
import UniversityCard from "@/components/University-s4/UniversityCard";
import EnableEmailButton from "@/components/University-s4/EnableEmailButton";
import UniversityLayout from "@/components/layouts/UniversityLayout";

const universities = [
  {
    id: "1",
    universityName: "University of Toronto",
    country: "Canada",
    ranking: "#1 Global",
    location: "Toronto, Canada",
    tuitionFee: "$36,590 CAD",
    deadline: "Jan 15, 2025",
    matchPercentage: 85,
    programs: ["Computer Science", "Data Science", "AI & Machine Learning"],
    requirements: {
      minGPA: "3.7",
      minIELTS: "7.0",
      minSAT: "1400",
    },
    isRecommended: true,
    isSaved: true,
  },
  {
    id: "2",
    universityName: "University of British Columbia",
    country: "Canada",
    ranking: "#2 Global",
    location: "Vancouver, Canada",
    tuitionFee: "$33,298 CAD",
    deadline: "Jan 15, 2025",
    matchPercentage: 82,
    programs: ["Computer Science", "Software Engineering"],
    requirements: {
      minGPA: "3.5",
      minIELTS: "6.5",
    },
    isRecommended: false,
    isSaved: false,
  },
  {
    id: "3",
    universityName: "McGill University",
    country: "Canada",
    ranking: "#3 Global",
    location: "Montreal, Canada",
    tuitionFee: "$24,666 CAD",
    deadline: "Feb 1, 2025",
    matchPercentage: 78,
    programs: ["Computer Science", "Information Systems"],
    requirements: {
      minGPA: "3.3",
      minIELTS: "6.5",
    },
    isRecommended: false,
    isSaved: false,
  },
  {
    id: "4",
    universityName: "University of Waterloo",
    country: "Canada",
    ranking: "#4 Global",
    location: "Waterloo, Canada",
    tuitionFee: "$53,900 CAD",
    deadline: "Jan 31, 2025",
    matchPercentage: 75,
    programs: ["Data Science"],
    requirements: {
      minGPA: "3.8",
      minIELTS: "7.0",
    },
    isRecommended: false,
    isSaved: false,
  },
  {
    id: "5",
    universityName: "York University",
    country: "Canada",
    ranking: "#5 Global",
    location: "Toronto, Canada",
    tuitionFee: "$30,884 CAD",
    deadline: "Feb 15, 2025",
    matchPercentage: 65,
    programs: ["Information Technology"],
    requirements: {
      minGPA: "3.0",
      minIELTS: "6.5",
    },
    isRecommended: false,
    isSaved: false,
  },
];

export default function UniversityRecommendationsPage() {
  const [savedUniversities, setSavedUniversities] = useState<string[]>(["1"]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSave = (id: string) => {
    setSavedUniversities((prev) =>
      prev.includes(id) ? prev.filter((uId) => uId !== id) : [...prev, id]
    );
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    console.log("Searching for:", query);
  };

  const handleFilterClick = () => {
    console.log("Show filters");
  };

  const handleEnableEmail = () => {
    console.log("Enable email notifications");
  };

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

      {/* Search and Filters */}
      <SearchFilterBar
        onSearch={handleSearch}
        onFilterClick={handleFilterClick}
        placeholder="Customize your search with search criteria"
      />

      {/* Recommended Universities Section */}
      <SectionHeader
        title="Recommended Universities"
        action={<EnableEmailButton onClick={handleEnableEmail} />}
      />

      {/* Universities List */}
      <div className="space-y-4 sm:space-y-6">
        {universities.map((university) => (
          <UniversityCard
            key={university.id}
            universityName={university.universityName}
            country={university.country}
            ranking={university.ranking}
            location={university.location}
            tuitionFee={university.tuitionFee}
            deadline={university.deadline}
            matchPercentage={university.matchPercentage}
            programs={university.programs}
            requirements={university.requirements}
            isRecommended={university.isRecommended}
            isSaved={savedUniversities.includes(university.id)}
            onSave={() => handleSave(university.id)}
            onVisitWebsite={() =>
              console.log("Visit website:", university.universityName)
            }
            onApplyNow={() =>
              console.log("Apply now:", university.universityName)
            }
          />
        ))}
      </div>

      {/* Empty State */}
      {universities.length === 0 && (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg">
            No universities found matching your criteria
          </p>
          <p className="text-gray-400 text-sm mt-2">
            Try adjusting your search filters
          </p>
        </div>
      )}
    </div>
    </UniversityLayout>
  );
}