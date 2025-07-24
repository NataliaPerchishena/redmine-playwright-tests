import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { SignInPage } from '../pages/SignInPage';
import { LostPasswordPage } from '../pages/LostPasswordPage';

test('AUTH-001 - Check Sign In and Lost Password with invalid data', async ({ page }) => {
  const homePage = new HomePage(page);
  const signInPage = new SignInPage(page);
  const lostPasswordPage = new LostPasswordPage(page);

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
