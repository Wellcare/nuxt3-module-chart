<script lang="ts" setup>
import type { PropType } from '#imports'

import type { IBackground } from '../../../models/'

import type {
    SeoTagType,
    AlignmentType,
    BackgroundPositionType,
    BackgroundAttachmentType,
    VerticalAlignType,
    HorizontalAlignType,
    HeroSectionBlockType,
} from '../../../types/'

import FlowbiteContainer from '../flowbite-container.vue'

defineProps({
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
</script>

<template>
    <component
        v-bind="{ ...$props }"
        :is="FlowbiteContainer"
        v-on="{ ...$attrs }">
        <template v-for="(_, slotName) in $slots" #[slotName]="{ item }">
            <slot :name="slotName" :item="item" />
        </template>
    </component>
</template>
