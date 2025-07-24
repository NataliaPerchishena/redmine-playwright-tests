import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { DeveloperGuidePage } from '../pages/DeveloperGuidePage';
import { RestApiPage } from '../pages/RestApiPage';
import { ProjectsApiPage } from '../pages/ProjectsApiPage';

test.describe('REST API navigation and visibility test', () => {
  test('API‑001 - Verify REST API documentation page and method blocks', async ({ page }) => {
    const homePage = new HomePage(page);
    const guidePage = new DeveloperGuidePage(page);
    const restApiPage = new RestApiPage(page);
    const projectsApiPage = new ProjectsApiPage(page);

    await homePage.goto();
 await expect(homePage.headerH1).toContainText('Redmine');

    await homePage.navigateToDeveloperGuide();
    await expect(page).toHaveURL(/.*Guide/);

    await guidePage.navigateToRestApi();
    await expect(page).toHaveURL(/.*Rest_api/);

    await restApiPage.navigateToProjectsApi();
    await expect(page).toHaveURL(/.*Rest_Projects/);

    await projectsApiPage.scrollToAllSections();
    for (const section of projectsApiPage.sectionLocators) {
      await expect(section).toBeVisible();
    }

await expect(projectsApiPage.parametersBlocks.first()).toBeVisible();
await expect(projectsApiPage.responseBlocks.first()).toBeVisible();

for (const section of projectsApiPage.sectionLocators) {
  const preBlock = projectsApiPage.getPreBlockAfterSection(section);
  await expect(preBlock).toBeVisible();
}

    await expect(projectsApiPage.tocSidebar).toBeVisible();

    await projectsApiPage.scrollToUpdatingProjectViaSidebar();
    await expect(projectsApiPage.updatingProjectSection).toBeInViewport();
  });


test('API‑001 - Check navigation of breadcrumbs', async ({ page }) => {
  await page.goto('https://www.redmine.org/projects/redmine/wiki/Rest_Projects');

  const breadcrumb = page.locator('p.breadcrumb');
  await expect(breadcrumb).toBeVisible();

  const initialN = 3;

  let breadcrumbLinks = breadcrumb.locator('a');
  await expect(breadcrumbLinks).toHaveCount(initialN);
  // const initialCount = await breadcrumbLinks.count();
  // expect(initialCount).toBeGreaterThan(0);

  const lastLink1 = breadcrumbLinks.nth(initialN - 1);
  const href1 = await lastLink1.getAttribute('href');
  await lastLink1.click();

  await expect(page).toHaveURL(new RegExp(`${href1}$`));

  const breadcrumbAfter1 = page.locator('p.breadcrumb a');
  await expect(breadcrumbAfter1).toHaveCount(initialN - 1);

  const lastLink2 = breadcrumbAfter1.nth(initialN - 2);
  const href2 = await lastLink2.getAttribute('href');
  await lastLink2.click();

  await expect(page).toHaveURL(new RegExp(`${href2}$`));

  const breadcrumbAfter2 = page.locator('p.breadcrumb a');
  await expect(breadcrumbAfter2).toHaveCount(initialN - 2);
});

//   test.describe.skip('Home page base tests', () => {
//   let home: HomePage;

//   test.beforeEach(async ({ page }) => {
//     home = new HomePage(page);
//     await home.goto();
//   });

//   test('h1 is visible and has correct text', async () => {
//     await home.expectHeaderVisible();
//     await expect(home.headerH1).toContainText('Redmine');
//   });

//   test('Documentation links are visible and have href', async () => {
//     await home.expectDocumentationSectionVisible();
//     await home.expectGuideLinksVisible();
//     await expect(home.usersGuideLink).toHaveAttribute('href', '/projects/redmine/wiki/Guide');
//     await expect(home.developersGuideLink).toHaveAttribute('href', '/projects/redmine/wiki/Developer_Guide');
//   });
    
// });

});



