import { test, expect } from '../../fixtures/baseTest';

test('Klikanie w lokatory', async ({ mainPage, page }) => {

  await mainPage.navigate();

  await mainPage.iconOnPromoSwiper.hover();
});