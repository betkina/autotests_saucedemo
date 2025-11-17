import { test, expect } from '@playwright/test';
import { LoginPage } from '../common/pages/LoginPage';

test.describe('Check Login', () => {
  test('Standard user successful login', async ({ page }) => { // Успешная авторизация с корректными данными standard_user
    // Авторизация 
    const loginPage = new LoginPage(page);
    await loginPage.standardLogin();

    // Проверка перехода после успешной авторизации на https://www.saucedemo.com/inventory.html 
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

    // Подтверждение загрузки каталога товаров
    const inventoryItems = page.locator('.inventory_item');
    await expect(inventoryItems).not.toHaveCount(0);
  });

  test('Standard user unsuccessful login', async ({ page }) => { // Неуспешная авторизация с некорректными данными standard_user
    // Авторизация
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.fillLoginForm('standard_user', 'qwerty');
    await loginPage.clickToLogIn();

    // Проверка, что остались на текущей странице, и появилась ошибка
    await loginPage.expectToStayOnThisPage();
    await expect(page.getByText('Epic sadface: Username and password do not match any user in this service')).toBeVisible();
  });

  test('Locked out user unsuccessful login', async ({ page }) => { // Неуспешная авторизация с корректными данными locked_out_user
    // Авторизация
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.fillLoginForm('locked_out_user', 'secret_sauce');
    await loginPage.clickToLogIn();

    // Проверка, что остались на текущей странице, и появилась ошибка
    await loginPage.expectToStayOnThisPage();
    await expect(page.getByText('Epic sadface: Sorry, this user has been locked out.')).toBeVisible();
  });

  test('Performance glitch user successful login with delay', async ({ page }) => { // Успешная авторизация с корректными данными perfomance_glitch_user, но при запросе сервер отвечает с задержкой 
    // Авторизация
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.fillLoginForm('performance_glitch_user', 'secret_sauce');
    await loginPage.clickToLogIn();

    // Проверка перехода после успешной авторизации на https://www.saucedemo.com/inventory.html 
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

    // Подтверждение загрузки каталога товаров
    const inventoryItems = page.locator('.inventory_item');
    await expect(inventoryItems).not.toHaveCount(0);
  });
});

