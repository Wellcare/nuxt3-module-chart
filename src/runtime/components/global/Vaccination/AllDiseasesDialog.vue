<script setup lang="ts">
import { useI18n } from '#imports'
import Dialog from 'primevue/dialog'
import type { DiseaseSchedule } from '../../../models'

const { t } = useI18n()

defineProps<{
    vaccinationSchedules: DiseaseSchedule[] | null
}>()

const emit = defineEmits<{
    (e: 'update:visible', value: boolean): void
    (e: 'select-disease', schedule: DiseaseSchedule): void
}>()

const getVaccinationStatus = (schedule: DiseaseSchedule) => {
    const completedVaccines = schedule.vaccines.filter((vaccine) => {
        return (vaccine.lastDose ?? 0) > 0
    }).length
    return `${completedVaccines}/${schedule.vaccines.length}`
}
</script>

<template>
    <Dialog
        :modal="true"
        class="w-full md:max-w-screen-lg"
        @update:visible="(value) => emit('update:visible', value)">
        <template #header>
            <h2
                class="mb-4 text-2xl font-bold text-gray-800 dark:text-gray-200">
                {{ t('all-diseases') }}
            </h2>
        </template>
        <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div
                v-for="schedule in vaccinationSchedules ?? []"
                :key="schedule.disease"
                class="cursor-pointer rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-all duration-200 hover:bg-gray-50 hover:shadow-md dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
                @click="emit('select-disease', schedule)">
                <div class="flex items-center justify-between">
                    <div>
                        <h3
                            class="mb-1 text-lg font-semibold text-gray-900 dark:text-white">
                            {{ t(schedule.label) }}
                        </h3>
                        <p
                            class="text-sm font-medium text-gray-500 dark:text-gray-400">
                            {{ schedule.disease }}
                        </p>
                    </div>
                    <div class="flex items-center space-x-2">
                        <div
                            class="h-2 w-16 rounded-full bg-gray-200 dark:bg-gray-600">
                            <div
                                class="h-2 rounded-full bg-green-500"
                                :style="{
                                    width: `${(parseInt(getVaccinationStatus(schedule).split('/')[0]) / parseInt(getVaccinationStatus(schedule).split('/')[1])) * 100}%`,
                                }" />
                        </div>
                        <span
                            class="text-sm font-medium text-gray-600 dark:text-gray-300">
                            {{ getVaccinationStatus(schedule) }}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </Dialog>
</template>
