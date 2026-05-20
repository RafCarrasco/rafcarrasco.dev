import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://rafcarrasco.dev',
  i18n: {
    defaultLocale: 'pt',
    locales: ['pt', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
