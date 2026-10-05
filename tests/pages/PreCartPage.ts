import { expect, Locator, Page } from '@playwright/test';

export class PreCartPage {
  private readonly page: Page;
  private readonly goToCartButton: Locator;
  private readonly dialogModal: Locator;
  private readonly closeDialogButton: Locator;
  private readonly precartSummary: Locator;

  constructor(page: Page) {
    this.page = page;
    this.dialogModal = page.locator('.dialog');
    this.closeDialogButton = this.dialogModal.getByRole('button', {name: "Zamknij dialog"})
    this.precartSummary = page.locator('#precart-summary-box');
    this.goToCartButton = this.precartSummary.getByRole('link', {name: "Idź do koszyka"})
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

  async clickGoToCartButton(){
    await this.precartSummary.waitFor({state: 'visible', timeout: 3000 })
    await this.goToCartButton.click();
  }
}