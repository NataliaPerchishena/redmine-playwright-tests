import { Page, Locator } from '@playwright/test';

export class RestApiPage {
  readonly page: Page;
  readonly projectsApiLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.projectsApiLink = page.locator('a[href="/projects/redmine/wiki/Rest_Projects"]');
  }

  async navigateToProjectsApi() {
    await this.projectsApiLink.click();
  }
} 
