<script lang="ts" setup>
import type { PropType } from '#imports'
import type { ICtaSectionItem } from '../../../models/'
import type { CtaSectionBlockType } from '../../../types/'

import TitlePanel from '../title-panel.vue'

defineProps({
    blocks: {
        type: Array as PropType<CtaSectionBlockType[]>,
        default: () => [],
    },
    title: {
        type: String,
        default: '',
    },
    subTitle: {
        type: String,
        default: '',
    },
    items: {
        type: Array as PropType<ICtaSectionItem>,
        default: () => [],
    },
})
</script>

<template>
    <section>
        <TitlePanel
            :blocks="['title', 'sub-title']"
            :title="title"
            :sub-title="subTitle" />
        <div
            v-for="(item, index) in items"
            :key="index"
            :class="`
                    mx-auto
                    mt-8
                    px-4
                    lg:px-6
                    gap-8
                    xl:gap-12
                    items-center
                    max-w-screen-xl
                    md:grid
                    md:grid-cols-2
                    `">
            <NuxtImg
                v-if="item.image.src"
                class="image w-full dark:hidden"
                :src="item.image.src"
                :alt="item.image.alt" />
            <NuxtImg
                class="image w-full hidden dark:block"
                :src="item.image.darkSrc || item.image.src"
                :alt="item.image.alt" />
            <div
                :class="[
                    'mt-4 md:mt-0',
                    {
                        'order-first':
                            index % 2 !== 0 && blocks.includes('even-reverse'),
                    },
                ]">
                <h2
                    :class="`
                            md:mb-4
                            tracking-tight
                            font-semibold
                            text-2xl
                            md:text-4xl
                            text-slate-900
                            dark:text-white`">
                    {{ item.title }}
                </h2>
                <p
                    class="mb-6 font-light text-slate-500 md:text-lg dark:text-slate-400">
                    {{ item.subTitle }}
                </p>
            </div>
        </div>
    </section>
</template>

<style scoped>
.image :deep(img) {
    width: 100%;
    height: 100%;
}
</style>
