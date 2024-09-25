<script lang="ts" setup>
import type { PropType } from '#imports'

import type { IBackground } from '../../models'

import type {
    CtaSectionLayout,
    CtaSectionBlockType,
} from '../../types/cta-section.d.ts'

import FlowbiteCtaSectionImage from '../internal/cta-section/image.vue'

interface ICtaSectionItem {
    image?: IBackground
    title?: string
    subTitle?: string
}

defineProps({
    layout: {
        type: String as PropType<CtaSectionLayout>,
        default: 'Image with CTA button',
    },
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

const transformLayout = (
    layout: CtaSectionLayout = 'Image with CTA button',
): any => {
    const mapping: Record<CtaSectionLayout, any> = {
        'Default CTA section': undefined,
        'Image with CTA button': FlowbiteCtaSectionImage,
        'Heading with CTA button': undefined,
        'QR code CTA': undefined,
        'Card CTAs with icons': undefined,
        'Financial trading CTA': undefined,
        'Email sign-up CTA': undefined,
        'Mobile app download': undefined,
        'CTA with two cards and images': undefined,
        'CTA section with tabs and mobile app': undefined,
    }

    return mapping[layout] || mapping['Image with CTA button']
}
</script>

<template>
    <component
        v-bind="{ ...$props }"
        :is="transformLayout(layout)"
        v-on="{ ...$attrs }">
        <template v-for="(_, slotName) in $slots" #[slotName]>
            <slot :name="slotName" />
        </template>
    </component>
</template>
