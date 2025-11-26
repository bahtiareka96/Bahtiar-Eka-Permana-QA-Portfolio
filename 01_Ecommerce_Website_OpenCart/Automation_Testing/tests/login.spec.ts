import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/')
    await expect(page).toHaveTitle('Swag Labs')
})

test('Login using correct user', async ({ page }) => {
    await page.getByPlaceholder('Username').fill('standard_user')
    await page.getByPlaceholder('password').fill('secret_sauce')
    await page.locator('[data-test="login-button"]').click()
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')
})

test('Login using incorrect username', async ({ page }) => {
    await page.getByPlaceholder('Username').fill('standard_failed')
    await page.getByPlaceholder('password').fill('secret_sauce')
    await page.locator('[data-test="login-button"]').click()
    await expect(page.locator('[data-test="error"]')).toContainText('Epic sadface: Username and password do not match any user in this service')
})

test('Login using incorrect password', async ({ page }) => {
    await page.getByPlaceholder('Username').fill('standard_failed')
    await page.getByPlaceholder('password').fill('secret_failed')
    await page.locator('[data-test="login-button"]').click()
    await expect(page.locator('[data-test="error"]')).toContainText('Epic sadface: Username and password do not match any user in this service')
})

test('Logout', async ({ page }) => {
    await page.getByPlaceholder('Username').fill('standard_user')
    await page.getByPlaceholder('password').fill('secret_sauce')
    await page.locator('[data-test="login-button"]').click()
    await page.locator('//*[@id="react-burger-menu-btn"]').click()
    await page.locator('//*[@id="logout_sidebar_link"]').click()
    await expect(page).toHaveTitle('Swag Labs')
})
