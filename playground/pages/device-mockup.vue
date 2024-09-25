<script setup lang="ts">
import { ref } from 'vue'
const imageSrc = ref(
    'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/hero/mockup-1-light.png',
)

const devices = ['Phone', 'IPhone12', 'Tablet', 'GooglePixel']
const device = ref('Phone')
</script>

<template>
    <div>
        <Panel header="Option">
            <div class="flex flex-col py-2 space-y-2">
                <label for="source">Source</label>
                <InputText id="source" v-model="imageSrc" type="text" />

                <label for="device">Device</label>
                <SelectButton
                    id="device"
                    v-model="device"
                    :options="devices"
                    aria-labelledby="basic" />
            </div>
        </Panel>
        <div class="py-5">
            <WDeviceMockup :device="device" :image="{ src: imageSrc }" />
        </div>
    </div>
</template>
