<script lang="ts" setup>
import type { PropType } from '#imports'
import type {
    AlignmentType,
    MemberSectionBlockType,
    MemberSectionLayout,
} from '../../types'

import MemberSectionDefault from '../internal/member-section/default.vue'

defineProps({
    layout: {
        type: String as PropType<MemberSectionLayout>,
        default: 'Default member list',
    },
    blocks: {
        type: Array as PropType<MemberSectionBlockType[]>,
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
    layout: MemberSectionLayout = 'Default member list',
): any => {
    const mapping: Record<MemberSectionLayout, any> = {
        'Default member list': MemberSectionDefault,
    }
    return mapping[layout] || mapping['Default member list']
}
</script>

<template>
    <component
        v-bind="{ ...$props }"
        :is="transformLayout(layout)"
        v-on="{ ...$attrs }">
        <template v-for="(_, slotName) in $slots" #[slotName]="{ member }">
            <slot :name="slotName" :member="member" />
        </template>
    </component>
</template>
