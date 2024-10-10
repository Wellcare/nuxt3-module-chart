<script setup lang="ts">
import Calendar from 'primevue/Calendar'
import Dialog from 'primevue/Dialog'
import ProgressSpinner from 'primevue/ProgressSpinner'
import RadioButton from 'primevue/RadioButton'
import { computed, ref, watch } from 'vue'
import type { DiseaseSchedule, Vaccine } from '../../../models'

const props = defineProps<{
    schedule: DiseaseSchedule | null
    userId: string
    isLoading: boolean
}>()

const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void
    (
        e: 'updateVaccineHistory',
        vaccineId: string,
        data: { lastDose: number; lastDoseDate: Date | null; patient: string },
    ): void
}>()

const selectedDisease = computed<string>(() => props.schedule?.disease || '')

const updateVaccineHistory = (
    vaccine: Vaccine,
    dose: number | null,
    date: Date | null,
) => {
    if (vaccine.vaccine_id) {
        emit('updateVaccineHistory', vaccine.vaccine_id, {
            lastDose: dose ?? 0,
            lastDoseDate: date,
            patient: props.userId,
        })
    }
}

const getVaccineDoses = (vaccine: Vaccine) => {
    return [
        null,
        ...Array.from({ length: vaccine.maxDose ?? 0 }, (_, i) => i + 1),
    ]
}

const formatDate = (date: string | null) => {
    if (!date) return 'Chưa cập nhật'
    return new Date(date).toLocaleDateString('vi-VN')
}

const getDoseLabel = (dose: number | null, maxDose: number) => {
    if (dose === null) return 'Chưa tiêm'
    return `${dose}/${maxDose}`
}

const vaccineStates = ref<
    Map<string, { dose: number | null; date: Date | null; isSuccess: boolean }>
>(new Map())

const initVaccineStates = (vaccines: Vaccine[]) => {
    vaccines.forEach((vaccine) => {
        vaccineStates.value.set(vaccine.vaccine_id ?? '', {
            dose: vaccine.lastDose ?? null,
            date: vaccine.lastDoseDate ? new Date(vaccine.lastDoseDate) : null,
            isSuccess: false,
        })
    })
}

const updateVaccineState = (
    vaccineId: string,
    dose: number | null,
    date: Date | null,
) => {
    const currentState = vaccineStates.value.get(vaccineId)
    vaccineStates.value.set(vaccineId, {
        dose,
        date: dose === null ? null : date,
        isSuccess: currentState?.isSuccess ?? false,
    })
    const vaccine = props.schedule?.vaccines.find(
        (v) => v.vaccine_id === vaccineId,
    )
    if (vaccine) {
        updateVaccineHistory(vaccine, dose, dose === null ? null : date)
    }
}

watch(
    () => props.schedule,
    (newSchedule) => {
        if (newSchedule) {
            initVaccineStates(newSchedule.vaccines)
        }
    },
    { immediate: true },
)
</script>

<template>
    <Dialog modal :style="{ width: '50vw' }" :draggable="false">
        <template #header>
            <h3 class="text-xl font-bold uppercase">{{ selectedDisease }}</h3>
        </template>
        <div v-if="schedule">
            <div
                v-for="vaccine in schedule.vaccines"
                :key="vaccine.name"
                class="relative mb-6 rounded-lg border-2 p-4">
                <div
                    v-if="isLoading"
                    class="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50">
                    <ProgressSpinner />
                </div>
                <h4 class="mb-3 text-lg font-semibold">
                    {{ vaccine.name }} ({{ vaccine.maxDose ?? 0 }} mũi)
                </h4>
                <div class="mb-3">
                    <p
                        class="mb-2 font-medium text-gray-700 dark:text-gray-400">
                        Số mũi đã tiêm:
                    </p>
                    <div class="flex flex-wrap items-center gap-4">
                        <div
                            v-for="(dose, index) in getVaccineDoses(vaccine)"
                            :key="index"
                            class="flex items-center">
                            <RadioButton
                                v-model="
                                    vaccineStates.get(vaccine.vaccine_id ?? '')!
                                        .dose
                                "
                                :input-id="`${vaccine.name}-dose-${dose}`"
                                :name="`${vaccine.name}-dose`"
                                :value="dose"
                                :disabled="isLoading"
                                @change="
                                    updateVaccineState(
                                        vaccine.vaccine_id ?? '',
                                        dose,
                                        dose === null
                                            ? null
                                            : (vaccineStates.get(
                                                  vaccine.vaccine_id ?? '',
                                              )?.date ?? null),
                                    )
                                " />
                            {{ dose }}
                            <label
                                :for="`${vaccine.name}-dose-${dose}`"
                                class="ml-2 cursor-pointer text-sm">
                                {{ getDoseLabel(dose, vaccine.maxDose ?? 0) }}
                            </label>
                        </div>
                    </div>
                </div>
                <div
                    v-if="
                        vaccineStates.get(vaccine.vaccine_id ?? '')?.dose !==
                        null
                    ">
                    <p
                        class="mb-2 font-medium text-gray-700 dark:text-gray-400">
                        Ngày tiêm cuối:
                    </p>
                    <Calendar
                        v-model="
                            vaccineStates.get(vaccine.vaccine_id ?? '')!.date
                        "
                        date-format="dd/mm/yy"
                        :show-icon="true"
                        :placeholder="formatDate(vaccine.lastDoseDate)"
                        class="w-full"
                        :disabled="isLoading"
                        @date-select="
                            updateVaccineState(
                                vaccine.vaccine_id ?? '',
                                vaccineStates.get(vaccine.vaccine_id ?? '')
                                    ?.dose ?? null,
                                $event,
                            )
                        " />
                </div>
            </div>
        </div>
    </Dialog>
</template>
