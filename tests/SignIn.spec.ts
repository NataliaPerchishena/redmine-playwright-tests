import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { SignInPage } from '../pages/SignInPage';
import { LostPasswordPage } from '../pages/LostPasswordPage';

test('AUTH-001 - Check Sign In and Lost Password with invalid data', async ({ page }) => {
  const homePage = new HomePage(page);
  const signInPage = new SignInPage(page);
  const lostPasswordPage = new LostPasswordPage(page);

  // Step 1: Open home page and click Sign in
  await page.goto('https://www.redmine.org/');
  await homePage.clickSignIn();
  await expect(signInPage.loginField).toBeVisible();

  // Step 2: Enter invalid credentials
  await signInPage.enterInvalidCredentials('invalid_user', 'wrong_pass');
  await expect(signInPage.loginField).toHaveValue('invalid_user');
  await expect(signInPage.passwordField).toHaveValue('wrong_pass');

  // Step 3: Click Login
  await signInPage.submitLogin();
  await expect(signInPage.errorMessage).toBeVisible();

  // Step 4: Click Lost password link
  await signInPage.clickLostPassword();
  await expect(lostPasswordPage.header).toHaveText('Lost password');

  // Step 5: Enter invalid email
  await lostPasswordPage.enterInvalidEmail('invalid@email');
  await expect(lostPasswordPage.emailInput).toHaveValue('invalid@email');

  // Step 6: Submit
  await lostPasswordPage.submitRequest();
  await expect(lostPasswordPage.errorMessage).toBeVisible();
});
