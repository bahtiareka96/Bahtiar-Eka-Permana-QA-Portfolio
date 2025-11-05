import { test, expect } from '@playwright/test';

test('Login with valid credentials', async ({ page }) => {
  await page.goto('https://demo.opencart.com/');
  await page.getByRole('link', { name: 'My Account' }).click();
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByLabel('E-Mail').fill('testuser@example.com');
  await page.getByLabel('Password').fill('Password123');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page).toHaveURL(/account/);
});