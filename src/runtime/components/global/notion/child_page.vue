<script setup lang="ts">
import type { PropType } from 'vue'
import type { IChildPage } from '../../../models'
const { child_page } = defineProps({
    // eslint-disable-next-line vue/prop-name-casing
    child_page: {
        type: Object as PropType<IChildPage>,
        required: true,
    },
})
</script>
<template>
    <h1>{{ child_page }}</h1>
</template>
