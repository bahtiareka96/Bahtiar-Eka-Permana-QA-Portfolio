import { expect, Page } from '@playwright/test';

export async function productOverview (page:Page, id:number, name:string, price:string) {
    await page.goto(`https://www.saucedemo.com/inventory-item.html?id=${id}`);
    await expect(page.locator('.inventory_details_name')).toHaveText(name);
    await expect(page.locator('.inventory_details_price')).toHaveText(price);
}