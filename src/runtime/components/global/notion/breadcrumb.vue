<script setup lang="ts">
import type { PropType } from 'vue'
import type { IBreadcrumb } from '../../../models'
const { breadcrumb } = defineProps({
    breadcrumb: {
        type: Object as PropType<IBreadcrumb>,
        required: true,
    },
})
</script>
<template>
    <h1>{{ breadcrumb }}</h1>
</template>
