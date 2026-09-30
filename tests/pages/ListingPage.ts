import { expect, Locator, Page } from '@playwright/test';

export class ListingPage {
  public readonly pageURL: string;
  private readonly page: Page;

  constructor(page: Page, pageURL: string) {
    this.page = page;
    this.pageURL = pageURL;
  }

  async navigate() {
    await this.page.goto(this.pageURL);
  }

  getOfferboxByText(text: string): Locator {
    return this.page.locator('.offer-box', { hasText: text});
  }

  getWarrantyModal(): Locator{
    return this.page.locator('section.dialog');
  }

  async clickAddToCartButton(offerBox: Locator){
    const buyButton = offerBox.getByRole('button', { name: " Do koszyka" });
    await buyButton.waitFor({ state: 'visible', timeout: 3000 });
    await buyButton.click();  
  }

  async clickWarrantyNextButton(){
    const nextButton = this.getWarrantyModal().getByRole('button', {name: "Dalej" });
    await nextButton.click();
  }
  
  async scrollToOfferBox(offerBox: Locator){
    await offerBox.waitFor({ state: 'visible', timeout: 3000 });
    await offerBox.scrollIntoViewIfNeeded();
  }

}