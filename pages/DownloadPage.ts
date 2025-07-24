import { Locator, Page } from '@playwright/test';

export class DownloadPage {
  readonly page: Page;
  readonly latestSection: Locator;

  constructor(page: Page) {
    this.page = page;
    this.latestSection = page.locator('h2', { hasText: 'Latest releases' });
  }

  async goto() {
    await this.page.goto('/projects/redmine/wiki/Download');
  }

  async scrollToLatestReleases() {
    await this.latestSection.scrollIntoViewIfNeeded();
    await this.latestSection.waitFor({ state: 'visible' });
  }

  getReleaseRow(release: string): Locator {
    return this.page.locator(`xpath=//table//tr[td[contains(text(), "${release}")]]`);
  }

  getTarGzLink(release: string): Locator {
    return this.page.locator(`a[href$="${release}.tar.gz"]`);
  }

  getZipLink(release: string): Locator {
    return this.page.locator(`a[href$="${release}.zip"]`);
  }

  async clickZipLink(release: string) {
    const zipLink = this.getZipLink(release);
    await zipLink.scrollIntoViewIfNeeded();
    await zipLink.click();
  }
}
