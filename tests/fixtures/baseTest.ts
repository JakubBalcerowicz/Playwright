import { test as base } from '@playwright/test';
import { SgMexPage } from '../pages/SgMexPage'; 

type MyFixtures = {
  sgMexPage: SgMexPage;
};

export const test = base.extend<MyFixtures>({
  sgMexPage: async ({ page }, use) => {

    const sgMexPage = new SgMexPage(page);
    await use(sgMexPage);
  },
});

export { expect } from '@playwright/test';
