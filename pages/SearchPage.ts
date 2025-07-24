// pages/SearchPage.ts
import { Locator, Page } from '@playwright/test';

export class SearchPage {
  readonly page: Page;
  readonly searchForm: Locator;
  readonly titlesOnlyCheckbox: Locator;
  readonly newsCheckbox: Locator;
  readonly wikiCheckbox: Locator;
  readonly forumCheckbox: Locator;
  readonly projectsCheckbox: Locator;
  readonly issuesCheckbox: Locator;
  readonly changesetsCheckbox: Locator;
  readonly documentsCheckbox: Locator;
  readonly messagesCheckbox: Locator;
  readonly searchButton: Locator;
    readonly results: Locator;
    readonly titleLink: Locator;
    readonly resultItems: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchForm = page.locator('#search-form');
    this.titlesOnlyCheckbox = page.locator('#titles_only');
    this.newsCheckbox = page.locator('#news');
    this.wikiCheckbox = page.locator('#wiki_pages');
    this.messagesCheckbox = page.locator('#messages');
    this.projectsCheckbox = page.locator('#projects');
    this.issuesCheckbox = page.locator('#issues');
    this.changesetsCheckbox = page.locator('#changesets');
    this.documentsCheckbox = page.locator('#documents');
    this.forumCheckbox = page.locator('#redmine_plugins');
    this.searchButton = page.getByRole('button', { name: 'Search' });
      this.results = page.locator('#search-results');
      this.titleLink = this.results.locator('a').first();
      this.resultItems = page.locator('#search-results dt');

      
  }

  async checkTitlesOnly() {
    await this.titlesOnlyCheckbox.check();
  }

//   async checkContentTypeNewsAndWikiOnly() {
//     await this.newsCheckbox.check();
//     await this.wikiCheckbox.check();
    //   }
    
async checkContentTypes(...checkboxes: Locator[]) {
  for (const checkbox of checkboxes) {
    await checkbox.check();
  }
}


  async clickSearch() {
    await this.searchButton.click();
  }
}