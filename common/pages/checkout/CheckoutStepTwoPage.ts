import { expect, Page } from '@playwright/test';

export class CheckoutStepTwoPage {
    readonly page: Page;
  
    constructor(page: Page) {
      this.page = page;
    }

    async validateURL() {
        await this.page.waitForURL('https://www.saucedemo.com/checkout-step-two.html')
        await expect(this.page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html');
    }

    async clickToFinish() { // Кнопка Finish
        await this.page.locator('[data-test="finish"]').click();
    }
}
