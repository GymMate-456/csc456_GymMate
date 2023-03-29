// sign_in.test.js
// @ts-check
const { chromium } = require('playwright');

describe('Signin', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await chromium.launch();
    page = await browser.newPage();
    await page.goto('http://localhost:3000/signin');
  afterAll(async () => {
    await browser.close();
  });

  it('should allow user to sign in', async () => {
    // Fill the form
    await page.fill('#email-input', 'test@example.com');
    await page.fill('#password-input', 'password123');
    await page.click('#signin-button');

    // Wait for the page to navigate to verify the successful signin logic as expected
    await page.waitForNavigation();

    // Verify the user is signed in
    const title = await page.title();
    expect(title).toBe('Welcome Back');
  });
  ////test for forgot password
  //await page.click('#forgotpassword-button');
  ////test for new here join now
  //await page.click('#signup-button');
});
});

