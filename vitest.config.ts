import { defineVitestConfig } from '@nuxt/test-utils/config'

export default defineVitestConfig({
  test: {
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
      ],
      all: false,
      thresholds: {
        lines: 0, // TODO: Increase to 80% when production code has tests (Story 2.x+)
        functions: 0,
        branches: 0,
        statements: 0,
        perFile: true,
      },
    },
  },
})
