<script lang="ts" setup>
import type { PropType } from '#imports'
import type { MenuItem } from '../../models'

export type BlockType =
    | 'copyright'
    | 'brand'
    | 'brand-social-links'
    | 'sitemap'
    | 'appstores'
    | 'contact'
    | 'certificates'

const {
    year,
    sitemapLinks,
    brandName,
    brandDescription,
    brandLogo,
    socialLinks,
    blocks,
    appstores,
    contact,
    certificates,
} = defineProps({
    year: {
        type: String,
        default: new Date().getFullYear().toString(),
    },
    sitemapLinks: {
        type: Array as PropType<MenuItem[]>,
        default: () => [],
    },
    brandName: {
        type: String,
        default: '',
    },
    brandDescription: {
        type: String,
        default: '',
    },
    brandLogo: {
        type: String,
        default: '',
    },
    socialLinks: {
        type: Array as PropType<MenuItem[]>,
        default: () => [],
    },
    blocks: {
        type: Array as PropType<BlockType[]>,
        default: () => [
            'copyright',
            'brand',
            'brand-social-links',
            'sitemap',
            'appstores',
            'contact',
            'certificates',
        ],
    },
    appstores: {
        type: Array as PropType<MenuItem[]>,
        default: () => [],
    },
    contact: {
        type: Array as PropType<MenuItem[]>,
        default: () => [],
    },
    certificates: {
        type: Array as PropType<MenuItem[]>,
        default: () => [],
    },
})

const thisYear = new Date().getFullYear().toString()
</script>

<template>
    <footer class="bg-white p-4 sm:p-6 dark:bg-gray-800">
        <div class="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
            <div class="md:flex md:justify-between">
                <div class="flex-[4] md:flex md:flex-col">
                    <slot v-if="blocks.includes('brand')" name="brand">
                        <div class="mb-6 w-full md:mb-0">
                            <a :href="brandLogo" class="flex items-center">
                                <img
                                    :src="brandLogo"
                                    class="mr-2 h-12 w-12 rounded-full"
                                    alt="Your Brand Logo" />
                                <p
                                    class="self-center text-base font-semibold dark:text-white">
                                    {{ brandName }}
                                </p>
                            </a>
                            <p
                                class="my-6 text-sm leading-loose text-gray-500 dark:text-gray-400">
                                {{ brandDescription }}
                            </p>
                        </div>
                    </slot>
                    <slot
                        v-if="blocks.includes('brand-social-links')"
                        name="brand-social-links">
                        <ButtonGroup>
                            <NuxtLink
                                v-for="link in socialLinks"
                                :key="link.route"
                                :to="link.route"
                                target="_blank"
                                rel="noopener noreferrer nofollow">
                                <Button
                                    :icon="link.icon"
                                    :aria-label="link.label"
                                    severity="info"
                                    size="large"
                                    text />
                            </NuxtLink>
                        </ButtonGroup>
                    </slot>
                    <slot v-if="blocks.includes('appstores')" name="appstores">
                        <div class="m-0 py-3">
                            <span class="mt-2 text-sm font-bold"
                                >DOWNLOAD THE APP</span
                            >
                            <div class="mt-5 flex flex-row space-x-2">
                                <NuxtLink
                                    v-for="link in appstores"
                                    :key="link.route"
                                    :to="link.route"
                                    rel="noopener noreferrer nofollow"
                                    target="_blank">
                                    <Button class="!px-0 !py-0">
                                        <NuxtImg
                                            :src="link.icon"
                                            height="50"
                                            width="150"
                                            :alt="link.route" />
                                    </Button>
                                </NuxtLink>
                            </div>
                        </div>
                    </slot>
                    <slot
                        v-if="blocks.includes('certificates')"
                        name="certificates">
                        <div class="m-0 flex flex-col rounded-lg py-3">
                            <div>
                                <span class="mt-2 text-sm font-bold"
                                    >CERTIFICATES</span
                                >
                            </div>

                            <div class="flex flex-row space-x-3">
                                <NuxtLink
                                    v-for="link in certificates"
                                    :key="link.route"
                                    class="mt-5"
                                    :to="link.route"
                                    target="_blank"
                                    rel="noopener noreferrer nofollow">
                                    <NuxtImg
                                        :src="link.icon"
                                        :class="[
                                            'w-24 object-cover',
                                            {
                                                invert:
                                                    $colorMode.value == 'dark',
                                            },
                                        ]"
                                        :alt="link.route" />
                                </NuxtLink>
                            </div>
                        </div>
                    </slot>
                </div>
                <slot v-if="blocks.includes('sitemap')" name="sitemap">
                    <div
                        class="grid flex-[8] grid-cols-2 gap-8 sm:grid-cols-3 sm:gap-6">
                        <Menu
                            v-for="link in sitemapLinks"
                            :key="link.label"
                            :model="[link]" />
                    </div>
                </slot>
            </div>

            <Divider />
            <div class="sm:flex sm:items-center sm:justify-between">
                <slot v-if="blocks.includes('contact')" name="contact">
                    <a
                        v-for="link in contact"
                        :key="link.label"
                        class="text-sm text-gray-500 hover:underline sm:text-center dark:text-gray-400"
                        :to="link.route">
                        <i :class="link.icon" /> {{ link.label }}
                    </a>
                </slot>
                <slot v-if="blocks.includes('copyright')" name="copyright">
                    <div class="sm:flex sm:items-center sm:justify-between">
                        <span
                            class="text-sm text-gray-500 sm:text-center dark:text-gray-400"
                            >© {{ year }} - {{ thisYear }}
                            <a to="/" class="hover:underline">{{ brandName }}</a
                            >. All Rights Reserved.
                        </span>
                    </div>
                </slot>
            </div>
        </div>
    </footer>
</template>
