<script setup lang="ts">
import type { PropType } from 'vue'
import type { IBookmark } from '../../../models'
const { bookmark } = defineProps({
    bookmark: {
        type: Object as PropType<IBookmark>,
        required: true,
    },
})
</script>
<template>
    <h1>{{ bookmark }}</h1>
</template>
