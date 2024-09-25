<script lang="ts" setup>
import { ref } from '#imports'

const layouts = [
    'Default CTA section',
    'Image with CTA button',
    'Heading with CTA button',
    'QR code CTA',
    'Card CTAs with icons',
    'Financial trading CTA',
    'Email sign-up CTA',
    'Mobile app download',
    'CTA with two cards and images',
    'CTA section with tabs and mobile app',
]

const blocks = ['even-reverse', 'title', 'sub-title']

const selectedLayout = ref(layouts[0])
const selectedBlocks = ref(blocks)

const items = [
    {
        image: {
            src: 'https://storage.googleapis.com/cms-gallery-sandbox/65d6b38c82cb5a7ff949dc02/luonthemtheo.jpg',
            alt: 'CTA',
            darkSrc:
                'https://storage.googleapis.com/emr-sandbox/64e5812f6e317437a4bdc246/cl1.jpg',
        },
        title: 'Bác sĩ riêng',
        subTitle: 'Cho người ta thương yêu',
    },
    {
        image: {
            src: 'https://storage.googleapis.com/cms-gallery-sandbox/65d6b38c82cb5a7ff949dc02/luonthemtheo.jpg',
            alt: 'CTA',
            darkSrc:
                'https://storage.googleapis.com/emr-sandbox/64e5812f6e317437a4bdc246/cl1.jpg',
        },
        title: 'Khám từ xa',
        subTitle: 'Khám gần khám xa, cốt là khám kỹ!',
    },
    {
        image: {
            src: 'https://storage.googleapis.com/cms-gallery-sandbox/65d6b38c82cb5a7ff949dc02/luonthemtheo.jpg',
            alt: 'CTA',
            darkSrc:
                'https://storage.googleapis.com/emr-sandbox/64e5812f6e317437a4bdc246/cl1.jpg',
        },
        title: 'EduHub',
        subTitle: 'Hỏi kiến thức, Healthtalk, Video trainings',
    },
]
</script>

<template>
    <div class="mt-16">
        <div class="sm:grid sm:grid-cols-2 gap-2 mb-4">
            <div class="sm:mt-6">
                <div
                    class="mb-2 text-xl font-medium text-black dark:text-white">
                    Layout
                </div>
                <Dropdown
                    v-model="selectedLayout"
                    :options="layouts"
                    placeholder="Select a layout"
                    class="container max-w-3xl sm:max-w-5xl lg:max-w-full" />
            </div>

            <Panel header="Option">
                <MultiSelect
                    v-model="selectedBlocks"
                    display="chip"
                    :options="blocks"
                    placeholder="Select blocks"
                    class="container max-w-3xl sm:max-w-5xl lg:max-w-full" />
            </Panel>
        </div>

        <WCtaSection
            :layout="selectedLayout"
            :blocks="selectedBlocks"
            title="Dịch vụ y tế từ xa"
            :items="items" />
    </div>
</template>
