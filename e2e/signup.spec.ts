import { test, expect } from "@playwright/test";

test.describe.configure({ mode: "serial" });

test.describe("Sign up", () => {
  test("shows error when passwords do not match", async ({ page }) => {
    await page.goto("/signup");
    await page.getByPlaceholder("Your full name").fill("Test User");
    await page.getByPlaceholder("Email address").fill("newuser@e2e.test");
    const pwdInputs = page.locator('input[type="password"]');
    await pwdInputs.nth(0).fill("Secret123!");
    await pwdInputs.nth(1).fill("Different123!");
    await page.getByRole("button", { name: /Create Account/i }).click();
    await expect(page.getByText("Passwords do not match.")).toBeVisible();
  });

  test("valid form stores pending signup and opens payment step", async ({
    page,
  }) => {
    test.setTimeout(60_000);
    await page.goto("/signup");
    await page.getByPlaceholder("Your full name").fill("Test User");
    await page.getByPlaceholder("Email address").fill("newuser@e2e.test");
    const pwdInputs = page.locator('input[type="password"]');
    await pwdInputs.nth(0).fill("Secret123!");
    await pwdInputs.nth(1).fill("Secret123!");
    await page.getByRole("button", { name: /Create Account/i }).click();
    await expect
      .poll(
        async () =>
          page.evaluate(() => window.localStorage.getItem("pendingSignup")),
        { timeout: 20_000 },
      )
      .not.toBeNull();
    await expect(page).toHaveURL(/\/payment\?flow=signup/, { timeout: 25_000 });
    const pending = await page.evaluate(() =>
      window.localStorage.getItem("pendingSignup"),
    );
    expect(pending).toBeTruthy();
    const parsed = JSON.parse(pending!);
    expect(parsed.email).toBe("newuser@e2e.test");
    expect(parsed.role).toBe("student");
  });
});
