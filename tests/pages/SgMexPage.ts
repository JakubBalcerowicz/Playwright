import { expect, Locator, Page } from '@playwright/test';

export class SgMexPage {
  private readonly page: Page;
  private readonly menuObj: Locator;
  private readonly acceptCookiesBtn: Locator;
  private readonly categoriesMenuObj: Locator;
  private readonly pageURL : string;

  constructor(page: Page) {
    this.pageURL = "https://mediaexpert.pl";
    this.page = page;
    this.menuObj = page.locator('#section_menu-categories');
    this.acceptCookiesBtn = page.locator('#onetrust-accept-btn-handler');   
    this.categoriesMenuObj = page.locator('.menu-category-content:visible');
  }

  public getSubCategoryButtonLocator(buttonName: string, index: number = 0) {
  return this.categoriesMenuObj
    .first()
    .getByRole('menuitem', { name: buttonName })
    .nth(index);
}

  async navigate() {
    await this.page.goto(this.pageURL);
    await this.handleCookies();
  }

  public async handleCookies() {
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
      .getByText(itemName);
      
    await targetItem.waitFor({ state: 'visible' });
    
    //Dodatkowo wymuszamy stabilny hover
    await targetItem.hover({ force: true });

    //Dajemy animacji menu w Media Expert chwilę na pełne rozwinięcie panelu bocznego
    await this.page.waitForTimeout(600);
  }

 async clickSubCategoryButton(buttonName: string, index: number = 0) {
    //Zabezpieczamy widoczny kontener główny
    const activeSubMenu = this.categoriesMenuObj.first();
    await activeSubMenu.waitFor({ state: 'visible', timeout: 5000 });

    //Pobieramy wszystkie przyciski spełniające kryterium (np. wszystkie "Więcej...")
    const targetButtons = activeSubMenu.getByRole('menuitem', { name: buttonName });

    const specificButton = targetButtons.nth(index);

    //Czekamy na osadzenie w DOM i klikamy przez dispatchEvent, aby ominąć uciekający scroll
    await specificButton.waitFor({ state: 'attached', timeout: 3000 });
    await specificButton.dispatchEvent('click');
    await this.page.waitForTimeout(500);
  }
}
