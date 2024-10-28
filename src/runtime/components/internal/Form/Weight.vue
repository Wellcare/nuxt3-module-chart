<script setup lang="ts">
import { ref, computed, useI18n, watch } from '#imports'
import Button from 'primevue/button'
import DatePicker from 'primevue/datepicker'
import InputNumber from 'primevue/inputnumber'

import type { Observation } from '../../../models'
import { parseDate } from '../../../utils'

interface FormData {
    observedAt: Date | null
    weight: number | null
}

interface Props {
    userId: string
    isLoading: boolean
    defaultData?: {
        observedAt?: string | Date
        weight?: number
    }
}

const props = defineProps<Props>()
const emit = defineEmits<{
    'on:submit': [value: Observation[]]
}>()

const { t } = useI18n()

// Form state with safe initial values
const formData = ref<FormData>({
    observedAt: new Date(),
    weight: null,
})

// Watch for changes in defaultData and update formData accordingly
watch(
    () => props.defaultData,
    (newData) => {
        if (newData) {
            formData.value = {
                observedAt: parseDate(newData.observedAt),
                weight: newData.weight !== undefined ? newData.weight : null,
            }
        }
    },
    { immediate: true, deep: true },
)

// Computed property to check if form is valid
const isFormValid = computed(() => {
    return (
        formData.value.observedAt &&
        !Number.isNaN(formData.value.observedAt.getTime()) && // Check for valid date
        formData.value.weight !== null &&
        formData.value.weight >= 0 &&
        formData.value.weight <= 70
    )
})

const submit = async () => {
    if (!isFormValid.value || !props.userId || !formData.value.observedAt) {
        console.error('Form validation failed or user ID missing')
        return
    }

    try {
        const observation: Observation = {
            key: 'weight',
            name: 'Person Weight',
            value: formData.value.weight!.toString(),
            observedAt: formData.value.observedAt.toISOString(),
            unit: 'kg',
            user: props.userId,
        }
        emit('on:submit', [observation])
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
                class="mb-1 block text-sm font-medium first-letter:uppercase">
                {{ t('body-index.form.label.observed-at') }}
            </label>
            <DatePicker
                id="observedAt"
                v-model="formData.observedAt"
                :show-icon="true"
                :disabled="isLoading"
                date-format="dd/mm/yy"
                :show-time="false"
                :manual-input="false" />
        </div>

        <!-- Height Input -->
        <div class="flex flex-col">
            <label
                for="weight"
                class="mb-1 block text-sm font-medium first-letter:uppercase">
                {{ t('body-index.form.label.weight') }} (cm)
            </label>
            <InputNumber
                id="weight"
                v-model="formData.weight"
                mode="decimal"
                :min="0"
                :max="70"
                :step="0.5"
                suffix=" cm"
                :disabled="isLoading"
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
                type="submit"
                :label="t('submit')"
                :loading="isLoading"
                :disabled="!isFormValid || isLoading"
                class="w-full" />
        </div>
    </form>
</template>
