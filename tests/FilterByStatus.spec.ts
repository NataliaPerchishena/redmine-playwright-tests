import { test, expect } from '@playwright/test';
import { IssuesPage } from '../pages/IssuesPage';

test('Filter issues by "Resolved" status', async ({ page }) => {
  const issuesPage = new IssuesPage(page);
  await issuesPage.goto();

  const statusToFilter = 'Resolved';
  await issuesPage.filterByStatus(statusToFilter);

  await issuesPage.expectOnlyStatus(statusToFilter);
});
