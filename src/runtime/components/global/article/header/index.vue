<script lang="ts" setup>
import {
    computed,
    onMounted,
    ref,
    useI18n,
    useImage,
    type PropType,
    type Ref,
} from '#imports'
import { useParentElement, watchDebounced } from '@vueuse/core'
import { useDisplay } from '../../../../composables'
import type { NotionPage } from '../../../../models'
import ArticleHeaderContributes from './contributes.vue'
import ArticleHeaderDescription from './description.vue'
import ArticleHeaderTime from './time.vue'
import ArticleHeaderTitle from './title.vue'

const { page } = defineProps({
    page: {
        type: Object as PropType<NotionPage>,
        required: true,
    },
    loading: {
        type: Boolean,
        default: false,
    },
})

const img = useImage()
const { t } = useI18n()
const parentEl: Ref<HTMLElement | undefined | any> = useParentElement()
const { display } = useDisplay()

const readingTime = ref<number>(0)
const background = ref<string>('')
const backgroundWidth = ref<number>(0)
const backgroundHeight = ref<number>(0)
const cover = computed(() => page?.cover?.url || '')

const time = computed(
    () =>
        (page?.properties as any)?.PublishedAt?.start ||
        page?.properties?.['Last edited time'] ||
        page?.properties?.Created,
)

const title = computed(() => page?.properties?.Name)

const description = computed(
    () => page?.properties['Meta Description'] || page?.properties?.Sapo,
)

const calculateReadingTime = (text: string) => {
    const wordsPerMinute = 250
    const wordCount = text.trim().split(/\s+/).length
    const readingTimeMinutes = wordCount / wordsPerMinute
    const readingTimeSeconds = Math.ceil(readingTimeMinutes * 60)
    return {
        minutes: Math.floor(readingTimeSeconds / 60),
        seconds: readingTimeSeconds % 60,
    }
}

watchDebounced(
    () => display.breakpoint.w,
    () => {
        if (display.breakpoint.isMobile) {
            backgroundWidth.value = display?.breakpoint?.w
            backgroundHeight.value = (9 / 16) * (display?.breakpoint?.w - 40)
        }
    },
    { debounce: 1000, maxWait: 2000 },
)

onMounted(() => {
    background.value = img(page?.cover?.url, {
        width: display?.breakpoint?.w,
        height: (9 / 16) * display?.breakpoint?.w,
        format: 'webp',
    })

    backgroundHeight.value = (9 / 16) * display?.breakpoint?.w

    readingTime.value =
        calculateReadingTime(parentEl.value?.innerText)?.minutes || 0
})
</script>

<template>
    <div>
        <template v-if="loading">
            <Skeleton height="50vh" class="mb-2 rounded-lg" />
        </template>
        <template v-else>
            <template v-if="display.breakpoint.isMobile">
                <div v-if="page && Object.keys(page).length">
                    <NuxtImg
                        v-if="cover && backgroundWidth"
                        :src="cover"
                        :width="backgroundWidth"
                        :height="backgroundHeight"
                        format="webp"
                        class="mb-4 rounded-lg" />

                    <div
                        class="grid grid-cols-1 gap-6 md:grid-cols-12 xl:grid-cols-12">
                        <div
                            class="md:col-span-10 md:col-start-2 xl:col-span-8 xl:col-start-3">
                            <ArticleHeaderTitle class="mb-4" :title="title" />

                            <ArticleHeaderDescription
                                class="mb-4"
                                :description="description" />

                            <div
                                class="flex flex-wrap items-center gap-2 text-sm text-opacity-80 md:text-base">
                                <template v-if="time">
                                    <ArticleHeaderTime :time="time" />
                                </template>

                                <template
                                    v-if="
                                        page?.properties?.Contributors.length
                                    ">
                                    <span class="font-black">&#x2022;</span>

                                    <ArticleHeaderContributes
                                        :contributors="
                                            page.properties.Contributors
                                        " />
                                </template>

                                <template v-if="readingTime">
                                    <span class="font-black">&#x2022;</span>

                                    <span>{{
                                        t('article:time-reading', {
                                            minutes: readingTime,
                                        })
                                    }}</span>
                                </template>
                            </div>

                            <div class="mt-4 border-b-2" />
                        </div>
                    </div>
                </div>
            </template>
            <template v-else>
                <div
                    v-if="page && Object.keys(page).length"
                    :class="['relative', { 'pt-4': !cover }]">
                    <div class="px-5 sm:px-5 md:px-5 xl:px-0 2xl:px-0">
                        <div>
                            <div
                                class="md:col-span-10 md:col-start-2 xl:col-span-8 xl:col-start-3">
                                <ArticleHeaderTitle
                                    :class="['mb-4']"
                                    :title="title" />

                                <ArticleHeaderDescription
                                    :class="['mb-4']"
                                    :description="description" />

                                <div
                                    class="flex flex-wrap items-center gap-2 text-sm text-opacity-80 md:text-base">
                                    <template v-if="time">
                                        <ArticleHeaderTime :time="time" />
                                    </template>

                                    <template
                                        v-if="
                                            page?.properties?.Contributors
                                                .length
                                        ">
                                        <span class="font-black">&#x2022;</span>

                                        <ArticleHeaderContributes
                                            :contributors="
                                                page.properties.Contributors
                                            " />
                                    </template>

                                    <template v-if="readingTime">
                                        <span class="font-black">&#x2022;</span>

                                        <span>{{
                                            t('article:time-reading', {
                                                minutes: readingTime,
                                            })
                                        }}</span>
                                    </template>
                                </div>

                                <div v-if="!cover" class="mt-4 border-b-2" />
                            </div>
                        </div>
                    </div>
                    <div
                        v-if="background"
                        :class="[
                            {
                                'mt-8 !aspect-[16/9] w-full bg-cover bg-center bg-no-repeat':
                                    cover,
                            },
                        ]"
                        :style="{
                            'background-image': `linear-gradient(180deg, rgba(2,0,36,0) 0%, rgba(0,0,0,0.06628588935574231) 36%, rgba(0,0,0,0.8477984943977591) 95%),url(${background})`,
                        }" />
                </div>
            </template>
        </template>
    </div>
</template>

<i18n lang="yaml">
en:
    'article:time-reading': '{minutes} minutes'
vi:
    'article:time-reading': '{minutes} phút đọc'
</i18n>
