import { ui, defaultLang, type Lang, type UIKey } from './ui';

export function getLangFromUrl(url: URL): Lang {
  const [, lang] = url.pathname.split('/');
  if (lang in ui) return lang as Lang;
  return defaultLang;
}

export function useTranslations(lang: Lang) {
  return function t(key: UIKey): string {
    return ui[lang][key] ?? ui[defaultLang][key];
  };
}

export function pathForLang(lang: Lang, path = ''): string {
  const clean = path.replace(/^\/+/, '');
  if (lang === defaultLang) return `/${clean}`;
  return `/${lang}/${clean}`;
}
