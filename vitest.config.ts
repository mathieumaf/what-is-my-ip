import { defineVitestConfig } from '@nuxt/test-utils/config'

export default defineVitestConfig({
  test: {
    include: ['tests/unit/**/*.test.ts'],
    exclude: ['tests/e2e/**', 'node_modules/**', '.nuxt/**'],
    environment: 'nuxt',
    environmentOptions: {
      nuxt: {
        domEnvironment: 'happy-dom',
        mock: {
          intersectionObserver: true,
          indexedDb: true,
        },
      },
    },
    globals: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      include: ['app/**/*.{ts,tsx,vue}', 'server/**/*.ts', 'types/**/*.ts'],
      exclude: [
        'node_modules/',
        'tests/',
        '.nuxt/',
        '.output/',
        '**/*.d.ts',
        '**/*.config.*',
        '**/mockData',
        // TODO: Remove these exclusions when tests are added for existing code
        'app/pages/**',
        'app/layouts/**',
        'types/**',
      ],
      all: true,
      thresholds: {
        lines: 100,
        functions: 100,
        branches: 100,
        statements: 100,
        perFile: true,
      },
    },
  },
})
