import { test, expect } from '@playwright/test';

test('Add product to cart', async ({ page }) => {
  await page.goto('https://demo.opencart.com/');
  await page.getByRole('link', { name: 'Desktops' }).click();
  await page.getByRole('link', { name: 'Mac' }).click();
  // open first product
  await page.locator('.product-thumb').first().getByRole('link').click();
  await page.getByRole('button', { name: 'Add to Cart' }).click();
  await expect(page.locator('#cart')).toContainText('1 item');
});