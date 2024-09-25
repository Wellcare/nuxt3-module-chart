<script lang="ts" setup>
import { computed, type PropType } from '#imports'
import type { IHeading } from '../../../models'
import RichText from './rich_text.vue'
import NotionToggle from './toggle.vue'

const { heading_3 } = defineProps({
    // eslint-disable-next-line vue/prop-name-casing
    heading_3: {
        type: Object as PropType<IHeading>,
        required: true,
    },
})
const isToggleAble = computed<boolean>(() => heading_3?.is_toggleable)
</script>

<template>
    <div>
        <NotionToggle v-if="isToggleAble" :toggle="heading_3">
            <h4>
                <RichText :rich_text="heading_3.rich_text" />
            </h4>
        </NotionToggle>
        <h4 v-else>
            <RichText :rich_text="heading_3.rich_text" />
        </h4>
    </div>
</template>
