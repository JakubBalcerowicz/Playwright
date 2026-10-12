import { Page, Locator, expect } from '@playwright/test';

export class BasePage {
  protected page: Page;
  private readonly acceptCookiesBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.acceptCookiesBtn = page.locator('#onetrust-accept-btn-handler');  
  }

  async handleCookies() {
    try {
      await this.acceptCookiesBtn.waitFor({ state: 'visible', timeout: 3000 });
      await this.acceptCookiesBtn.click();
    } catch (error) {
      console.log('Baner cookies się nie pojawił lub został już zaakceptowany.');
    }
  }

  async navigateTo(url: string): Promise<void> {
    await this.page.goto(url);
    await this.handleCookies();
  }

  async clickElement(locator: Locator): Promise<void> {
    await locator.waitFor({ state: 'visible' });
    await locator.click();
  }

  /**
   * Czyści pole i wpisuje podany tekst (odpowiednik bezpiecznego fill).
   * @param locator Lokator pola tekstowego/inputu
   * @param text Tekst do wpisania
   */
  async typeText(locator: Locator, text: string): Promise<void> {
    await locator.waitFor({ state: 'visible' });
    await locator.fill(text);
  }

  /**
   * Pobiera tekst z elementu i zwraca go jako string.
   * @param locator Lokator elementu
   */
  async getElementText(locator: Locator): Promise<string> {
    await locator.waitFor({ state: 'visible' });
    return (await locator.innerText()).trim();
  }

  async isElementVisible(locator: Locator): Promise<boolean> {
    try {
      return await locator.isVisible();
    } catch {
      return false;
    }
  }

  async expectToBeVisible(locator: Locator): Promise<void> {
    await expect(locator).toBeVisible();
  }

  /**
   * Wspólna metoda asercji – sprawdza, czy URL zawiera oczekiwaną frazę.
   * @param expectedUrl Część lub pełny oczekiwany adres URL
   */
  async expectPageUrlToContain(expectedUrl: string | RegExp): Promise<void> {
    await expect(this.page).toHaveURL(expectedUrl);
  }
}