import { Page, Locator } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly headerH1: Locator;
  readonly documentationHeader: Locator;
    readonly usersGuideLink: Locator;
  readonly developersGuideLink: Locator;
  readonly signInLink: Locator;
  readonly searchInput: Locator;

  constructor(page: Page) {
    this.page = page;
    this.headerH1 = page.locator('#content h1');
    this.documentationHeader = page.locator('#content h2', { hasText: 'Documentation' });
    this.usersGuideLink = page.locator('#content a', { hasText: "User's Guide" });
    this.developersGuideLink = page.locator('#content a', { hasText: "Developer's Guide" });
    this.signInLink = page.locator('a.login');
    this.searchInput = page.locator('#q');
  }

  async goto() {
    await this.page.goto('/');
  }

  async expectHeaderVisible() {
    await this.headerH1.waitFor({ state: 'visible' });
  }

  async expectDocumentationSectionVisible() {
    await this.documentationHeader.waitFor({ state: 'visible' });
  }

  async expectGuideLinksVisible() {
    await this.usersGuideLink.waitFor({ state: 'visible' });
    await this.developersGuideLink.waitFor({ state: 'visible' });
  }
    async navigateToDeveloperGuide() {
    await this.documentationHeader.scrollIntoViewIfNeeded();
    await this.developersGuideLink.click();
    }
  
  async clickSignIn() {
    await this.signInLink.click();
  }
  async searchFor(term: string) {
    await this.searchInput.fill(term);
    await this.searchInput.press('Enter');
  }
  
}