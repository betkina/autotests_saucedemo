import { expect, Page } from '@playwright/test';

export class NavigationMenuPanel {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async clickToMenu() { // Раскрытие меню
    await this.page.locator('[id="react-burger-menu-btn"]').click();
  }

  async clickToAllItems() { // Клик на раздел All Items в меню
    await this.page.locator('[data-test="inventory-sidebar-link"]').click();
  }

  async clickToAbout() { // Клик на раздел About в меню
    await this.page.locator('[data-test="about-sidebar-link"]').click();
  }

  async clickToResetAppState() { // Клик на Reset App State в меню
    await this.page.locator('[data-test="reset-sidebar-link"]').click();
  }

  async clickToCloseButton() { // Закрытие меню
    await this.page.locator('[id="react-burger-cross-btn"]').click();
  }

  async clickToLogout() { // Выход из ЛК по кнопке Logout в меню
    await this.page.locator('[data-test="logout-sidebar-link"]').click();
  }
}