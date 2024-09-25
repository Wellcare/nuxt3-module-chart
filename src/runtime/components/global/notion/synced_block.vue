<script setup lang="ts">
import type { PropType } from 'vue'
import type { ISyncedBlock } from '../../../models'
const { sync_block } = defineProps({
    // eslint-disable-next-line vue/prop-name-casing
    sync_block: {
        type: Object as PropType<ISyncedBlock>,
        required: true,
    },
})
</script>
<template>
    <span>{{ sync_block }}</span>
</template>
