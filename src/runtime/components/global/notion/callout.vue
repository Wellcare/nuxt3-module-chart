<script setup lang="ts">
import { type PropType } from '#imports'
import type { ICallout } from '../../../models'
import RichText from './rich_text.vue'
const { callout } = defineProps({
    callout: {
        type: Object as PropType<ICallout>,
        required: true,
    },
})
</script>
<template>
    <div class="px-4 py-6 rounded-lg bg-gray-100 dark:bg-gray-800 flex gap-4">
        <span>{{ callout?.icon?.emoji }}</span>
        <RichText :rich_text="callout.rich_text" />
    </div>
</template>
