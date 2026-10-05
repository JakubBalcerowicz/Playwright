import { expect, Locator, Page } from '@playwright/test';

export class CartListPage {
  private readonly page: Page;
  private readonly goToCartButton: Locator;
  private readonly dialogModal: Locator;
  private readonly closeDialogButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.goToCartButton = this.page.getByRole('button', {name: 'Przejdź do zamówienia'})
    this.dialogModal = page.locator('div.slide-panel-container').filter({ has: page.locator('h3.title', { hasText: 'Wybierz produkt ze zniżką' }) });
    this.closeDialogButton = this.dialogModal.locator('.close-side-panel-button')
  }

  async handleDialogModal() {
  for (let i = 0; i < 3; i++) {
      if (await this.dialogModal.isVisible()) {
        await this.closeDialogButton.click();
        return;
      }
      if (i < 2) {
        await this.page.waitForTimeout(1000);
      }
    }
  }

  async goToCart(){
    await expect(this.page).toHaveURL(/.*koszyk\/lista/, { timeout: 10000 });
    await this.handleDialogModal()
    await this.goToCartButton.waitFor({ state: 'visible', timeout: 3000 });
    await this.goToCartButton.click(); 
  } 
  
}