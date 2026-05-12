// app/dashboard/shortlisted-universities/page.tsx
"use client";

import React, { useState } from "react";
import Breadcrumb from "@/components/document-s3/Breadcrumb";
import PageHeader from "@/components/document-s3/PageHeader";
import UniversityLayout from "@/components/layouts/UniversityLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import UniversityCard from "@/components/University-s4/UniversityCard";
import { useShortlistedUniversities } from "@/hooks/useShortlistedUniversities";
import { Trash2, Mail } from "lucide-react";
import toast from "react-hot-toast";

export default function ShortlistedUniversitiesPage() {
  const {
    shortlisted,
    loading,
    removeFromShortlist,
    clearShortlist,
    informCounselor,
  } = useShortlistedUniversities();

  const [selectedForComparison, setSelectedForComparison] = useState<string[]>(
    [],
  );
  const [informingCounselor, setInformingCounselor] = useState(false);
  const [showComparisonPanel, setShowComparisonPanel] = useState(false);

  const handleRemove = (universityId: string) => {
    removeFromShortlist(universityId);
    setSelectedForComparison((prev) => prev.filter((id) => id !== universityId));
  };

  const handleToggleCompare = (universityId: string) => {
    setSelectedForComparison((prev) =>
      prev.includes(universityId)
        ? prev.filter((id) => id !== universityId)
        : [...prev, universityId],
    );
  };

  const shortlistedForComparison = shortlisted.filter((university) =>
    selectedForComparison.includes(university.universityId),
  );

  const comparisonRows = [
    {
      label: "Match",
      getValue: (university: (typeof shortlisted)[number]) =>
        `${university.matchPercentage}%`,
    },
    {
      label: "Tuition",
      getValue: (university: (typeof shortlisted)[number]) =>
        university.tuitionFee,
    },
    {
      label: "Ranking",
      getValue: (university: (typeof shortlisted)[number]) =>
        university.ranking,
    },
    {
      label: "Country",
      getValue: (university: (typeof shortlisted)[number]) =>
        university.country,
    },
  ];

  const handleCompareNow = () => {
    if (shortlistedForComparison.length < 2) {
      return;
    }

    setShowComparisonPanel(true);
    requestAnimationFrame(() => {
      document.getElementById("shortlist-comparison")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  };

  const handleInformCounselor = async () => {
    if (shortlisted.length === 0) {
      toast.error("No universities to inform counselor about");
      return;
    }

    setInformingCounselor(true);
    try {
      const success = await informCounselor();
      if (success) {
        // Optionally clear selection after successful submission
        setSelectedForComparison([]);
      }
    } finally {
      setInformingCounselor(false);
    }
  };

  const handleClearAll = () => {
    if (
      window.confirm(
        "Are you sure you want to remove all shortlisted universities?",
      )
    ) {
      clearShortlist();
      setSelectedForComparison([]);
      setShowComparisonPanel(false);
    }
  };

  const isEmpty = shortlisted.length === 0;

  React.useEffect(() => {
    if (selectedForComparison.length < 2) {
      setShowComparisonPanel(false);
    }
  }, [selectedForComparison.length]);

  return (
    <ProtectedRoute requiredRole="student">
      <UniversityLayout>
        <div className="mx-auto w-full max-w-7xl space-y-8">
          {/* Breadcrumb */}
          <Breadcrumb
            items={[
              { label: "Dashboard", href: "/dashboard" },
              {
                label: "University Recommendations",
                href: "/university-recommendations",
              },
              { label: "Shortlisted Universities" },
            ]}
          />

          {/* Page Header */}
          <PageHeader
            title="Shortlisted Universities"
            description="Your curated list of universities that match your profile"
          />

          {isEmpty ? (
            // Empty State
            <div className="py-12">
              <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No Shortlisted Universities Yet
                </h3>
                <p className="text-gray-600 mb-6">
                  Start by exploring university recommendations or browsing
                  available options.
                </p>
                <a
                  href="/university-recommendations"
                  className="inline-flex items-center justify-center px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Explore Universities
                </a>
              </div>
            </div>
          ) : (
            <>
              {/* Shortlist Stats & Actions */}
              <div className="mb-6 bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
                <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                      <h3 className="text-sm font-semibold text-gray-700">
                        {shortlisted.length}{" "}
                        {shortlisted.length === 1
                          ? "University"
                          : "Universities"}{" "}
                        Shortlisted
                      </h3>
                    </div>
                    <p className="text-sm text-gray-600">
                      {selectedForComparison.length > 0
                        ? `${selectedForComparison.length} selected for comparison`
                        : "Select universities to compare features"}
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 xl:justify-end">
                    {shortlisted.length > 1 && (
                      <button
                        onClick={handleClearAll}
                        className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 border border-red-300 text-red-700 rounded-lg hover:bg-red-50 transition-colors text-sm font-medium"
                      >
                        <Trash2 className="w-4 h-4" />
                        Clear All
                      </button>
                    )}
                    <button
                      onClick={handleInformCounselor}
                      disabled={
                        informingCounselor || loading || shortlisted.length === 0
                      }
                      className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Mail className="w-4 h-4" />
                      {informingCounselor ? "Informing..." : "Inform Counselor"}
                    </button>
                  </div>
                </div>
              </div>

              {/* Shortlisted Universities Grid */}
              <div className="space-y-6">
                {shortlisted.map((university) => (
                  <div
                    key={university.universityId}
                    className="rounded-2xl border border-gray-200 bg-white/50 p-3 sm:p-4 space-y-3"
                  >
                    <div className="flex flex-wrap justify-between items-center gap-2">
                      <div className="text-xs text-gray-500">
                        Added to shortlist
                      </div>
                      <label className="inline-flex items-center gap-2 cursor-pointer rounded-full border border-gray-200 bg-white px-3 py-2 shadow-sm hover:border-blue-300 transition-colors">
                        <input
                          type="checkbox"
                          checked={selectedForComparison.includes(
                            university.universityId,
                          )}
                          onChange={() =>
                            handleToggleCompare(university.universityId)
                          }
                          className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                        />
                        <span className="text-xs font-medium text-gray-700">
                          Compare
                        </span>
                      </label>
                    </div>

                    <UniversityCard
                      universityName={university.universityName}
                      country={university.country}
                      ranking={university.ranking}
                      location={university.country}
                      tuitionFee={university.tuitionFee}
                      deadline="TBD"
                      matchPercentage={university.matchPercentage}
                      programs={[]}
                      requirements={{
                        minGPA: "3.0",
                        minIELTS: "6.5",
                      }}
                      isShortlisted={true}
                      onShortlist={() => handleRemove(university.universityId)}
                      onSave={() => {}}
                      onVisitWebsite={() => {}}
                    />

                    <div className="flex justify-end pt-1">
                      <button
                        onClick={() => handleRemove(university.universityId)}
                        className="flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                        Remove from Shortlist
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {selectedForComparison.length >= 2 && (
                <div className="sticky bottom-4 z-10 pointer-events-none">
                  <button
                    onClick={handleCompareNow}
                    className="mt-2 ml-auto mr-0 block w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-md hover:bg-blue-700 transition-colors pointer-events-auto"
                  >
                    Compare Now ({selectedForComparison.length})
                  </button>
                </div>
              )}

              {showComparisonPanel && shortlistedForComparison.length >= 2 && (
                <div
                  id="shortlist-comparison"
                  className="rounded-2xl border border-blue-200 bg-blue-50 p-4 sm:p-6 shadow-sm"
                >
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mb-5">
                    <div>
                      <h3 className="text-lg font-semibold text-blue-950">
                        Comparison Mode
                      </h3>
                      <p className="text-sm text-blue-800">
                        Comparing {shortlistedForComparison.length} shortlisted
                        universities.
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
                      className="grid gap-px rounded-xl border border-blue-200 bg-blue-200 min-w-[560px]"
                      style={{
                        gridTemplateColumns: `160px repeat(${shortlistedForComparison.length}, minmax(160px, 1fr))`,
                      }}
                    >
                      <div className="bg-blue-100 p-4 font-semibold text-blue-950 sticky left-0">
                        Criteria
                      </div>
                      {shortlistedForComparison.map((university) => (
                        <div
                          key={university.universityId}
                          className="bg-white p-4"
                        >
                          <div className="text-sm font-semibold text-gray-900">
                            {university.universityName}
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            {university.country}
                          </div>
                        </div>
                      ))}

                      {comparisonRows.map((row) => (
                        <React.Fragment key={row.label}>
                          <div className="bg-blue-100 p-4 text-sm font-medium text-blue-950 sticky left-0">
                            {row.label}
                          </div>
                          {shortlistedForComparison.map((university) => (
                            <div
                              key={`${row.label}-${university.universityId}`}
                              className="bg-white p-4 text-sm text-gray-700"
                            >
                              {row.getValue(university)}
                            </div>
                          ))}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 flex justify-end">
                    <button
                      onClick={() => {
                        setSelectedForComparison([]);
                        setShowComparisonPanel(false);
                      }}
                      className="text-sm font-medium text-blue-700 hover:text-blue-800"
                    >
                      Clear Comparison
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </UniversityLayout>
    </ProtectedRoute>
  );
}
