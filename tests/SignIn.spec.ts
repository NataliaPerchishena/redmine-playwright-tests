import { test, expect } from '../tests/fixtures';

test('AUTH-001 - Check Sign In and Lost Password with invalid data', async ({ page,
  homePage,
  signInPage,
  lostPasswordPage, }) => {

  await page.goto('https://www.redmine.org/');
  await homePage.clickSignIn();
  await expect(signInPage.loginField).toBeVisible();

  await signInPage.enterInvalidCredentials('invalid_user', 'invalid_pass');
  await expect(signInPage.loginField).toHaveValue('invalid_user');
  await expect(signInPage.passwordField).toHaveValue('invalid_pass');

  await signInPage.submitLogin();
  await expect(signInPage.errorMessage).toBeVisible();

  await signInPage.clickLostPassword();
  await expect(lostPasswordPage.header).toHaveText('Lost password');

  await lostPasswordPage.enterInvalidEmail('invalid@email');
  await expect(lostPasswordPage.emailInput).toHaveValue('invalid@email');

  await lostPasswordPage.submitRequest();
  await expect(lostPasswordPage.errorMessage).toBeVisible();
});
