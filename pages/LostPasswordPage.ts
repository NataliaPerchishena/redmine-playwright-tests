import { Locator, Page } from '@playwright/test';

export class LostPasswordPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly submitButton: Locator;
  readonly errorMessage: Locator;
  readonly header: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.locator('#mail');
    this.submitButton = page.locator('input[type="submit"]');
    this.errorMessage = page.locator('#flash_error');
    this.header = page.locator('h2');
  }

  async enterInvalidEmail(email: string) {
    await this.emailInput.fill(email);
  }

  async submitRequest() {
    await this.submitButton.click();
  }
}