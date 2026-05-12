import { test, expect } from "@playwright/test";
import { seedStudentSession } from "./helpers/backend-mock";
import { installStudentAiModuleMocks } from "./helpers/student-ai-modules-mock";

test.beforeEach(async ({ page }) => {
  await seedStudentSession(page);
  await installStudentAiModuleMocks(page, { generateLetterDelayMs: 80 });
});

test.describe("AI SOP writer module", () => {
  test("fills the form, generates SOP via demo API, and shows review content", async ({
    page,
  }, testInfo) => {
    await page.goto("/ai-sop-writer");
    await expect(
      page.getByRole("heading", { name: "AI SOP Writer" }),
    ).toBeVisible();

    await page.getByPlaceholder("John Doe").fill("E2E Test Student");
    await page.getByPlaceholder("Germany").fill("Canada");
    await page.getByPlaceholder("Technical University").fill("E2E Institute");
    await page.getByPlaceholder("MSc Computer Science").fill("MSc AI");
    await page
      .getByPlaceholder("Write 3–5 lines about motivation and fit…")
      .fill("I want to specialize in applied machine learning and robotics.");
    await page
      .getByPlaceholder("Mention relevant courses, labs, professors, etc…")
      .fill("Advanced ML, robotics lab, and research seminars.");
    await page
      .getByPlaceholder("Projects, awards, leadership, impact…")
      .fill("Led a student robotics club and completed two internships.");
    await page
      .getByPlaceholder("Short-term and long-term goals…")
      .fill("Short-term: graduate research. Long-term: R&D roles in industry.");

    const t0 = Date.now();
    await page.getByRole("button", { name: "Generate SOP" }).click();

    await expect(
      page.getByRole("heading", { name: "Review & Edit" }),
    ).toBeVisible({ timeout: 15_000 });
    const draft = page.locator("textarea").last();
    await expect(draft).toHaveValue(/E2E_SOP_LETTER:/);

    const elapsed = Date.now() - t0;
    await testInfo.attach("sop-generate-roundtrip-ms.json", {
      body: JSON.stringify({
        clientRoundtripMs: elapsed,
        note: "Includes mocked network delay; real Gemini latency would be higher.",
      }),
      contentType: "application/json",
    });
    expect(elapsed).toBeLessThan(20_000);

    await expect(
      page.getByRole("heading", { name: "Review & Edit" }),
    ).toBeVisible();
    await expect(page.getByRole("button", { name: "Copy SOP" })).toBeVisible();
  });
});
