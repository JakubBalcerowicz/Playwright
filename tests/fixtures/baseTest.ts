import { test as base } from '@playwright/test';
import { MainPage } from '../pages/MainPage'; 

type MyFixtures = {
  mainPage: MainPage;
};

export const test = base.extend<MyFixtures>({
  mainPage: async ({ page }, use) => {

    const sgMexPage = new MainPage(page);
    await use(sgMexPage);
  },
});

export { expect } from '@playwright/test';
