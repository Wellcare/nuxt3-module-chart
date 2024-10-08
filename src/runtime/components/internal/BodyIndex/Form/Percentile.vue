<script setup lang="ts">
import { useObservations, useUserInfo } from '#imports'
import Button from 'primevue/button'
import DatePicker from 'primevue/datepicker'
import InputNumber from 'primevue/inputnumber'
import { ref } from 'vue'

const { user } = await useUserInfo({ scope: ['_id'] })
const { importCreate } = useObservations({
    userId: '',
})

// Initialize formData with today's date
const formData = ref({
    date: new Date(), // Default to today's date
    height: null,
    weight: null,
    headCircumference: null,
})

const handleSubmit = async () => {
    const dataMap = {
        weight: {
            name: 'Person Weight',
            unit: 'kg',
        },
        height: {
            name: 'Person Height',
            unit: 'cm',
        },
        headCircumference: {
            name: 'Person Head Circumference',
            unit: 'cm',
        },
    }

    // Filter out null values and map data to the required format
    const observations = Object.keys(dataMap)
        .filter((key) => formData.value[key] !== null)
        .map((key) => ({
            key,
            name: dataMap[key].name,
            value: formData.value[key].toString(),
            observedAt: formData.value.date.toISOString(),
            unit: dataMap[key].unit,
            user: user.value?._id || '',
        }))

    // Submit only if there is data
    if (observations.length > 0) {
        try {
            await importCreate(observations)
            console.log('Data submitted successfully:', observations)
        } catch (error) {
            console.error('Error submitting data:', error)
        }
    } else {
        console.log('No data to submit')
    }
}
</script>

<template>
    <form
        class="grid grid-cols-1 items-center gap-6"
        @submit.prevent="handleSubmit">
        <!-- Datepicker for Observation Date -->
        <div class="flex flex-col">
            <label for="date" class="mb-1 block text-sm font-medium">{{
                $t('observationDate')
            }}</label>
            <DatePicker
                id="date"
                v-model="formData.date"
                :show-icon="true"
                class="p-inputtext-sm w-full" />
        </div>

        <!-- Input for Height -->
        <div class="flex flex-col">
            <label for="height" class="mb-1 block text-sm font-medium"
                >{{ $t('height') }} (cm)</label
            >
            <InputNumber
                id="height"
                v-model="formData.height"
                class="p-inputtext-sm w-full"
                mode="decimal"
                min="0"
                max="250"
                suffix=" cm"
                show-buttons
                button-layout="horizontal"
                :step="0.5">
                <template #incrementbuttonicon>
                    <span class="pi pi-plus" />
                </template>
                <template #decrementbuttonicon>
                    <span class="pi pi-minus" />
                </template>
            </InputNumber>
        </div>

        <!-- Input for Weight -->
        <div class="flex flex-col">
            <label for="weight" class="mb-1 block text-sm font-medium"
                >{{ $t('weight') }} (kg)</label
            >
            <InputNumber
                id="weight"
                v-model="formData.weight"
                class="p-inputtext-sm w-full"
                mode="decimal"
                min="0"
                max="200"
                suffix=" kg"
                show-buttons
                button-layout="horizontal"
                :step="0.5">
                <template #incrementbuttonicon>
                    <span class="pi pi-plus" />
                </template>
                <template #decrementbuttonicon>
                    <span class="pi pi-minus" />
                </template>
            </InputNumber>
        </div>

        <!-- Input for Head Circumference -->
        <div class="flex flex-col">
            <label
                for="headCircumference"
                class="mb-1 block text-sm font-medium"
                >{{ $t('headCircumference') }} (cm)</label
            >
            <InputNumber
                id="headCircumference"
                v-model="formData.headCircumference"
                class="p-inputtext-sm w-full"
                mode="decimal"
                min="0"
                max="70"
                suffix=" cm"
                show-buttons
                button-layout="horizontal"
                :step="0.5">
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
                :label="$t('submit')"
                type="submit"
                class="p-button-primary w-full" />
        </div>
    </form>
</template>

<style scoped>
.field {
    margin-bottom: 1.5rem;
}
</style>
