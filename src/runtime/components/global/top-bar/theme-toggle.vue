<script setup lang="ts">
import type { PropType } from 'vue'
import { useColorMode } from '#imports'
type SizeType = 'small' | 'normal'
const { size } = defineProps({
    size: {
        type: String as PropType<SizeType>,
        default: () => 'small',
    },
})

const color = useColorMode()

function toggleTheme() {
    color.preference = color.value === 'dark' ? 'light' : 'dark'
}
</script>

<template>
    <ToggleButton
        :value="color.value == 'dark'"
        :model-value="color.value == 'dark'"
        :class="(size == 'normal' ? 'text-lg' : 'text-sm') + ' !rounded-2xl'"
        :active="false"
        on-label="Dark"
        off-label="Light"
        on-icon="pi pi-moon"
        off-icon="pi pi-sun"
        @change="toggleTheme()" />
</template>
