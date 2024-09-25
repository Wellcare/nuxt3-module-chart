<script setup lang="ts">
import type { PropType } from '#imports'
import { computed, useVideoEvents } from '#imports'
import HTML5 from '../internal/video/html5.vue'
import VideoJS from '../internal/video/videojs.vue'
import YouTube from '../internal/video/youtube.vue'

const whatComponent = {
    videojs: VideoJS,
    html5: HTML5,
    youtube: YouTube,
}
type Framework = 'html5' | 'videojs' | 'youtube'
interface Media {
    src: string
    type?: string
    alt?: string
}
const props = defineProps({
    sources: {
        type: Array as PropType<Media[]>,
        default: () => [],
    },
    videoName: {
        type: String,
        default: '',
    },
    alias: {
        type: Object,
        default: () => ({
            'https://storage.googleapis.com/':
                'https://cdn.wellcare.vn/file-proxy/',
        }),
    },
    framework: {
        type: String as PropType<Framework>,
        required: false,
        default: '',
    },
})
const detectVideoType = (url: string): string | null => {
    const mimeTypes: { [key: string]: string } = {
        mp4: 'video/mp4',
        mkv: 'video/x-matroska',
        webm: 'video/webm',
        avi: 'video/x-msvideo',
        mov: 'video/mp4',
        flv: 'video/x-flv',
        wmv: 'video/x-ms-wmv',
        m4v: 'video/x-m4v',
        m3u8: 'application/x-mpegURL',
    }

    // Extract the file extension from the URL
    const extensionMatch = url.match(/\.([0-9a-z]+)(?:[?#]|$)/i)
    if (!extensionMatch) {
        return 'video/mp4'
    }

    const extension = extensionMatch[1].toLowerCase()

    // Return the corresponding MIME type or 'video/mp4' if not found
    return mimeTypes[extension] || 'video/mp4'
}
const sources = computed(() => {
    return props.sources.map((i) => {
        let replacedSrc = i.src
        Object.keys(props.alias)
            .filter((al) => i.src.startsWith(al))
            .forEach((al) => {
                replacedSrc = i.src.replace(al, props.alias[al])
            })
        return { src: replacedSrc, type: i.type || detectVideoType(i.src) }
    })
})

const computedFramework = computed(() => {
    if (props.framework) return props.framework
    else if (
        sources.value.filter((i) => i.src.match(/(youtube\.com)|(youtu\.be)/))
            .length > 0
    ) {
        return 'youtube'
    } else if (
        sources.value.filter((i) => i.type && i.type.startsWith('video'))
            .length > 0
    ) {
        return 'html5'
    } else {
        return 'videojs'
    }
})

const videoEventHandlers = (data: any) => {
    useVideoEvents(data)
}
</script>
<template>
    <component
        :is="whatComponent[computedFramework]"
        :sources="sources"
        v-bind="$attrs"
        @video-events="videoEventHandlers" />
</template>
