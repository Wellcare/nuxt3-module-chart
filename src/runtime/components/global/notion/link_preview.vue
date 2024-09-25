<script setup lang="ts">
import type { PropType } from 'vue'
import type { ILinkPreview } from '../../../models'
const { link_preview } = defineProps({
    // eslint-disable-next-line vue/prop-name-casing
    link_preview: {
        type: Object as PropType<ILinkPreview>,
        required: true,
    },
})
</script>
<template>
    <span>{{ link_preview }}</span>
</template>
