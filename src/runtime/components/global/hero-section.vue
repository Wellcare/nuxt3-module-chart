<script lang="ts" setup>
import type { PropType } from '#imports'

import type { IBackground } from '../../models'

import type {
    HeroSectionLayout,
    HeroSectionBlockType,
    AlignmentType,
    SeoTagType,
    BackgroundAttachmentType,
    BackgroundPositionType,
    VerticalAlignType,
    HorizontalAlignType,
} from '../../types'

import HeroSectionDefault from '../internal/hero-section/default.vue'

defineProps({
    layout: {
        type: String as PropType<HeroSectionLayout>,
        default: 'Default hero section',
    },
    blocks: {
        type: Array as PropType<HeroSectionBlockType[]>,
        default: () => [],
    },
    backgroundImage: {
        type: Object as PropType<IBackground>,
        default: () => {},
    },
    title: {
        type: String,
        default: '',
    },
    subTitle: {
        type: String,
        default: '',
    },
    textAlignment: {
        type: String as PropType<AlignmentType>,
        default: 'center',
    },
    seoTitleTag: {
        type: String as PropType<SeoTagType>,
        default: 'div',
    },
    backgroundAttachment: {
        type: String as PropType<BackgroundAttachmentType>,
        default: 'fixed',
    },
    backgroundPosition: {
        type: String as PropType<BackgroundPositionType>,
        default: 'center center',
    },
    verticalAlign: {
        type: String as PropType<VerticalAlignType>,
        default: 'middle',
    },
    horizontalAlign: {
        type: String as PropType<HorizontalAlignType>,
        default: 'center',
    },
})

const transformLayout = (
    layout: HeroSectionLayout = 'Default hero section',
): any => {
    const mapping: Record<HeroSectionLayout, any> = {
        'Default hero section': HeroSectionDefault,
        'Visual image with heading': undefined,
        'Search bar with datepicker': undefined,
        'Email sign-up with video': undefined,
        'Illustration with email sign-up': undefined,
        'Cover image with CTAs': undefined,
        'Informational CTA with app screenshot': undefined,
        'Hero section with search bar': undefined,
        'Video embed with CTA': undefined,
        'Sign-up form with CTA': undefined,
        'App screenshot with CTAs': undefined,
        'Background cover image with CTAs': undefined,
        'Financial exchange (crypto)': undefined,
        'Hero section with carousel slider': undefined,
        'Hero section with book cover': undefined,
        'Blog posts with featured image': undefined,
        'Phone mockup with app download': undefined,
    }

    return mapping[layout] || mapping['Default hero section']
}
</script>

<template>
    <component
        v-bind="{ ...$props }"
        :is="transformLayout(layout)"
        v-on="{ ...$attrs }">
        <template v-for="(_, slotName) in $slots" #[slotName]="{ item }">
            <slot :name="slotName" :item="item" />
        </template>
    </component>
</template>
