import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  // TODO: trocar para 'https://rafcarrasco.dev' quando o domínio for comprado.
  // Até lá, aponta para a URL real da Vercel para que canonical/OG resolvam.
  site: 'https://rafaelcarrasco-dev.vercel.app',
  i18n: {
    defaultLocale: 'pt',
    locales: ['pt', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'pt',
        locales: { pt: 'pt-BR', en: 'en' },
      },
    }),
  ],
});
