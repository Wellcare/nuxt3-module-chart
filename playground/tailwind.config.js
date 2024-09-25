/** @type {import('tailwindcss').Config} */
const primeui = require('tailwindcss-primeui')

module.exports = {
    darkMode: ['selector', '[class*="p-dark"]'],
    content: [
        './assets/presets/**/*.{js,vue,ts}',
        './components/**/*.{js,vue,ts}',
        './doc/**/*.{js,vue,ts}',
        './layouts/**/*.vue',
        './pages/**/*.vue',
        './plugins/**/*.{js,ts}',
        './nuxt.config.{js,ts}',
        './app.vue',
        './error.vue',
    ],
    plugins: [primeui],
    theme: {
        extend: {
            colors: {
                primary: 'var(--p-primary-500)',
                surface: 'var(--p-surface-500)',
            },
        },
    },
}
