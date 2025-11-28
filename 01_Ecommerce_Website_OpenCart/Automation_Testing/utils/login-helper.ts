import { expect, Page } from '@playwright/test';

export async function login(page: Page, username: string, password: string) {
  await page.goto('https://www.saucedemo.com');
  await page.fill('#user-name', username);
  await page.fill('#password', password);
  await page.locator('[data-test="login-button"]').click();
}

export async function validateLogin(page: Page, expected: string) {
  const errorLocator = page.locator('[data-test="error"]');

  switch (expected) {
    case 'success':
      await expect(page).toHaveURL(/inventory/);
      break;

    case 'locked':
      await expect(errorLocator).toContainText('locked out');
      break;

    case 'error':
      await expect(errorLocator).toBeVisible();
      break;

    // default:
    //   throw new Error(`Unknown expected result: ${expected}`);
  }
}
