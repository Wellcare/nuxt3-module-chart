<script setup lang="ts">
const { locale, setLocale } = useI18n()
</script>

<template>
    <div class="flex h-screen flex-col items-center justify-center">
        <h1 class="text-primary-500 text-4xl font-bold dark:text-red-600">
            Welcome to the Home Page
        </h1>
        <p class="mt-4 text-lg">
            This is a simple example of a home page using Vue 3 and Tailwind
            CSS.
        </p>

        <p>{{ locale }}</p>

        <Button @click="setLocale('en')">en</Button>
        <Button @click="setLocale('vi')">vi</Button>

        <p>{{ $t('welcome') }}</p>

        <SwitchDarkMode />

        <WDemo />
    </div>
</template>
