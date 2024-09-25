<script lang="ts" setup>
import { computed, type PropType } from '#imports'
import type { IHeading } from '../../../models'
import RichText from './rich_text.vue'
import NotionToggle from './toggle.vue'

const { heading_2 } = defineProps({
    // eslint-disable-next-line vue/prop-name-casing
    heading_2: {
        type: Object as PropType<IHeading>,
        required: true,
    },
})
const isToggleAble = computed<boolean>(() => heading_2?.is_toggleable)
</script>

<template>
    <div>
        <NotionToggle v-if="isToggleAble" :toggle="heading_2">
            <template #header>
                <h3>
                    <RichText :rich_text="heading_2.rich_text" />
                </h3>
            </template>
        </NotionToggle>
        <h3 v-else>
            <RichText :rich_text="heading_2.rich_text" />
        </h3>
    </div>
</template>
