import { test, expect } from "@playwright/test";
import { seedStudentSession } from "./helpers/backend-mock";
import {
  installStudentAiModuleMocks,
  buildRecommendationFixture,
} from "./helpers/student-ai-modules-mock";

test.beforeEach(async ({ page }) => {
  await seedStudentSession(page);
  await installStudentAiModuleMocks(page, { recommendationDelayMs: 120 });
});

test.describe("University recommendation module", () => {
  test("loads recommendations, shows ranked match scores, and filters by search", async ({
    page,
  }, testInfo) => {
    await page.goto("/university-recommendations");
    await expect(
      page.getByRole("heading", { name: "University Recommendations" }),
    ).toBeVisible();
    await expect(page.getByRole("heading", { name: "Your Profile" })).toBeVisible(
      { timeout: 15_000 },
    );

    const t0 = Date.now();
    await page.getByRole("button", { name: "Get Recommendations" }).click();

    await expect(page.getByText("92% Match")).toBeVisible();
    await expect(page.getByText("71% Match")).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "E2E Alpha University" }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "E2E Beta University" }),
    ).toBeVisible();

    const orderedNames = await page
      .getByRole("heading", { level: 3 })
      .filter({ hasText: /^E2E (Alpha|Beta) University$/ })
      .allTextContents();
    expect(orderedNames).toEqual([
      "E2E Alpha University",
      "E2E Beta University",
    ]);

    const fixture = buildRecommendationFixture();
    await expect(
      page.getByText(
        `Match with ${fixture.total_considered} universities`,
      ),
    ).toBeVisible();

    const elapsed = Date.now() - t0;
    await testInfo.attach("recommendation-roundtrip-ms.json", {
      body: JSON.stringify({
        clientRoundtripMs: elapsed,
        mockedServerProcessingMs: fixture.processing_time_ms,
        algorithmVersion: fixture.algorithm_version,
      }),
      contentType: "application/json",
    });
    expect(elapsed).toBeLessThan(20_000);

    const search = page.getByPlaceholder(
      "Customize your search with search criteria",
    );
    await search.fill("Zambia");

    await expect(
      page.getByRole("heading", { name: "E2E Beta University" }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "E2E Alpha University" }),
    ).toHaveCount(0);
  });

  test("browse tab loads catalog from same recommendation service base", async ({
    page,
  }) => {
    await page.goto("/university-recommendations");
    await page.getByRole("button", { name: "Browse All" }).click();
    await expect(
      page.getByRole("heading", { name: "E2E Browse University One" }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "E2E Browse University Two" }),
    ).toBeVisible();
  });
});
