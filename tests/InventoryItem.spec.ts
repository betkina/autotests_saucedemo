import { test, expect } from '@playwright/test';
import { LoginPage } from '../common/pages/LoginPage';
import { InventoryPage } from '../common/pages/InventoryPage';
import { InventoryItemPage } from '../common/pages/InventoryItemPage';

test.describe('Check product card', () => { // Тесты на переход в PDP и возврат к списку с товарами из PDP
    test('Go to product card', async ({ page }) => { // Переход в карточку товара
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
    });

    test('Check Back to products', async ({ page }) => { //  Возврат к списку с товарами из карточки товара (кнопка Back to products)
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

      // Кликнуть на Back to products из карточки товара
      const inventoryItemPage = new InventoryItemPage(page);
      await inventoryItemPage.clickToBack();

      // Возврат к списку товаров
      await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    });
  });