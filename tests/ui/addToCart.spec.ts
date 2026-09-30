import { ListingPage } from '../pages/ListingPage';
import { PreCartPage } from '../pages/PreCartPage';
import { test, expect } from '../fixtures/baseTest';


test('Add to cart test', async ({ mainPage, page }) => {

  const listingPage = new ListingPage(page, 'https://www.mediaexpert.pl/telewizory-i-rtv/telewizory');
  const preCartPage = new PreCartPage(page);
  const offerBoxTitle = 'Telewizor LG 65C54LA 65\" OLED 4K 144Hz VRR WebOS TV Dolby Vision Dolby Atmos HDMI 2.1 ';
  const offerBox = listingPage.getOfferboxByText(offerBoxTitle);

  await listingPage.navigate();
  await mainPage.handleCookies();
  

  await test.step('Dodaj produkt do koszyka', async () => {
    await listingPage.scrollToOfferBox(offerBox);
    await listingPage.clickAddToCartButton(offerBox);
    await listingPage.clickWarrantyNextButton();
    await preCartPage.handleDialogModal();
    await preCartPage.clickGoToCartButton();
  });
});