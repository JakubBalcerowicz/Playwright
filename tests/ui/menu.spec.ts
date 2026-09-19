import { test, expect } from '../fixtures/baseTest';

test('Sprawdzamy działanie menu kategorii pokaż więcej/mniej', async ({ sgMexPage, page }) => {

  const buttonMore = sgMexPage.getSubCategoryButtonLocator("Więcej...", 5);
  const buttonLess = sgMexPage.getSubCategoryButtonLocator("Pokaż mniej...");

  await sgMexPage.navigate();

  await sgMexPage.hoverMenuItem('TV, Audio i RTV');

  await test.step('Kliknij "Więcej..." i sprawdź czy menu się rozwinęło', async () => {
    await sgMexPage.clickSubCategoryButton("Więcej...", 5);
    await expect(buttonLess).toBeAttached();
  });

  await test.step('Kliknij "Pokaż mniej..." i sprawdź czy menu się zwinęło', async () => {
    await sgMexPage.clickSubCategoryButton("Pokaż mniej...");
    await expect(buttonMore).toBeAttached();
  });
});