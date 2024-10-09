import MyModule from '../../../src/module'

export default defineNuxtConfig({
    modules: [
        MyModule,
        '@nuxtjs/i18n',
        'nuxt-marquee',
        '@primevue/nuxt-module',
        '@nuxtjs/tailwindcss',
        '@nuxtjs/color-mode',
        '@nuxt/image',
        '@vueuse/nuxt',
        '@pinia/nuxt',
        '@wellcare/nuxt3-module-data-layer',
        '@wellcare/muot-ui',
        '@vueuse/nuxt',
        'nuxt-jsonld',
        'dayjs-nuxt',
        '@nuxt/test-utils/module',
        '@nuxtjs/google-fonts',
    ],
})
