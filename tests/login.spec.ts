// WAŻNE: Importujemy 'test' i 'expect' z Twojego pliku z fixtures, a nie z @playwright/test!
// Dostosuj ścieżkę '../../fixtures/my-fixtures' do rzeczywistej lokalizacji Twojego pliku
import { test, expect } from './fixtures/baseTest';

test('Użytkownik powinien zalogować się poprawnie poprawnymi danymi', async ({ loginPage, page }) => {
  // 1. ARRANGE (Przygotowanie) - Wejście na stronę logowania
  await loginPage.navigate();

  // 2. ACT (Akcja) - Wpisanie danych (student / Password123) i kliknięcie Submit
  // Przekazujemy poprawne dane uwierzytelniające ze strony ćwiczeniowej
  await loginPage.login('student', 'Password123');

  // 3. ASSERT (Weryfikacja po wykonaniu submit)
  // Sprawdzamy, czy URL zmienił się na adres strony po udanym logowaniu
  await expect(page).toHaveURL(/.*logged-in-successfully/);

  // Sprawdzamy, czy na nowej stronie pojawił się komunikat o sukcesie
  const successMessage = page.locator('h1.post-title');
  await expect(successMessage).toHaveText('Logged In Successfully');

  // Sprawdzamy, czy przycisk do wylogowania jest widoczny
  const logoutButton = page.locator('a:has-text("Log out")');
  await expect(logoutButton).toBeVisible();
});
