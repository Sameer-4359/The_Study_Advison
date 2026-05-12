import type { Page, Route } from "@playwright/test";

const completionPayload = {
  status: "success",
  completionPercentage: 40,
  completedFields: [] as string[],
  missingFields: ["firstName"],
  profileSummary: {
    personalInfoCompleted: false,
    academicInfoCompleted: false,
    preferencesCompleted: false,
  },
};

const countriesPayload = {
  status: "success",
  countries: ["Canada", "Pakistan", "United States"],
};

const educationLevelsPayload = {
  status: "success",
  educationLevels: [
    { value: "HIGH_SCHOOL", label: "High School" },
    { value: "BACHELORS", label: "Bachelor's Degree" },
    { value: "MASTERS", label: "Master's Degree" },
    { value: "PHD", label: "PhD/Doctorate" },
  ],
};

const programsBachelorsPayload = {
  status: "success",
  programs: [
    { value: "MASTERS", label: "Master's Degree" },
    { value: "MBA", label: "MBA" },
  ],
};

function isApiHost(url: URL): boolean {
  const port = url.port || (url.protocol === "https:" ? "443" : "80");
  return (
    (url.hostname === "localhost" || url.hostname === "127.0.0.1") &&
    port === "4000"
  );
}

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

async function fulfillAuthLogin(route: Route) {
  const method = route.request().method();
  if (method === "OPTIONS") {
    await route.fulfill({ status: 204, headers: corsHeaders });
    return;
  }
  if (method !== "POST") {
    await route.continue();
    return;
  }
  await route.fulfill({
    status: 200,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
    body: JSON.stringify({
      token: "e2e-mock-jwt",
      user: {
        id: "1",
        fullName: "E2E Student",
        email: "student@e2e.test",
        role: "student",
        paymentStatus: "paid",
      },
    }),
  });
}

/** Mock POST …/api/auth/login (match on full URL — CORS + host-safe). */
export async function mockAuthLoginSuccess(page: Page) {
  await page.route(/auth\/login/i, async (route) => {
    const url = new URL(route.request().url());
    const okHost =
      url.host === "localhost:4000" ||
      url.host === "127.0.0.1:4000" ||
      ((url.hostname === "localhost" || url.hostname === "127.0.0.1") &&
        url.port === "4000");
    if (!okHost || !/\/api\/auth\/login\/?$/.test(url.pathname)) {
      await route.continue();
      return;
    }
    await fulfillAuthLogin(route);
  });
}

/** Mock profile + dropdown APIs for /profile-setup (no real backend). */
export async function mockProfileApis(page: Page) {
  let storedProfile: Record<string, unknown> | null = null;

  await page.route("**/api/**", async (route) => {
    const url = new URL(route.request().url());
    if (!isApiHost(url)) {
      await route.continue();
      return;
    }

    const path = url.pathname;
    const method = route.request().method();

    if (method === "OPTIONS") {
      await route.fulfill({ status: 204, headers: corsHeaders });
      return;
    }

    if (path === "/api/profile/completion" && method === "GET") {
      await route.fulfill({
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        body: JSON.stringify(completionPayload),
      });
      return;
    }

    if (path === "/api/profile/countries" && method === "GET") {
      await route.fulfill({
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        body: JSON.stringify(countriesPayload),
      });
      return;
    }

    if (path === "/api/profile/education-levels" && method === "GET") {
      await route.fulfill({
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        body: JSON.stringify(educationLevelsPayload),
      });
      return;
    }

    if (path === "/api/profile/programs" && method === "GET") {
      await route.fulfill({
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        body: JSON.stringify(programsBachelorsPayload),
      });
      return;
    }

    if (path === "/api/profile" && method === "GET") {
      await route.fulfill({
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        body: JSON.stringify({
          status: "success",
          message: "ok",
          profile: storedProfile,
        }),
      });
      return;
    }

    if (path === "/api/profile" && method === "PUT") {
      const body = route.request().postDataJSON() as Record<string, unknown>;
      storedProfile = {
        id: 1,
        userId: 1,
        firstName: body.firstName,
        lastName: body.lastName,
        phoneNumber: body.phoneNumber,
        dateOfBirth: body.dateOfBirth
          ? `${String(body.dateOfBirth).split("T")[0]}T00:00:00.000Z`
          : null,
        nationality: body.nationality,
        gender: body.gender,
        currentEducationLevel: body.currentEducationLevel,
        institutionName: body.institutionName,
        fieldOfStudy: body.fieldOfStudy,
        ieltsScore: body.ieltsScore,
        cgpa: body.cgpa,
        academicYear: body.academicYear,
        desiredProgram: body.desiredProgram,
        preferredCountry: body.preferredCountry,
        budgetRangeMin: body.budgetRangeMin,
        budgetRangeMax: body.budgetRangeMax,
        preferredIntake: body.preferredIntake,
        studyMode: body.studyMode,
      };
      await route.fulfill({
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        body: JSON.stringify({
          status: "success",
          message: "Profile updated successfully",
          profile: storedProfile,
        }),
      });
      return;
    }

    await route.continue();
  });
}

export async function seedStudentSession(page: Page) {
  await page.addInitScript(() => {
    window.localStorage.setItem("token", "e2e-mock-jwt");
    window.localStorage.setItem(
      "user",
      JSON.stringify({
        id: "1",
        fullName: "E2E Student",
        email: "student@e2e.test",
        role: "student",
        paymentStatus: "paid",
      }),
    );
  });
}
