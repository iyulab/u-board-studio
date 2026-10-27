import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // The library is processed like source, so a test's `vi.mock` of a package reaches the library's own imports too.
    server: { deps: { inline: ['@iyulab/u-board'] } },
    environment: 'jsdom',
    globals: true,
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    setupFiles: ['./vitest.setup.ts'],
  },
});
