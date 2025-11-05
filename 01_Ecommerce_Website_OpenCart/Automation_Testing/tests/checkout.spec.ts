import { test, expect } from '@playwright/test';

test('Checkout as guest (sample)', async ({ page }) => {
  await page.goto('https://demo.opencart.com/');
  // Add first product to cart
  await page.locator('.product-thumb').first().getByRole('link').click();
  await page.getByRole('button', { name: 'Add to Cart' }).click();
  await page.getByRole('link', { name: 'Checkout' }).click();
  // Due to demo limitations, validate presence of checkout steps
  await expect(page.getByText('Checkout Options')).toBeVisible();
});