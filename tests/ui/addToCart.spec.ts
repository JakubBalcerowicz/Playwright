import { test, expect } from '../fixtures/baseTest'; // Pamiętaj, aby importować test ze SWOICH fixtures!

test('Add to cart test', async ({ mainPage, listingPage, preCartPage, cartListPage, page }) => {
  
  const tvUrl = 'https://www.mediaexpert.pl/telewizory-i-rtv/telewizory';
  const offerBoxTitle = 'Telewizor LG 65C54LA 65" OLED 4K 144 Hz VRR WebOS TV Dolby Atmos Dolby Vision HDMI 2.1 ';
  const offerBox = listingPage.getOfferboxByText(offerBoxTitle).first();

  // Wchodzimy na konkretny adres URL telewizorów przekazując go do metody
  await listingPage.navigateTo(tvUrl); 
  await mainPage.handleCookies();

  await test.step('Dodaj produkt do koszyka', async () => {
    await listingPage.scrollToOfferBox(offerBox);
    await listingPage.clickAddToCartButton(offerBox);
    await listingPage.clickWarrantyNextButton();
    await preCartPage.handleDialogModal();
    await preCartPage.clickGoToCartButton();
  });

  await page.waitForTimeout(5000);
  await cartListPage.goToCart();
});
