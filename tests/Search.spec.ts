import { test, expect } from '../tests/fixtures';

test('SEARCH-001 - Verify search in news and wiki pages titles', async ({ homePage, searchPage }) => {
  const testWord = 'report';

  await homePage.goto();
  await expect(homePage.searchInput).toBeVisible();

  await homePage.searchFor(testWord);
  await expect(searchPage.searchForm).toBeVisible();

  await searchPage.checkTitlesOnly();
  await expect(searchPage.titlesOnlyCheckbox).toBeChecked();

  await searchPage.checkContentTypes(searchPage.newsCheckbox, searchPage.wikiCheckbox);
  await expect(searchPage.newsCheckbox).toBeChecked();
  await expect(searchPage.wikiCheckbox).toBeChecked();

  const otherCheckboxes = [
    searchPage.forumCheckbox,
    searchPage.projectsCheckbox,
    searchPage.issuesCheckbox,
    searchPage.changesetsCheckbox,
    searchPage.documentsCheckbox,
    searchPage.messagesCheckbox,
  ];

  for (const checkbox of otherCheckboxes) {
    await expect(checkbox).not.toBeChecked();
  }

  await searchPage.clickSearch();
  await expect(searchPage.results.first()).toBeVisible();

  const linkText = await searchPage.titleLink.innerText();
  expect(linkText?.toLowerCase()).toContain(testWord.toLowerCase());

  const resultItems = await searchPage.resultItems.all();
  for (const item of resultItems) {
    const classAttr = await item.getAttribute('class');
    expect(classAttr).toMatch(/wiki-page|news/);
  }
});
