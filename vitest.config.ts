import { defineVitestConfig } from '@nuxt/test-utils/config'

export default defineVitestConfig({
    root: '.',
    test: {
        globals: true,
        css: true,
        mockReset: true,
        restoreMocks: true,
        clearMocks: true,
        include: ['./tests/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
        coverage: {
            exclude: ['./src/config'],
            include: ['src/runtime/composables'],
            reporter: ['text', 'json', 'html', 'lcov'],
            reportsDirectory: './coverage',
        },
        alias: {
            '@/*': './*',
            '~/*': './*',
            '@runtime/*': './runtime',
        },
    },
})
