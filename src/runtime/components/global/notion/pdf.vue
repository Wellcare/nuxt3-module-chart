<script setup lang="ts">
import type { PropType } from 'vue'
import type { IPdf } from '../../../models'
const { pdf } = defineProps({
    pdf: {
        type: Object as PropType<IPdf>,
        required: true,
    },
})
</script>
<template>
    <span>{{ pdf }}</span>
</template>
