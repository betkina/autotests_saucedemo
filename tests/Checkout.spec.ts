import { test, expect } from '@playwright/test';
import { LoginPage } from '../common/pages/LoginPage';
import { InventoryPage } from '../common/pages/InventoryPage';
import { CartPage } from '../common/pages/CartPage';
import { CheckoutCompletePage } from '../common/pages/checkout/CheckoutCompletePage';
import { CheckoutStepOnePage } from '../common/pages/checkout/CheckoutStepOnePage';
import { CheckoutStepTwoPage } from '../common/pages/checkout/CheckoutStepTwoPage';

test.describe('Checkout Flow', () => { // Тесты на оформление заказа
  test('Check Checkout: Your Information', async ({ page }) => { // Заполнение формы Checkout: Your Information
        // Авторизация
        const loginPage = new LoginPage(page);
        await loginPage.standardLogin();
    
        // Проверка перехода после успешной авторизации на https://www.saucedemo.com/inventory.html 
        const inventoryPage = new InventoryPage(page);
        await inventoryPage.validateURL();
    
        // Добавление товара в корзину со страницы https://www.saucedemo.com/inventory.html
        await inventoryPage.clickToAddToCart();

        // Переходим в корзину 
        await inventoryPage.clickToCart();

        // Клик на Checkout
        const cartPage = new CartPage(page);
        await cartPage.clickToCheckout();

        // Редирект на https://www.saucedemo.com/checkout-step-one.html
        const checkoutStepOnePage = new CheckoutStepOnePage(page);
        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html');

        // Заполнение полей 
        await checkoutStepOnePage.fillInformationForm('Test', 'Test', '123');

        // Клик на Continue
        await checkoutStepOnePage.clickToContinue();

        // Редирект на https://www.saucedemo.com/checkout-step-two.html
        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html');

        // На странице есть кнопки Cancel/Finish/Описание товара/Стоимость товара
        await expect(page.locator('[data-test="cancel"]')).toBeVisible();
        await expect(page.locator('[data-test="finish"]')).toBeVisible();
        await expect(page.locator('[data-test="inventory-item-desc"]')).toBeVisible();
        await expect(page.locator('[data-test="inventory-item-price"]')).toBeVisible();
    });

    test('Finish checkout flow', async ({ page }) => { // Завершение оформления заказа
      // Авторизация
      const loginPage = new LoginPage(page);
      await loginPage.standardLogin();
  
      // Проверка перехода после успешной авторизации на https://www.saucedemo.com/inventory.html 
      const inventoryPage = new InventoryPage(page);
      await inventoryPage.validateURL();
  
      // Добавление товара в корзину со страницы https://www.saucedemo.com/inventory.html
      await inventoryPage.clickToAddToCart();

      // Переходим в корзину 
      await inventoryPage.clickToCart();

      // Клик на Checkout
      const cartPage = new CartPage(page);
      await cartPage.clickToCheckout();

      // Редирект на https://www.saucedemo.com/checkout-step-one.html
      const checkoutStepOnePage = new CheckoutStepOnePage(page);
      await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html');

      // Заполнение полей 
      await checkoutStepOnePage.fillInformationForm('Test', 'Test', '123');

      // Клик на Continue
      await checkoutStepOnePage.clickToContinue();

      // Редирект на https://www.saucedemo.com/checkout-step-two.html
      await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html');
    
      // Клик на Finish
      const checkoutStepTwoPage = new CheckoutStepTwoPage(page);
      await checkoutStepTwoPage.clickToFinish();

      // Редирект на https://www.saucedemo.com/checkout-complete.html
      const checkoutCompletePage = new CheckoutCompletePage(page);
      await expect(page).toHaveURL('https://www.saucedemo.com/checkout-complete.html');

      // На странице есть кнопка Back Home 
      await expect(page.locator('[data-test="back-to-products"]')).toBeVisible();
});
});