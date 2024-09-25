<script setup lang="ts">
import type { PropType } from '#imports'
import type { IDivider } from '../../../models'
defineProps({
    divider: {
        type: Object as PropType<IDivider>,
        required: true,
    },
})
</script>

<template>
    <Divider />
</template>
