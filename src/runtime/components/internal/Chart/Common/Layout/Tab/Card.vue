<script setup lang="ts">
import { computed, ref, useDayjs, useI18n } from '#imports'
import Button from 'primevue/button'
import Menu from 'primevue/menu'

import type { Observation } from '../../../../../../models'
import { convertToBaseUnit } from '../../../../../../utils'

interface Props {
    observation: Observation
}

const props = defineProps<Props>()
const emit = defineEmits<{
    'on:delete': [value: Observation]
    'on:edit': [value: Observation]
}>()

const dayjs = useDayjs()
const { t } = useI18n()

const menu = ref()
const items = ref([
    {
        label: t('body-index.chart.common.layout.card.menu.options'),
        items: [
            {
                label: t('body-index.chart.common.layout.card.menu.edit'),
                icon: 'pi pi-pencil',
                command: () => {
                    emit('on:edit', props.observation)
                },
            },
            {
                label: t('body-index.chart.common.layout.card.menu.delete'),
                icon: 'pi pi-trash',
                command: () => {
                    emit('on:delete', props.observation)
                },
            },
        ],
    },
])

const formatDate = (date?: string) => {
    if (!date) return ''
    return dayjs(date).format('DD MMM YYYY')
}

const getTimeAgo = (date?: string) => {
    if (!date) return ''
    return dayjs(date).fromNow()
}

const toggle = (event: any) => {
    menu.value.toggle(event)
}

const getValue = computed<number | undefined>(() => {
    if (
        !props.observation.key &&
        props.observation.unit &&
        props.observation.value
    )
        return

    const value = convertToBaseUnit(props.observation.key as any, {
        amount: Number(props.observation.value),
        unit: props.observation.unit || '',
    })
    return value?.amount
})

const getUnit = computed<string | undefined>(() => {
    if (
        !props.observation.key &&
        props.observation.unit &&
        props.observation.value
    )
        return

    const value = convertToBaseUnit(props.observation.key as any, {
        amount: Number(props.observation.value),
        unit: props.observation.unit || '',
    })
    return value?.unit
})
</script>

<template>
    <div
        :class="[
            'bg-surface-200 dark:bg-surface-800 group relative rounded-xl p-4 transition-all duration-200',
        ]">
        <!-- Value -->
        <div class="flex items-center justify-between">
            <div class="flex items-baseline justify-between">
                <div class="text-primary text-2xl font-bold">
                    {{ getValue }}
                    <span
                        v-if="getUnit && observation.key !== 'bmi'"
                        class="ml-1 text-lg font-normal text-gray-500"
                        >{{ getUnit }}</span
                    >
                </div>
            </div>
            <Button
                text
                icon="pi pi-ellipsis-v"
                rounded
                aria-haspopup="true"
                aria-controls="overlay_menu"
                @click.prevent="toggle" />
        </div>

        <!-- Footer -->
        <div
            class="mt-2 flex items-center justify-between text-sm text-gray-500">
            <span>{{ formatDate(observation.observedAt) }}</span>
            <span class="text-xs">{{ getTimeAgo(observation.updatedAt) }}</span>
        </div>

        <Menu id="overlay_menu" ref="menu" :model="items" :popup="true" />
    </div>
</template>
