//header.test.js
const { test, expect } = require('@playwright/test');

test('Header should render correctly', async ({ page }) => {
  // Navigate to the page where the Header component is rendered
  await page.goto('http://localhost:3000'); 

  // Find the left button (Profile button)
  const leftButton = await page.waitForSelector('//header//a[contains(@href, "/profile")]/img[@alt="Profile Icon"]');

  // Find the logo button
  const logoButton = await page.waitForSelector('//header//a[contains(@href, "/")]/img[@alt="Logo"]');

  // Find the right button (Search button)
  const rightButton = await page.waitForSelector('//header//a[contains(@href, "/searchGyms")]/img[@alt="Search Icon"]');

  // Find the second right button (Chat button)
  const rightButton2 = await page.waitForSelector('//header//a[contains(@href, "/chat")]/img[@alt="Chat Icon"]');

  // Find the back button (Arrow back button)
  const backButton = await page.waitForSelector('//header//a[contains(@href, "/chat")]/svg');

  // Assert that all the buttons are visible
  await expect(leftButton).toBeVisible();
  await expect(logoButton).toBeVisible();
  await expect(rightButton).toBeVisible();
  await expect(rightButton2).toBeVisible();
  await expect(backButton).toBeVisible();
});
