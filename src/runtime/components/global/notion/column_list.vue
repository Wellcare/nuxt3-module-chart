<script setup lang="ts">
import type { PropType } from '#imports'
import type { IColumnList } from '../../../models'
const { column_list } = defineProps({
    // eslint-disable-next-line vue/prop-name-casing
    column_list: {
        type: Object as PropType<IColumnList>,
        required: true,
    },
})
</script>
<template>
    <span>{{ column_list }}</span>
</template>
