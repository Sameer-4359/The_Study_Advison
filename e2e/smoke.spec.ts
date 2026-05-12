import { test, expect } from "@playwright/test";

test.describe("Public pages", () => {
  test("home loads", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/The Study Advisor/i);
  });

  test("login page shows student login", async ({ page }) => {
    await page.goto("/login");
    await expect(
      page.getByRole("heading", { name: /Student Login/i }),
    ).toBeVisible();
    await expect(page.getByPlaceholder("Enter your email")).toBeVisible();
  });
});
