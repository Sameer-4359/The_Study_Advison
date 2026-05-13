export const RECOMMENDATION_COUNTRIES = ["USA", "UK", "Germany", "France", "Italy"];

export const RECOMMENDATION_FIELDS = [
  "Computer Science",
  "Medical",
  "Law",
  "Business",
  "Engineering",
];

export const RECOMMENDATION_PROGRAM_LEVELS = [
  { value: "Bachelors", label: "Bachelor's" },
  { value: "Masters", label: "Master's" },
];

export const RECOMMENDATION_INTAKES = ["Fall", "Spring", "Summer", "Winter"];

export const RECOMMENDATION_STUDY_MODES = [
  "Full-Time",
  "Part-Time",
  "Online",
  "Hybrid",
];

export function normalizeRecommendationCountry(value?: string | null): string {
  const normalized = String(value || "").trim().toLowerCase();

  if (["usa", "us", "united states", "united states of america"].includes(normalized)) {
    return "USA";
  }

  if (["uk", "united kingdom", "great britain", "britain"].includes(normalized)) {
    return "UK";
  }

  const match = RECOMMENDATION_COUNTRIES.find(
    (country) => country.toLowerCase() === normalized,
  );

  return match || "";
}

export function normalizeRecommendationProgramLevel(
  value?: string | null,
): string {
  const normalized = String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[_\s-]+/g, "");

  if (["bachelor", "bachelors", "bachelor's"].includes(normalized)) {
    return "Bachelors";
  }

  if (["master", "masters", "master's", "researchmasters", "mba"].includes(normalized)) {
    return "Masters";
  }

  return "";
}

export function normalizeRecommendationField(value?: string | null): string {
  const normalized = String(value || "").trim().toLowerCase();

  if (["medicine", "medical", "health sciences", "health science"].includes(normalized)) {
    return "Medical";
  }

  if (["business administration", "business", "management", "finance"].includes(normalized)) {
    return "Business";
  }

  const match = RECOMMENDATION_FIELDS.find(
    (field) => field.toLowerCase() === normalized,
  );

  return match || "";
}
