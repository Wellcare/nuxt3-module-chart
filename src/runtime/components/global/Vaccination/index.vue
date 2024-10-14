<script setup lang="ts">
import { computed, ref, useI18n, useVaccinationSchedule } from '#imports'
import Button from 'primevue/button'
import Chip from 'primevue/chip'
import Tag from 'primevue/tag'
import type { DiseaseSchedule, Vaccination } from '../../../models'
import AllDiseasesDialog from './AllDiseasesDialog.vue'
import DiseaseDialog from './DiseaseDialog.vue'

const { t } = useI18n()

const props = defineProps<{
    userId: string
}>()

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
    return schedule.vaccines.every(
        (vaccine) => (vaccine.lastDose ?? 0) >= (vaccine.maxDose ?? 1),
    )
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
    <div>
        <!-- Overview cards for vaccinated diseases -->
        <div class="flex flex-wrap gap-4">
            <Chip
                v-for="schedule in vaccinatedSchedules"
                :key="schedule.disease"
                class="cursor-pointer border-2 hover:opacity-90"
                :class="{ 'border-primary-500': isFullyVaccinated(schedule) }"
                @click="openDialog(schedule)">
                <span>{{ t(schedule.label) }}</span>
                <Tag
                    rounded
                    :severity="
                        isFullyVaccinated(schedule) ? 'success' : 'warning'
                    "
                    :value="getVaccinationStatus(schedule)" />
            </Chip>
        </div>

        <!-- Button to show all diseases -->
        <Button
            :label="t('add')"
            class="mt-4"
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
