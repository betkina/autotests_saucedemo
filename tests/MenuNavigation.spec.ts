import { test, expect } from '@playwright/test';
import { LoginPage } from '../common/pages/LoginPage';
import { InventoryPage } from '../common/pages/InventoryPage';
import { SauceLabsPage } from '../common/pages/external/SaucelabsPage';
import { CartPage } from '../common/pages/CartPage';
import { NavigationMenuPanel } from '../common/pages/NavigationMenuPanel';


test.describe('Burger Menu Navigation Tests from inventory.html', () => {
  test('Check All Items on https://www.saucedemo.com/inventory.html', async ({ page }) => { // Проверка, что при нажатии на All Items в меню ничего не происходит, URL остается неизменным
    // Авторизация
    const loginPage = new LoginPage(page);
    await loginPage.standardLogin();

    // Проверка перехода после успешной авторизации на https://www.saucedemo.com/inventory.html 
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.expectToStayOnThisPage();

    const navigationMenuPanel = new NavigationMenuPanel(page);

    // Раскрытие меню по нажатии на иконку
    await navigationMenuPanel.clickToMenu();

    // Нажатие на All Items в меню
    await navigationMenuPanel.clickToAllItems();

    // Проверка, что URL остался неизменным
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  });

  test('Check About redirect to saucelabs.com', async ({ page }) => { // Проверка редиректа на https://saucelabs.com/ по кнопке About
    // Авторизация 
    const loginPage = new LoginPage(page);
    await loginPage.standardLogin();

    // Проверка перехода после успешной авторизации на https://www.saucedemo.com/inventory.html 
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.expectToStayOnThisPage();

    const navigationMenuPanel = new NavigationMenuPanel(page);

    // Раскрытие меню по нажатии на иконку
    await navigationMenuPanel.clickToMenu();

    // Переход на saucelabs.com по кнопке About
    await navigationMenuPanel.clickToAbout();

    // Редирект на https://saucelabs.com/
    await expect(page).toHaveURL('https://saucelabs.com/');
  });

  test('Check Logout', async ({ page }) => { // Логаут (Logout в сайдбаре)
    // Авторизация 
    const loginPage = new LoginPage(page);
    await loginPage.standardLogin();

    // Проверка перехода после успешной авторизации на https://www.saucedemo.com/inventory.html 
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.expectToStayOnThisPage();

    const navigationMenuPanel = new NavigationMenuPanel(page);

    // Раскрытие меню по нажатии на иконку
    await navigationMenuPanel.clickToMenu();

    // Выход из ЛК
    await navigationMenuPanel.clickToLogout();

    // Редирект на https://www.saucedemo.com/
    await expect(page).toHaveURL('https://www.saucedemo.com/');

    // Вручную заходим на страницу https://www.saucedemo.com/inventory.html
    await page.goto('https://www.saucedemo.com/inventory.html');

    // Ожидаем, что снова перебросит на логин
    await expect(page).toHaveURL('https://www.saucedemo.com/');

    // Появляется сообщение об ошибке
    const error = page.locator('[data-test="error"]');
    await expect(error).toBeVisible();
    await expect(error).toHaveText(/Epic sadface: You can only access '\/inventory\.html' when you are logged in/);
  });

  test('Reset App State clears cart', async ({ page }) => { // Проверка удаления товаров из корзины при клике на Reset App State
    // Авторизация
    const loginPage = new LoginPage(page);
    await loginPage.standardLogin();

    // Проверка перехода после успешной авторизации на https://www.saucedemo.com/inventory.html 
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.expectToStayOnThisPage();

    // Добавление 1-го в списке товара в корзину
    await inventoryPage.clickToAddToCart();

    // Проверка, что счетчик корзины обновился (должно быть 1)
    await inventoryPage.validateCartBadgeCount(1);

    const navigationMenuPanel = new NavigationMenuPanel(page);

    // Раскрытие меню по нажатии на иконку
    await navigationMenuPanel.clickToMenu();

    // Удаление товаров из корзины по кнопке Reset App State в сайдбаре
    await navigationMenuPanel.clickToResetAppState();

    // Проверяем, что счетчик корзины исчез
    await inventoryPage.validateCartBadgeHidden();

    // Проверяем, что счетчик корзины исчез (сбросился)
    await inventoryPage.validateCartBadgeHidden();

    // Переходим в корзину для проверки
    await inventoryPage.clickToCart();

    // Проверяем, что в корзине нет товаров
    const cartPage = new CartPage(page);
    await cartPage.validateCartIsEmpty();

    // Явная проверка, что в корзине нет элементов с локатором inventory-item-name (товаров)
    await expect(page.locator('[data-test="inventory-item-name"]')).toHaveCount(0);
  });

  test('Check menu closing', async ({ page }) => { // Закрытие меню
    // Авторизация
    const loginPage = new LoginPage(page);
    await loginPage.standardLogin();

    // Проверка перехода после успешной авторизации на https://www.saucedemo.com/inventory.html 
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.expectToStayOnThisPage();

    const navigationMenuPanel = new NavigationMenuPanel(page);

    // Раскрытие меню по нажатии на иконку
    await navigationMenuPanel.clickToMenu();

    // Закрытие меню
    await navigationMenuPanel.clickToCloseButton();

    // Проверяем, что меню закрылось
    const menuPanel = page.locator('.bm-menu-wrap');
    await expect(menuPanel).not.toBeVisible();
  });
});

test.describe('Burger Menu Navigation Tests from PDP', () => {
  test('Check All Items on PDP', async ({ page }) => { // Проверка, что из карточки товара https://www.saucedemo.com/inventory-item.html?id=1 по клику на All Items в сайдбаре редирект на https://www.saucedemo.com/inventory.html
    // Авторизация 
    const loginPage = new LoginPage(page);
    await loginPage.standardLogin();

    // Проверка перехода после успешной авторизации на https://www.saucedemo.com/inventory.html 
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.expectToStayOnThisPage();

    // Переход в карточку товара из списка товаров 
    await inventoryPage.clickToFirstItemName();

    const navigationMenuPanel = new NavigationMenuPanel(page);

    // Раскрытие меню по нажатии на иконку
    await navigationMenuPanel.clickToMenu();

    // Нажатие на All Items в меню
    await navigationMenuPanel.clickToAllItems();

    // Редирект на https://www.saucedemo.com/inventory.html 
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  });
});
