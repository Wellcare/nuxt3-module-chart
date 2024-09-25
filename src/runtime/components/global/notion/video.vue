<script setup lang="ts">
import type { PropType } from '#imports'
import { computed } from '#imports'
import type { IVideo } from '../../../models'
import RichText from './rich_text.vue'

const { video } = defineProps({
    video: {
        type: Object as PropType<IVideo>,
        required: true,
    },
})

const src = computed<string>(
    () =>
        video?.external?.url ||
        video?.file?.external?.url ||
        video?.file?.file?.url ||
        '',
)
</script>
<template>
    <div class="my-8">
        <template v-if="src">
            <WVideo
                controls
                class="aspect-[16/9] w-full"
                :sources="[
                    {
                        src,
                    },
                ]" />

            <p class="opacity-60 text-sm">
                <RichText :rich_text="video?.caption" />
            </p>
        </template>
    </div>
</template>
