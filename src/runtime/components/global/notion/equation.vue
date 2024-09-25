<script setup lang="ts">
import type { PropType } from 'vue'
import type { IEquation } from '../../../models'
const { equation } = defineProps({
    equation: {
        type: Object as PropType<IEquation>,
        required: true,
    },
})
</script>
<template>
    <span class="font-mono font-thin tracking-widest">{{
        equation.expression
    }}</span>
</template>
