<script setup lang="ts">
import { nextTick, onMounted, ref } from '#imports'
import type { PropType } from 'vue'
import { VIDEO_EVENTS } from '../../../models'

interface Media {
    src: string
    type: string
    alt?: string
}

const props = defineProps({
    sources: {
        type: Array as PropType<Media[]>,
        default: () => [],
    },
    videoTitle: {
        type: String,
        default: 'title',
    },
})

const videoElement = ref()

const emit = defineEmits(['videoEvents'])

onMounted(() => {
    nextTick(() => {
        VIDEO_EVENTS.forEach((event) => {
            videoElement.value.addEventListener(event, (data) => {
                emit('videoEvents', {
                    data,
                    event,
                    currentTime: videoElement.value?.currentTime || 0,
                    duration: videoElement.value?.duration || 0,
                    videoUrl: videoElement.value?.currentSrc || '',
                    videoTitle: props.videoTitle,
                })
            })
        })
    })
})
</script>
<template>
    <ClientOnly>
        <video ref="videoElement" v-bind="$attrs">
            <source
                v-for="(item, index) in sources"
                :key="index"
                :src="item.src"
                :type="item.type" />
        </video>
    </ClientOnly>
</template>
