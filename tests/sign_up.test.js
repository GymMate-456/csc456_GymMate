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
    await page.fill('[name="email"]', 'testuser@example.com');
    await page.fill('[name="password"]', 'password123');
    await page.fill('[name="confirmPassword"]', 'password123');
    await page.click('[type="submit"]');

    // Wait for the page to navigate to the account wizard
    await expect(page.url()).toMatch('/account_wizard_1');

    // Verify that the query parameter was passed correctly
    const query = await page.url().split('?')[1];
    const params = new URLSearchParams(query);
    expect(params.get('uid')).not.toBe(null);
  });

  test('displays an error message for invalid email', async ({ page }) => {
    // Fill out the form with an invalid email address and submit
    await page.fill('[name="email"]', 'invalidemail');
    await page.fill('[name="password"]', 'password123');
    await page.fill('[name="confirmPassword"]', 'password123');
    await page.click('[type="submit"]');

    // Verify that an error message is displayed for the email field
    const errorMessage = await page.innerText('.error');
    expect(errorMessage).toBe('Invalid email address.');
  });

  test('displays an error message for invalid password', async ({ page }) => {
    // Fill out the form with a password that is too short and submit
    await page.fill('[name="email"]', 'testuser@example.com');
    await page.fill('[name="password"]', 'short');
    await page.fill('[name="confirmPassword"]', 'short');
    await page.click('[type="submit"]');

    // Verify that an error message is displayed for the password field
    const errorMessage = await page.innerText('.error');
    expect(errorMessage).toBe('Password must be at least 8 characters.');
  });

  test('displays an error message for mismatched passwords', async ({ page }) => {
    // Fill out the form with mismatched passwords and submit
    await page.fill('[name="email"]', 'testuser@example.com');
    await page.fill('[name="password"]', 'password123');
    await page.fill('[name="confirmPassword"]', 'password456');
    await page.click('[type="submit"]');

    // Verify that an error message is displayed for the confirm password field
    const errorMessage = await page.innerText('.error');
    expect(errorMessage).toBe('Passwords do not match.');
  });
});
