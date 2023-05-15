//account_wizard_1.test.js
const { test, expect } = require('@playwright/test');

test('Wizard 1 form submission', async ({ page }) => {
    // Navigate to the wizard 1 page
    await page.goto('http://localhost:3000/wizard1');
  
    // Fill in the form inputs
    const firstNameInput = await page.$$('input[name="firstName"]');
    if (!firstNameInput || firstNameInput.length === 0) {
      throw new Error('Could not find firstName input');
    }
    await firstNameInput[0].fill('John');
  
    const lastNameInput = await page.$$('input[name="lastName"]');
    if (!lastNameInput || lastNameInput.length === 0) {
      throw new Error('Could not find lastName input');
    }
    await lastNameInput[0].fill('Doe');
  
    const genderSelect = await page.$$('select[name="gender"]');
    if (!genderSelect || genderSelect.length === 0) {
      throw new Error('Could not find gender select');
    }
    await genderSelect[0].selectOption({ label: 'Male' });
  
    const ageInput = await page.$$('input[name="age"]');
    if (!ageInput || ageInput.length === 0) {
      throw new Error('Could not find age input');
    }
    await ageInput[0].fill('25');
  
    // Submit the form
    const submitButton = await page.$$('button[type="submit"]');
    if (!submitButton || submitButton.length === 0) {
      throw new Error('Could not find submit button');
    }
    await submitButton[0].click();
  
    // Wait for the page to navigate to wizard 2
    await page.waitForNavigation();
  
    // Assert that the page navigated to wizard 2
    expect(page.url()).toBe('http://localhost:3000/wizard2');
  });
  