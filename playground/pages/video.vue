<script setup>
import { ref } from 'vue'

const videoSrc = ref('https://cdn.wellcare.vn/file-proxy/imaginary-test/m065uh967yj4r/file_example_MOV_480_700kB.mov')
// https://cdn.wellcare.vn/file-proxy/imaginary-test/m065uh967yj4r/file_example_MOV_480_700kB.mov
// 'https://storage.googleapis.com/cms-gallery/654348023bd47b2945747329/giacngungonlagiacmocothedatduoc-phan3.mp4'
// 'https://storage.googleapis.com/cms-gallery/6645fb708d06716848dd19bf/hd-720.m3u8',
// 'https://www.youtube.com/embed/NSKxvLWqyOY',
</script>

<template>
    <div class="flex flex-col gap-4">
        <Panel header="Options">
            <div class="flex flex-col py-2 space-y-5">
                <label for="source">Source</label>
                <InputText id="source" v-model="videoSrc" type="text" />
            </div>
        </Panel>
        <WVideo
            ref="videoElement"
            class="w-full h-[600px] video-js vjs-default-skin vjs-big-play-centered"
            width="1000"
            autoplay
            muted
            controls
            height="700"
            :sources="[
                {
                    src: videoSrc,
                },
            ]" />
        <!-- <div class="w-full max-w-6xl mx-auto">
            <WYoutubeV2
                video-id="NSKxvLWqyOY"
                class="mt-20" />
        </div> -->
    </div>
</template>
