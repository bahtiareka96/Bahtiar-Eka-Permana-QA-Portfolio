import { expect, Page } from '@playwright/test';

export async function addItemToCart(page: Page, buttonId: string) {
  await page.locator(`#${buttonId}`).click();
}

export async function validateBadge(page: Page, expected: number) {
  const badgeLocator = page.locator('.shopping_cart_badge');
  await expect(badgeLocator).toHaveText(String(expected));
}