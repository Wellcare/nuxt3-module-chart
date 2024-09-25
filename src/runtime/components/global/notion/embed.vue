<script setup lang="ts">
import { computed, type PropType } from '#imports'
import type { IEmbed } from '../../../models'
import RichText from './rich_text.vue'

const { embed } = defineProps({
    embed: {
        type: Object as PropType<IEmbed>,
        required: true,
    },
})

const src = computed<string>(() => embed.url || '')
</script>
<template>
    <div>
        <template v-if="src">
            <NuxtImg :src="src" class="w-full h-full" loading="lazy" />

            <p class="opacity-60 text-sm">
                <RichText :rich_text="embed?.caption" />
            </p>
        </template>
    </div>
</template>
