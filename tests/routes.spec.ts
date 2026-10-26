import { test, expect } from "@playwright/test";

const routes = [
  "/dashboard",
  "/dashboard/inventory",
  "/dashboard/products",
  "/dashboard/orders",
  "/dashboard/payments",
  "/dashboard/reports",
  "/dashboard/analytics",
  "/dashboard/settings",
];

for (const route of routes) {
  test(`route ${route} renders without runtime errors`, async ({ page }) => {
    const errors: string[] = [];

    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });

    await page.goto(`http://localhost:3000${route}`, { waitUntil: "networkidle" });
    await page.waitForTimeout(1500);

    const categoryTrigger = page.locator('[data-slot="dropdown-menu-trigger"]').first();
    if (await categoryTrigger.isVisible().catch(() => false)) {
      await categoryTrigger.click().catch(() => undefined);
      await page.waitForTimeout(300);
      await page.keyboard.press("Escape").catch(() => undefined);
    }

    expect(errors, `Console/page errors on ${route}:\n${errors.join("\n")}`).toEqual([]);
  });
}
