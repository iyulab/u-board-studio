// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://board.u-platform.kr',
  output: 'static',
  trailingSlash: 'always',
  // A page's own script is a file, never written into the page: the content security policy then needs no hash or
  // 'unsafe-inline' for scripts (public/_headers).
  vite: { build: { assetsInlineLimit: 0 } },
  i18n: {
    defaultLocale: 'ko',
    locales: ['ko', 'en'],
    routing: { prefixDefaultLocale: false },
  },
});
