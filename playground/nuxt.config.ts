import {
    app,
    googleFont,
    i18n,
    module,
    nitro,
    primevue,
    runtimeConfig,
    tailwindcss,
    vite,
} from './configs'

export default defineNuxtConfig({
    ssr: false,

    runtimeConfig,

    devtools: {
        enabled: true,

        timeline: {
            enabled: true,
        },
    },

    colorMode: {
        classPrefix: 'p-',
        classSuffix: '',
    },

    css: [
        '~/assets/styles/tailwind.css',
        '~/assets/styles/base.css',
        '~/assets/styles/scrollbar.css',
        'primeicons/primeicons.css',
    ],

    modules: [
        '@wellcare/nuxt3-module-data-layer',
        '@wellcare/muot-ui',
        '@vueuse/nuxt',
        'nuxt-jsonld',
        'dayjs-nuxt',
        '@nuxt/test-utils/module',
        ['@nuxtjs/google-fonts', googleFont],
        ['../src/module', module],
        'nuxt-marquee',
        '@primevue/nuxt-module',
        '@nuxtjs/tailwindcss',
        '@nuxtjs/color-mode',
        '@nuxt/image',
        '@vueuse/nuxt',
        '@pinia/nuxt',
        '@nuxtjs/i18n',
    ],

    primevue,

    postcss: {
        plugins: {
            'postcss-import': {},
            tailwindcss: {},
            autoprefixer: {},
        },
    },

    i18n,

    app,

    nitro,

    tailwindcss,

    vite,

    compatibilityDate: '2024-09-25',
})