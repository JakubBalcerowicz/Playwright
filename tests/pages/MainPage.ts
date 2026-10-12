import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class MainPage extends BasePage {
  private readonly menuObj: Locator;
  private readonly categoriesMenuObj: Locator;
  private readonly pageURL : string;
  public readonly promoSwiper : Locator;
  public readonly iconOnPromoSwiper : Locator;

  constructor(page: Page) {
    super(page); 
    
    this.pageURL = "https://mediaexpert.pl";
    this.menuObj = this.page.locator('#section_menu-categories'); 
    this.categoriesMenuObj = this.page.locator('.menu-category-content:visible');
    this.promoSwiper = this.page
      .locator('#banners-before-recommendations')
      .locator('visible=true');
    this.iconOnPromoSwiper = this.promoSwiper
      .getByRole('group')
      .filter({ hasText: '-30% na drugi produkt lub piąty za 1zł' });
  }

  public getSubCategoryButtonLocator(buttonName: string, index: number = 0) {
    return this.categoriesMenuObj
      .first()
      .getByRole('menuitem', { name: buttonName })
      .nth(index);
  }

  async navigate() {
    await this.navigateTo(this.pageURL);
  }

  async hoverMenuItem(itemName: string) {
    const targetItem = this.menuObj.locator('li.menu-category-item', { hasText: itemName });

    // Metoda hover za szybko najeżdżała na itemy menu i skrypt się nie odpalał, 
    // trzeba zasymulować ruch myszką na załadowanym elemencie menu
    await targetItem.hover({ position: { x: 5, y: 5 } });
    await this.page.waitForTimeout(100);
    await targetItem.hover({ position: { x: 40, y: 15 } });
    
    // Czekamy na rozwinięcie menu 
    await this.page.waitForTimeout(300);
  }

  async clickSubCategoryButton(buttonName: string, index: number = 0) {
    // Zabezpieczamy widoczny kontener główny
    const activeSubMenu = this.categoriesMenuObj.first();
    await activeSubMenu.waitFor({ state: 'visible', timeout: 5000 });

    // Pobieramy wszystkie przyciski spełniające kryterium (np. wszystkie "Więcej...")
    const targetButtons = activeSubMenu.getByRole('menuitem', { name: buttonName });
    const specificButton = targetButtons.nth(index);

    // Czekamy na osadzenie w DOM i klikamy przez dispatchEvent, aby ominąć uciekający scroll
    await specificButton.waitFor({ state: 'attached', timeout: 3000 });
    await specificButton.dispatchEvent('click');
    await this.page.waitForTimeout(500);
  }
}