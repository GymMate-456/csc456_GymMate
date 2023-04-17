// sign_in.test.js
// @ts-check

const { test, expect } = require('@playwright/test');

test('Signin form submission should navigate to correct page', async ({ page }) => {
  await page.goto('http://localhost:3000');

  // Fill in email and password inputs
  await page.fill('input[type="text"]', 'test@example.com');
  await page.fill('input[type="password"]', 'testpassword');

  // Click on submit button
  await page.click('button[type="submit"]');

  // Wait for navigation to complete
  await page.waitForNavigation();

  // Check if navigation was successful
  expect(page.url()).toMatch('/account_wizard_1?uid=');

  // Check if query parameters were passed correctly
  const url = page.url();
  const query = new URLSearchParams(url.substring(url.indexOf('?')));
  expect(query.get('uid')).not.toBe(null);
});
