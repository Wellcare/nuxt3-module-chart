<script setup lang="ts">
import type { SeoTagType } from '../../types/index'

defineProps<{
    tag?: SeoTagType
    style?: string
}>()
</script>

<template>
    <component :is="tag || 'div'" :style="style">
        <slot />
    </component>
</template>
