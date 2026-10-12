import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

// 1. Dodajemy 'extends BasePage'
export class ListingPage extends BasePage {
  public readonly pageURL: string;
  // Usunięto: private readonly page: Page; (jest w BasePage)

  // 2. Konstruktor przyjmuje oba parametry bez zmian
  constructor(page: Page, pageURL: string) {
    // 3. Przekazujemy 'page' jako pierwszy do klasy bazowej
    super(page); 
    
    // 4. Przypisujemy adres URL pod spodem
    this.pageURL = pageURL;
  }

  // 5. Wykorzystujemy metodę z klasy bazowej
  async navigate() {
    await this.navigateTo(this.pageURL);
  }

  getOfferboxByText(text: string): Locator {
    return this.page.locator('.offer-box', { hasText: text });
  }

  getWarrantyModal(): Locator {
    return this.page.locator('section.dialog');
  }

  async clickAddToCartButton(offerBox: Locator) {
    const buyButton = offerBox.getByRole('button', { name: " Do koszyka" });
    await buyButton.waitFor({ state: 'visible', timeout: 3000 });
    await buyButton.click();
  }

  async clickWarrantyNextButton() {
    const nextButton = this.getWarrantyModal().getByRole('button', { name: "Dalej" });
    await nextButton.click();
  }
  
  async scrollToOfferBox(offerBox: Locator) {
    await offerBox.waitFor({ state: 'visible', timeout: 3000 });
    await offerBox.scrollIntoViewIfNeeded();
  }
}
