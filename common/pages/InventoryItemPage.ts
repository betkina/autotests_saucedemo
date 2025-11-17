import { expect, Page } from '@playwright/test';

export class InventoryItemPage {
    readonly page: Page;
  
    constructor(page: Page) {
      this.page = page;
    }

    async clickToBack() { // Кнопка Back to products в карточке товара
       await this.page.locator('[data-test="back-to-products"]').click();
    }

    async clickToAddToCart() { // Кнопка Add to cart в карточке товара
       await this.page.locator('[data-test="add-to-cart"]').click();
    }

    async validateAddToCartButtonVisible() { // Add to cart отображается для карточки товара
      await expect(this.page.locator('[data-test="add-to-cart"]')).toBeVisible();
    }  

    async clickToRemove() { // Кнопка Remove в карточке товара
       await this.page.locator('[data-test="remove"]').click();
    }
  }