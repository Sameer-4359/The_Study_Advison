// app/profile-setup/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import Breadcrumb from "@/components/document-s3/Breadcrumb";
import PageHeader from "@/components/document-s3/PageHeader";
import ProfileProgressBar from "@/components/profile-s2/ProfileProgressBar";
import FormSectionCard from "@/components/profile-s2/FormSectionCard";
import FormInput from "@/components/profile-s2/FormInput";
import FormSelect from "@/components/profile-s2/FormSelect";
import FormActions from "@/components/profile-s2/FormActions";
import DocumentLayout from "@/components/layouts/DocumentLayout";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  nationality: string;
  educationLevel: string;
  institution: string;
  major: string;
  gpa: string;
  ieltsScore: string;
  desiredProgram: string;
  preferredCountry: string;
  budgetRange: string;
  preferredIntake: string;
};

const nationalityOptions = [
  { value: "us", label: "United States" },
  { value: "uk", label: "United Kingdom" },
  { value: "ca", label: "Canada" },
  { value: "pk", label: "Pakistan" },
  { value: "in", label: "India" },
  { value: "other", label: "Other" },
];

const educationLevelOptions = [
  { value: "bachelors", label: "Bachelor's Degree" },
  { value: "masters", label: "Master's Degree" },
  { value: "phd", label: "PhD" },
  { value: "diploma", label: "Diploma" },
];

const programOptions = [
  { value: "masters", label: "Master's" },
  { value: "bachelors", label: "Bachelor's" },
  { value: "phd", label: "PhD" },
];

const countryOptions = [
  { value: "canada", label: "Canada" },
  { value: "usa", label: "United States" },
  { value: "uk", label: "United Kingdom" },
  { value: "australia", label: "Australia" },
];

const budgetOptions = [
  { value: "20-40", label: "$20,000 - $40,000" },
  { value: "40-60", label: "$40,000 - $60,000" },
  { value: "60-75", label: "$60,000 - $75,000" },
  { value: "75+", label: "$75,000+" },
];

const intakeOptions = [
  { value: "fall2024", label: "Fall 2024" },
  { value: "spring2025", label: "Spring 2025" },
  { value: "fall2025", label: "Fall 2025" },
];

export default function ProfileSetupPage() {
  const [formData, setFormData] = useState<FormData>({
    firstName: "John",
    lastName: "Doe",
    email: "nn@student.com",
    phone: "+1-555-0123",
    dateOfBirth: "05/15/1998",
    nationality: "us",
    educationLevel: "bachelors",
    institution: "State University",
    major: "Computer Science",
    gpa: "3.7",
    ieltsScore: "7.5",
    desiredProgram: "masters",
    preferredCountry: "canada",
    budgetRange: "60-75",
    preferredIntake: "fall2024",
  });

  const [isSaving, setIsSaving] = useState(false);
  const [progress, setProgress] = useState(0);

  // Calculate profile completion
  useEffect(() => {
    const fields = Object.values(formData);
    const filledFields = fields.filter((field) => field.trim() !== "").length;
    const percentage = Math.round((filledFields / fields.length) * 100);
    setProgress(percentage);
  }, [formData]);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      console.log("Saving profile:", formData);
      setIsSaving(false);
      // Show success message
    }, 1500);
  };

  const handleCancel = () => {
    console.log("Cancelled");
    // Reset form or navigate away
  };

  return (
    <DocumentLayout>
    <div className="pt-10"></div>
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Profile Setup" },
        ]}
      />

      {/* Page Header */}
      <PageHeader
        title="Profile Setup"
        description="Complete your personal and academic information"
        completionPercentage={progress}
      />

      {/* Progress Bar */}
      <ProfileProgressBar percentage={progress} />

      {/* Form Sections */}
      <div className="space-y-6">
        {/* Personal Information & Academic Information - Side by Side on Desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Personal Information */}
          <FormSectionCard
            title="Personal Information"
            description="Basic personal details"
          >
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormInput
                  label="First Name"
                  value={formData.firstName}
                  onChange={(value) => handleInputChange("firstName", value)}
                  required
                />
                <FormInput
                  label="Last Name"
                  value={formData.lastName}
                  onChange={(value) => handleInputChange("lastName", value)}
                  required
                />
              </div>

              <FormInput
                label="Email Address"
                type="email"
                value={formData.email}
                onChange={(value) => handleInputChange("email", value)}
                required
              />

              <FormInput
                label="Phone Number"
                type="tel"
                value={formData.phone}
                onChange={(value) => handleInputChange("phone", value)}
                required
              />

              <FormInput
                label="Date of Birth"
                type="text"
                value={formData.dateOfBirth}
                onChange={(value) => handleInputChange("dateOfBirth", value)}
                placeholder="MM/DD/YYYY"
                required
              />

              <FormSelect
                label="Nationality"
                value={formData.nationality}
                onChange={(value) => handleInputChange("nationality", value)}
                options={nationalityOptions}
                required
              />
            </div>
          </FormSectionCard>

          {/* Academic Information */}
          <FormSectionCard
            title="Academic Information"
            description="Current education and qualifications"
          >
            <div className="space-y-4">
              <FormSelect
                label="Current Education Level"
                value={formData.educationLevel}
                onChange={(value) => handleInputChange("educationLevel", value)}
                options={educationLevelOptions}
                required
              />

              <FormInput
                label="Institution Name"
                value={formData.institution}
                onChange={(value) => handleInputChange("institution", value)}
                required
              />

              <FormInput
                label="Major/Field of Study"
                value={formData.major}
                onChange={(value) => handleInputChange("major", value)}
                required
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormInput
                  label="GPA (4.0 scale)"
                  type="text"
                  value={formData.gpa}
                  onChange={(value) => handleInputChange("gpa", value)}
                  placeholder="3.5"
                  required
                />
                <FormInput
                  label="IELTS Score"
                  type="text"
                  value={formData.ieltsScore}
                  onChange={(value) => handleInputChange("ieltsScore", value)}
                  placeholder="7.0"
                  required
                />
              </div>
            </div>
          </FormSectionCard>
        </div>

        {/* Study Preferences - Full Width */}
        <FormSectionCard
          title="Study Preferences"
          description="Your preferences for future studies"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <FormSelect
              label="Desired Program"
              value={formData.desiredProgram}
              onChange={(value) => handleInputChange("desiredProgram", value)}
              options={programOptions}
              required
            />

            <FormSelect
              label="Preferred Country"
              value={formData.preferredCountry}
              onChange={(value) =>
                handleInputChange("preferredCountry", value)
              }
              options={countryOptions}
              required
            />

            <FormSelect
              label="Budget Range (USD)"
              value={formData.budgetRange}
              onChange={(value) => handleInputChange("budgetRange", value)}
              options={budgetOptions}
              required
            />

            <FormSelect
              label="Preferred Intake"
              value={formData.preferredIntake}
              onChange={(value) => handleInputChange("preferredIntake", value)}
              options={intakeOptions}
              required
            />
          </div>
        </FormSectionCard>

        {/* Form Actions */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
          <FormActions
            onCancel={handleCancel}
            onSave={handleSave}
            loading={isSaving}
          />
        </div>
      </div>
    </div>
    </DocumentLayout>
  );
}