import { Page, Locator } from '@playwright/test';

export class ProjectsApiPage {
  readonly page: Page;

  readonly sectionLocators: Locator[];

  readonly listingProjectsSection: Locator;
  readonly showingProjectSection: Locator;
  readonly creatingProjectSection: Locator;
  readonly updatingProjectSection: Locator;
  readonly archivingProjectSection: Locator;
  readonly unarchivingProjectSection: Locator;
  readonly deletingProjectSection: Locator;
  readonly parametersBlocks: Locator;
  readonly responseBlocks: Locator;
  readonly tocSidebar: Locator;
  readonly updatingProjectTocLink: Locator;
  readonly breadcrumb: Locator;
  readonly breadcrumbLinks: Locator;
  constructor(page: Page) {
    this.page = page;

    this.listingProjectsSection = page.locator('h2', { hasText: 'Listing projects' });
    this.showingProjectSection = page.locator('h2', { hasText: 'Showing a project' });
    this.creatingProjectSection = page.locator('h2', { hasText: 'Creating a project' });
    this.updatingProjectSection = page.locator('h2', { hasText: 'Updating a project' });
    this.archivingProjectSection = page.getByRole('heading', { name: 'Archiving a project', exact: true });
    this.unarchivingProjectSection = page.locator('h2', { hasText: 'Unarchiving a project' });
    this.deletingProjectSection = page.locator('h2', { hasText: 'Deleting a project' });
    this.breadcrumb = page.locator('p.breadcrumb');
    this.breadcrumbLinks = this.breadcrumb.locator('a');

    this.sectionLocators = [
      this.listingProjectsSection,
      this.showingProjectSection,
      this.creatingProjectSection,
      this.updatingProjectSection,
      this.archivingProjectSection,
      this.unarchivingProjectSection,
      this.deletingProjectSection,
    ];

this.parametersBlocks = page.locator('#content ins', { hasText: 'Parameters' });
this.responseBlocks = page.locator('#content ins', { hasText: 'Response' });

    this.tocSidebar = page.locator('.toc.right');
    this.updatingProjectTocLink = this.tocSidebar.locator('a', { hasText: 'Updating a project' });
  }
  
getPreBlockAfterSection(section: Locator): Locator {
    return section.locator('xpath=following-sibling::pre[1]');
  }
  async scrollToAllSections() {
    for (const section of this.sectionLocators) {
      await section.scrollIntoViewIfNeeded();
    }
  }

  async scrollToUpdatingProjectViaSidebar() {
    await this.tocSidebar.scrollIntoViewIfNeeded();
    await this.updatingProjectTocLink.click();
    await this.updatingProjectSection.scrollIntoViewIfNeeded();
  }
}
