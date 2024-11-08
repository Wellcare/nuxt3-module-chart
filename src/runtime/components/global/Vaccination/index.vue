<script setup lang="ts">
import { computed, ref, useI18n, useVaccinationSchedule } from '#imports'
import Button from 'primevue/button'
import Chip from 'primevue/chip'
import Tag from 'primevue/tag'
import type { DiseaseSchedule, Vaccination } from '../../../models'
import AllDiseasesDialog from './AllDiseasesDialog.vue'
import DiseaseDialog from './DiseaseDialog.vue'

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

const totalSchedules = computed(() => {
    return vaccinationSchedules.value?.length ?? 0
})

const totalVaccinated = computed(() => {
    return vaccinatedSchedules.value?.length ?? 0
})
</script>

<template>
    <div class="mx-2">
        <!-- Overview cards for vaccinated diseases -->
        <div
            class="max-w-sm space-y-3 rounded-xl border border-red-200 bg-red-100/50 p-4">
            <div class="flex items-start space-x-3">
                <div
                    class="flex h-12 w-12 items-center justify-center rounded-lg bg-red-100">
                    <img
                        src="../../../assets/images/immune-system.png"
                        class="h-8 w-8 object-cover"
                        alt="Vaccine Icon" />
                </div>
                <div class="flex-1">
                    <div class="flex items-center justify-between">
                        <h2 class="text-lg font-semibold text-gray-900">
                            {{ t(title) }}
                        </h2>
                        <i class="pi pi-info-circle" />
                    </div>
                    <p class="text-sm text-gray-500">{{ t(description) }}</p>
                    <div class="mt-1 flex items-center space-x-2 text-red-600">
                        <i class="iconify" data-icon="basil:document-solid" />
                        <p class="text-sm">
                            {{ totalVaccinated }}/{{ totalSchedules }}
                            {{ t(indexFilled) }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div class="mt-4 flex flex-wrap gap-3">
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
            class="mt-3"
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
