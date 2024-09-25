import dotEnv from 'dotenv'
import { defineNuxtConfig } from 'nuxt/config'
import {
    app,
    googleFont,
    i18n,
    image,
    module,
    nitro,
    primevue,
    runtimeConfig,
} from './configs'

dotEnv.config({ path: '../.env' })

const env: any = process.env
export default defineNuxtConfig({
    ssr: false,
    runtimeConfig,
    modules: [
        '@vueuse/nuxt',
        'nuxt-jsonld',
        '@nuxtjs/critters',
        'dayjs-nuxt',
        '@nuxt/test-utils/module',
        ['@nuxtjs/google-fonts', googleFont],
        ['../src/module', module],
        ['@nuxtjs/i18n', i18n],
        'nuxt-marquee',
        '@primevue/nuxt-module',
        '@nuxtjs/tailwindcss',
        '@nuxtjs/color-mode',
        '@nuxt/image',
    ],
    css: ['~/assets/css/index.css', 'primeicons/primeicons.css'],
    devtools: {
        enabled: env.NUXT_DEVTOPS_ENABLED === 'true',
        timeline: {
            enabled: env.NUXT_DEVTOPS_TIMELINE_ENABLED === 'true',
        },
    },
    app,
    nitro,
    tailwindcss: {
        config: {
            plugins: [require('tailwindcss-primeui')],
            content: [
                './assets/presets/**/*.{js,vue,ts}',
                './layouts/**/*.vue',
                './pages/**/*.vue',
                './components/**/*.{js,vue,ts}',
                '../src/runtime/components/**/*.{js,vue,ts}',
                './app.vue',
            ],
            darkMode: 'class',
        },
    },
    primevue,
    image,
})
