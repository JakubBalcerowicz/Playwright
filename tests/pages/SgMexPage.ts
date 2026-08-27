import { expect, Locator, Page } from '@playwright/test';

export class SgMexPage {
  private readonly page: Page;
  private readonly menuObj: Locator;
  // Definiujemy lokator dla przycisku cookies
  private readonly acceptCookiesBtn: Locator;
  private readonly categoriesMenuObj: Locator;
    private readonly subCategoriesMenuObj: Locator;

  constructor(page: Page) {
    this.page = page;
    this.menuObj = page.locator('#section_menu-categories');
    this.acceptCookiesBtn = page.locator('#onetrust-accept-btn-handler');
    this.categoriesMenuObj = page.locator('.menu-category-content')
    this.subCategoriesMenuObj = page.locator('.menu-category-content').locator('.group-links')
  }

  async navigate() {
    await this.page.goto('https://mediaexpert.pl');
    await this.handleCookies();
  }

  private async handleCookies() {
    try {
      await this.acceptCookiesBtn.waitFor({ state: 'visible', timeout: 3000 });
      await this.acceptCookiesBtn.click();
    } catch (error) {
      console.log('Baner cookies się nie pojawił lub został już zaakceptowany.');
    }
  }

  async hoverMenuItem(itemName: string) {
    const targetItem = this.menuObj
      .locator('.item-name')
      .getByText(itemName)
      
    await targetItem.waitFor({ state: 'visible' });
    await targetItem.hover();
    await this.page.waitForTimeout(200);
  }

  async clickButton(buttonName: string) {

    const targetItem = this.categoriesMenuObj.first();
 
    await targetItem.getByRole('menuitem', { name: buttonName }).first().click();
    await this.page.waitForTimeout(500);
  }
}
