//account_wizard_2.test.js
const { test, expect } = require('@playwright/test');

test('Wizard2', async ({ page }) => {
  // Navigate to the page
  await page.goto('http://localhost:3000/wizard2');

  // Verify the page title
  await expect(page.title()).toBe('Complete your profile');

  // Fill out the form
  await page.fill('[name="username"]', 'testuser');
  await page.fill('[name="bio"]', 'This is a test bio.');
  await page.click('[data-testid="sports-select"]');
  await page.click('//li[contains(@class, "multiselect-item-checkbox") and contains(text(), "Basketball")]');
  await page.fill('[name="zipcode"]', '12345');
  await page.click('[data-testid="submit-button"]');

  // Wait for the page to navigate
  await page.waitForNavigation();

  // Verify the URL of the next page
  await expect(page.url()).toBe('http://localhost:3000/account_wizard_3');
});
