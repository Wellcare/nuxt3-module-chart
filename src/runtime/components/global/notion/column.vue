<script setup lang="ts">
import type { PropType } from 'vue'
import type { IColumn } from '../../../models'
const { column } = defineProps({
    column: {
        type: Object as PropType<IColumn>,
        required: true,
    },
})
</script>
<template>
    <span>{{ column }}</span>
</template>
