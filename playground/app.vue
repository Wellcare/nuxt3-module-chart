<script setup lang="ts">
import { useHead } from '#imports'
import { appName } from './constants'

const localeHead = useLocaleHead({
    addDirAttribute: true,
    identifierAttribute: 'id',
    addSeoAttributes: true,
})

useHead({
    title: appName,
    titleTemplate: (t) => (t ? `${t} | Wellcare` : 'Wellcare'),
    htmlAttrs: {
        lang: localeHead.value.htmlAttrs.lang,
        dir: localeHead.value.htmlAttrs.dir,
    },

    meta: [
        { name: 'msapplication-TileColor', content: '#ffffff' },
        { name: 'theme-color', content: '#ffffff' },
    ],
})
</script>

<template>
    <NuxtLayout class="bg-white text-black dark:text-white dark:bg-black">
        <NuxtPage />
        <Toast />
    </NuxtLayout>
</template>

<style>
html,
body,
#__nuxt {
    height: 100vh;
    margin: 0;
    padding: 0;
}
</style>
