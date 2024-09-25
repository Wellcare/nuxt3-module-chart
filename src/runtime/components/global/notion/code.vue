<script setup lang="ts">
import type { PropType } from 'vue'
import type { ICode } from '../../../models'
const { code } = defineProps({
    code: {
        type: Object as PropType<ICode>,
        required: true,
    },
})
</script>
<template>
    <span>{{ code }}</span>
</template>
