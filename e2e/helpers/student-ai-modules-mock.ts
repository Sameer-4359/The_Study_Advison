import type { Page, Route } from "@playwright/test";

const corsHeaders: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

function isBackend4000(url: URL): boolean {
  const h = url.hostname;
  const p = url.port || (url.protocol === "https:" ? "443" : "80");
  return (
    (h === "localhost" || h === "127.0.0.1") &&
    (p === "4000" || p === "4010")
  );
}

function baseUniversity(
  id: number,
  name: string,
  country: string,
): Record<string, unknown> {
  const now = new Date().toISOString();
  return {
    id,
    name,
    country,
    world_ranking: 50,
    acceptance_rate: 0.25,
    website: "https://example.edu",
    description: "E2E fixture university.",
    min_gpa: 2.5,
    min_ielts: 6.0,
    min_toefl: null,
    min_gre: null,
    min_gmat: null,
    min_experience_years: 0,
    program_name: "MSc Computer Science",
    program_level: "MASTERS",
    program_type: null,
    program_duration_months: 24,
    tuition_fee_usd: 32000,
    scholarship_available: true,
    avg_scholarship_percentage: 10,
    fields_offered: ["Computer Science"],
    requires_portfolio: false,
    requires_research_proposal: false,
    requires_interview: false,
    application_deadline: null,
    intake_seasons: ["Fall"],
    graduation_rate: null,
    employment_rate_6_months: null,
    avg_starting_salary_usd: null,
    created_at: now,
    updated_at: null,
  };
}

/** Ordered by backend: rank #1 = Alpha (highest final_score). */
export function buildRecommendationFixture() {
  const alpha = baseUniversity(501, "E2E Alpha University", "Canada");
  const beta = baseUniversity(502, "E2E Beta University", "Zambia");
  return {
    recommendations: [
      {
        university: alpha,
        match_score: 0.88,
        eligibility_score: 0.9,
        similarity_score: 0.86,
        final_score: 0.92,
        reasons: ["Strong academic alignment with E2E profile."],
      },
      {
        university: beta,
        match_score: 0.62,
        eligibility_score: 0.7,
        similarity_score: 0.65,
        final_score: 0.71,
        reasons: ["Regional preference match for E2E."],
      },
    ],
    total_considered: 120,
    algorithm_version: "e2e-mock-v1",
    processing_time_ms: 42,
  };
}

export type StudentAiMockOptions = {
  /** Artificial delay before fulfilling recommendations POST (ms). */
  recommendationDelayMs?: number;
  /** Artificial delay before fulfilling SOP generate POST (ms). */
  generateLetterDelayMs?: number;
};

const E2E_SOP_LETTER_MARKER =
  "E2E_SOP_LETTER: This is a deterministic mock SOP paragraph for automated testing. It contains no markdown headings and validates that the review tab receives the model output contract.";

export { E2E_SOP_LETTER_MARKER };

async function fulfillJson(
  route: Route,
  body: unknown,
  status = 200,
  extraHeaders?: Record<string, string>,
) {
  await route.fulfill({
    status,
    headers: {
      ...corsHeaders,
      "Content-Type": "application/json",
      ...extraHeaders,
    },
    body: JSON.stringify(body),
  });
}

/**
 * Mocks:
 * - Recommendation service on port 4000/4010: POST /api/recommendations, GET /api/universities
 * - Main API: GET /api/student/sop (empty list for fast load)
 * - Next route: POST /api/demo/generate-motivation-letter (deterministic letter + optional delay)
 */
export async function installStudentAiModuleMocks(
  page: Page,
  options: StudentAiMockOptions = {},
) {
  const browseUniversitiesFixture = [
    baseUniversity(601, "E2E Browse University One", "Germany"),
    baseUniversity(602, "E2E Browse University Two", "France"),
  ];

  await page.route("**/*", async (route) => {
    const req = route.request();
    const url = new URL(req.url());
    const method = req.method();

    const path = url.pathname;

    if (path === "/api/demo/generate-motivation-letter" && method === "POST") {
      const ms = options.generateLetterDelayMs ?? 0;
      if (ms > 0) {
        await new Promise((r) => setTimeout(r, ms));
      }
      await fulfillJson(route, { letter: E2E_SOP_LETTER_MARKER });
      return;
    }

    if (!isBackend4000(url)) {
      await route.continue();
      return;
    }

    if (method === "OPTIONS") {
      await route.fulfill({ status: 204, headers: corsHeaders });
      return;
    }

    if (path === "/api/student/sop" && method === "GET") {
      await fulfillJson(route, { sops: [] });
      return;
    }

    if (path === "/api/recommendations" && method === "POST") {
      const ms = options.recommendationDelayMs ?? 0;
      if (ms > 0) {
        await new Promise((r) => setTimeout(r, ms));
      }
      await fulfillJson(route, buildRecommendationFixture());
      return;
    }

    if (
      path === "/api/universities" ||
      path.startsWith("/api/universities?")
    ) {
      if (method === "GET") {
        await fulfillJson(route, browseUniversitiesFixture);
        return;
      }
    }

    await route.continue();
  });
}
