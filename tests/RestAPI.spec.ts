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

    // Step 1: Open home page
    await homePage.goto();
 await expect(homePage.headerH1).toContainText('Redmine');

    // Step 2: Navigate to Developer Guide
    await homePage.navigateToDeveloperGuide();
    await expect(page).toHaveURL(/.*Guide/);

    // Step 3: Navigate to Redmine REST API
    await guidePage.navigateToRestApi();
    await expect(page).toHaveURL(/.*Rest_api/);

    // Step 4: Navigate to Projects API page
    await restApiPage.navigateToProjectsApi();
    await expect(page).toHaveURL(/.*Rest_Projects/);

    // Step 5: Scroll to all sections and verify visibility
    await projectsApiPage.scrollToAllSections();
    for (const section of projectsApiPage.sectionLocators) {
      await expect(section).toBeVisible();
    }

    // Step 6: Check that Parameters and Response blocks are present
await expect(projectsApiPage.parametersBlocks.first()).toBeVisible();
await expect(projectsApiPage.responseBlocks.first()).toBeVisible();


// Step 7: Check each section contains a code example block (<pre>)
for (const section of projectsApiPage.sectionLocators) {
  const preBlock = projectsApiPage.getPreBlockAfterSection(section);
  await expect(preBlock).toBeVisible();
}

    // Step 8: Check TOC sidebar is visible
    await expect(projectsApiPage.tocSidebar).toBeVisible();

    // Step 9: Navigate via TOC to 'Updating a project' and verify it's in viewport
    await projectsApiPage.scrollToUpdatingProjectViaSidebar();
    await expect(projectsApiPage.updatingProjectSection).toBeInViewport();
  });


test('API‑001 - Check navigation of breadcrumbs', async ({ page }) => {
  // Step 0: Open the initial page
  await page.goto('https://www.redmine.org/projects/redmine/wiki/Rest_Projects');

  // Step 1: Ensure breadcrumbs are visible
  const breadcrumb = page.locator('p.breadcrumb');
  await expect(breadcrumb).toBeVisible();

  // Step 2: Define initial N
  const initialN = 3;

  // Step 3: Verify breadcrumbs have N links
  let breadcrumbLinks = breadcrumb.locator('a');
  await expect(breadcrumbLinks).toHaveCount(initialN);
  // const initialCount = await breadcrumbLinks.count();
  // expect(initialCount).toBeGreaterThan(0);

  // Step 4: Click the last link in breadcrumbs
  const lastLink1 = breadcrumbLinks.nth(initialN - 1);
  const href1 = await lastLink1.getAttribute('href');
  await lastLink1.click();

  // Step 5: Verify that the page opened matches the href
  await expect(page).toHaveURL(new RegExp(`${href1}$`));

  // Step 6: Verify breadcrumbs now have N-1 links
  const breadcrumbAfter1 = page.locator('p.breadcrumb a');
  await expect(breadcrumbAfter1).toHaveCount(initialN - 1);

  // Step 7: Click the last link again
  const lastLink2 = breadcrumbAfter1.nth(initialN - 2);
  const href2 = await lastLink2.getAttribute('href');
  await lastLink2.click();

  // Step 8: Verify that the page opened matches
  await expect(page).toHaveURL(new RegExp(`${href2}$`));

  // Step 9: Verify breadcrumbs now have N-2 links
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



