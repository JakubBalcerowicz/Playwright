// fixtures/app-fixtures.ts
import { test as base } from '@playwright/test';
import { MainPage } from '../pages/MainPage'; 
import { ListingPage } from '../pages/ListingPage';
import { PreCartPage } from '../pages/PreCartPage';
import { CartListPage } from '../pages/CartListPage';

// 1. Definiujesz typy dla wszystkich trzech stron
type MyFixtures = {
  mainPage: MainPage;
  listingPage: ListingPage;
  preCartPage: PreCartPage;
  cartListPage: CartListPage;
};

export const test = base.extend<MyFixtures>({
  // Fixture dla MainPage
  mainPage: async ({ page }, use) => {
    await use(new MainPage(page));
  },

  // Fixture dla ListingPage
  listingPage: async ({ page }, use) => {
    // Ponieważ ListingPage w konstruktorze wymaga adresu URL, 
    // podajesz go tutaj (np. domyślny URL dla kategorii)
    const defaultUrl = 'https://mediaexpert.pl';
    const listPage = new ListingPage(page, defaultUrl);
    
    await use(listPage);
  },
  // Fixture dla CartPage
  preCartPage: async ({ page }, use) => {
    await use(new PreCartPage(page));
  },
  cartListPage: async ({ page }, use) => {
    await use(new CartListPage(page));
  },
});

export { expect } from '@playwright/test';
