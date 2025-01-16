import { test, expect } from '@playwright/test';

test.describe('App component', () => {
  test('renders the App text', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await expect(page.locator('#root')).toContainText('Feffold');
  });
});
