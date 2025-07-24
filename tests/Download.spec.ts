import { test, expect } from '@playwright/test';
import { DownloadPage } from '../pages/DownloadPage';
// Додано для роботи з файловою системою
import * as fs from 'fs';
import * as path from 'path';

test('DL-001 - Verify latest release download link saves to disk and file exists', async ({ page }) => {
  const latestRelease = 'redmine-6.0.6';
  const downloadPage = new DownloadPage(page);

  await downloadPage.goto();

  // 1. Scroll to 'Latest releases' section
  await downloadPage.scrollToLatestReleases();
  await expect(downloadPage.latestSection).toBeVisible();

  // 2. Check that the table contains the latest release
  const releaseRow = downloadPage.getReleaseRow(latestRelease);
  await expect(releaseRow).toBeVisible();

  // 3. Check both .tar.gz and .zip links exist
  await expect(downloadPage.getTarGzLink(latestRelease)).toBeVisible();
  await expect(downloadPage.getZipLink(latestRelease)).toBeVisible();

  // 4. Click the .zip link and verify download triggered
  const [ download ] = await Promise.all([
    page.waitForEvent('download'),
    downloadPage.clickZipLink(latestRelease)
  ]);

  // Очікуване ім’я файлу
  const expectedFilename = `${latestRelease}.zip`;
  expect(await download.suggestedFilename()).toBe(expectedFilename);

  // Додано: зберігаємо файл у локальну папку ./download
  const downloadDir = path.resolve(process.cwd(), 'download');
  const savePath = path.join(downloadDir, expectedFilename);

  // Створити папку, якщо не існує
  if (!fs.existsSync(downloadDir)) {
    fs.mkdirSync(downloadDir, { recursive: true });
  }

  // Зберігаємо файл
  await download.saveAs(savePath);

  // Перевіряємо, що файл існує
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

