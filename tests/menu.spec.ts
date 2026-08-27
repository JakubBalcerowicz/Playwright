import { test, expect } from './fixtures/baseTest';

test('Sprawdzamy działanie menu kategorii pokaż więcej/mniej', async ({ sgMexPage, page }) => {

  await sgMexPage.navigate();

  await sgMexPage.hoverMenuItem('TV, Audio i RTV');

  await sgMexPage.clickButton("Więcej...")

  await sgMexPage.clickButton("Pokaż mniej...")
});