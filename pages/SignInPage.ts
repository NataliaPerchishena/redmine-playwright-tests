import { Locator, Page } from '@playwright/test';

export class SignInPage {
  readonly page: Page;
  readonly loginField: Locator;
  readonly passwordField: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;
  readonly lostPasswordLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loginField = page.locator('#username');
    this.passwordField = page.locator('#password');
    this.loginButton = page.locator('#login-submit');
    this.errorMessage = page.locator('#flash_error');
    this.lostPasswordLink = page.locator('a.lost_password');
  }

  async enterInvalidCredentials(login: string, password: string) {
    await this.loginField.fill(login);
    await this.passwordField.fill(password);
  }

  async submitLogin() {
    await this.loginButton.click();
  }

  async clickLostPassword() {
    await this.lostPasswordLink.click();
  }
}