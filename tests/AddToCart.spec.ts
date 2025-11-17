import { test, expect } from '@playwright/test';
import { LoginPage } from '../common/pages/LoginPage';
import { InventoryPage } from '../common/pages/InventoryPage';
import { CartPage } from '../common/pages/CartPage';
import { InventoryItemPage } from '../common/pages/InventoryItemPage';

test.describe('Check adding items to cart from inventory.html', () => { // Тесты на добавление товаров в корзину со страницы https://www.saucedemo.com/inventory.html 
  test('Check adding 1 item to cart', async ({ page }) => { // Добавление одного товара в корзину 
    // Авторизация
    const loginPage = new LoginPage(page);
    await loginPage.standardLogin();

    // Проверка перехода после успешной авторизации на https://www.saucedemo.com/inventory.html 
    const inventoryPage = new   InventoryPage(page);
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

    // Добавление товара в корзину со страницы https://www.saucedemo.com/inventory.html
    await inventoryPage.clickToAddToCart();

    // Проверка, что счетчик корзины показывает 1 товар
    await inventoryPage.validateCartBadgeCount(1);

    // Переходим в корзину для проверки
    await inventoryPage.clickToCart();

    // Проверка, что в корзине добавлен товар
    const cartPage = new CartPage(page);
    await cartPage.validateCartIsNotEmptyFor1item();
    
    // Явная проверка, что в корзине есть элемент с локатором inventory-item-name (товар в корзине)
    await expect(page.locator('[data-test="inventory-item-name"]')).toHaveCount(1);

    await page.screenshot({ path: 'screenshots/cart-with-1-item.png', fullPage: true });
  });

  test('Check adding 2 items to cart', async ({ page }) => { // Добавление нескольких (2) товаров в корзину 
    // Авторизация
    const loginPage = new LoginPage(page);
    await loginPage.standardLogin();

    // Проверка перехода после успешной авторизации на https://www.saucedemo.com/inventory.html 
    const inventoryPage = new InventoryPage(page);
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

    // Добавление товаров в корзину со страницы https://www.saucedemo.com/inventory.html
    await inventoryPage.clickToAddToCart2();
    await inventoryPage.clickToAddToCart();

    // Проверка, что счетчик корзины показывает 2 
    await inventoryPage.validateCartBadgeCount(2);

    // Переходим в корзину для проверки
    await inventoryPage.clickToCart();

    // Проверка, что в корзине добавлен товар
    const cartPage = new CartPage(page);
    await cartPage.validateCartIsNotEmptyFor2items();

    // Явная проверка, что в корзине есть элементы с локатором inventory-item-name (товар в корзине)
    await expect(page.locator('[data-test="inventory-item-name"]')).toHaveCount(2);

    // Скриншот в конце теста
    await page.screenshot({ path: 'screenshots/cart-with-2-items.png', fullPage: true });
  });
});

test.describe('Check adding items to cart from PDP', () => { // Тесты на добавление товаров в корзину из PDP
  test('Check adding items to cart from inventory-item', async ({ page }) => { // Добавление товаров в корзину 
    // Авторизация
    const loginPage = new LoginPage(page);
    await loginPage.standardLogin();

    // Проверка перехода после успешной авторизации на https://www.saucedemo.com/inventory.html 
    const inventoryPage = new InventoryPage(page);
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

    // Переход в карточку товара из списка товаров 
    await inventoryPage.clickToFirstItemName();

    // Редирект на https://www.saucedemo.com/inventory-item.html?id=4 
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory-item.html?id=4');

    // Добавление в корзину из карточки товара
    const inventoryItemPage = new InventoryItemPage(page);
    await inventoryItemPage.clickToAddToCart();

    // Переходим в корзину для проверки
    await inventoryPage.clickToCart();

    // Проверка, что в корзине добавлен товар
    const cartPage = new CartPage(page);
    await cartPage.validateCartIsNotEmptyFor1item();
 
    // Явная проверка, что в корзине есть элементы с локатором inventory-item-name (товар в корзине)
    await expect(page.locator('[data-test="inventory-item-name"]')).toHaveCount(1);
  });
});