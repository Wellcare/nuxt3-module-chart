<script setup lang="ts">
import type { PropType } from 'vue'
import type { IFile } from '../../../models'
const { file } = defineProps({
    file: {
        type: Object as PropType<IFile>,
        required: true,
    },
})
</script>
<template>
    <span>{{ file }}</span>
</template>
