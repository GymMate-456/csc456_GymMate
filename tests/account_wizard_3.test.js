//account_wizard_3.test.js
const { test, expect } = require('@playwright/test');

test('Wizard3 component should upload images and submit form', async ({ page }) => {
  // Navigate to the component
  await page.goto('http://localhost:3000/wizard3');

  // Select card image input and upload a file
  const cardInput = await page.waitForSelector('//input[@type="file" and contains(@accept, "image/")]');
  await cardInput.setInputFiles('./cardImage.png');

  // Click on the upload button for card image
  const cardUploadButton = await cardInput.xpath('./following-sibling::button');
  await cardUploadButton.click();

  // Wait for the card image to upload
  const cardSuccessMessage = await page.waitForSelector('//p[contains(@class, "success") and contains(text(), "Card image uploaded successfully!")]');

  // Select profile image input and upload a file
  const profileInput = await page.waitForSelector('//input[@type="file" and contains(@accept, "image/")]');
  await profileInput.setInputFiles('./profileImage.png');

  // Click on the upload button for profile image
  const profileUploadButton = await profileInput.xpath('./following-sibling::button');
  await profileUploadButton.click();

  // Wait for the profile image to upload
  const profileSuccessMessage = await page.waitForSelector('//p[contains(@class, "success") and contains(text(), "Profile image uploaded successfully!")]');

  // Submit the form
  const finishButton = await page.waitForSelector('//button[contains(text(), "Finish")]');
  await finishButton.click();

  // Wait for the page to navigate to the home page
  await page.waitForNavigation();

  // Assert that we are on the home page
  const heading = await page.waitForSelector('//h1[contains(text(), "Home page")]');
  expect(await heading.innerText()).toBe('Home page');
});
