<script lang="ts" setup>
import type { PropType } from '#imports'
import type {
    PricingTableBlockType,
    PricingTableLayout,
    PricingTableModeType,
} from '../../types'
import type { IPricingTableItem } from '../../models'

import FlowbitePricingTableDefault from '../internal/pricing-table/default.vue'

defineProps({
    layout: {
        type: String as PropType<PricingTableLayout>,
        default: 'Default pricing cards',
    },
    blocks: {
        type: Array as PropType<PricingTableBlockType[]>,
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
        type: Array as PropType<IPricingTableItem[]>,
        default: () => [],
    },
    mode: {
        type: String as PropType<PricingTableModeType>,
        default: '',
    },
    buttonPassthrough: {
        type: Object,
        default: () => {},
    },
})

const transformLayout = (
    layout: PricingTableLayout = 'Default pricing cards',
): any => {
    const mapping: Record<PricingTableLayout, any> = {
        'Default pricing cards': FlowbitePricingTableDefault,
        'Tabs selector pricing cards': undefined,
        'Horizontal pricing card': undefined,
        'Feature list description with pricing card': undefined,
        'Comparison table': undefined,
        'Highlighted pricing plan': undefined,
        'Pricing plan with toggle switch': undefined,
    }

    return mapping[layout] || mapping['Default pricing cards']
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
