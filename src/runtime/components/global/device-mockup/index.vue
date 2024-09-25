<script setup lang="ts">
import type { PropType } from 'vue'
import Phone from './phone.vue'
import GooglePixel from './google-pixel.vue'
import Tablet from './tablet.vue'
import Iphone12 from './iphone12.vue'
const deviceComponent: { [key in DeviceType]: any } = {
    GooglePixel: GooglePixel,
    Phone: Phone,
    Tablet: Tablet,
    IPhone12: Iphone12,
}
type DeviceType = 'GooglePixel' | 'Phone' | 'Tablet' | 'IPhone12'
interface ImageType {
    src: string
    alt?: string
    mimetype: 'image' | 'video'
}
const { device, image } = defineProps({
    device: {
        type: String as PropType<DeviceType>,
        default: () => 'phone',
    },
    image: {
        type: Object as PropType<ImageType>,
        required: true,
    },
})
</script>

<template>
    <div>
        <component :is="deviceComponent[device]">
            <template #image>
                <NuxtImg
                    :src="image.src"
                    :class="[
                        'w-[272px] h-[572px]',
                        {
                            invert: '$colorMode.value === \'dark\'',
                        },
                    ]"
                    :alt="image.alt" />
            </template>
        </component>
    </div>
</template>
