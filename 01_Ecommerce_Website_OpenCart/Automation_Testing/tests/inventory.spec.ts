import { test, expect } from '@playwright/test';
import users from '../test-data/users.json';
import products from '../test-data/products.json';
import { productOverview } from '../utils/product-helper';
import addToCart from '../test-data/addcartbtn.json';
import { addItemToCart, validateBadge } from '../utils/addcart-helper';

const standardUser = users.users[0];

test.describe('Inventory - Standard User', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('https://www.saucedemo.com');
        await page.fill('#user-name', standardUser.username);
        await page.fill('#password', standardUser.password);
        await page.locator('[data-test="login-button"]').click();
    });

    test('Select Product (id=4)', async ({ page }) => {
        await page.locator('//*[@id="item_4_title_link"]/div').click();
        await expect(page.locator('.inventory_details_name')).toHaveText('Sauce Labs Backpack');
        await expect(page.locator('.inventory_details_price')).toHaveText('$29.99');
    });

    test('Add to cart (id=4)', async ({ page }) => {
        await page.locator('//*[@id="item_4_title_link"]/div').click();
        await page.locator('//*[@id="add-to-cart"]').click();
        await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
    });
});

test.describe('Test Item Overview - Data Driven Testing', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('https://www.saucedemo.com');
        await page.fill('#user-name', standardUser.username);
        await page.fill('#password', standardUser.password);
        await page.locator('[data-test="login-button"]').click();
    });

    for (const product of products.products) {
        test(`Validate Product ID ${product.id}`, async ({ page }) => {
            await productOverview(page, product.id, product.name, product.price);
        });
    }

});

test.describe('Add to Cart - Data Driven Testing', () => {

    let expectedBadge = 0;

    test.beforeEach(async ({ page }) => {
        expectedBadge = 0; // reset setiap test suite
        await page.goto('https://www.saucedemo.com');
        await page.fill('#user-name', standardUser.username);
        await page.fill('#password', standardUser.password);
        await page.locator('[data-test="login-button"]').click();
    });

    addToCart.add_to_cart.forEach((item, index) => {
        test(`Add item #${index + 1}: ${item.button}`, async ({ page }) => {
            await addItemToCart(page, item.button);
            expectedBadge++;
            await validateBadge(page, expectedBadge);
        });
    });

});
