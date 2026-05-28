import { expect, test } from "@playwright/test";

test("home page renders VidyaConnect content", async ({ page }) => {
  await page.goto("/home");
  await expect(page.getByText("Find your perfect teacher today.")).toBeVisible();
});
