<script setup lang="ts">
import SelectButton from 'primevue/selectbutton'
import Select from 'primevue/select'
import { useI18n, ref, watchEffect, computed, watch } from '#imports'
import type { Observation, TimeRange, Organization } from '../../../../models'

interface TimeOption {
    name: string
    value: TimeRange
}

interface OrganizationOption {
    name: string
    value: Organization
}

export interface EmitUpdateValue {
    observationKey: Observation['key']
    organization: Organization
    timeRange: TimeRange
}

// Props with type validation
interface Props {
    observationKey: Observation['key']
    modelValue?: {
        organization: Organization
        timeRange: TimeRange
    }
}

const props = withDefaults(defineProps<Props>(), {
    observationKey: 'height',
    modelValue: () => ({
        organization: 'who',
        timeRange: '13w',
    }),
})

// Emits
const emit = defineEmits<{
    (e: 'update:modelValue', value: EmitUpdateValue): void
}>()

// Composables
const { t } = useI18n()

// Reactive references with proper typing
const organization = ref<Organization>(props.modelValue.organization)
const selectedTime = ref<TimeRange>(props.modelValue.timeRange)

// Constants and configurations
const organizations: OrganizationOption[] = [
    { name: 'WHO', value: 'who' },
    { name: 'CDC', value: 'cdc' },
]

const allTimeOptions: TimeOption[] = [
    { name: t('0-13 week'), value: '13w' },
    { name: t('0-0,5 years'), value: '6m' },
    { name: t('0-2 years'), value: '24m' },
    { name: t('0,5-2 years'), value: '6mto24m' },
    { name: t('2-5 years'), value: '24mto60m' },
    { name: t('0-3 years'), value: '36m' },
    { name: t('0-5 years'), value: '60m' },
    { name: t('0-20 years'), value: '240m' },
]

// Logic configuration with proper typing
const observationConfig = {
    height: {
        who: {
            time: [
                '13w',
                '6m',
                '24m',
                '6mto24m',
                '24mto60m',
                '60m',
            ] as TimeRange[],
        },
        cdc: {
            time: ['36m', '240m'] as TimeRange[],
        },
    },
    weight: {
        who: {
            time: [
                '13w',
                '6m',
                '24m',
                '6mto24m',
                '24mto60m',
                '60m',
            ] as TimeRange[],
        },
        cdc: {
            time: ['36m', '240m'] as TimeRange[],
        },
    },
    headCircumference: {
        who: {
            time: [
                '13w',
                '6m',
                '24m',
                '6mto24m',
                '24mto60m',
                '60m',
            ] as TimeRange[],
        },
        cdc: {
            time: ['36m'] as TimeRange[],
        },
    },
    bmi: {
        who: {
            time: ['24m', '6mto24m', '24mto60m', '60m'] as TimeRange[],
        },
        cdc: {
            time: ['24m', '240m'] as TimeRange[],
        },
    },
} as const

// Computed properties
const availableTimeOptions = computed(() => {
    // Add type guard to check if observationKey exists in observationConfig
    if (!(props.observationKey in observationConfig)) {
        console.warn(
            `Observation type "${props.observationKey}" not found in config`,
        )
        return []
    }

    if (!organization.value) return []

    const allowedTimes =
        observationConfig[
            props.observationKey as keyof typeof observationConfig
        ][organization.value].time
    return allTimeOptions.filter((option) =>
        allowedTimes.includes(option.value),
    )
})

// Watchers
watchEffect(() => {
    // Add type guard here as well
    if (!(props.observationKey in observationConfig)) {
        console.warn(
            `Observation type "${props.observationKey}" not found in config`,
        )
        return
    }

    const currentConfig =
        observationConfig[
            props.observationKey as keyof typeof observationConfig
        ][organization.value]

    // Validate if current selected time is available for new organization
    if (currentConfig && !currentConfig.time.includes(selectedTime.value)) {
        // Default to first available time option
        selectedTime.value = currentConfig.time[0]
    }

    // Emit updated values
    emit('update:modelValue', {
        observationKey: props.observationKey,
        organization: organization.value,
        timeRange: selectedTime.value,
    })
})

// Reset function if needed
const reset = () => {
    organization.value = 'who'
    selectedTime.value = '13w'
}

watch(
    () => organization,
    (val) => {
        console.log(val)
    },
)

defineExpose({
    reset,
})
</script>

<template>
    <div class="flex flex-wrap items-center gap-4">
        <div class="flex-grow-0">
            <SelectButton
                v-model="organization"
                :options="organizations"
                option-value="value"
                option-label="name"
                aria-labelledby="organization-select" />
        </div>

        <div class="flex-grow">
            <Select
                v-model="selectedTime"
                :options="availableTimeOptions"
                option-label="name"
                option-value="value"
                :placeholder="t('Select a time range')"
                class="w-full" />
        </div>
    </div>
</template>
