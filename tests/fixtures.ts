// tests/fixtures.ts
import { test as base, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { SearchPage } from '../pages/SearchPage';
import { DownloadPage } from '../pages/DownloadPage';
import { IssuesPage } from '../pages/IssuesPage';
import { SignInPage } from '../pages/SignInPage';
import { LostPasswordPage } from '../pages/LostPasswordPage';
import { DeveloperGuidePage } from '../pages/DeveloperGuidePage';
import { RestApiPage } from '../pages/RestApiPage';
import { ProjectsApiPage } from '../pages/ProjectsApiPage';

export const test = base.extend<{
  homePage: HomePage;
  searchPage: SearchPage;
  downloadPage: DownloadPage;
    issuesPage: IssuesPage;
    signInPage: SignInPage;
    lostPasswordPage: LostPasswordPage;
    guidePage: DeveloperGuidePage;
    restApiPage: RestApiPage;
    projectsApiPage: ProjectsApiPage;
}>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
    },
    guidePage: async ({ page }, use) => {
    await use(new DeveloperGuidePage (page));
    },
    restApiPage: async ({ page }, use) => {
    await use(new RestApiPage (page));
    },
    projectsApiPage: async ({ page }, use) => {
    await use(new ProjectsApiPage (page));
  },
  searchPage: async ({ page }, use) => {
    await use(new SearchPage(page));
  },
  downloadPage: async ({ page }, use) => {
    await use(new DownloadPage(page));
  },
  issuesPage: async ({ page }, use) => {
    await use(new IssuesPage(page));
    },
  signInPage: async ({ page }, use) => {
    await use(new SignInPage(page));
    },
   lostPasswordPage: async ({ page }, use) => {
    await use(new LostPasswordPage(page));
  },
});

export { expect };
