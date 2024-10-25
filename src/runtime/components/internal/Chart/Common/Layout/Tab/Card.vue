<script setup lang="ts">
import { useDayjs } from '#imports'
import type { Observation } from '../../../../../../models'

interface Props {
    observation: Observation
}

defineProps<Props>()

const dayjs = useDayjs()

const formatDate = (date?: string) => {
    if (!date) return ''
    return dayjs(date).format('DD MMM YYYY')
}

const getTimeAgo = (date?: string) => {
    if (!date) return ''
    return dayjs(date).fromNow()
}
</script>

<template>
    <div
        :class="[
            'bg-surface-200 dark:bg-surface-800 group relative rounded-xl p-4 transition-all duration-200',
        ]">
        <!-- Value -->
        <div class="flex items-baseline justify-between">
            <div :class="['text-2xl font-bold']">
                {{ observation.value }}
                <span class="ml-1 text-lg font-normal text-gray-500">{{
                    observation.unit
                }}</span>
            </div>
        </div>

        <!-- Footer -->
        <div
            class="mt-2 flex items-center justify-between text-sm text-gray-500">
            <span>{{ formatDate(observation.observedAt) }}</span>
            <span class="text-xs">{{ getTimeAgo(observation.updatedAt) }}</span>
        </div>
    </div>
</template>
