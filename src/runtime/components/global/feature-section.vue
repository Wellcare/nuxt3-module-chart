<script lang="ts" setup>
import type { IBackground } from '../../models'

import type {
    FeatureSectionLayout,
    FeatureSectionBlockType,
    AlignmentType,
    SeoTagType,
} from '../../types/'

import FeatureSectionDefault from '../internal/feature-section/default.vue'

defineProps({
    layout: {
        type: String as PropType<FeatureSectionLayout>,
        default: 'Default feature list',
    },
    blocks: {
        type: Array as PropType<FeatureSectionBlockType[]>,
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
    seoTitleTag: {
        type: String as PropType<SeoTagType>,
        default: 'div',
    },
    textAlignment: {
        type: String as PropType<AlignmentType>,
        default: 'center',
    },
    items: {
        type: Array as PropType<Object>,
        default: () => [],
    },
})

const transformLayout = (
    layout: FeatureSectionLayout = 'Default feature list',
): any => {
    const mapping: Record<FeatureSectionLayout, any> = {
        'Default feature list': FeatureSectionDefault,
        'Image with feature list and CTAs': undefined,
        'Feature list with CTAs': undefined,
        'Feature list with icons': undefined,
        'Feature icons and CTA': undefined,
        'Description with feature list icons': undefined,
        'Feature list cards': undefined,
        'Alternate image with feature list': undefined,
        'Comparison cards': undefined,
        'Feature section with rounded icons': undefined,
    }
    return mapping[layout] || mapping['Default feature list']
}
</script>

<template>
    <component
        v-bind="{ ...$props }"
        :is="transformLayout(layout)"
        v-on="{ ...$attrs }">
        <template v-for="(_, slotName) in $slots" #[slotName]="{ feature }">
            <slot :name="slotName" :feature="feature" />
        </template>
    </component>
</template>
