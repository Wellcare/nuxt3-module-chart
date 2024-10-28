<script setup lang="ts">
import { computed, ref, useI18n, watch } from '#imports'
import Button from 'primevue/button'
import DatePicker from 'primevue/datepicker'
import InputNumber from 'primevue/inputnumber'

import type { Observation } from '../../../models'
import { parseDate } from '../../../utils'

interface FormData {
    observedAt: Date | null
    height: number | null
    weight: number | null
}

interface MeasurementConfig {
    name: string
    unit: string
    min: number
    max: number
}

interface Props {
    userId: string
    isLoading: boolean
    defaultData?: {
        observedAt?: string | Date
        height?: number
        weight?: number
    }
}

// Type-safe measurement configuration with validation ranges
const MEASUREMENTS: Record<
    keyof Omit<FormData, 'observedAt'>,
    MeasurementConfig
> = {
    weight: {
        name: 'Person Weight',
        unit: 'kg',
        min: 0,
        max: 200,
    },
    height: {
        name: 'Person Height',
        unit: 'cm',
        min: 0,
        max: 250,
    },
}

const props = defineProps<Props>()
const emit = defineEmits<{
    'on:submit': [observations: Observation[]]
}>()

const { t } = useI18n()

// Initialize form data with proper typing
const formData = ref<FormData>({
    observedAt: new Date(),
    height: null,
    weight: null,
})

// Improved date validation
const isDateValid = (date: Date | null): boolean => {
    if (!date) return false
    const timestamp = date.getTime()
    return !Number.isNaN(timestamp) && timestamp <= new Date().getTime()
}

// Watch for changes in defaultData with improved date parsing
watch(
    () => props.defaultData,
    (newData) => {
        if (newData) {
            const parsedDate = parseDate(newData.observedAt)
            formData.value = {
                observedAt: isDateValid(parsedDate) ? parsedDate : new Date(),
                height: newData.height !== undefined ? newData.height : null,
                weight: newData.weight !== undefined ? newData.weight : null,
            }
        }
    },
    { immediate: true, deep: true },
)

// Enhanced form validation with separate validations
const isMeasurementsValid = computed(() => {
    const { height, weight } = formData.value
    return (
        (height === null ||
            (height >= MEASUREMENTS.height.min &&
                height <= MEASUREMENTS.height.max)) &&
        (weight === null ||
            (weight >= MEASUREMENTS.weight.min &&
                weight <= MEASUREMENTS.weight.max)) &&
        (height !== null || weight !== null) // At least one measurement must be provided
    )
})

const isDateValidComputed = computed(() => {
    return isDateValid(formData.value.observedAt)
})

const isFormValid = computed(() => {
    return isDateValidComputed.value && isMeasurementsValid.value
})

const createObservation = (
    key: keyof Omit<FormData, 'observedAt'>,
    value: number,
    observedAt: Date, // Chỉ nhận Date, không nhận null
    userId: string,
): Observation => {
    const config = MEASUREMENTS[key]
    return {
        key,
        name: config.name,
        value: value.toString(),
        observedAt: observedAt.toISOString(),
        unit: config.unit,
        user: userId,
    }
}

const submit = async () => {
    // Kiểm tra observedAt không null trước khi gọi createObservation
    if (!isFormValid.value || !formData.value.observedAt || !props.userId) {
        console.error('Form validation failed or required data missing')
        return
    }

    try {
        const observations = (
            Object.keys(MEASUREMENTS) as Array<keyof typeof MEASUREMENTS>
        )
            .filter((key) => {
                const value = formData.value[key]
                if (value === null) return false
                const config = MEASUREMENTS[key]
                return value >= config.min && value <= config.max
            })
            .map((key) =>
                createObservation(
                    key,
                    formData.value[key]!,
                    formData.value.observedAt!, // Đã kiểm tra null ở trên nên có thể dùng !
                    props.userId,
                ),
            )

        if (observations.length > 0) {
            emit('on:submit', observations)
        }
    } catch (error) {
        console.error('Error submitting data:', error)
    }
}

defineExpose({
    submit,
})
</script>
<template>
    <form class="grid grid-cols-1 items-center gap-6" @submit.prevent="submit">
        <!-- Date Picker -->
        <div class="flex flex-col">
            <label
                for="observedAt"
                class="mb-1 block text-sm font-medium capitalize">
                {{ t('body-index.form.label.observed-at') }}
            </label>
            <DatePicker
                id="observedAt"
                v-model="formData.observedAt"
                :disabled="isLoading"
                :show-icon="true"
                :max-date="new Date()"
                date-format="dd/mm/yy"
                :show-time="false"
                :manual-input="false" />
        </div>
        Copy
        <!-- Height Input -->
        <div class="flex flex-col">
            <label
                for="height"
                class="mb-1 block text-sm font-medium capitalize">
                {{ t('body-index.form.label.height') }} ({{
                    MEASUREMENTS.height.unit
                }})
            </label>
            <InputNumber
                id="height"
                v-model="formData.height"
                :disabled="isLoading"
                mode="decimal"
                :min="MEASUREMENTS.height.min"
                :max="MEASUREMENTS.height.max"
                :step="0.5"
                :suffix="` ${MEASUREMENTS.height.unit}`"
                show-buttons
                button-layout="horizontal">
                <template #incrementbuttonicon>
                    <span class="pi pi-plus" />
                </template>
                <template #decrementbuttonicon>
                    <span class="pi pi-minus" />
                </template>
            </InputNumber>
        </div>

        <!-- Weight Input -->
        <div class="flex flex-col">
            <label
                for="weight"
                class="mb-1 block text-sm font-medium capitalize">
                {{ t('body-index.form.label.weight') }} ({{
                    MEASUREMENTS.weight.unit
                }})
            </label>
            <InputNumber
                id="weight"
                v-model="formData.weight"
                :disabled="isLoading"
                mode="decimal"
                :min="MEASUREMENTS.weight.min"
                :max="MEASUREMENTS.weight.max"
                :step="0.5"
                :suffix="` ${MEASUREMENTS.weight.unit}`"
                show-buttons
                button-layout="horizontal">
                <template #incrementbuttonicon>
                    <span class="pi pi-plus" />
                </template>
                <template #decrementbuttonicon>
                    <span class="pi pi-minus" />
                </template>
            </InputNumber>
        </div>

        <!-- Submit Button -->
        <div class="col-span-full mt-4">
            <Button
                :label="t('submit')"
                type="submit"
                :loading="isLoading"
                :disabled="isLoading || !isFormValid"
                class="w-full" />
        </div>
    </form>
</template>
