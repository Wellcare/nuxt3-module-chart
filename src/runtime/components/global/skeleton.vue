<script setup lang="ts">
import { defineAsyncComponent } from '#imports'

const { block } = defineProps({
    block: {
        type: String,
        default: () => 'default',
    },
})

const asyncComponents = {
    default: defineAsyncComponent(
        () => import('../internal/skeleton/index.vue'),
    ),
    card: defineAsyncComponent(() => import('../internal/skeleton/card.vue')),
    list: defineAsyncComponent(() => import('../internal/skeleton/list.vue')),
    article: defineAsyncComponent(
        () => import('../internal/skeleton/article.vue'),
    ),
}
</script>

<template>
    <suspense>
        <component :is="asyncComponents[block]"></component>
    </suspense>
</template>
