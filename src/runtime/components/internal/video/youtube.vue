<script setup lang="ts">
import type { PropType } from 'vue'
import { onMounted, onUnmounted, ref } from 'vue'

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

const playerInstance = ref<any>(null)
const videoId = props.sources[0]?.src.split('/').pop() || ''
const playerId = `youtube-player-${videoId}`

const emit = defineEmits<{
    (
        e: 'videoEvents',
        payload: {
            event: any
            currentTime: number
            duration: number
            videoUrl: string
            videoTitle: string
        },
    ): void
}>()

// -1 – unstarted
// 0 – ended
// 1 – playing
// 2 – paused
// 3 – buffering
// 5 – video cued

const mapEventType = (data: number): string => {
    switch (data) {
        case 0:
            return 'ended'
        case 1:
            return 'playing'
        case 2:
            return 'pause'
        default:
            return 'unknown'
    }
}

const handleEvent = (event: any) => {
    let videoEvent: any = ''
    videoEvent = mapEventType(event.data)
    const player = playerInstance.value
    const currentTime = player ? player?.getCurrentTime() : 0
    const duration = player ? player?.getDuration() : 0
    const currentSrc = `https://www.youtube.com/watch?v=${videoId}`
    emit('videoEvents', {
        event: videoEvent,
        currentTime,
        duration,
        videoUrl: currentSrc,
        videoTitle: props.videoTitle,
    })
}

onMounted(() => {
    const tag = document.createElement('script')
    tag.src = 'https://www.youtube.com/iframe_api'
    const firstScriptTag = document.getElementsByTagName('script')[0]
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag)

    window.onYouTubeIframeAPIReady = () => {
        playerInstance.value = new window.YT.Player(playerId, {
            height: '100%',
            width: '100%',
            videoId: videoId,
            events: {
                onReady: (event: any) => {
                    handleEvent(event)
                },
                onStateChange: (event) => {
                    handleEvent(event)
                },
            },
        })
    }
})

onUnmounted(() => {
    if (playerInstance.value) {
        playerInstance.value.destroy()
    }
})

defineExpose({
    player: playerInstance,
})
</script>

<template>
    <div :id="playerId" />
</template>

<style scoped>
#playerId {
    width: 100%;
    height: 100%;
}
</style>
