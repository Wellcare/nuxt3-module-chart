<script setup lang="ts">
import { computed, ref, useI18n, useVaccinationSchedule } from '#imports'
import Button from 'primevue/button'

import type { DiseaseSchedule, Vaccination } from '../../../../models'
import AllDiseasesDialog from '../AllDiseasesDialog.vue'
import DiseaseDialog from '../DiseaseDialog.vue'
import CardDisease from './Card.vue'

const { t } = useI18n()

const props = defineProps({
    title: {
        type: String,
        default: 'Khuyến nghị',
    },
    description: {
        type: String,
        default:
            'Thông tin tiêm chủng giúp phát hiện các vấn đề liên quan đến an toàn sức khỏe của gia đình bạn.',
    },
    indexFilled: {
        type: String,
        default: 'chỉ số đã điền',
    },
    userId: {
        type: String,
        required: true,
    },
})

const {
    vaccinationSchedules,
    updateVaccinationHistory,
    findOrCreateVaccinationHistory,
    isLoading,
} = useVaccinationSchedule({ userId: computed(() => props.userId) })

const dialogVisible = ref<boolean>(false)
const selectedSchedule = ref<DiseaseSchedule | null>(null)
const fullScreenDialogVisible = ref<boolean>(false)

const openDialog = (schedule: DiseaseSchedule) => {
    selectedSchedule.value = schedule
    dialogVisible.value = true
}

const getVaccinationStatus = (schedule: DiseaseSchedule) => {
    const completedVaccines = schedule.vaccines.filter((vaccine) => {
        return (vaccine.lastDose ?? 0) > 0
    }).length
    return `${completedVaccines}/${schedule.vaccines.length}`
}

const isFullyVaccinated = (schedule: DiseaseSchedule) => {
    return schedule.vaccines.every((vaccine) => vaccine.lastDose ?? 0)
}

const handleUpdateVaccineHistory = async (
    vaccineId: string,
    data: Partial<Vaccination>,
) => {
    await updateVaccinationHistory(vaccineId, data)
}

const handleCreateVaccineHistory = async (data: Partial<Vaccination>) => {
    await findOrCreateVaccinationHistory(data)
}

const hasVaccination = (schedule: DiseaseSchedule) => {
    return schedule.vaccines.some((vaccine) => (vaccine.lastDose ?? 0) > 0)
}

const vaccinatedSchedules = computed(() => {
    return vaccinationSchedules.value?.filter(hasVaccination) ?? []
})
</script>

<template>
    <div class="mx-2">
        <!-- Overview cards for vaccinated diseases -->

        <div class="flex flex-col gap-3 md:flex-row md:flex-wrap">
            <CardDisease
                v-for="schedule in vaccinatedSchedules"
                :key="schedule.disease"
                :label="schedule.label"
                :disease="schedule.disease"
                :vaccine-status="getVaccinationStatus(schedule)"
                :is-fully-vaccinated="isFullyVaccinated(schedule)"
                @click="openDialog(schedule)" />
        </div>

        <!-- Button to show all diseases -->
        <Button
            :label="t('add')"
            class="mt-3 w-full md:w-auto"
            icon="pi pi-plus"
            @click="fullScreenDialogVisible = true" />

        <!-- Dialog for individual disease -->
        <DiseaseDialog
            v-model:visible="dialogVisible"
            :schedule="selectedSchedule"
            :user-id="userId"
            :is-loading="isLoading"
            @update-vaccine-history="handleUpdateVaccineHistory"
            @create-vaccine-history="handleCreateVaccineHistory" />

        <!-- Full screen dialog for all diseases -->
        <AllDiseasesDialog
            v-model:visible="fullScreenDialogVisible"
            :vaccination-schedules="vaccinationSchedules"
            @select-disease="openDialog" />
    </div>
</template>

<i18n lang="yaml">
vi:
    add: 'Thêm'
en:
    add: 'Add'
</i18n>
