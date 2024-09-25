<script setup lang="ts">
import type { PropType } from 'vue'
import type { IMention } from '../../../models'
const { metion } = defineProps({
    metion: {
        type: Object as PropType<IMention>,
        required: true,
    },
})
</script>
<template>
    <span>{{ metion }}</span>
</template>
