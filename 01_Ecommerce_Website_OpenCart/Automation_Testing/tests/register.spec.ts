import { test, expect } from '@playwright/test';

test('Register new user (sample)', async ({ page }) => {
  await page.goto('https://demo.opencart.com/');
  await page.getByRole('link', { name: 'My Account' }).click();
  await page.getByRole('link', { name: 'Register' }).click();
  await page.getByLabel('First Name').fill('Test');
  await page.getByLabel('Last Name').fill('User');
  await page.getByLabel('E-Mail').fill('testuser+1@example.com');
  await page.getByLabel('Telephone').fill('081234567890');
  await page.getByLabel('Password').fill('Password123');
  await page.getByLabel('Password Confirm').fill('Password123');
  await page.getByLabel('Subscribe').check();
  await page.getByRole('button', { name: 'Continue' }).click();
  await expect(page.getByText('Your Account Has Been Created!')).toBeVisible();
});