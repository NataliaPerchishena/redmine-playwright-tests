import { test, expect } from '../tests/fixtures';

test('Filter issues by "Resolved" status', async ({ page, issuesPage }) => {
  await issuesPage.goto();

  const statusToFilter = 'Resolved';
  await issuesPage.filterByStatus(statusToFilter);

  await issuesPage.expectOnlyStatus(statusToFilter);
});
