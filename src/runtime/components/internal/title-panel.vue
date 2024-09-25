<script lang="ts" setup>
import type { PropType } from '#imports'
import type { TitlePanelBlock } from '../../types/title-panel'

defineProps({
    blocks: {
        type: Array as PropType<TitlePanelBlock[]>,
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
})
</script>

<template>
    <div class="mx-auto max-w-screen-lg text-center mb-8 lg:mb-12">
        <slot v-if="blocks.includes('title')" name="title">
            <h2
                :class="[
                    {
                        'text-white dark:text-white':
                            blocks.includes('overlay'),
                    },
                ]">
                {{ title }}
            </h2>
        </slot>
        <slot v-if="blocks.includes('sub-title')" name="sub-title">
            <h5
                :class="[
                    {
                        'text-white dark:text-white':
                            blocks.includes('overlay'),
                    },
                ]">
                {{ subTitle }}
            </h5>
        </slot>
    </div>
</template>
