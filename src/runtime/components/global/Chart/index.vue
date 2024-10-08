<script setup lang="ts">
import type { Component } from '#imports'
import { computed, defineAsyncComponent, markRaw } from '#imports'

const props = defineProps<{
    type: string
}>()

const componentMap: Record<string, () => Promise<Component>> = {
    percentile: () => import('../Chart/Percentile/index.vue'),
    // Add more components here as needed
}

const component = computed(() => {
    if (!props.type) {
        return null
    }

    const asyncComponent = componentMap[props.type]
    if (!asyncComponent) {
        console.warn(`Unknown component type: ${props.type}`)
        return null
    }

    return markRaw(
        defineAsyncComponent({
            loader: asyncComponent,
            // Add error and loading handling
            onError: (error, retry, fail, attempts) => {
                if (attempts <= 3) {
                    retry()
                } else {
                    console.error(
                        `Failed to load component: ${props.type}`,
                        error,
                    )
                    fail()
                }
            },
        }),
    )
})
</script>

<template>
    <component :is="component" v-if="component" />
    <div v-else-if="type && !component" class="error-message">
        Unknown component type: {{ type }}
    </div>
</template>
