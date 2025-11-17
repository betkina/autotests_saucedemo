import { expect, Page } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Метод проверки URL
  async validateURL() {
    await expect(this.page).toHaveURL('https://www.saucedemo.com/inventory.html');
  }

  async expectToStayOnThisPage() {
    await this.page.waitForURL('https://www.saucedemo.com/inventory.html')
    await expect(this.page).toHaveURL('https://www.saucedemo.com/inventory.html');
  }

  async clickToFirstItemName() { // Клик на название первого товара в списке https://www.saucedemo.com/inventory.html
    await this.page.locator('[data-test="inventory-item-name"]').first().click();
  }

  async clickToAddToCart() { // Кнопка Add to cart для первого товара в списке на странице https://www.saucedemo.com/inventory.html
    await this.page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  }

  async validateAddToCartButtonVisible() { // Add to cart отображается для первого товара в списке
    await expect(this.page.locator('[data-test="add-to-cart-sauce-labs-backpack"]')).toBeVisible();
  }

  async clickToAddToCart2() { // Кнопка Add to cart для Sauce Labs Bike Light в списке на странице https://www.saucedemo.com/inventory.html
    await this.page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
  }

  async clickToRemoveFromProducts() { // Кнопка Remove для страницы https://www.saucedemo.com/inventory.html
    await this.page.locator('[data-test="remove-sauce-labs-backpack"]').click();
  }

  async clickToCart() { // Переход в корзину
    await this.page.locator('[data-test="shopping-cart-link"]').click();
  }

  async validateCartBadgeCount(count: number) { // Проверка счетчика корзины
    const cartBadge = this.page.locator('[data-test="shopping-cart-badge"]');
    await expect(cartBadge).toBeVisible();
    await expect(cartBadge).toHaveText(count.toString());
  }

  async validateCartBadgeHidden() { // Проверка, что счетчик корзины скрыт
    const cartBadge = this.page.locator('[data-test="shopping-cart-badge"]');
    await expect(cartBadge).toBeHidden();
  }
}