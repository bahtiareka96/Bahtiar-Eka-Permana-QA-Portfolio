import { expect, Page } from '@playwright/test';

export async function addItemToCart(page: Page, buttonId: string) {
  const locator = page.locator(`[id="${buttonId}"]`);
  await locator.scrollIntoViewIfNeeded();
  await locator.click();
}

export async function validateBadge(page: Page, expected: number) {
  await expect(page.locator('.shopping_cart_badge')).toHaveText(String(expected));
}