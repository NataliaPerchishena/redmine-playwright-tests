import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  retries: 0,
    use: {

      baseURL: 'https://www.redmine.org',

    headless: true,
    screenshot: 'only-on-failure',
      video: 'retain-on-failure',
    // screenshot: 'off',
    // video: 'off',
    // trace: 'off',
  },
  reporter: [
    ['list'],
    ['allure-playwright']
  ],
});
