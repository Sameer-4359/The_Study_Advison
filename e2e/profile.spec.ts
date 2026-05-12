import { test, expect, type Page } from "@playwright/test";
import {
  mockProfileApis,
  seedStudentSession,
} from "./helpers/backend-mock";

/** Profile fields use <label> without htmlFor; wrap is `div.w-full` with input or nested select. */
function labeledControl(page: Page, label: RegExp) {
  return page
    .locator("div.w-full")
    .filter({ has: page.locator("label", { hasText: label }) })
    .locator("input, select")
    .first();
}

test.describe("Profile setup", () => {
  test("user can fill profile and save (API mocked)", async ({ page }) => {
    test.setTimeout(60_000);
    await mockProfileApis(page);
    await seedStudentSession(page);

    await page.goto("/profile-setup");
    await expect(
      page.getByRole("heading", { name: "Profile Setup" }),
    ).toBeVisible({ timeout: 30_000 });

    await labeledControl(page, /^First Name/).fill("Ada");
    await labeledControl(page, /^Last Name/).fill("Lovelace");
    await labeledControl(page, /^Phone Number/).fill("+923001234567");
    await labeledControl(page, /^Date of Birth/).fill("1999-06-15");

    await labeledControl(page, /^Nationality/).selectOption({
      label: "Pakistan",
    });
    await labeledControl(page, /^Current Education Level/).selectOption({
      label: "Bachelor's Degree",
    });

    await labeledControl(page, /^Institution Name/).fill("Test University");
    await labeledControl(page, /Major.*Field of Study/).fill(
      "Computer Science",
    );
    await labeledControl(page, /^GPA/).fill("3.5");
    await labeledControl(page, /^IELTS Score/).fill("7");

    await labeledControl(page, /^Desired Program/).selectOption({
      label: "Master's Degree",
    });
    await labeledControl(page, /^Preferred Country/).selectOption({
      label: "Canada",
    });
    await labeledControl(page, /^Study Mode/).selectOption({
      label: "Full Time",
    });
    await labeledControl(page, /^Preferred Intake/).fill("Fall 2026");

    await page.getByRole("button", { name: /Save Changes/i }).click();
    await expect(page.getByText("Profile saved successfully!")).toBeVisible({
      timeout: 30_000,
    });
  });
});
