import { test, expect } from "@playwright/test";
import { mockAuthLoginSuccess } from "./helpers/backend-mock";

test.describe("Login", () => {
  test("shows validation when fields are empty", async ({ page }) => {
    await page.goto("/login");
    await page.getByRole("button", { name: /Access Dashboard/i }).click();
    await expect(
      page.getByText("Email and password are required."),
    ).toBeVisible();
  });

  test("successful login navigates to student dashboard (API mocked)", async ({
    page,
  }) => {
    await mockAuthLoginSuccess(page);
    await page.goto("/login");
    await page.getByPlaceholder("Enter your email").fill("student@e2e.test");
    await page.getByPlaceholder("Enter password").fill("any-password");
    await page.getByRole("button", { name: /Access Dashboard/i }).click();
    await expect(page.getByText("Welcome back!")).toBeVisible({
      timeout: 20_000,
    });
    await expect
      .poll(async () => page.evaluate(() => window.localStorage.getItem("token")), {
        timeout: 10_000,
      })
      .not.toBeNull();
  });
});
