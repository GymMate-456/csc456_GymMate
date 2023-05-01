// sign_up.test.js
// @ts-check

const { test, expect } = require('@playwright/test');

test.describe('Signup', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the signup page
    await page.goto('http://localhost:3000/signup');
  });

  test('allows a user to sign up', async ({ page }) => {
    // Fill out and submit the signup form
    await page.locator('xpath=//input[@name="email"]').fill('testuser@example.com');
    await page.locator('xpath=//input[@name="password"]').fill('password123');
    await page.locator('xpath=//input[@name="confirmPassword"]').fill('password123');
    await page.locator('xpath=//button[text()="Sign up"]').click();

    // Wait for the page to navigate to the account wizard
    await expect(page.url()).toMatch('/account_wizard_1');

    // Verify that the query parameter was passed correctly
    const query = await page.url().split('?')[1];
    const params = new URLSearchParams(query);
    expect(params.get('uid')).not.toBe(null);
  });

  test('displays an error message for invalid email', async ({ page }) => {
    // Fill out the form with an invalid email address and submit
    await page.locator('xpath=//input[@name="email"]').fill('invalidemail');
    await page.locator('xpath=//input[@name="password"]').fill('password123');
    await page.locator('xpath=//input[@name="confirmPassword"]').fill('password123');
    await page.locator('xpath=//button[text()="Sign up"]').click();

    // Verify that an error message is displayed for the email field
    const errorMessage = await page.locator('xpath=//div[contains(@class, "error")]').innerText();
    expect(errorMessage).toBe('Invalid email address.');
  });

  test('displays an error message for invalid password', async ({ page }) => {
    // Fill out the form with a password that is too short and submit
    await page.locator('xpath=//input[@name="email"]').fill('testuser@example.com');
    await page.locator('xpath=//input[@name="password"]').fill('short');
    await page.locator('xpath=//input[@name="confirmPassword"]').fill('short');
    await page.locator('xpath=//button[text()="Sign up"]').click();

    // Verify that an error message is displayed for the password field
    const errorMessage = await page.locator('xpath=//div[contains(@class, "error")]').innerText();
    expect(errorMessage).toBe('Password must be at least 8 characters.');
  });

  test('displays an error message for mismatched passwords', async ({ page }) => {
    // Fill out the form with mismatched passwords and submit
    await page.locator('xpath=//input[@name="email"]').fill('testuser@example.com');
    await page.locator('xpath=//input[@name="password"]').fill('password123');
    await page.locator('xpath=//input[@name="confirmPassword"]').fill('password456');
    await page.locator('xpath=//button[text()="Sign up"]').click();

    // Verify that an error message is displayed for the confirm password
    const errorMessage = await page.locator('xpath=//div[contains(@class, "error")]').innerText();
    expect(errorMessage).toBe('Passwords do not match.');
  });
});

