<script lang="ts" setup>
import { type PropType, computed } from '#imports'
import type { IImage } from '../../../models/notion.block.interface'
import RichText from './rich_text.vue'

const { image } = defineProps({
    image: {
        type: Object as PropType<IImage>,
        required: true,
    },
})

const url = computed<string>(
    () =>
        image?.external?.url ||
        image?.file?.external?.url ||
        image?.file?.file?.url ||
        '',
)

const link = computed<string | undefined>(() => {
    return image?.caption?.find((item) => item.href)?.href
})
</script>

<template>
    <div>
        <template v-if="url">
            <a
                v-if="link"
                :href="link"
                target="_blank"
                rel="noopener noreferrer nofollow">
                <NuxtImg
                    :src="url"
                    :alt="image?.name"
                    class="w-full h-full"
                    loading="lazy" />
            </a>
            <NuxtImg
                v-else
                :src="url"
                :alt="image?.name"
                class="w-full h-full"
                loading="lazy" />

            <p v-if="!link" class="opacity-60 text-sm">
                <RichText :rich_text="image?.caption" />
            </p>
        </template>
    </div>
</template>
