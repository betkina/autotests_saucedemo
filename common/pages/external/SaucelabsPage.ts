import { expect, Page } from '@playwright/test';

export class SauceLabsPage {
    private readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async validateURL() {
        await this.page.waitForURL('https://saucelabs.com/');
        await expect(this.page).toHaveURL('https://saucelabs.com/');
    }
}