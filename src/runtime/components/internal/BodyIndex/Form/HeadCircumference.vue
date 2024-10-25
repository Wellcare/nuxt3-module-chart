<script setup lang="ts">
import {
    useObservations,
    useUserInfo,
    ref,
    computed,
    inject,
    useI18n,
} from '#imports'
import Button from 'primevue/button'
import DatePicker from 'primevue/datepicker'
import InputNumber from 'primevue/inputnumber'

interface FormData {
    date: Date
    headCircumference: number | null
}

// User info setup
const { t } = useI18n()
const { user } = await useUserInfo({ scope: ['_id'] })
const { importCreate, isLoading } = useObservations({
    userId: computed(() => user.value?._id || ''),
})

// Form state
const formData = ref<FormData>({
    date: new Date(),
    headCircumference: null,
})
const dialogRef = inject<any>('dialogRef')

const closeDialog = () => {
    dialogRef.value.close()
}

// Computed property to check if form is valid
const isFormValid = computed(() => {
    return (
        formData.value.date &&
        formData.value.headCircumference !== null &&
        formData.value.headCircumference >= 0 &&
        formData.value.headCircumference <= 70
    )
})

const handleSubmit = async () => {
    if (!isFormValid.value || !user.value?._id) {
        console.error('Form validation failed or user ID missing')
        return
    }

    try {
        const observation = {
            key: 'headCircumference',
            name: 'Person Head Circumference',
            value: formData.value.headCircumference!.toString(),
            observedAt: formData.value.date.toISOString(),
            unit: 'cm',
            user: user.value._id,
        }

        await importCreate([observation])
        // Reset form after successful submission
        formData.value = {
            date: new Date(),
            headCircumference: null,
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
            <label
                for="date"
                class="mb-1 block text-sm font-medium first-letter:uppercase">
                {{ t('body-index.form.label.observation-date') }}
            </label>
            <DatePicker
                id="date"
                v-model="formData.date"
                :show-icon="true"
                :disabled="isLoading" />
        </div>

        <!-- Head Circumference Input -->
        <div class="flex flex-col">
            <label
                for="headCircumference"
                class="mb-1 block text-sm font-medium first-letter:uppercase">
                {{ t('body-index.form.label.head-circumference') }} (cm)
            </label>
            <InputNumber
                id="headCircumference"
                v-model="formData.headCircumference"
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
