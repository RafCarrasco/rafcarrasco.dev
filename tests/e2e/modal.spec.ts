import { test, expect } from '@playwright/test';

test('clicking a project card opens its modal', async ({ page }) => {
  await page.goto('/');
  await page.locator('[data-project="exemplo-featured"]').click();
  await expect(page.locator('#project-exemplo-featured')).toBeVisible();
});

test('ESC closes the modal', async ({ page }) => {
  await page.goto('/');
  await page.locator('[data-project="exemplo-featured"]').click();
  await expect(page.locator('#project-exemplo-featured')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.locator('#project-exemplo-featured')).toBeHidden();
});

test('clicking close button closes the modal', async ({ page }) => {
  await page.goto('/');
  await page.locator('[data-project="exemplo-featured"]').click();
  await page.locator('#project-exemplo-featured .modal-close').click();
  await expect(page.locator('#project-exemplo-featured')).toBeHidden();
});

test('certificate row opens cert modal', async ({ page }) => {
  await page.goto('/');
  await page.locator('[data-cert="michigan"]').click();
  await expect(page.locator('#cert-michigan')).toBeVisible();
});
