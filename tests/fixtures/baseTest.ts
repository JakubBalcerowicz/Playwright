import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

// 1. Definiujemy typ dla naszych fixture'ów
type MyFixtures = {
  loginPage: LoginPage;
};

// 2. Rozszerzamy bazowy obiekt testu
export const test = base.extend<MyFixtures>({
  loginPage: async ({ page }, use) => {
    // Playwright automatycznie stworzy obiekt przed uruchomieniem testu
    const loginPage = new LoginPage(page);
    
    // Przekazujemy obiekt do testu
    await use(loginPage);
    
    // Miejsce na opcjonalny kod czyszczący po teście (afterEach)
  },
});

export { expect } from '@playwright/test';