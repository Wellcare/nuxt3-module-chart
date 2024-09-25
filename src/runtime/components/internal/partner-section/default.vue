<script lang="ts" setup>
import type { PropType } from '#imports'

import type { AlignmentType, PartnerSectionBlockType } from '../../../types'

import FlowbiteContainer from '../flowbite-container.vue'

defineProps({
    blocks: {
        type: Array as PropType<PartnerSectionBlockType[]>,
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
            <slot :name="slotName" :partner="item" />
        </template>
    </component>
</template>
