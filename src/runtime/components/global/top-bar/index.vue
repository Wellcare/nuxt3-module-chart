<script setup lang="ts">
import type { PropType } from 'vue'
import { ref } from 'vue'
const isDisabled = ref(false)

type Block = 'tagline' | 'theme' | 'lang'

defineProps({
    blocks: {
        type: Array as PropType<Block[]>,
        default: () => ['tagline', 'theme', 'lang'],
    },
})
</script>

<template>
    <div
        v-if="!isDisabled"
        class="hidden p-1 sm:flex relative top-0 z-50 align-middle flex-nowrap justify-between flex-row gap-2 bg-gray-100 dark:bg-slate-900">
        <slot name="start">
            <p class="ml-4 mr-auto my-auto text-sm">
                Wellcare - Your TRUSTED health partner
            </p>
        </slot>
        <slot name="end">
            <div class="flex items-center gap-2">
                <WTopBarThemeToggle class="my-auto" size="small" />
                <WTopBarLangToggle class="my-auto" size="small" />
                <Button
                    size="small"
                    icon="pi pi-times"
                    plain
                    text
                    aria-label="close top bar"
                    @click="isDisabled = true" />
            </div>
        </slot>
    </div>
</template>
