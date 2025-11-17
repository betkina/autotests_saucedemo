import { expect, Page } from '@playwright/test';

export class CheckoutStepOnePage {
    readonly page: Page;
  
    constructor(page: Page) {
      this.page = page;
    }

    async validateURL() {
        await this.page.waitForURL('https://www.saucedemo.com/checkout-step-one.html')
        await expect(this.page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html');
    }

    async clickToContinue() { // Кнопка Continue
        await this.page.locator('[data-test="continue"]').click();
    }

    async fillInformationForm(firstName: string, lastName: string, postalCode: string) { // Форма заполнения Checkout: Your Information
        await this.page.locator('[data-test="firstName"]').fill(firstName);
        await this.page.locator('[data-test="lastName"]').fill(lastName);
        await this.page.locator('[data-test="postalCode"]').fill(postalCode);
    }
}