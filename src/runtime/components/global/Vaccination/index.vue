<script setup lang="ts">
import { computed, ref, useVaccinationSchedule } from '#imports'
import Chip from 'primevue/Chip'
import Tag from 'primevue/Tag'
import type { DiseaseSchedule } from '../../../models'
import DiseaseDialog from './DiseaseDialog.vue'

const props = defineProps<{
    userId: string
}>()

const { vaccinationSchedules, updateVaccinationHistory } =
    useVaccinationSchedule({ userId: computed(() => props.userId) })

const dialogVisible = ref<boolean>(false)
const selectedSchedule = ref<DiseaseSchedule | null>(null)

const openDialog = (schedule: DiseaseSchedule) => {
    selectedSchedule.value = schedule
    dialogVisible.value = true
}

const getVaccinationStatus = (schedule: DiseaseSchedule) => {
    const completedVaccines = schedule.vaccines.filter((v) =>
        v.schedule.some((dose) => dose.state === 'success'),
    ).length
    return `${completedVaccines}/${schedule.vaccines.length}`
}

const handleUpdateVaccineHistory = async (
    vaccineId: string,
    data: { lastDose: number; lastDoseDate: Date | null; patient: string },
) => {
    await updateVaccinationHistory(vaccineId, data)
}
</script>

<template>
    <div class="vaccination-schedule">
        <!-- Overview cards -->
        <div class="flex flex-wrap gap-4">
            <Chip
                v-for="schedule in vaccinationSchedules"
                :key="schedule.disease"
                class="cursor-pointer border-2 hover:opacity-90"
                @click="openDialog(schedule)">
                <span>{{ $t(schedule.label) }}</span>
                <Tag
                    rounded
                    severity="success"
                    :value="getVaccinationStatus(schedule)" />
            </Chip>
        </div>

        <!-- Dialog -->
        <DiseaseDialog
            v-model:visible="dialogVisible"
            :schedule="selectedSchedule"
            :user-id="userId"
            @update-vaccine-history="handleUpdateVaccineHistory" />
    </div>
</template>
