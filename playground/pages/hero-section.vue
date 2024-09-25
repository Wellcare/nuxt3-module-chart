<script lang="ts" setup>
import { ref } from '#imports'

const layouts = [
    'Default hero section',
    'Visual image with heading',
    'Search bar with datepicker',
    'Email sign-up with video',
    'Illustration with email sign-up',
    'Cover image with CTAs',
    'Informational CTA with app screenshot',
    'Hero section with search bar',
    'Video embed with CTA',
    'Sign-up form with CTA',
    'App screenshot with CTAs',
    'Background cover image with CTAs',
    'Financial exchange (crypto)',
    'Hero section with carousel slider',
    'Hero section with book cover',
    'Blog posts with featured image',
    'Phone mockup with app download',
]

const blocks = [
    'background-image',
    'overlay',
    'above',
    'title',
    'sub-title',
    'under',
]

const alignments = ['left', 'center', 'right']

const attachments = ['fixed', 'local', 'scroll']

const positions = [
    'top left',
    'top center',
    'top right',
    'center left',
    'center center',
    'center right',
    'bottom left',
    'bottom center',
    'bottom right',
]

const horizontalAligns = ['left', 'center', 'right']

const verticalAligns = ['top', 'middle', 'bottom']

const selectedLayout = ref(layouts[0])
const selectedBlocks = ref(blocks)
const selectedAlignment = ref(alignments[1])
const selectedAttachment = ref(attachments[0])
const selectedPosition = ref(positions[4])
const selectedHorizontalAlign = ref(horizontalAligns[1])
const selectedVerticalAlign = ref(verticalAligns[1])
</script>

<template>
    <div class="mt-16">
        <div class="grid grid-cols-4 gap-2 mb-4">
            <div>
                <div class="text-sm font-medium text-black dark:text-white">
                    Layout
                </div>
                <Dropdown
                    v-model="selectedLayout"
                    :options="layouts"
                    placeholder="Select a type"
                    class="container max-w-3xl sm:max-w-5xl lg:max-w-full" />
            </div>

            <div>
                <div class="text-sm font-medium text-black dark:text-white">
                    Alignment
                </div>
                <Dropdown
                    v-model="selectedAlignment"
                    :options="alignments"
                    placeholder="Select a alignment"
                    class="container max-w-3xl sm:max-w-5xl lg:max-w-full" />
            </div>

            <div>
                <div class="text-sm font-medium text-black dark:text-white">
                    Background Attachment
                </div>
                <Dropdown
                    v-model="selectedAttachment"
                    :options="attachments"
                    placeholder="Select a attachment"
                    class="container max-w-3xl sm:max-w-5xl lg:max-w-full" />
            </div>

            <div>
                <div class="text-sm font-medium text-black dark:text-white">
                    Background Position
                </div>
                <Dropdown
                    v-model="selectedPosition"
                    :options="positions"
                    placeholder="Select a position"
                    class="container max-w-3xl sm:max-w-5xl lg:max-w-full" />
            </div>
        </div>
        <div class="grid grid-cols-2 gap-2 mb-4">
            <div>
                <div class="text-sm font-medium text-black dark:text-white">
                    Horizontal Align
                </div>
                <Dropdown
                    v-model="selectedHorizontalAlign"
                    :options="horizontalAligns"
                    placeholder="Select a horizontal alignment"
                    class="container max-w-3xl sm:max-w-5xl lg:max-w-full" />
            </div>
            <div>
                <div class="text-sm font-medium text-black dark:text-white">
                    Vertical Align
                </div>
                <Dropdown
                    v-model="selectedVerticalAlign"
                    :options="verticalAligns"
                    placeholder="Select a vertical alignment"
                    class="container max-w-3xl sm:max-w-5xl lg:max-w-full" />
            </div>
        </div>
        <Panel header="Option">
            <MultiSelect
                v-model="selectedBlocks"
                display="chip"
                :options="blocks"
                placeholder="Select blocks"
                class="container max-w-3xl sm:max-w-5xl lg:max-w-full" />
        </Panel>

        <!-- <WHeroSection
            class="h-screen"
            :layout="selectedLayout"
            :blocks="selectedBlocks"
            :text-alignment="selectedAlignment"
            :background-attachment="selectedAttachment"
            :background-position="selectedPosition"
            :horizontal-align="selectedHorizontalAlign"
            :vertical-align="selectedVerticalAlign"
            :backgroundImage="{
                src: 'https://storage.googleapis.com/emr-sandbox/64e5812f6e317437a4bdc246/cl1.jpg',
                alt: '12A1',
            }"
            title="Sức khỏe"
            sub-title="Là Tài sản quý giá nhất"
            seo-title-tag="h1" /> -->
    </div>
</template>
