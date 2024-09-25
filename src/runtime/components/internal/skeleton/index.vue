<script setup lang="ts">
import type { SkeletonType } from '../../../models'

defineProps({
    maxWidth: {
        type: String || Number,
        default: 400,
    },
    typeBlock: {
        type: Array as () => SkeletonType[],
        default: () => ['card-avatar', 'article', 'actions'],
    },
})
</script>

<template>
    <div class="rounded-lg" :style="{ maxWidth: maxWidth + 'px' }">
        <!-- Card Avatar Skeleton -->
        <div v-if="typeBlock.includes('card-avatar')" class="mb-4 flex gap-3">
            <Skeleton shape="circle" size="3.5rem" />
            <div>
                <Skeleton width="10rem" height="16px" class="mb-2" />
                <Skeleton width="8rem" height="14px" />
            </div>
        </div>

        <!-- Article Skeleton -->
        <div v-if="typeBlock.includes('article')">
            <Skeleton width="100%" height="1.5rem" class="mb-2" />
            <Skeleton width="90%" height="1rem" class="mb-2" />
            <Skeleton width="80%" height="1rem" />
        </div>

        <!-- Actions Skeleton -->
        <!-- <div v-if="typeBlock.includes('actions')" class="mt-4 flex gap-4">
            <Skeleton width="30%" height="1.5rem" />
            <Skeleton width="30%" height="1.5rem" />
            <Skeleton width="30%" height="1.5rem" />
        </div> -->
    </div>
</template>
