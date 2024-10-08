<script setup lang="ts">
import { useDayjs, useI18n } from '#imports'
import Button from 'primevue/button'
import Skeleton from 'primevue/skeleton'
import { computed, watch } from 'vue'

export interface IBodyIndexCard {
    _id: string
    key: string
    label: string
    icon: string
    value: string
    lastUpdated: string
    unit: string
    bgColor: string
    iconColor: string
    typeChart: 'percentile' | 'bmi'
}

interface Props {
    bodyIndex: IBodyIndexCard
    loading?: boolean
    showAddButton?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    loading: false,
    showAddButton: true,
})

const emit = defineEmits(['add', 'click', 'hover'])

const { t, locale } = useI18n()
const dayjs = useDayjs()

// Create a computed property for dayjs with current locale
const localizedDayjs = computed(() => {
    const d = useDayjs()
    d.locale(locale.value)
    return d
})

// Watch for changes in locale and update dayjs locale
watch(locale, (newLocale) => {
    dayjs.locale(newLocale)
})

const handleAdd = (event: Event) => {
    event.stopPropagation()
    emit('add', props.bodyIndex.typeChart)
}

const handleClick = () => {
    emit('click', props.bodyIndex.typeChart)
}

const handleHover = (isHovering: boolean) => {
    emit('hover', props.bodyIndex.key, isHovering)
}

const formattedLastUpdated = computed(() => {
    if (props.bodyIndex.lastUpdated) {
        return localizedDayjs.value(props.bodyIndex.lastUpdated).fromNow()
    }
    return ''
})
</script>

<template>
    <div
        v-ripple
        :class="[
            'card',
            bodyIndex.bgColor,
            'relative flex h-full flex-col justify-between p-4 transition-all duration-300 ease-in-out',
            'cursor-pointer hover:opacity-95 hover:shadow-lg',
        ]"
        @click="handleClick"
        @mouseenter="handleHover(true)"
        @mouseleave="handleHover(false)">
        <div>
            <div class="mb-2 flex flex-row items-center justify-between">
                <div class="flex items-center gap-1">
                    <Skeleton v-if="loading" width="20px" height="20px" />
                    <i
                        v-else
                        :class="[bodyIndex.icon, bodyIndex.iconColor]"
                        :size="20" />
                    <Skeleton v-if="loading" width="80px" height="16px" />
                    <p v-else class="m-0 text-sm font-semibold text-black">
                        {{ t(bodyIndex.label) }}
                    </p>
                </div>
                <Button
                    v-if="showAddButton && !loading"
                    icon="pi pi-plus"
                    rounded
                    text
                    raised
                    aria-label="Add"
                    @click="handleAdd" />
                <Skeleton v-else-if="loading" shape="circle" size="30px" />
            </div>
            <Skeleton v-if="loading" width="80px" height="40px" class="mb-2" />
            <p v-else class="m-0 text-4xl font-bold text-black">
                {{ bodyIndex.value }}
            </p>
            <Skeleton v-if="loading" width="40px" height="20px" />
            <p
                v-else
                class="m-0 text-lg font-medium text-slate-500 dark:text-slate-400">
                {{ bodyIndex.unit }}
            </p>
        </div>
        <Skeleton v-if="loading" width="120px" height="16px" class="mt-2" />
        <small
            v-else-if="formattedLastUpdated"
            class="mt-2 text-slate-500 dark:text-slate-400">
            {{ t('updated') }} {{ formattedLastUpdated }}
        </small>
    </div>
</template>
