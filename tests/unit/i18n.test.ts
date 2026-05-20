import { describe, it, expect } from 'vitest';
import { getLangFromUrl, useTranslations, pathForLang } from '../../src/i18n/utils';

describe('getLangFromUrl', () => {
  it('returns "pt" for /', () => {
    expect(getLangFromUrl(new URL('http://localhost/'))).toBe('pt');
  });

  it('returns "pt" for /about (default locale, no prefix)', () => {
    expect(getLangFromUrl(new URL('http://localhost/about'))).toBe('pt');
  });

  it('returns "en" for /en', () => {
    expect(getLangFromUrl(new URL('http://localhost/en'))).toBe('en');
  });

  it('returns "en" for /en/projects', () => {
    expect(getLangFromUrl(new URL('http://localhost/en/projects'))).toBe('en');
  });
});

describe('useTranslations', () => {
  it('returns Portuguese strings for "pt"', () => {
    const t = useTranslations('pt');
    expect(t('nav.about')).toBe('SOBRE');
  });

  it('returns English strings for "en"', () => {
    const t = useTranslations('en');
    expect(t('nav.about')).toBe('ABOUT');
  });
});

describe('pathForLang', () => {
  it('returns root path for default lang', () => {
    expect(pathForLang('pt', '')).toBe('/');
    expect(pathForLang('pt', 'projects')).toBe('/projects');
  });

  it('prefixes /en/ for English', () => {
    expect(pathForLang('en', '')).toBe('/en/');
    expect(pathForLang('en', 'projects')).toBe('/en/projects');
  });
});
