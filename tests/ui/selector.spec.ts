import { test, expect } from '../fixtures/baseTest';

test('Selector test', async ({ sgMexPage,page }) => {
  // 1. Wchodzisz na dowolną inną stronę
  await page.goto('https://www.mediaexpert.pl/telewizory-i-rtv/telewizory');
  await sgMexPage.handleCookies();
  
  const offerBox = page.locator('.offer-box', { hasText: "Telewizor LG 65C54LA 65\" OLED 4K 144Hz VRR WebOS TV Dolby Vision Dolby Atmos HDMI 2.1 " });
  const quickFilterItem = page.locator('.quick-filter-item', { hasText: "40 - 49\"" });
  const buyButton = offerBox.getByRole('button', { name: " Do koszyka" });
  const nextButton = page.getByRole('button', {name: "Dalej" });
  const goToCartButton = page.getByRole('button', {name: "Idź do koszyka" });
  const closeDialogButton = page.getByRole('button', {name: "Zamknij dialog"})
  const dialogModal = page.locator('.dialog');
  const precartSummary = page.locator('#precart-summary-box');
  

  await quickFilterItem.hover();
  //szukam offerboxa i scrolluej do niego
  await offerBox.waitFor({ state: 'visible', timeout: 3000 });
  await offerBox.scrollIntoViewIfNeeded();
  //klikam 'dokoszyka'
  await buyButton.waitFor({ state: 'visible', timeout: 5000 });
  await buyButton.click();

  //klikam dalje w modalu
  await nextButton.waitFor({state: 'visible', timeout: 3000 })
  await nextButton.click();

  //czekam na wyskoczenie modelu promocyjnego
  await page.waitForTimeout(5000)


  //jezeli wyskoczy zamykam go
  if (await dialogModal.isVisible({ timeout: 7000 })) await closeDialogButton.click();


  await precartSummary.waitFor({state: 'visible', timeout: 3000 })
  //Atrybut role w HTML całkowicie nadpisuje domyślną naturę elementu w oczach przeglądarki, 
  // systemów operacyjnych (czytników ekranu dla osób niewidomych) oraz właśnie Playwrighta.

  //pierwsyz sposob lapie za element wyzej
  // await precartSummary.locator('.button-wrapper').click();

  //drugi sposob
  await precartSummary.getByRole('link', {name: "Idź do koszyka"}).click();





});