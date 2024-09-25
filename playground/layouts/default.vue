<!-- layouts/default.vue -->
<script setup lang="ts">
const { setLocale } = useI18n()
const router = useRouter()

const routes = computed(() => router.options.routes)
const menu = ref()

const items = ref([
    {
        label: 'Language',
        icon: 'pi pi-fw pi-language',
        items: [
            {
                label: 'English',
                command: () => setLocale('en'),
            },
            {
                label: 'Tiếng Việt',
                command: () => setLocale('vi'),
            },
        ],
    },
])

const toggleMenu = (event: Event) => {
    menu.value.toggle(event)
}
</script>

<template>
    <div class="flex min-h-screen flex-col">
        <!-- Navigation -->
        <Menubar>
            <template #start>
                <NuxtLink to="/">
                    <img src="/logo.svg" alt="Logo" class="mr-2 h-8" />
                </NuxtLink>
            </template>
            <template #end>
                <div class="flex items-center">
                    <NuxtLink
                        v-for="(route, index) of routes"
                        :key="index"
                        :to="route.path"
                        class="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                        {{ route.name }}
                    </NuxtLink>
                    <SwitchDarkMode class="mx-2 h-10 w-10" />
                    <Button
                        icon="pi pi-bars"
                        aria-haspopup="true"
                        aria-controls="overlay_menu"
                        class="h-10 w-10"
                        @click="toggleMenu" />
                </div>
            </template>
        </Menubar>

        <Menu id="overlay_menu" ref="menu" :model="items" :popup="true" />

        <!-- Main content -->
        <div class="mx-auto w-full max-w-7xl flex-grow py-6 sm:px-6 lg:px-8">
            <div class="px-4 py-6 sm:px-0">
                <NuxtPage />
            </div>
        </div>

        <!-- Footer -->
        <footer class="mt-auto bg-white shadow-md dark:bg-gray-800">
            <div class="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
                <p class="text-center text-gray-500 dark:text-gray-400">
                    © {{ new Date().getFullYear() }} Your Company Name. All
                    rights reserved.
                </p>
            </div>
        </footer>
    </div>
</template>

<style scoped>
/* Add any additional styles here if needed */
</style>
