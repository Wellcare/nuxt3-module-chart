<script setup lang="ts">
import { useDayjs } from '#imports'

export interface IVitalSign {
    label: string
    icon: string
    value: string
    lastUpdated: string
    unit: string
    bgColor: string
    iconColor: string
}

interface Props {
    vitalSign: IVitalSign
    loading?: boolean
}

withDefaults(defineProps<Props>(), {
    loading: false,
})

const dayjs = useDayjs()
</script>

<template>
    <div :class="['card', vitalSign.bgColor]">
        <template v-if="loading">
            <div class="flex flex-col gap-2">
                <div class="flex flex-row items-center gap-1">
                    <Skeleton width="20px" height="20px" />
                    <Skeleton width="100px" height="16px" />
                </div>
                <Skeleton width="80px" height="48px" class="mt-3" />
                <Skeleton width="40px" height="24px" />
                <Skeleton width="120px" height="14px" />
            </div>
        </template>
        <template v-else>
            <div class="flex flex-row items-center gap-1">
                <i :class="[vitalSign.icon, 'text-primary']" :size="20" />
                <p class="text-primary m-0 text-sm font-semibold">
                    {{ vitalSign.label }}
                </p>
            </div>
            <p class="m-0 mt-3 text-4xl font-bold text-black">
                {{ vitalSign.value }}
            </p>
            <p
                class="m-0 text-lg font-medium text-slate-500 dark:text-slate-400">
                {{ vitalSign.unit }}
            </p>
            <small class="text-slate-500 dark:text-slate-400">
                Updated {{ dayjs(vitalSign.lastUpdated).toNow() }}
            </small>
        </template>
    </div>
</template>
