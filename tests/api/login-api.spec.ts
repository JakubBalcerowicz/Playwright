import { test, expect } from '@playwright/test';

test('powinien zalogować admina i zwrócić token dla Restful-Booker', async ({ request }) => {

  const response = await request.post('/auth', {
    data: {
      username: process.env.API_LOGIN,
      password: process.env.API_PASSWORD
    }
  });

  // 2. ASERCJA STATUSU OK (serwer powinien odpowiedzieć statusem 200)
  expect(response.status()).toBe(200);
  expect(response.ok()).toBeTruthy();

  // 3. SPARSOWANIE ODPOWIEDZI DO JSON
  const responseBody = await response.json();

  // 4. ASERCJE DANYCH (Restful-Booker po udanym logowaniu zwraca obiekt: { "token": "wartosc" })
  expect(responseBody).toHaveProperty('token');
  expect(typeof responseBody.token).toBe('string');
  expect(responseBody.token.length).toBeGreaterThan(0);

  console.log('Wygenerowany token dla admina:', responseBody.token);
});
