<script setup lang="ts">
import { useObservations, useUserInfo, ref, computed, inject } from '#imports'
import Button from 'primevue/button'
import DatePicker from 'primevue/datepicker'
import InputNumber from 'primevue/inputnumber'

interface FormData {
    date: Date
    height: number | null
}

// User info setup
const { user } = await useUserInfo({ scope: ['_id'] })
const { importCreate, isLoading } = useObservations({
    userId: computed(() => user.value?._id || ''),
})

// Form state
const formData = ref<FormData>({
    date: new Date(),
    height: null,
})
const dialogRef = inject<any>('dialogRef')

const closeDialog = () => {
    dialogRef.value.close()
}

// Computed property to check if form is valid
const isFormValid = computed(() => {
    return (
        formData.value.date &&
        formData.value.height !== null &&
        formData.value.height >= 0 &&
        formData.value.height <= 70
    )
})

const handleSubmit = async () => {
    if (!isFormValid.value || !user.value?._id) {
        console.error('Form validation failed or user ID missing')
        return
    }

    try {
        const observation = {
            key: 'height',
            name: 'Person Height',
            value: formData.value.height!.toString(),
            observedAt: formData.value.date.toISOString(),
            unit: 'cm',
            user: user.value._id,
        }

        await importCreate([observation])

        // Reset form after successful submission
        formData.value = {
            date: new Date(),
            height: null,
        }
        closeDialog()
    } catch (error) {
        console.error('Error submitting data:', error)
    }
}
</script>

<template>
    <form
        class="grid grid-cols-1 items-center gap-6"
        @submit.prevent="handleSubmit">
        <!-- Date Picker -->
        <div class="flex flex-col">
            <label for="date" class="mb-1 block text-sm font-medium">
                {{ $t('observationDate') }}
            </label>
            <DatePicker
                id="date"
                v-model="formData.date"
                :show-icon="true"
                :disabled="isLoading" />
        </div>

        <!-- Head Circumference Input -->
        <div class="flex flex-col">
            <label for="height" class="mb-1 block text-sm font-medium">
                {{ $t('height') }} (cm)
            </label>
            <InputNumber
                id="height"
                v-model="formData.height"
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
                :label="$t('submit')"
                :loading="isLoading"
                :disabled="!isFormValid || isLoading"
                class="w-full" />
        </div>
    </form>
</template>
