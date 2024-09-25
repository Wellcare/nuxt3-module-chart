<script setup lang="ts">
import { type PropType } from '#imports'
import type { IParagraph } from '../../../models'
import RichText from './rich_text.vue'

const { paragraph } = defineProps({
    paragraph: {
        type: Object as PropType<IParagraph>,
        required: true,
    },
})
</script>
<template>
    <p class="mb-0">
        <RichText :rich_text="paragraph?.rich_text" />
    </p>
</template>
