<script setup lang="ts">
import type { PropType } from 'vue'
import type { IChildDatabase } from '../../../models'
const { child_database } = defineProps({
    // eslint-disable-next-line vue/prop-name-casing
    child_database: {
        type: Object as PropType<IChildDatabase>,
        required: true,
    },
})
</script>
<template>
    <h1>{{ child_database }}</h1>
</template>
