import type { ComputedRef, Ref } from '#imports'
import {
    computed,
    readonly,
    ref,
    useAsyncData,
    useI18n,
    useNuxtApp,
} from '#imports'
import { VACCINATION_URL } from '../../constants'
import type { DiseaseSchedule, Vaccination } from '../../models'

interface UseVaccinationScheduleOptions {
    userId: Ref<string> | ComputedRef<string>
}

interface UseVaccinationScheduleReturn {
    vaccinationSchedules: ComputedRef<DiseaseSchedule[] | null>
    isLoading: Ref<boolean>
    refresh: () => Promise<void>
    updateVaccinationHistory: (
        vaccineId: string,
        data: Partial<Vaccination>,
    ) => Promise<void>
    findOrCreateVaccinationHistory: (
        data: Partial<Vaccination>,
    ) => Promise<void>
}

export const useVaccinationSchedule = ({
    userId,
}: UseVaccinationScheduleOptions): UseVaccinationScheduleReturn => {
    const { $fetchWellcare } = useNuxtApp()
    const { locale } = useI18n()

    const isLoading = ref<boolean>(false)

    const cacheKey = computed<string>(
        () => `vaccination-schedule-${userId.value}`,
    )

    const { data, refresh } = useAsyncData<{
        code: number
        message: string
        results: DiseaseSchedule[]
    }>(
        cacheKey.value,
        async () => {
            isLoading.value = true
            try {
                const data: any = await $fetchWellcare(
                    VACCINATION_URL.schedulePatient(userId.value),
                )
                return data
            } finally {
                isLoading.value = false
            }
        },
        {
            server: false,
            lazy: true,
            immediate: true,
            watch: [userId],
        },
    )

    const updateVaccinationHistory = async (
        vaccineId: string,
        data: Partial<Vaccination>,
    ): Promise<void> => {
        isLoading.value = true
        try {
            await $fetchWellcare(VACCINATION_URL.history(vaccineId), {
                method: 'PUT',
                body: JSON.stringify(data),
                params: {
                    locale: locale.value,
                },
            })
            await refresh()
        } catch (error) {
            console.error('Error updating vaccination history:', error)
            throw error
        } finally {
            isLoading.value = false
        }
    }

    const findOrCreateVaccinationHistory = async (
        data: Partial<Vaccination>,
    ): Promise<void> => {
        isLoading.value = true
        try {
            await $fetchWellcare(VACCINATION_URL.historyFindOrCreate(), {
                method: 'POST',
                body: JSON.stringify({
                    ...data,
                    patient: userId.value,
                }),
                params: {
                    locale: locale.value,
                },
            })
            await refresh()
        } catch (error) {
            console.error(
                'Error finding or creating vaccination history:',
                error,
            )
            throw error
        } finally {
            isLoading.value = false
        }
    }

    return {
        vaccinationSchedules: computed(() => data.value?.results || null),
        isLoading: readonly(isLoading),
        refresh,
        updateVaccinationHistory,
        findOrCreateVaccinationHistory,
    }
}
