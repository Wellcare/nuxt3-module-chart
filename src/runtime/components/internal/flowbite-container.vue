<script lang="ts" setup>
import { onMounted, ref, useImage, type PropType } from '#imports'
import {
    transformAlignment,
    transformBackgroundAttachment,
    transformBackgroundPosition,
    transformHorizontalAlign,
    transformVerticalAlign,
    useDisplay,
} from '../../composables'
import type { IBackground } from '../../models'
import type {
    AlignmentType,
    BackgroundAttachmentType,
    BackgroundPositionType,
    FlowbiteContainerBlock,
    HorizontalAlignType,
    SeoTagType,
    VerticalAlignType,
} from '../../types'
import TitlePanel from './title-panel.vue'

const props = defineProps({
    blocks: {
        type: Array as PropType<FlowbiteContainerBlock[]>,
        default: () => [],
    },
    backgroundImage: {
        type: Object as PropType<IBackground>,
        default: () => {},
    },
    title: {
        type: String,
        default: '',
    },
    subTitle: {
        type: String,
        default: '',
    },
    textAlignment: {
        type: String as PropType<AlignmentType>,
        default: 'center',
    },
    seoTitleTag: {
        type: String as PropType<SeoTagType>,
        default: 'div',
    },
    backgroundAttachment: {
        type: String as PropType<BackgroundAttachmentType>,
        default: 'fixed',
    },
    backgroundPosition: {
        type: String as PropType<BackgroundPositionType>,
        default: 'center center',
    },
    verticalAlign: {
        type: String as PropType<VerticalAlignType>,
        default: 'middle',
    },
    horizontalAlign: {
        type: String as PropType<HorizontalAlignType>,
        default: 'center',
    },
    items: {
        type: Array as PropType<Object[]>,
        default: () => [],
    },
    smallHeader: {
        type: Boolean,
        default: false,
    },
    wrapItem: {
        type: Boolean,
        default: false,
    },
    slideItem: {
        type: Boolean,
        default: false,
    },
})

const img = useImage()
const { display } = useDisplay()

const background = ref<string>('')
const browserIsSafariMobile = ref<boolean>(false)

onMounted(() => {
    const backgroundWidth =
        props.backgroundImage?.width || display?.breakpoint?.w
    background.value = img(props.backgroundImage?.src, {
        width: backgroundWidth,
        height: (9 / 16) * backgroundWidth,
        format: 'webp',
    })

    browserIsSafariMobile.value =
        /version\/([\w.]+) .*mobile\/\w+ (safari)/i.test(
            window.navigator.userAgent,
        )
})
</script>

<template>
    <div class="relative grid place-items-center">
        <slot
            v-if="blocks.includes('background-image')"
            name="background-image">
            <div
                :class="
                    [
                        'w-full h-full relative bg-cover bg-no-repeat bg-center',
                        transformBackgroundPosition(backgroundPosition),
                        !browserIsSafariMobile &&
                            transformBackgroundAttachment(backgroundAttachment),
                    ].filter(Boolean)
                "
                :style="{
                    backgroundImage: `url(${background})`,
                }" />
        </slot>
        <slot v-if="blocks.includes('overlay')" name="overlay">
            <div
                class="w-full h-full absolute top-0 left-0 bg-gradient-top-black-7/10" />
        </slot>
        <section
            :class="[
                'container absolute h-full flex py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-12',
                transformAlignment(textAlignment),
                transformVerticalAlign(verticalAlign),
                transformHorizontalAlign(horizontalAlign),
            ]">
            <div :class="[{ 'w-1/2': horizontalAlign !== 'center' }]">
                <slot v-if="blocks.includes('above')" name="above" />
                <TitlePanel
                    v-if="smallHeader"
                    :blocks="
                        blocks.includes('overlay')
                            ? ['overlay', 'title', 'sub-title']
                            : ['title', 'sub-title']
                    "
                    :title="title"
                    :sub-title="subTitle" />
                <slot
                    v-if="blocks.includes('title') && !smallHeader"
                    name="title">
                    <WSheet
                        :tag="seoTitleTag"
                        :class="[
                            'mb-4 text-5xl sm:text-7xl lg:text-9xl font-semibold tracking-tight leading-none text-slate-900 dark:text-white',
                            {
                                'text-white': blocks.includes('overlay'),
                            },
                        ]">
                        {{ title }}
                    </WSheet>
                </slot>
                <slot
                    v-if="blocks.includes('sub-title') && !smallHeader"
                    name="sub-title">
                    <p
                        :class="[
                            'mb-8 text-base sm:text-lg lg:text-xl font-normal text-slate-500 dark:text-gray-400',
                            {
                                'text-white dark:text-white':
                                    blocks.includes('overlay'),
                            },
                        ]">
                        {{ subTitle }}
                    </p>
                </slot>
                <slot v-if="blocks.includes('under')" name="under">
                    <nuxt-marquee
                        v-if="slideItem"
                        pause-on-hover
                        pause-on-click>
                        <div
                            :class="[
                                'flex items-center justify-center gap-4',
                                { 'flex-wrap': wrapItem },
                            ]">
                            <slot
                                v-for="(item, index) in items"
                                :key="index"
                                :item="item" />
                        </div>
                    </nuxt-marquee>
                    <div
                        v-else
                        :class="[
                            'flex items-center justify-center gap-4',
                            { 'flex-wrap': wrapItem },
                        ]">
                        <slot
                            v-for="(item, index) in items"
                            :key="index"
                            :item="item" />
                    </div>
                </slot>
            </div>
        </section>
    </div>
</template>
