<script lang="ts" setup>
import { computed, ref, type PropType } from '#imports'
import { useNotionBlockAdapter } from '../../../../composables'
import type { INotionBlock } from '../../../../models'
import ArticleBodyNested from './nested.vue'

const props = defineProps({
    blocks: {
        type: Array as PropType<INotionBlock[]>,
        required: true,
    },
    loading: {
        type: Boolean,
        default: false,
    },
})

const bodyRef = ref()

const { data: processedBlocks } = useNotionBlockAdapter(
    computed(() => props.blocks),
)
</script>

<template>
    <div>
        <template v-if="loading">
            <Skeleton height="1000px" class="mb-2 rounded-lg" />
        </template>
        <template v-else>
            <ArticleBodyNested ref="bodyRef" :blocks="processedBlocks" />
        </template>
    </div>
</template>
