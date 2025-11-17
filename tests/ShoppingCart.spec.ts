import { test, expect } from '@playwright/test';
import { LoginPage } from '../common/pages/LoginPage';
import { InventoryPage } from '../common/pages/InventoryPage';
import { CartPage } from '../common/pages/CartPage';
import { CheckoutStepOnePage } from '../common/pages/checkout/CheckoutStepOnePage';

test.describe('Cart Management', () => { // Тесты на управление содержимым, навигацией, состояниями корзины
    test('Check display item in the cart', async ({ page }) => { // Проверка отображения товара в корзине (описание/стоимость и тд)
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

    // Переходим в корзину для проверки
    await inventoryPage.clickToCart();

    // Проверка, что в корзине добавлен товар
    const cartPage = new CartPage(page);
    await cartPage.validateCartIsNotEmptyFor1item();
    
    // Явная проверка, что в корзине есть элемент с локатором inventory-item-name (товар в корзине)
    await expect(page.locator('[data-test="inventory-item-name"]')).toHaveCount(1);

    // На странице есть заголовок Your Cart/QTY/Description
    await expect(page.getByText('Your Cart')).toBeVisible();
    await expect(page.getByText('QTY')).toBeVisible();
    await expect(page.getByText('Description')).toBeVisible();

    // На странице есть описание добавленного товара и стоимость
    await expect(page.locator('[data-test="inventory-item-desc"]')).toBeVisible();
    await expect(page.locator('[data-test="inventory-item-price"]')).toBeVisible();

    // На странице есть кнопки Remove/Continue Shopping/Checkout
    await expect(page.locator('[data-test="remove-sauce-labs-backpack"]')).toBeVisible();
    await expect(page.locator('[data-test="continue-shopping"]')).toBeVisible();
    await expect(page.locator('[data-test="checkout"]')).toBeVisible();
  });

    test('Check go to empty cart', async ({ page }) => { // Переход в пустую корзину
      // Авторизация
    const loginPage = new LoginPage(page);
    await loginPage.standardLogin();

    // Проверка перехода после успешной авторизации на https://www.saucedemo.com/inventory.html 
    const inventoryPage = new InventoryPage(page);
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

    // Переход в корзину
    await inventoryPage.clickToCart();

    // Проверка, что корзина пуста (нет товаров)
    const cartPage = new CartPage(page);
    await cartPage.validateCartIsEmpty();

    // Есть кнопки Continue Shopping/ Checkout
    await expect(page.locator('[data-test="continue-shopping"]')).toBeVisible();
    await expect(page.locator('[data-test="checkout"]')).toBeVisible();
  });

    test('Check Continue Shopping', async ({ page }) => { // Проверка работы кнопки Continue Shopping в корзине
      // Авторизация
    const loginPage = new LoginPage(page);
    await loginPage.standardLogin();

    // Проверка перехода после успешной авторизации на https://www.saucedemo.com/inventory.html 
    const inventoryPage = new InventoryPage(page);
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

    // Переход в корзину
    await inventoryPage.clickToCart();

    // Клик на Continue Shopping
    const cartPage = new CartPage(page);
    await cartPage.clickToContinueShopping();

    // Редирект на https://www.saucedemo.com/inventory.html
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  });

    test('Check Checkout', async ({ page }) => { // Проверка работы кнопки Checkout в корзине
      // Авторизация
    const loginPage = new LoginPage(page);
    await loginPage.standardLogin();

     // Проверка перехода после успешной авторизации на https://www.saucedemo.com/inventory.html 
    const inventoryPage = new InventoryPage(page);
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

    // Переход в корзину
    await inventoryPage.clickToCart();

    // Клик на Checkout
    const cartPage = new CartPage(page);
    await cartPage.clickToCheckout();

    // Редирект на https://www.saucedemo.com/checkout-step-one.html
    const checkoutStepOnePage = new CheckoutStepOnePage(page);
    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html');
  });
});