import { expect, Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('https://www.saucedemo.com/');
  }

  async expectToStayOnThisPage() {
    await this.page.waitForURL('https://www.saucedemo.com/')
    await expect(this.page).toHaveURL('https://www.saucedemo.com/');
  }

  async fillLoginForm(username: string, password: string) { // Ввод логина/пароля
    await this.page.locator('[data-test="username"]').fill(username);
    await this.page.locator('[data-test="password"]').fill(password);
  }

  async clickToLogIn() { // Кнопка Login
    await this.page.locator('[data-test="login-button"]').click();
  }

  async standardLogin(username = 'standard_user', password = 'secret_sauce') {
    await this.goto();
    await this.fillLoginForm(username, password);
    await this.clickToLogIn();
  }
}
