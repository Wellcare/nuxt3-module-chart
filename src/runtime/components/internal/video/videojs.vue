<script setup lang="ts">
import { ref, useAttrs, useHead, onMounted, onUnmounted } from '#imports'
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

declare const videojs: any
const version = '8.12.0'
useHead({
    link: [
        {
            href: `//vjs.zencdn.net/${version}/video-js.min.css`,
            rel: 'stylesheet',
        },
    ],
    script: [{ src: `//vjs.zencdn.net/${version}/video.min.js`, defer: true }],
})

const attrs = useAttrs()
const videoElement = ref<HTMLVideoElement | null>(null)
const player = ref<any>(null)
const emit = defineEmits({
    videoEvents: String,
})

const initializePlayer = () => {
    const options: any = {
        autoplay: false,
        controls: true,
    }
    Object.entries(attrs).forEach(([key, value]) => {
        options[key] = value === '' ? true : value
    })
    options.sources = props.sources

    player.value = videojs(videoElement.value, options)

    // Attach event listeners
    VIDEO_EVENTS.forEach((event) => {
        player.value.on(event, (data) => {
            emit('videoEvents', {
                event,
                data,
                currentTime: player.value?.currentTime() || 0,
                duration: player.value?.duration() || 0,
                videoUrl: player.value?.currentSrc() || '',
                videoTitle: props.videoTitle,
            })
        })
    })
}

const intervalCheck = 50
const checkLoopMax = 25

onMounted(() => {
    let counter = 1
    const check = setInterval(() => {
        if (typeof videojs !== 'undefined') {
            initializePlayer()
            clearInterval(check)
        } else {
            counter += 1
            if (counter >= checkLoopMax) {
                console.warn(
                    `videojs not loaded after ${checkLoopMax} checks, ${
                        (intervalCheck * checkLoopMax) / 1000
                    } seconds`,
                )
                clearInterval(check)
            }
        }
    }, intervalCheck)
})

onUnmounted(() => player.value?.dispose())

defineExpose({
    player,
})
</script>

<template>
    <ClientOnly>
        <video
            ref="videoElement"
            class="video-js vjs-default-skin vjs-big-play-centered"
            v-bind="$attrs" />
    </ClientOnly>
</template>
