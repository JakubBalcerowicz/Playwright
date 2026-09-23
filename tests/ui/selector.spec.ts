import { test, expect } from '../fixtures/baseTest';

test('Selector test', async ({ sgMexPage,page }) => {
  // 1. Wchodzisz na dowolną inną stronę
  await page.goto('https://www.mediaexpert.pl/telewizory-i-rtv/telewizory');
  await sgMexPage.handleCookies();
  
  const offerBox = page.locator('.offer-box', { hasText: "Telewizor LG 65C54LA 65\" OLED 4K 144Hz VRR WebOS TV Dolby Vision Dolby Atmos HDMI 2.1 " });
  const buyButton = offerBox.getByRole('button', { name: " Do koszyka" });
 
  await offerBox.waitFor({ state: 'visible', timeout: 3000 });
  await offerBox.scrollIntoViewIfNeeded();
  await buyButton.waitFor({ state: 'visible', timeout: 5000 });
  await buyButton.click();
});