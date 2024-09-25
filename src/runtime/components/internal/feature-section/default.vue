<script lang="ts" setup>
import type { PropType } from '#imports'

import type {
    SeoTagType,
    AlignmentType,
    FeatureSectionBlockType,
} from '../../../types'

import type { IBackground } from '../../../models/common.interface'

import FlowbiteContainer from '../flowbite-container.vue'

defineProps({
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
</script>

<template>
    <component
        v-bind="{ ...$props }"
        :is="FlowbiteContainer"
        v-on="{ ...$attrs }">
        <template v-for="(_, slotName) in $slots" #[slotName]="{ item }">
            <slot :name="slotName" :feature="item" />
        </template>
    </component>
</template>
