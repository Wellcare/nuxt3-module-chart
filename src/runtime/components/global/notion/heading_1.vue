<script lang="ts" setup>
import { computed, type PropType } from '#imports'
import type { IHeading } from '../../../models'
import RichText from './rich_text.vue'
import NotionToggle from './toggle.vue'

const { heading_1 } = defineProps({
    // eslint-disable-next-line vue/prop-name-casing
    heading_1: {
        type: Object as PropType<IHeading>,
        required: true,
    },
})

const isToggleAble = computed<boolean>(() => heading_1?.is_toggleable)
</script>

<template>
    <div>
        <NotionToggle v-if="isToggleAble" :toggle="heading_1">
            <template #header>
                <h2>
                    <RichText :rich_text="heading_1.rich_text" />
                </h2>
            </template>
        </NotionToggle>
        <h2 v-else>
            <RichText :rich_text="heading_1.rich_text" />
        </h2>
    </div>
</template>
