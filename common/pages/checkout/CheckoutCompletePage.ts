import { expect, Page } from '@playwright/test';

export class CheckoutCompletePage {
    readonly page: Page;
  
    constructor(page: Page) {
      this.page = page;
    }

    async validateURL() {
        await this.page.waitForURL('https://www.saucedemo.com/checkout-complete.html')
        await expect(this.page).toHaveURL('https://www.saucedemo.com/checkout-complete.html');
    }

    async clickToBackHome() { // Кнопка Back Home
        await this.page.locator('[data-test="back-to-products"]').click();
    }
}
