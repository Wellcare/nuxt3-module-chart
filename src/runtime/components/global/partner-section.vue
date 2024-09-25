<script lang="ts" setup>
import type {
    PartnerSectionLayout,
    PartnerSectionBlockType,
    AlignmentType,
} from '../../types'

import PartnerSectionDefault from '../internal/partner-section/default.vue'

defineProps({
    layout: {
        type: String as PropType<PartnerSectionLayout>,
        default: 'Default partner list',
    },
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

const transformLayout = (
    layout: PartnerSectionLayout = 'Default partner list',
): any => {
    const mapping: Record<PartnerSectionLayout, any> = {
        'Default partner list': PartnerSectionDefault,
    }
    return mapping[layout] || mapping['Default partner list']
}
</script>

<template>
    <component
        v-bind="{ ...$props }"
        :is="transformLayout(layout)"
        v-on="{ ...$attrs }">
        <template v-for="(_, slotName) in $slots" #[slotName]="{ partner }">
            <slot :name="slotName" :partner="partner" />
        </template>
    </component>
</template>
