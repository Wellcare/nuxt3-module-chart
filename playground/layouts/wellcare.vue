<script setup>
import { ref } from '#imports'

const items = ref([
    {
        label: 'Company',
        root: true,
        items: [
            [
                {
                    items: [
                        {
                            label: 'Features',
                            icon: 'pi pi-list',
                            subtext: 'Subtext of item',
                        },
                        {
                            label: 'Customers',
                            icon: 'pi pi-users',
                            subtext: 'Subtext of item',
                        },
                        {
                            label: 'Case Studies',
                            icon: 'pi pi-file',
                            subtext: 'Subtext of item',
                        },
                    ],
                },
            ],
            [
                {
                    items: [
                        {
                            label: 'Solutions',
                            icon: 'pi pi-shield',
                            subtext: 'Subtext of item',
                        },
                        {
                            label: 'Faq',
                            icon: 'pi pi-question',
                            subtext: 'Subtext of item',
                        },
                        {
                            label: 'Library',
                            icon: 'pi pi-search',
                            subtext: 'Subtext of item',
                        },
                    ],
                },
            ],
            [
                {
                    items: [
                        {
                            label: 'Community',
                            icon: 'pi pi-comments',
                            subtext: 'Subtext of item',
                        },
                        {
                            label: 'Rewards',
                            icon: 'pi pi-star',
                            subtext: 'Subtext of item',
                        },
                        {
                            label: 'Investors',
                            icon: 'pi pi-globe',
                            subtext: 'Subtext of item',
                        },
                    ],
                },
            ],
            [
                {
                    items: [
                        {
                            image: 'https://primefaces.org/cdn/primevue/images/uikit/uikit-system.png',
                            label: 'GET STARTED',
                            subtext: 'Build spectacular apps in no time.',
                        },
                    ],
                },
            ],
        ],
    },
    {
        label: 'Resources',
        root: true,
    },
    {
        label: 'Contact',
        root: true,
    },
])
</script>

<template>
    <div class="flex min-h-screen flex-col">
        <div
            class="card bg-surface-50 dark:bg-surface-700 fixed left-0 right-0 top-0 z-10 shadow-lg">
            <div class="bg-primary">
                <div
                    class="container mx-auto flex items-center justify-between px-3 py-2">
                    <div class="text-white">
                        <a
                            class="cursor-pointer p-4 hover:underline"
                            href="https://wellcare.vn"
                            target="_blank">
                            Wellcare.vn
                        </a>
                        <a
                            class="cursor-pointer p-4 hover:underline"
                            href="https://khamtuxa.vn"
                            target="_blank">
                            Khamtuxa.vn
                        </a>
                    </div>
                </div>
            </div>
            <MegaMenu class="container mx-auto border-none" :model="items">
                <template #start>
                    <Image class="mr-4" src="/logo.svg" width="50" />
                </template>
            </MegaMenu>
        </div>

        <div><slot /></div>
        <WFooter
            class="mt-auto"
            :blocks="['copyright']"
            brand-name="Wellcare"
            year="2015" />
    </div>
</template>
