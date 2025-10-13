// data/studyPreferencesData.ts
export const studyPreferencesData = {
  title: "Study Preferences",
  description: "Your preferences for future studies",
  fields: {
    program: {
      label: "Desired Program",
      placeholder: "Select",
      options: ["Undergraduate", "Master’s", "PhD"],
    },
    country: {
      label: "Preferred Country",
      placeholder: "Select country",
      options: ["Canada", "Germany", "United States", "Australia"],
    },
    budget: {
      label: "Budget Range (USD)",
      placeholder: "Select budget",
      options: [
        "$10,000 - $25,000",
        "$25,000 - $50,000",
        "$50,000 - $75,000",
        "$75,000 - $100,000",
      ],
    },
    intake: {
      label: "Preferred Intake",
      placeholder: "Select intake",
      options: ["Spring 2025", "Fall 2025", "Winter 2026"],
    },
  },
};
