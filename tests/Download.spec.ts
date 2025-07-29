import { test, expect } from '../tests/fixtures';
// Додано для роботи з файловою системою
import * as fs from 'fs';
import * as path from 'path';

test('DL-001 - Verify latest release download link saves to disk and file exists', async ({ page, downloadPage }) => {
  const latestRelease = 'redmine-6.0.6';

  await downloadPage.goto();

  await downloadPage.scrollToLatestReleases();
  await expect(downloadPage.latestSection).toBeVisible();

  const releaseRow = downloadPage.getReleaseRow(latestRelease);
  await expect(releaseRow).toBeVisible();

  await expect(downloadPage.getTarGzLink(latestRelease)).toBeVisible();
  await expect(downloadPage.getZipLink(latestRelease)).toBeVisible();

  //Click the .zip link and verify download triggered
  const [ download ] = await Promise.all([
    page.waitForEvent('download'),
    downloadPage.clickZipLink(latestRelease)
  ]);

  // Expected file name
  const expectedFilename = `${latestRelease}.zip`;
  expect(await download.suggestedFilename()).toBe(expectedFilename);

  // Added: save file to local folder ./download
  const downloadDir = path.resolve(process.cwd(), 'download');
  const savePath = path.join(downloadDir, expectedFilename);

  // Create folder if it doesn't exist
  if (!fs.existsSync(downloadDir)) {
    fs.mkdirSync(downloadDir, { recursive: true });
  }

  // Save the file
  await download.saveAs(savePath);

  // Check that the file exists
  const fileExists = fs.existsSync(savePath);
  expect(fileExists).toBe(true);
});

// test(DL-001 - 'Verify latest release download link works', async ({ page }) => {
//   const latestRelease = 'redmine-6.0.6';
//   const downloadPage = new DownloadPage(page);

//   await downloadPage.goto();

//   await downloadPage.scrollToLatestReleases();
//   await expect(downloadPage.latestSection).toBeVisible();

//   const releaseRow = downloadPage.getReleaseRow(latestRelease);
//   await expect(releaseRow).toBeVisible();

//   await expect(downloadPage.getTarGzLink(latestRelease)).toBeVisible();
//   await expect(downloadPage.getZipLink(latestRelease)).toBeVisible();

//   const [ download ] = await Promise.all([
//     page.waitForEvent('download'),
//     downloadPage.clickZipLink(latestRelease)
//   ]);
//   expect(await download.suggestedFilename()).toBe(`${latestRelease}.zip`);
// });

