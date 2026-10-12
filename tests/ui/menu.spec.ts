import { test, expect } from '../../fixtures/baseTest';

test('Sprawdzamy działanie menu kategorii pokaż więcej/mniej', async ({ mainPage, page }) => {

  const buttonMore = mainPage.getSubCategoryButtonLocator("Więcej...", 5);
  const buttonLess = mainPage.getSubCategoryButtonLocator("Pokaż mniej...");

  await mainPage.navigate();

  await page.waitForTimeout(600);
  //test przestal dzialac hover zachowuje sie poprawnie a menu z boku nie wysiwetla sie
  await mainPage.hoverMenuItem('TV, Audio i RTV');
 
  await test.step('Kliknij "Więcej..." i sprawdź czy menu się rozwinęło', async () => {
    await mainPage.clickSubCategoryButton("Więcej...", 5);
    await expect(buttonLess).toBeAttached();
  });

  await test.step('Kliknij "Pokaż mniej..." i sprawdź czy menu się zwinęło', async () => {
    await mainPage.clickSubCategoryButton("Pokaż mniej...");
    await expect(buttonMore).toBeAttached();
  });
});