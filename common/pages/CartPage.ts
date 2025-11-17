import { expect, Page } from '@playwright/test';

export class CartPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async validateCartIsEmpty() { // Проверка, что корзина пуста
    const cartList = this.page.locator('[data-test="inventory-item"]');
    await expect(cartList).toHaveCount(0);
  }

  async validateCartIsNotEmptyFor1item() { // Проверка, что корзина не пуста для 1 товара
    await expect(this.page).toHaveURL('https://www.saucedemo.com/cart.html');
    const cartList = this.page.locator('[data-test="inventory-item"]');
    await expect(cartList).toHaveCount(1);
    await expect(this.page.locator('[data-test="inventory-item-name"]')).toBeVisible(); // Название товара
    const removeButtons = this.page.getByText('Remove')
    await expect(removeButtons).toHaveCount(1);
  }

  async validateCartIsNotEmptyFor2items() { // Проверка, что корзина не пуста для 2 товаров
    await expect(this.page).toHaveURL('https://www.saucedemo.com/cart.html');
    const cartList = this.page.locator('[data-test="inventory-item"]');
    await expect(cartList).toHaveCount(2);
    const removeButtons = this.page.getByText('Remove')
    await expect(removeButtons).toHaveCount(2);

    // Проверяем, что элементы видны
    await expect(cartList.first()).toBeVisible();
    await expect(cartList.last()).toBeVisible();
    await expect(removeButtons.first()).toBeVisible();
    await expect(removeButtons.last()).toBeVisible();
  }

  async clickToRemove(pos: number) { // Кнопка Remove в корзине 
    await this.page.getByText('Remove').nth(pos).click();
  }

  async clickToContinueShopping() { // Кнопка Continue Shopping в корзине
    await this.page.locator('[data-test="continue-shopping"]').click();
  }

  async clickToCheckout() { // Кнопка Checkout в корзине
    await this.page.locator('[data-test="checkout"]').click();
  }
}

