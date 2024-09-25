<template>
    <nav v-if="!loading" aria-label="Breadcrumb" class="text-sm">
        <ol class="-my-1 flex list-none flex-wrap p-0">
            <li class="my-1 flex flex-wrap items-center">
                <router-link
                    :to="home.route"
                    class="text-gray-500 hover:text-gray-700">
                    <i :class="[home.icon, 'mr-1']"></i>
                    {{ home.label }}
                </router-link>
            </li>
            <li
                v-for="(item, index) in model"
                :key="index"
                class="my-1 flex flex-wrap items-center">
                <svg
                    class="mx-2 h-3 w-3 self-center fill-current text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 320 512">
                    <path
                        d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z" />
                </svg>
                <router-link
                    v-if="item.route"
                    :to="item.route"
                    class="text-gray-500 hover:text-gray-700"
                    :class="{
                        'font-semibold text-gray-900':
                            index === model.length - 1,
                    }">
                    {{ item.label }}
                </router-link>
                <span
                    v-else
                    class="text-gray-500"
                    :class="{
                        'font-semibold text-gray-900':
                            index === model.length - 1,
                    }">
                    {{ item.label }}
                </span>
            </li>
        </ol>
    </nav>
    <div v-else class="h-6 w-full animate-pulse rounded bg-gray-200"></div>
</template>

<script setup lang="ts">
import { useJsonld } from '#imports'
import type { PropType } from 'vue'
import { computed } from 'vue'

export interface BreadcrumbItem {
    label: string
    route?: string
    icon?: string
}

const props = defineProps({
    home: {
        type: Object as PropType<BreadcrumbItem>,
        default: () => ({
            label: 'Home',
            route: 'home',
            icon: 'pi pi-home',
        }),
    },
    model: {
        type: Array as PropType<BreadcrumbItem[]>,
        required: true,
    },
    loading: {
        type: Boolean,
        default: false,
    },
})

const jsonLdData = computed(() => ({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
        {
            '@type': 'ListItem',
            position: 1,
            name: props.home.label,
            item: props.home.route,
        },
        ...props.model.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 2,
            name: item.label,
            item: item.route,
        })),
    ],
}))

useJsonld(() => jsonLdData.value)
</script>
