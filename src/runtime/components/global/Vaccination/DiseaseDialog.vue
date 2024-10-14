<script setup lang="ts">
import { computed, ref, useI18n, watch } from '#imports'
import Calendar from 'primevue/calendar'
import Dialog from 'primevue/dialog'
import RadioButton from 'primevue/radiobutton'
import type { DiseaseSchedule, Vaccination, Vaccine } from '../../../models'

const { t } = useI18n()

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
        data: Partial<Vaccination>,
    ): void
    (e: 'createVaccineHistory', data: Partial<Vaccination>): void
}>()

const selectedDisease = computed<string>(() => props.schedule?.disease || '')

const maxDate = computed(() => new Date())

const updateOrCreateVaccineHistory = (
    vaccine: Vaccine,
    dose: number | null,
    date: Date | null,
) => {
    const data = {
        lastDose: dose ?? 0,
        lastDoseDate: date,
        patient: props.userId,
    }

    if (vaccine.vaccine_id) {
        emit('updateVaccineHistory', vaccine.vaccine_id, data)
    } else {
        emit('createVaccineHistory', {
            ...data,
            vaccine: vaccine.name,
            disease: selectedDisease.value,
        })
    }
}

const getVaccineDoses = (vaccine: Vaccine) => {
    const maxDoses = vaccine.maxDose ?? vaccine.schedule?.length ?? 0
    if (maxDoses === 0) {
        return [0]
    }
    return [0, ...Array.from({ length: maxDoses }, (_, i) => i + 1)]
}

const getDoseLabel = (dose: number, maxDose: number | undefined) => {
    if (dose === 0) return t('vaccination.not-vaccinated')
    return `${dose}/${maxDose}`
}

const vaccineStates = ref<
    Map<string, { dose: number; date: Date | null; isSuccess: boolean }>
>(new Map())

const initVaccineStates = (vaccines: Vaccine[]) => {
    vaccines.forEach((vaccine) => {
        const key = vaccine.vaccine_id ?? vaccine.name
        vaccineStates.value.set(key, {
            dose: vaccine.lastDose ?? 0,
            date: vaccine.lastDoseDate ? new Date(vaccine.lastDoseDate) : null,
            isSuccess: false,
        })
    })
}

const updateVaccineState = (
    vaccine: Vaccine,
    dose: number,
    date: Date | null,
) => {
    const key = vaccine.vaccine_id ?? vaccine.name
    const currentState = vaccineStates.value.get(key)
    vaccineStates.value.set(key, {
        dose,
        date: dose === 0 ? null : date,
        isSuccess: currentState?.isSuccess ?? false,
    })
    updateOrCreateVaccineHistory(vaccine, dose, dose === 0 ? null : date)
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
    <Dialog
        modal
        class="relative w-full overflow-hidden md:max-w-screen-sm"
        :draggable="false">
        <!-- Loading bar -->
        <div
            v-if="isLoading"
            class="bg-primary absolute left-0 top-0 h-1 w-full animate-pulse" />

        <template #header>
            <h3 class="text-xl font-bold uppercase">
                {{ selectedDisease }}
            </h3>
        </template>
        <div v-if="schedule">
            <div
                v-for="vaccine in schedule.vaccines"
                :key="vaccine.name"
                class="relative mb-6 rounded-lg border-2 p-4">
                <h4 class="mb-3 text-lg font-semibold">
                    {{ vaccine.name }}
                    <span v-if="vaccine.maxDose !== undefined">
                        ({{ vaccine.maxDose }})
                    </span>
                </h4>
                <div class="mb-3">
                    <p
                        class="mb-2 font-medium text-gray-700 dark:text-gray-400">
                        {{ t('vaccination.doses-given') }}:
                    </p>
                    <div class="flex flex-wrap items-center gap-4">
                        <div
                            v-for="dose in getVaccineDoses(vaccine)"
                            :key="dose"
                            class="flex items-center">
                            <RadioButton
                                v-model="
                                    vaccineStates.get(
                                        vaccine.vaccine_id ?? vaccine.name,
                                    )!.dose
                                "
                                :input-id="`${vaccine.name}-dose-${dose}`"
                                :name="`${vaccine.name}-dose`"
                                :value="dose"
                                :disabled="isLoading"
                                @change="
                                    updateVaccineState(
                                        vaccine,
                                        dose,
                                        dose === 0
                                            ? null
                                            : (vaccineStates.get(
                                                  vaccine.vaccine_id ??
                                                      vaccine.name,
                                              )?.date ?? null),
                                    )
                                " />
                            <label
                                :for="`${vaccine.name}-dose-${dose}`"
                                class="ml-2 cursor-pointer text-sm">
                                {{
                                    getDoseLabel(
                                        dose,
                                        vaccine.maxDose ||
                                            vaccine.schedule.length,
                                    )
                                }}
                            </label>
                        </div>
                    </div>
                </div>
                <div
                    v-if="
                        vaccineStates.get(vaccine.vaccine_id ?? vaccine.name)
                            ?.dose !== 0
                    ">
                    <p
                        class="mb-2 font-medium text-gray-700 dark:text-gray-400">
                        {{ t('vaccination.last-vaccination-date') }}:
                    </p>
                    <Calendar
                        v-model="
                            vaccineStates.get(
                                vaccine.vaccine_id ?? vaccine.name,
                            )!.date
                        "
                        date-format="dd/mm/yy"
                        :show-icon="true"
                        :placeholder="t('vaccination.not-updated')"
                        class="w-full"
                        :disabled="isLoading"
                        :max-date="maxDate"
                        @date-select="
                            updateVaccineState(
                                vaccine,
                                vaccineStates.get(
                                    vaccine.vaccine_id ?? vaccine.name,
                                )?.dose ?? 0,
                                $event,
                            )
                        " />
                </div>
            </div>
        </div>
    </Dialog>
</template>
