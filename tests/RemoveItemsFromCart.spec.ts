import { test, expect } from '@playwright/test';
import { LoginPage } from '../common/pages/LoginPage';
import { InventoryPage } from '../common/pages/InventoryPage';
import { InventoryItemPage } from '../common/pages/InventoryItemPage';
import { CartPage } from '../common/pages/CartPage';

test.describe('Check removing items', () => { // Тесты на удаление добавленных в корзину товаров 
  test('Check removing item from Products', async ({ page }) => { // Удаление товара со страницы https://www.saucedemo.com/inventory.html
    // Авторизация
    const loginPage = new LoginPage(page);
    await loginPage.standardLogin();

    // Проверка перехода после успешной авторизации на https://www.saucedemo.com/inventory.html 
    const inventoryPage = new InventoryPage(page);
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

    // Добавление товара в корзину со страницы https://www.saucedemo.com/inventory.html
    await inventoryPage.clickToAddToCart();

    // Проверка, что счетчик корзины показывает 1 товар
    await inventoryPage.validateCartBadgeCount(1);

    // Клик на Remove напротив добавленного товара
    await inventoryPage.clickToRemoveFromProducts();

    // Кнопка поменялась с Remove на Add to cart
    await inventoryPage.validateAddToCartButtonVisible();

    // Счетчик корзины исчез
    await inventoryPage.validateCartBadgeHidden();

    // Переходим в корзину для проверки
    await inventoryPage.clickToCart();

    // Проверка, что корзина пуста
    const cartPage = new CartPage(page);
    await cartPage.validateCartIsEmpty();

    // Явная проверка, что в корзине нет элементов с локатором inventory-item-name
    await expect(page.locator('[data-test="inventory-item-name"]')).toHaveCount(0);
  });

  test('Check removing item from product card', async ({ page }) => { // Удаление товара со страницы карточки с товаром
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

    // Проверка, что счетчик корзины показывает 1 товар
    await inventoryPage.validateCartBadgeCount(1);

    // Клик на Remove напротив добавленного товара
    await inventoryItemPage.clickToRemove();

    // Кнопка поменялась с Remove на Add to cart
    await inventoryItemPage.validateAddToCartButtonVisible();

    // Счетчик корзины исчез
    await inventoryPage.validateCartBadgeHidden();

    // Переходим в корзину для проверки
    await inventoryPage.clickToCart();

    // Проверка, что корзина пуста
    const cartPage = new CartPage(page);
    await cartPage.validateCartIsEmpty();

    // Явная проверка, что в корзине нет элементов с локатором inventory-item-name
    await expect(page.locator('[data-test="inventory-item-name"]')).toHaveCount(0);
  });

  test('Check removing item from cart', async ({ page }) => { // Удаление товаров из корзины
    // Авторизация
    const loginPage = new LoginPage(page);
    await loginPage.standardLogin();

    // Проверка перехода после успешной авторизации на https://www.saucedemo.com/inventory.html 
    const inventoryPage = new InventoryPage(page);
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

    // Добавление товара в корзину со страницы https://www.saucedemo.com/inventory.html
    await inventoryPage.clickToAddToCart();

    // Проверка, что счетчик корзины показывает 1 товар
    await inventoryPage.validateCartBadgeCount(1);

    // Переходим в корзину
    await inventoryPage.clickToCart();

    // Проверка, что в корзине добавлен товар
    const cartPage = new CartPage(page);
    await cartPage.validateCartIsNotEmptyFor1item();

    // Клик на Remove напротив добавленного товара
    await cartPage.clickToRemove(0);

    // Счетчик корзины исчез
    await inventoryPage.validateCartBadgeHidden();

    // В корзине нет товаров
    await cartPage.validateCartIsEmpty();

    // Явная проверка, что в корзине нет элементов с локатором inventory-item-name
    await expect(page.locator('[data-test="inventory-item-name"]')).toHaveCount(0);
  });
});