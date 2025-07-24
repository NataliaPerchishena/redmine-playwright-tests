import { Locator, Page, expect } from '@playwright/test';

export class IssuesPage {
  readonly page: Page;
  readonly statusCheckbox: Locator;
  readonly statusOperatorSelect: Locator;
  readonly statusValueSelect: Locator;
  readonly applyFilterButton: Locator;
  readonly issueRows: Locator;

  constructor(page: Page) {
    this.page = page;
    this.statusCheckbox = page.locator('#cb_status_id');
    this.statusOperatorSelect = page.locator('#operators_status_id');
    this.statusValueSelect = page.locator('#values_status_id_1');
    this.applyFilterButton = page.locator('a.icon.icon-checked', { hasText: 'Apply' });
    this.issueRows = page.locator('table.issues tbody tr');
  }

  async goto() {
    await this.page.goto('/issues'); // або повний шлях, якщо потрібно
  }

  async filterByStatus(status: string) {
    if (!(await this.statusCheckbox.isChecked())) {
      await this.statusCheckbox.check();
    }
    await this.statusOperatorSelect.selectOption('=');
    await this.statusValueSelect.selectOption({ label: status });
    await this.applyFilterButton.click();
  }

  async getIssueStatuses(): Promise<string[]> {
    const statusCells = this.issueRows.locator('td.status');
    const count = await statusCells.count();
    const statuses: string[] = [];
    for (let i = 0; i < count; i++) {
      statuses.push(await statusCells.nth(i).innerText());
    }
    return statuses;
  }

  async expectOnlyStatus(status: string) {
    const statuses = await this.getIssueStatuses();
    for (const s of statuses) {
      expect(s.trim()).toBe(status);
    }
  }
}
