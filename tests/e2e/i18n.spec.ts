import { test, expect } from '@playwright/test';

test('hero shows portuguese tagline by default', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText('Engenheiro de software com olhar de arquiteto')).toBeVisible();
});

test('language toggle navigates to /en/ and shows english content', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: /switch language to en/i }).click();
  await expect(page).toHaveURL(/\/en\/?$/);
  await expect(page.getByText('Software engineer with an architect mindset')).toBeVisible();
});

test('html lang attribute switches with language', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('lang', 'pt-BR');
  await page.goto('/en/');
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
});
