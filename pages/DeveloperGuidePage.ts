import { Page, Locator } from '@playwright/test';

export class DeveloperGuidePage {
  readonly page: Page;
  readonly redmineRestApiLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.redmineRestApiLink = page.locator('a', { hasText: 'Redmine REST API' });
  }

  async navigateToRestApi() {
    await this.redmineRestApiLink.click();
  }
} 
